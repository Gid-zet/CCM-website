/**
 * POST /api/lead — sends every website form into GoHighLevel.
 *
 * 1. Upserts the contact (matched on email) with standard fields, tags and CCM custom fields.
 * 2. Adds a note with the full submission so the team sees context on the contact record.
 * 3. Growth Compass "Hot"/"Warm" leads get an opportunity in the Sales Lead Pipeline → New Lead.
 * 4. Optionally forwards the payload to a GHL Workflow inbound webhook to fire automations.
 *
 * The token stays on the server. Configure in Vercel → Settings → Environment Variables (see .env.example).
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

const API = 'https://services.leadconnectorhq.com';
const VERSION = '2021-07-28';

/** Contact custom fields that already exist in the CCM GoHighLevel location (fieldKey → id). */
const FIELD_IDS: Record<string, string> = {
  compass_result: 'c3zY3wguGNVAhVvqB5ve',
  recommended_service: 'bNFkPf3FJo02w662Qew5',
  secondary_service: 'dBV3jgc1pWsOH7DfnzCy',
  lead_temperature: 'F5cHTImNsUeUYYNdk7X4',
  organization_type: 'pIAgyaLdV9RKD5lFtcYa',
  compass_completed_date: '6hKRiUAGqio1h4pHYSWQ',
  compass_notes: 'bb8g3qf0nOjev2xS0HQg',
  email_updates_consent: 'h3gW8F60UdKHTct2EyaQ',
  compass_focus: '8mHDiNv4qnGxtuEeIzmd',
  current_situation: 'FswPNF4J5V47XrBtWc1j',
  biggest_challenge: 'Un9HgtC4mb2igEhOn6Ue',
  '12month_goal': 'npIw7TYnmq1grn3f8Mxb',
  delivery_preference: 'EJpR0rvCe5Zi8mnyGwfH',
  group_size: 'ec07p0VpYMltZzDViG2c',
  start_timeline: 'wVXNCunpBCCm34mbMoHk',
  compass_scores: 'Lhd26kImoGwFOoXIyUNk',
  job_title: 'g10v6wwBLFY0INDre6MW',
};

const FORM_TYPES = ['compass', 'lens', 'newsletter', 'contact'] as const;
type FormType = (typeof FORM_TYPES)[number];

interface LeadPayload {
  type: FormType;
  contact: {
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    companyName?: string;
    jobTitle?: string;
  };
  tags?: string[];
  customFields?: Record<string, string | string[]>;
  note?: string;
  consent?: { email?: boolean; sms?: boolean };
  /** Honeypot: real people never fill this. */
  website?: string;
  page?: string;
}

const clean = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

async function ghl(path: string, token: string, body: unknown) {
  const r = await fetch(API + path, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, Version: VERSION, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await r.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* non-JSON error body */ }
  if (!r.ok) throw new Error(`GHL ${path} ${r.status}: ${text.slice(0, 300)}`);
  return json;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}) as LeadPayload;
  if (body.website) return res.status(200).json({ ok: true }); // silently drop bots

  const type = FORM_TYPES.includes(body.type) ? body.type : 'contact';
  const email = clean(body.contact?.email, 200).toLowerCase();
  if (!EMAIL.test(email)) return res.status(400).json({ ok: false, error: 'A valid email is required.' });

  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const hook = process.env.GHL_INBOUND_WEBHOOK_URL;
  if (!token || !locationId) {
    if (!hook) return res.status(500).json({ ok: false, error: 'Lead capture is not configured yet.' });
  }

  const c = body.contact;
  const tags = Array.from(new Set(['website-lead', `form-${type}`, ...(body.tags || []).map((t) => clean(t, 60).toLowerCase()).filter(Boolean)]));
  if (body.consent?.email) tags.push('consent-email');
  if (body.consent?.sms) tags.push('consent-sms');

  const fields = { ...(body.customFields || {}) };
  if (c.jobTitle) fields.job_title = c.jobTitle;
  if (body.consent?.email) fields.email_updates_consent = ['Yes'];
  const customFields = Object.entries(fields)
    .filter(([k, v]) => FIELD_IDS[k] && v !== '' && v != null)
    .map(([k, v]) => ({ id: FIELD_IDS[k], key: k, field_value: Array.isArray(v) ? v.map((x) => clean(x, 200)) : clean(v, 2000) }));

  const result: Record<string, unknown> = { ok: true };

  try {
    if (token && locationId) {
      const up = await ghl('/contacts/upsert', token, {
        locationId,
        email,
        firstName: clean(c.firstName, 80) || undefined,
        lastName: clean(c.lastName, 80) || undefined,
        phone: clean(c.phone, 40) || undefined,
        companyName: clean(c.companyName, 120) || undefined,
        source: `Website – ${type}`,
        tags,
        customFields,
      });
      const contactId: string | undefined = up?.contact?.id;
      result.contactId = contactId;

      if (contactId && body.note) {
        await ghl(`/contacts/${contactId}/notes`, token, { body: clean(body.note, 8000) }).catch((e) => console.error(e));
      }

      const temp = String(fields.lead_temperature || '');
      const pipelineId = process.env.GHL_PIPELINE_ID;
      const stageId = process.env.GHL_PIPELINE_STAGE_ID;
      if (contactId && pipelineId && stageId && (type === 'contact' || (type === 'compass' && (temp === 'Hot' || temp === 'Warm')))) {
        const who = clean(c.companyName, 120) || `${clean(c.firstName)} ${clean(c.lastName)}`.trim() || email;
        await ghl('/opportunities/', token, {
          locationId,
          pipelineId,
          pipelineStageId: stageId,
          contactId,
          status: 'open',
          name: type === 'compass' ? `Growth Compass: ${who}` : `Website inquiry: ${who}`,
          source: `Website – ${type}`,
        }).catch((e) => console.error(e));
      }
    }

    if (hook) {
      await fetch(hook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, contact: { ...c, email }, tags, submittedAt: new Date().toISOString() }),
      }).catch((e) => console.error(e));
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(502).json({ ok: false, error: 'We could not save your details right now. Please try again or book a call.' });
  }
}
