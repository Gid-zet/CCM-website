import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { LENSES, ORDER, PLAY, SCENARIOS, SOURCES, type LensKey, type ScenarioKey } from '../data/lens';
import { submitLead } from '../lib/ghl';
import { Reveal, SplitWords, burst } from './ui';

type State = { picked: Record<string, string[]>; scenario: ScenarioKey; example: boolean };
const EXAMPLE: State = {
  picked: { up: ['Praise came for achievement'], life: ['Big wins from outworking others', 'Someone dropped the ball and I paid for it'], beliefs: ['Hard work equals value', 'If I want it done right, I do it myself'], env: ['Fast, results-driven workplace'], mem: ['Pride after a hard-won result', 'Being let down when I counted on someone'] },
  scenario: 'missed', example: true,
};
const KEY = 'ccm-leadership-lens-v2';
const load = (): State => { try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s?.picked) return s; } catch { /* storage blocked */ } return JSON.parse(JSON.stringify(EXAMPLE)); };

/** Donut ring showing the lens mix — the "lens" itself. */
function LensRing({ sc, top }: { sc: Record<LensKey, number>; top?: LensKey }) {
  const total = ORDER.reduce((n, k) => n + sc[k], 0) || 1;
  let acc = 0;
  const R = 70, C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 200 200" className="lens-ring" role="img" aria-label="Your lens mix">
      <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="26" />
      {ORDER.map((k) => {
        const f = sc[k] / total, len = f * C, off = acc; acc += len;
        return <motion.circle key={k} cx="100" cy="100" r={R} fill="none" stroke={LENSES[k].color} strokeWidth={k === top ? 30 : 22} strokeLinecap="butt"
          transform="rotate(-90 100 100)" initial={false} animate={{ strokeDasharray: `${Math.max(0, len - 2)} ${C}`, strokeDashoffset: -off }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />;
      })}
      <circle cx="100" cy="100" r="50" fill="rgba(255,255,255,.06)" />
      <text x="100" y="96" textAnchor="middle" fill="#fff6fb" style={{ font: '800 13px Urbanist, sans-serif', letterSpacing: '.12em' }}>YOUR</text>
      <text x="100" y="114" textAnchor="middle" fill="#fff6fb" style={{ font: '800 13px Urbanist, sans-serif', letterSpacing: '.12em' }}>LENS</text>
    </svg>
  );
}

export function LeadershipLens() {
  const [st, setSt] = useState<State>(load);
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ fn: '', em: '' });
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [sending, setSending] = useState(false);
  const hp = useRef<HTMLInputElement>(null);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch { /* ignore */ } }, [st]);

  const sc = useMemo(() => {
    const s = Object.fromEntries(ORDER.map((k) => [k, 0])) as Record<LensKey, number>;
    SOURCES.forEach((src) => src.chips.forEach(([t, k]) => { if ((st.picked[src.id] || []).includes(t)) s[k]++; }));
    return s;
  }, [st.picked]);
  const ranked = ORDER.slice().sort((a, b) => sc[b] - sc[a]).filter((k) => sc[k] > 0);
  const total = Object.values(st.picked).reduce((n, a) => n + a.length, 0);
  const L = ranked[0] ? LENSES[ranked[0]] : null, L2 = ranked[1] ? LENSES[ranked[1]] : null;
  const scn = SCENARIOS.find((s) => s.id === st.scenario) || SCENARIOS[0];
  const P = ranked[0] ? PLAY[ranked[0]][scn.id] : null;

  const toggle = (id: string, t: string) => setSt((s) => {
    const a = [...(s.picked[id] || [])]; const i = a.indexOf(t); i >= 0 ? a.splice(i, 1) : a.push(t);
    return { ...s, picked: { ...s.picked, [id]: a }, example: false };
  });

  const summary = () => {
    if (!L || !P) return 'My Leadership Lens: not built yet.';
    return ['MY LEADERSHIP LENS', `Primary lens: ${L.name}${L2 ? ` (blended with ${L2.name})` : ''}`, '', L.desc, '', 'What built my lens:',
      ...SOURCES.map((x) => (st.picked[x.id] || []).length ? `- ${x.title}: ${(st.picked[x.id] || []).join('; ')}` : null).filter(Boolean),
      '', `How it serves me: ${L.gift}`, `How it may limit me: ${L.blind}`, `A belief to try on: ${L.reframe}`, '',
      `Moment: ${scn.label}`, `My story: "${P[0]}"`, `Autopilot: ${P[1]}`, `With a pause: ${P[4]}`, '', 'Awareness creates choice. Choice creates change.'].join('\n');
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.em.trim())) { setStatus({ ok: false, msg: 'Enter an email like name@company.com.' }); return; }
    setSending(true);
    const out = await submitLead({
      type: 'lens', contact: { firstName: form.fn.trim(), email: form.em.trim() },
      tags: ['leadership-lens-completed', ranked[0] ? `lens-${LENSES[ranked[0]].short.toLowerCase()}` : 'lens-empty', 'interest-eq-masterclass'],
      note: summary(), consent: { email: true }, website: hp.current?.value,
    });
    setSending(false);
    setStatus(out.ok ? { ok: true, msg: `✓ Sent. Your lens summary is on its way to ${form.em.trim()}.` } : { ok: false, msg: out.error || 'Something went wrong. Try copying your summary instead.' });
    if (out.ok) { const b = (e.target as HTMLElement).getBoundingClientRect(); burst(b.left + b.width / 2, b.top, 30); }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary()); setStatus({ ok: true, msg: '✓ Copied. Paste it into your workbook.' }); } catch { setStatus({ ok: false, msg: 'Copy was blocked by your browser.' }); }
  };

  const STEPS = ['What shaped you?', 'How you see the world', 'Run a moment through it'];
  const stage = (n: string, color: string, tag: string, say: string, brain: string, q = false) => (
    <motion.div className="fstage" style={{ ['--sc' as string]: color }} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: +n * 0.07 }}>
      <span className="d">{n}</span>
      <div className="body"><span className="tag">{tag}</span><p className={`say${q ? ' q' : ''}`}>{say}</p><p className="brain">{brain}</p></div>
    </motion.div>
  );

  return (
    <section id="lens" className="block lens-sec">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Interactive · EQ Masterclass tool</span>
          <h2 className="h2"><SplitWords text="My Leadership" /> <em style={{ color: 'var(--sky)' }}>Lens</em></h2>
          <p className="lede">Your past shapes your perspective, and your perspective shapes your leadership. Pick what built your lens, then watch it filter a real workplace moment from event to result.</p>
        </div>
        <Reveal>
          <div className="glass tool">
            <div className="lens-steps" role="tablist" aria-label="Leadership Lens steps">
              {STEPS.map((s, i) => <button key={s} role="tab" aria-selected={tab === i} aria-current={tab === i ? 'step' : undefined} onClick={() => setTab(i)}><i>{i + 1}</i>{s}</button>)}
            </div>
            {st.example && (
              <div className="starter" style={{ marginBottom: '1.2rem' }}>
                <p>You're looking at an <strong>example lens</strong>. Clear it to build your own. Your picks stay in this browser.</p>
                <button className="btn sm" onClick={() => { setSt({ picked: {}, scenario: st.scenario, example: false }); setTab(0); }}>Clear and start mine</button>
              </div>
            )}
            <AnimatePresence mode="wait">
              {tab === 0 && (
                <motion.div key="t0" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="sources">
                    {SOURCES.map((s) => (
                      <div key={s.id} className="source" style={{ ['--c' as string]: s.c }}>
                        <h4>{s.title}</h4><p className="hint">{s.hint}</p>
                        <div className="lchips">{s.chips.map(([t]) => <motion.button key={t} whileTap={{ scale: 0.94 }} className="lchip" aria-pressed={(st.picked[s.id] || []).includes(t)} onClick={() => toggle(s.id, t)}>{t}</motion.button>)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="qnav"><span style={{ color: 'var(--muted)' }}>{total} picked</span><button className="btn" disabled={!total} onClick={() => setTab(1)}>See my lens <span className="arr">→</span></button></div>
                </motion.div>
              )}
              {tab === 1 && (
                <motion.div key="t1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {!L ? <p className="lede">Choose a few items in step 1 and your lens will take shape here.</p> : (
                    <div className="lens-out">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <span className="label" style={{ marginBottom: 0 }}>Your primary lens</span>
                        <motion.p key={L.name} className="lens-name" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ color: L.color }}>{L.name}</motion.p>
                        <p>{L.desc}</p>
                        {L2 && <p style={{ color: 'var(--muted)' }}>Blended with <strong style={{ color: L2.color }}>{L2.name}</strong>: {L2.desc.charAt(0).toLowerCase() + L2.desc.slice(1)}</p>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                        <LensRing sc={sc} top={ranked[0]} />
                        <div className="facets" style={{ width: '100%' }}>
                          <div className="facet gift"><b>How it serves you</b>{L.gift}</div>
                          <div className="facet blind"><b>How it may limit you</b>{L.blind}</div>
                          <div className="facet reframe full"><b>A belief to try on</b>{L.reframe}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="qnav"><button className="linkbtn" onClick={() => setTab(0)}>← Adjust my picks</button>{L && <button className="btn" onClick={() => setTab(2)}>Run a moment through it <span className="arr">→</span></button>}</div>
                </motion.div>
              )}
              {tab === 2 && (
                <motion.div key="t2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {!L || !P ? <p className="lede">Your lens is empty. Choose a few items in step 1 first.</p> : (
                    <>
                      <div className="scen" role="group" aria-label="Choose a situation">
                        {SCENARIOS.map((s) => <button key={s.id} aria-pressed={st.scenario === s.id} onClick={() => setSt((x) => ({ ...x, scenario: s.id }))}>{s.label}</button>)}
                      </div>
                      <div className="flow" key={st.scenario + ranked[0]}>
                        {stage('01', '#d56bb4', 'Event happens', scn.label, 'Something occurs in your environment. On its own, it has no meaning yet.')}
                        {stage('02', '#8dd8f7', 'Filtered through your lens', L.name, 'Prefrontal cortex: the thinking brain analyzes the event through everything that built your lens.')}
                        {stage('03', '#9ecb3c', 'Stored memories pulled in', (st.picked.mem || []).join(' · ') || 'Your emotional memories from step 1 would surface here.', 'Hippocampus: past experiences add context to this moment.')}
                        {stage('04', '#d56bb4', 'The story you tell yourself', `“${P[0]}”`, 'Interpretation: this is the moment your lens turns an event into a meaning.', true)}
                        {stage('05', '#fca927', 'Emotional response', L.emotion, 'Amygdala: the emotional brain scans for threat or reward and fires fast.')}
                        {stage('06', '#ff9a92', 'Reaction urge', L.urge, 'Your body prepares to fight, flee, freeze, or appease.')}
                      </div>
                      <motion.div className="pause" initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
                        <b aria-hidden="true">II</b><p><strong>Pause.</strong> This is your opportunity to create space between what you feel and what you do.</p>
                      </motion.div>
                      <div className="paths">
                        <div className="path auto"><h4>On autopilot</h4><div className="st"><b>Behavior</b>{P[1]}</div><div className="st"><b>Result</b>{P[2]}</div></div>
                        <div className="path chosen"><h4>With a pause</h4><div className="st"><b>Choice</b>{P[3]}</div><div className="st"><b>Behavior</b>{P[4]}</div><div className="st"><b>Result</b>{P[5]}</div></div>
                      </div>
                      <div className="takeaway">
                        <p>You don't respond to events. You respond to <span>your interpretation</span> of events.</p>
                        <button className="btn ghost sm" onClick={copy}>Copy my lens summary</button>
                      </div>
                      <form className="lens-save" onSubmit={save} noValidate>
                        <p>Email me my lens summary and the EQ Masterclass workbook tips</p>
                        <div className="field"><label htmlFor="ll-fn">First name</label><input id="ll-fn" autoComplete="given-name" value={form.fn} onChange={(e) => setForm({ ...form, fn: e.target.value })} /></div>
                        <div className="field"><label htmlFor="ll-em">Email</label><input id="ll-em" type="email" autoComplete="email" required value={form.em} onChange={(e) => setForm({ ...form, em: e.target.value })} /></div>
                        <input ref={hp} className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />
                        <button className="btn" disabled={sending}>{sending ? 'Sending…' : 'Send it'}</button>
                      </form>
                    </>
                  )}
                  {status && <p className={`status${status.ok ? '' : ' bad'}`} role="status" style={{ marginTop: '.8rem' }}>{status.msg}</p>}
                  <p style={{ marginTop: '1.4rem', fontFamily: 'var(--display)', fontSize: '.75rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--dim)' }}>Awareness creates choice · Choice creates change</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
