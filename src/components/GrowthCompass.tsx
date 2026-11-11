import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState, type FormEvent } from 'react';
import { NEEDS, NEED_COLOR, NEED_LABEL, QUESTIONS, RATE, RESULTS, score, type ChoiceQ, type CompassState, type Need, type RateQ } from '../data/compass';
import { BOOKING_URL, EQ_URL, submitLead } from '../lib/ghl';
import { track } from '../lib/analytics';
import { Magnetic, Pinwheel, Reveal, SplitWords, burst, scrollToId } from './ui';

type Contact = { fn: string; ln: string; em: string; ph: string; org: string; jt: string; ce: boolean; cs: boolean };
const EMPTY: Contact = { fn: '', ln: '', em: '', ph: '', org: '', jt: '', ce: true, cs: false };
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const screen = {
  initial: { opacity: 0, x: 40, filter: 'blur(6px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -40, filter: 'blur(6px)', transition: { duration: 0.25 } },
};

export function GrowthCompass() {
  const [step, setStep] = useState(-1);
  const [st, setSt] = useState<CompassState>({ ans: {}, rate: {}, notes: '' });
  const [contact, setContact] = useState<Contact>(EMPTY);
  const [errs, setErrs] = useState<Partial<Record<keyof Contact, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | { ok: boolean; error?: string }>(null);
  const hp = useRef<HTMLInputElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const n = QUESTIONS.length;
  const fill = step < 0 ? 4 : Math.min(4, (step / n) * 4);

  const go = (s: number) => { if (s === 0 && step < 0) track('Compass Started'); if (s === n && step === n - 1) track('Compass Questions Done'); setStep(s); requestAnimationFrame(() => card.current && card.current.getBoundingClientRect().top < 0 && scrollToId('compass-card')); };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const orgReq = st.ans.focus !== 0;
    const er: typeof errs = {};
    if (!contact.fn.trim()) er.fn = 'Please add your first name.';
    if (!contact.ln.trim()) er.ln = 'Please add your last name.';
    if (!EMAIL.test(contact.em.trim())) er.em = 'Enter an email like name@company.com.';
    if (orgReq && !contact.org.trim()) er.org = 'Please add your organization.';
    setErrs(er);
    if (Object.keys(er).length) { document.getElementById(`cg-${Object.keys(er)[0]}`)?.focus(); return; }

    const r = score(st), res = RESULTS[r.top], sec = r.second ? RESULTS[r.second] : null;
    const orgT = (QUESTIONS[1] as ChoiceQ).o[st.ans.org];
    const choice = (id: string) => { const q = QUESTIONS.find((x) => x.id === id) as ChoiceQ; return q.o[st.ans[id]]?.[0] ?? ''; };
    const scores = NEEDS.map((k) => `${NEED_LABEL[k]} ${r.s[k]}`).join(', ');
    const fields: Record<string, string> = {
      compass_result: res.name, recommended_service: res.svc, secondary_service: sec?.svc ?? '', lead_temperature: r.temp,
      organization_type: orgT[0], compass_completed_date: new Date().toISOString().slice(0, 10), compass_notes: st.notes,
      compass_focus: choice('focus'), current_situation: choice('situation'), biggest_challenge: choice('challenge'),
      '12month_goal': choice('goal'), delivery_preference: choice('format'), group_size: choice('size'), start_timeline: choice('when'), compass_scores: scores,
    };
    const tags = ['compass-completed', `compass-result-${res.slug}`, `interest-${res.svcTag}`, ...(sec ? [`interest-${sec.svcTag}`] : []), `lead-${r.temp.toLowerCase()}`, `segment-${orgT[3]}`];
    const note = [`Growth Compass result: ${res.name}`, `Recommended: ${res.svc}${sec ? ` (also ${sec.svc})` : ''}`, `Lead temperature: ${r.temp}`, `Scores: ${scores}`, '',
      ...QUESTIONS.filter((q) => !q.type).map((q) => `${(q as ChoiceQ).field}: ${choice(q.id)}`),
      ...((QUESTIONS[4] as RateQ).items.map(([t, k]) => `• ${t}: ${RATE[st.rate[k] ?? 0]}`)), st.notes ? `\nNotes: ${st.notes}` : ''].join('\n');

    setSending(true);
    const out = await submitLead({
      type: 'compass',
      contact: { firstName: contact.fn.trim(), lastName: contact.ln.trim(), email: contact.em.trim(), phone: contact.ph.trim(), companyName: contact.org.trim(), jobTitle: contact.jt.trim() },
      tags, customFields: fields, note, consent: { email: contact.ce, sms: contact.cs }, website: hp.current?.value,
    });
    setSending(false);
    setSent(out);
    track('Compass Completed', { result: res.name, temperature: r.temp });
    go(n + 1);
    setTimeout(() => { const b = card.current?.getBoundingClientRect(); if (b) burst(b.left + b.width / 2, b.top + 120, 60); }, 350);
  };

  const q = QUESTIONS[step];
  return (
    <section id="compass" className="block compass-sec">
      <div className="wrap tool-shell">
        <div className="tool-side">
          <span className="kicker">Free leadership assessment</span>
          <h2 className="h2"><SplitWords text="The CCM" /> <span className="grad-text">Growth Compass</span></h2>
          <p className="lede">Find out what your leaders and team need next. Ten quick questions, an instant personalized result, and the service that fits.</p>
          <div className="meta"><span>About 3 minutes</span><span>10 questions</span><span>Instant results</span></div>
          <motion.div className="big-wheel" animate={{ rotate: step * 36 }} transition={{ type: 'spring', stiffness: 60, damping: 14 }}>
            <Pinwheel fill={fill} />
          </motion.div>
        </div>

        <Reveal>
          <div id="compass-card" ref={card} className="glass tool" aria-live="polite" style={{ minHeight: '32rem' }}>
            <AnimatePresence mode="wait">
              {step < 0 && (
                <motion.div key="intro" {...screen}>
                  <span className="label">Your compass is waiting</span>
                  <h3 className="qtitle">Where should your leadership growth point next?</h3>
                  <p className="qhint">Answer honestly. There are no wrong answers, only a clearer direction. You'll see one of six Growth Compass profiles, a breakdown of where you are today, and a recommended first step.</p>
                  <div className="opts" style={{ marginBottom: '1.6rem' }}>
                    {(['bench', 'stretch', 'team', 'direction', 'systems', 'scale'] as Need[]).map((k) => (
                      <div key={k} className="opt" style={{ ['--c' as string]: RESULTS[k].color, cursor: 'default' }}><span className="dot"><i /></span>{RESULTS[k].name}</div>
                    ))}
                  </div>
                  <Magnetic><button className="btn" onClick={() => go(0)}>Start my compass <span className="arr">→</span></button></Magnetic>
                </motion.div>
              )}

              {step >= 0 && step < n && q && (
                <motion.div key={q.id} {...screen}>
                  <div className="qtop">
                    <div><div className="qcount">Question {step + 1} of {n}</div><div className="qbar"><i style={{ width: `${(step / n) * 100}%` }} /></div></div>
                  </div>
                  <h3 className="qtitle">{q.t}</h3>
                  {q.h ? <p className="qhint">{q.h}</p> : <div style={{ height: '1rem' }} />}
                  {!q.type && (
                    <div className="opts">
                      {(q as ChoiceQ).o.map((o, i) => (
                        <motion.button key={o[0]} className="opt" style={{ ['--c' as string]: o[2] }} aria-pressed={st.ans[q.id] === i} whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * i } }}
                          onClick={() => { setSt((s) => ({ ...s, ans: { ...s.ans, [q.id]: i } })); setTimeout(() => go(step + 1), 280); }}>
                          <span className="dot"><i /></span>{o[0]}
                        </motion.button>
                      ))}
                    </div>
                  )}
                  {q.type === 'rate' && (
                    <div className="rates">
                      {q.items.map(([t, k], i) => (
                        <div className="rate" key={k}>
                          <p id={`rt-${i}`}>{t}</p>
                          <div className="seg" role="group" aria-labelledby={`rt-${i}`}>
                            {RATE.map((lb, v) => <button key={lb} aria-pressed={st.rate[k] === v} onClick={() => setSt((s) => ({ ...s, rate: { ...s.rate, [k]: v } }))}>{lb}</button>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {q.type === 'text' && (
                    <>
                      <label htmlFor="cg-notes" className="sr-only">Your note</label>
                      <textarea id="cg-notes" maxLength={500} value={st.notes} onChange={(e) => setSt((s) => ({ ...s, notes: e.target.value }))}
                        placeholder="For example: we merged two departments in May and the new managers are struggling." />
                    </>
                  )}
                  <div className="qnav">
                    <button className="linkbtn" onClick={() => go(step - 1)}>← Back</button>
                    {q.type === 'rate' && <button className="btn plum" disabled={!q.items.every(([, k]) => st.rate[k] !== undefined)} onClick={() => go(step + 1)}>Next <span className="arr">→</span></button>}
                    {q.type === 'text' && <button className="btn" onClick={() => go(step + 1)}>See my result <span className="arr">→</span></button>}
                  </div>
                </motion.div>
              )}

              {step === n && (() => {
                const res = RESULTS[score(st).top];
                const F = (k: keyof Contact, label: string, req: boolean, ac: string, type = 'text', full = false) => (
                  <div className={`field${full ? ' full' : ''}`}>
                    <label htmlFor={`cg-${k}`}>{label}{!req && <small> (optional)</small>}</label>
                    <input id={`cg-${k}`} type={type} autoComplete={ac} value={contact[k] as string} aria-invalid={!!errs[k]} required={req}
                      onChange={(e) => setContact((c) => ({ ...c, [k]: e.target.value }))} />
                    <span className="err">{errs[k]}</span>
                  </div>
                );
                return (
                  <motion.div key="gate" {...screen} className="gate">
                    <div className={`teaser${res.light ? ' light' : ''}`} style={{ ['--rc' as string]: res.color }}>
                      <div className="blur" aria-hidden="true"><span className="label" style={{ color: 'inherit' }}>Your result</span><h3>{res.name}</h3><p>{res.means}</p><p>Recommended: {res.svc}</p></div>
                      <div className="lock"><Pinwheel size={26} /> Your Growth Compass is ready</div>
                    </div>
                    <form onSubmit={submit} noValidate>
                      <h3 className="qtitle" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)' }}>See your personalized results</h3>
                      <p className="qhint">Enter your details to unlock your result and next step. We'll email you a copy too.</p>
                      <div className="form">
                        {F('fn', 'First name', true, 'given-name')}{F('ln', 'Last name', true, 'family-name')}
                        {F('em', 'Work email', true, 'email', 'email', true)}{F('ph', 'Phone', false, 'tel', 'tel')}
                        {F('org', 'Organization', st.ans.focus !== 0, 'organization')}{F('jt', 'Job title', false, 'organization-title', 'text', true)}
                        <input ref={hp} className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />
                        <label className="check"><input type="checkbox" checked={contact.ce} onChange={(e) => setContact((c) => ({ ...c, ce: e.target.checked }))} /> Email me leadership insights and follow-up about my result. Unsubscribe any time.</label>
                        <label className="check"><input type="checkbox" checked={contact.cs} onChange={(e) => setContact((c) => ({ ...c, cs: e.target.checked }))} /> Text me about my result and booking. Message and data rates may apply. Reply STOP to opt out.</label>
                        <div className="field full"><button className="btn" type="submit" disabled={sending}>{sending ? 'Unlocking…' : <>Show my results <span className="arr">→</span></>}</button></div>
                        <p className="fine">We'll email your results. No spam, ever.</p>
                      </div>
                      <button type="button" className="linkbtn" onClick={() => go(n - 1)}>← Back to questions</button>
                    </form>
                  </motion.div>
                );
              })()}

              {step === n + 1 && <Results key="res" st={st} name={contact.fn} email={contact.em} sent={sent} again={() => { setSt({ ans: {}, rate: {}, notes: '' }); setSent(null); go(0); }} />}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Results({ st, name, email, sent, again }: { st: CompassState; name: string; email: string; sent: null | { ok: boolean; error?: string }; again: () => void }) {
  const r = score(st), res = RESULTS[r.top], sec = r.second ? RESULTS[r.second] : null;
  const max = Math.max(...NEEDS.map((k) => r.s[k])) || 1;
  const ch = (QUESTIONS[3] as ChoiceQ).o[st.ans.challenge]?.[0];
  const Rec = ({ x, primary }: { x: typeof res; primary?: boolean }) => (
    <article className={`rec${primary ? ' primary' : ''}`}>
      <span className="tag">{primary ? 'Recommended for you' : 'Also worth a look'}</span>
      <h4>{x.svc}</h4><p>{x.why}</p>
      <div className="acts">
        {primary && <a className="btn plum sm" href={BOOKING_URL} target="_blank" rel="noopener">Book a strategy call <span className="arr">→</span></a>}
        <a className="btn ghost sm" href={x.url} target="_blank" rel="noopener">Explore {x.svc}</a>
      </div>
    </article>
  );
  return (
    <motion.div {...screen}>
      <header className={`res-head${res.light ? ' light' : ''}`} style={{ ['--rc' as string]: res.color }}>
        <motion.div className="res-badge" initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.2 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}><Pinwheel /></motion.div>
        </motion.div>
        <div>
          <span className="kicker">{name ? `${name}, your` : 'Your'} Growth Compass result</span>
          <h3 tabIndex={-1}>{res.name}</h3>
          <p>{res.means}</p>
        </div>
      </header>
      <div className="res-body" style={{ ['--rcb' as string]: res.color }}>
        <div className="two">
          <div>
            <p className="label">Your compass</p>
            <div className="bars">
              {NEEDS.slice().sort((a, b) => r.s[b] - r.s[a]).map((k, i) => (
                <div key={k} className={`brow${k === r.top ? ' top' : ''}`} style={{ ['--c' as string]: NEED_COLOR[k] }}>
                  <span>{NEED_LABEL[k]}</span>
                  <span className="track"><motion.i initial={{ width: 0 }} animate={{ width: `${(r.s[k] / max) * 100}%` }} transition={{ duration: 1.1, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} /></span>
                  <span className="n">{r.s[k]}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="label">Key challenge you named</p>
            <blockquote className="quote-box" style={{ margin: 0 }}>“{ch}”</blockquote>
            <p style={{ color: 'var(--muted)', marginTop: '.7rem' }}>This is where the right support will make the biggest difference first.</p>
          </div>
        </div>
        <div><p className="label">Your recommended next step</p><div style={{ display: 'grid', gap: '1rem' }}><Rec x={res} primary />{sec && <Rec x={sec} />}</div></div>
        {r.starter && (
          <div className="starter"><p><strong>Want a quick first step?</strong> The EQ Masterclass builds emotional intelligence skills you can use right away.</p>
            <a className="btn ghost sm" href={EQ_URL} target="_blank" rel="noopener">See the EQ Masterclass</a></div>
        )}
        <div className="qnav" style={{ marginTop: 0 }}>
          <button className="linkbtn" onClick={again}>↺ Take it again with different answers</button>
          {sent && <span className={`status${sent.ok ? '' : ' bad'}`}>{sent.ok ? `✓ A copy is on its way to ${email}` : sent.error || "We couldn't save your details, but your result is below. Book a call and we'll take it from here."}</span>}
        </div>
      </div>
    </motion.div>
  );
}
