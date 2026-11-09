/**
 * Client-side lead submission. Every form on the site calls submitLead().
 * Default: POST to the /api/lead serverless function, which upserts the contact in GoHighLevel.
 * Fallback: if VITE_GHL_WEBHOOK_URL is set, also (or only) POST to a GHL Workflow inbound webhook.
 */
export type FormType = 'compass' | 'lens' | 'newsletter' | 'contact';

export interface LeadPayload {
  type: FormType;
  contact: { firstName?: string; lastName?: string; email: string; phone?: string; companyName?: string; jobTitle?: string };
  tags?: string[];
  customFields?: Record<string, string | string[]>;
  note?: string;
  consent?: { email?: boolean; sms?: boolean };
  website?: string; // honeypot
}

const ENDPOINT = (import.meta.env.VITE_LEAD_ENDPOINT as string) || '/api/lead';
const WEBHOOK = import.meta.env.VITE_GHL_WEBHOOK_URL as string | undefined;

export async function submitLead(p: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const payload = { ...p, page: typeof location !== 'undefined' ? location.href : '' };
  let ok = false;
  let error: string | undefined;
  try {
    const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const j = await r.json().catch(() => ({}));
    ok = r.ok && j.ok !== false;
    if (!ok) error = j.error;
  } catch {
    error = 'Network error. Please try again.';
  }
  if (WEBHOOK) {
    try {
      // GHL inbound webhooks accept simple JSON POSTs; no-cors keeps the browser from blocking the send.
      await fetch(WEBHOOK, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) });
      ok = true;
      error = undefined;
    } catch { /* keep the API result */ }
  }
  return { ok, error };
}

export const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/x6kwJG2JUgRYf8v7gDMQ';
export const EQ_URL = 'https://learneq.cummingscm.com/eq-masterclass';
