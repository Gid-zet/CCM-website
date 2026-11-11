import { AnimatePresence, motion } from 'framer-motion';
import { Component, Suspense, lazy, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { LENSES, ORDER, PLAY, SCENARIOS, SOURCES, type LensKey, type ScenarioKey } from '../data/lens';
import { submitLead } from '../lib/ghl';
import { track } from '../lib/analytics';
import { REGIONS, type Region } from './brainData';
import { Magnetic, burst } from './ui';

const Brain3D = lazy(() => import('./Brain3D'));

/** If WebGL is unavailable, keep the rest of the experience working. */
class BrainBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? <div className="brain-canvas brain-loading">3D isn't available on this device, but the story still plays out beside it.</div> : this.props.children; }
}

type Screen = 'intro' | 'source' | 'lens' | 'moment' | 'brain' | 'choice' | 'result' | 'save';

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export function LeadershipLens() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [src, setSrc] = useState(0);
  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [scenario, setScenario] = useState<ScenarioKey>('missed');
  const [bStep, setBStep] = useState(0);
  const [path, setPath] = useState<'auto' | 'pause'>('pause');
  const [region, setRegion] = useState<Region | null>(null);
  const [form, setForm] = useState({ fn: '', em: '' });
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [sending, setSending] = useState(false);
  const hp = useRef<HTMLInputElement>(null);
  const [idle, setIdle] = useState(0);
  const attract = screen === 'intro' || screen === 'source' || screen === 'lens' || screen === 'moment' || screen === 'save';
  useEffect(() => {
    if (!attract) return;
    const t = setInterval(() => setIdle((i) => (i + 1) % 9), screen === 'intro' ? 1700 : 2800);
    return () => clearInterval(t);
  }, [attract, screen]);

  const sc = useMemo(() => {
    const s = Object.fromEntries(ORDER.map((k) => [k, 0])) as Record<LensKey, number>;
    SOURCES.forEach((x) => x.chips.forEach(([t, k]) => { if ((picked[x.id] || []).includes(t)) s[k]++; }));
    return s;
  }, [picked]);
  const top = ORDER.slice().sort((a, b) => sc[b] - sc[a])[0];
  const total = Object.values(picked).reduce((n, a) => n + a.length, 0);
  const L = LENSES[top];
  const scn = SCENARIOS.find((s) => s.id === scenario)!;
  const P = PLAY[top][scenario];

  const toggle = (id: string, t: string) => setPicked((p) => {
    const a = [...(p[id] || [])]; const i = a.indexOf(t); i >= 0 ? a.splice(i, 1) : a.push(t);
    return { ...p, [id]: a };
  });

  const MOMENTS = [
    { t: 'Something happens.', say: scn.label, c: '#d56bb4' },
    { t: 'Your lens reads it.', say: `Through the eyes of ${L.name.replace('The ', 'the ')}.`, c: '#8dd8f7' },
    { t: 'Old memories join in.', say: 'Similar moments from your past add their weight.', c: '#9ecb3c' },
    { t: 'A story forms.', say: `“${P[0]}”`, c: '#d56bb4', q: true },
    { t: 'Your alarm fires.', say: `${L.emotion}.`, c: '#fca927' },
    { t: 'Your body wants to react.', say: `${L.urge}.`, c: '#ff7a70' },
  ];

  const startOver = () => { setPicked({}); setSrc(0); setBStep(0); setStatus(null); setScreen('intro'); };

  const summary = () => ['MY LEADERSHIP LENS', `Primary lens: ${L.name}`, '', L.desc, '',
    `How it serves me: ${L.gift}`, `Watch out for: ${L.blind}`, `A belief to try on: ${L.reframe}`, '',
    `Moment: ${scn.label}`, `My story: "${P[0]}"`, `On autopilot: ${P[1]}`, `With a pause: ${P[4]}`, '', 'Awareness creates choice. Choice creates change.'].join('\n');

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.em.trim())) { setStatus({ ok: false, msg: 'Enter an email like name@company.com.' }); return; }
    setSending(true);
    const out = await submitLead({
      type: 'lens', contact: { firstName: form.fn.trim(), email: form.em.trim() },
      tags: ['leadership-lens-completed', `lens-${L.short.toLowerCase()}`, 'interest-eq-masterclass'],
      note: summary(), consent: { email: true }, website: hp.current?.value,
    });
    setSending(false);
    setStatus(out.ok ? { ok: true, msg: `✓ Sent to ${form.em.trim()}.` } : { ok: false, msg: out.error || 'Something went wrong. Please try again.' });
    if (out.ok) { const b = (e.target as HTMLElement).getBoundingClientRect(); burst(b.left + b.width / 2, b.top, 30); }
  };

  const brainStep = attract ? idle : screen === 'brain' ? bStep : screen === 'choice' ? 6 : path === 'auto' ? 7 : 8;
  const srcNow = SOURCES[src];
  const dots = (n: number, at: number) => <div className="lz-dots" aria-hidden="true">{Array.from({ length: n }, (_, i) => <i key={i} className={i <= at ? 'on' : ''} />)}</div>;

  return (
    <section id="lens" className="block lens-sec dark lz-sec">
      <div className="wrap">
        <div className="sec-head center">
          <span className="kicker">Free · 2-minute test</span>
          <h2 className="h2">What's your <span className="grad-text">Leadership Lens</span>?</h2>
          <p className="lede">Your past quietly shapes how you lead. Find your lens, then watch it play out inside your brain.</p>
        </div>

        <div className="lz with-brain">
          {(
            <motion.div className="brain-stage lz-brain" initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              {screen === 'intro' && (
                <div className="lz-floaters" aria-hidden="true">
                  {(['pfc', 'amygdala', 'hippocampus', 'thalamus'] as Region[]).map((r, i) => (
                    <motion.span key={r} className={`lz-float f${i}`} style={{ ['--c' as string]: REGIONS[r].color }}
                      animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}>
                      <i />{REGIONS[r].name} <small>{REGIONS[r].role}</small>
                    </motion.span>
                  ))}
                </div>
              )}
              <BrainBoundary>
                <Suspense fallback={<div className="brain-canvas brain-loading">Loading…</div>}>
                  <Brain3D step={brainStep} selected={region} onSelect={(r) => setRegion(r === region ? null : r)} />
                </Suspense>
              </BrainBoundary>
              <AnimatePresence>
                {region && (
                  <motion.div className="brain-info" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onClick={() => setRegion(null)}>
                    <b style={{ color: REGIONS[region].color }}>{REGIONS[region].name}</b><p>{REGIONS[region].info}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {!region && <p className="brain-hint">Drag to turn · tap a glowing spot</p>}
            </motion.div>
          )}

          <div className="lz-card">
            <AnimatePresence mode="wait">
              {screen === 'intro' && (
                <motion.div key="intro" {...fade} className="lz-screen">
                  <span className="lz-step">Which one are you?</span>
                  <h3>Six lenses. <em>One is yours.</em></h3>
                  <div className="lz-teasers" aria-hidden="true">
                    {ORDER.map((k, i) => (
                      <motion.span key={k} style={{ ['--c' as string]: LENSES[k].color }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }}>
                        {LENSES[k].short}
                      </motion.span>
                    ))}
                  </div>
                  <p>Your family, your experiences and the places you've worked built a lens you lead through every day. Find yours, then see what it does to your brain under pressure.</p>
                  <div className="lz-meta"><span>⏱ 2 minutes</span><span>👆 Just tap</span><span>🧠 See it in 3D</span></div>
                  <Magnetic><button className="btn lz-cta" onClick={() => { track('Lens Started'); setScreen('source'); }}>Take the test <span className="arr">→</span></button></Magnetic>
                </motion.div>
              )}

              {screen === 'source' && (
                <motion.div key={`src-${src}`} {...fade} className="lz-screen">
                  {dots(SOURCES.length, src)}
                  <span className="lz-step">{src + 1} of {SOURCES.length}</span>
                  <h3>{srcNow.title}</h3>
                  <p>Tap anything that feels true for you.</p>
                  <div className="lz-chips">
                    {srcNow.chips.map(([t]) => (
                      <motion.button key={t} whileTap={{ scale: 0.95 }} className="lchip" style={{ ['--c' as string]: srcNow.c }} aria-pressed={(picked[srcNow.id] || []).includes(t)} onClick={() => toggle(srcNow.id, t)}>{t}</motion.button>
                    ))}
                  </div>
                  <div className="lz-nav">
                    <button className="linkbtn" onClick={() => (src ? setSrc(src - 1) : setScreen('intro'))}>← Back</button>
                    {src < SOURCES.length - 1
                      ? <button className="btn plum" onClick={() => setSrc(src + 1)}>{(picked[srcNow.id] || []).length ? 'Next' : 'Skip'} <span className="arr">→</span></button>
                      : <button className="btn" disabled={!total} onClick={() => { track('Lens Revealed', { lens: L.short }); setScreen('lens'); }}>Reveal my lens <span className="arr">→</span></button>}
                  </div>
                </motion.div>
              )}

              {screen === 'lens' && (
                <motion.div key="lens" {...fade} className="lz-screen center">
                  <span className="lz-step">Your lens</span>
                  <motion.h3 className="lz-name" style={{ color: L.color }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.1 }}>{L.name}</motion.h3>
                  <p>{L.desc.split('. ')[0]}.</p>
                  <div className="lz-trio">
                    <div><b>Your gift</b>{L.gift}</div>
                    <div><b>Watch out for</b>{L.blind}</div>
                  </div>
                  <button className="btn" onClick={() => setScreen('moment')}>See it in action <span className="arr">→</span></button>
                </motion.div>
              )}

              {screen === 'moment' && (
                <motion.div key="moment" {...fade} className="lz-screen center">
                  <span className="lz-step">Pick a moment</span>
                  <h3>Which of these feels familiar?</h3>
                  <div className="lz-moments">
                    {SCENARIOS.map((s) => (
                      <button key={s.id} onClick={() => { track('Lens Brain Viewed', { moment: s.short }); setScenario(s.id); setBStep(0); setScreen('brain'); }}>{s.label}<span aria-hidden="true">→</span></button>
                    ))}
                  </div>
                </motion.div>
              )}

              {screen === 'brain' && (
                <motion.div key={`b-${bStep}`} {...fade} className="lz-screen">
                  {dots(MOMENTS.length, bStep)}
                  <span className="lz-step" style={{ color: MOMENTS[bStep].c }}>Inside your brain · {bStep + 1} of {MOMENTS.length}</span>
                  <h3>{MOMENTS[bStep].t}</h3>
                  <p className={MOMENTS[bStep].q ? 'lz-quote' : 'lz-say'}>{MOMENTS[bStep].say}</p>
                  <div className="lz-nav">
                    <button className="linkbtn" onClick={() => (bStep ? setBStep(bStep - 1) : setScreen('moment'))}>← Back</button>
                    <button className="btn plum" onClick={() => (bStep < MOMENTS.length - 1 ? setBStep(bStep + 1) : setScreen('choice'))}>Next <span className="arr">→</span></button>
                  </div>
                </motion.div>
              )}

              {screen === 'choice' && (
                <motion.div key="choice" {...fade} className="lz-screen">
                  <span className="lz-step" style={{ color: '#2b9cc9' }}>The pause</span>
                  <h3>Now it's your choice.</h3>
                  <p>A single breath gives your thinking brain time to catch up. What do you do?</p>
                  <div className="lz-choice">
                    <button className="auto" onClick={() => { track('Lens Choice', { choice: 'react' }); setPath('auto'); setScreen('result'); }}>React right away</button>
                    <button className="pause" onClick={() => { track('Lens Choice', { choice: 'pause' }); setPath('pause'); setScreen('result'); }}>Pause first</button>
                  </div>
                </motion.div>
              )}

              {screen === 'result' && (
                <motion.div key={`r-${path}`} {...fade} className="lz-screen">
                  <span className="lz-step" style={{ color: path === 'auto' ? '#c0392b' : '#1f7fa8' }}>{path === 'auto' ? 'On autopilot' : 'With a pause'}</span>
                  <h3>{path === 'auto' ? 'Your alarm takes the wheel.' : 'Your thinking brain leads.'}</h3>
                  <p className="lz-say">{path === 'auto' ? P[1] : P[4]}</p>
                  <p className={`lz-outcome ${path}`}><b>What happens:</b> {path === 'auto' ? P[2] : P[5]}</p>
                  <div className="lz-nav">
                    <button className="linkbtn" onClick={() => setPath(path === 'auto' ? 'pause' : 'auto')}>See the {path === 'auto' ? 'pause' : 'autopilot'} version</button>
                    <button className="btn" onClick={() => setScreen('save')}>Finish <span className="arr">→</span></button>
                  </div>
                </motion.div>
              )}

              {screen === 'save' && (
                <motion.div key="save" {...fade} className="lz-screen center">
                  <span className="lz-step">Your takeaway</span>
                  <h3>You don't respond to events. You respond to <em>your story</em> about them.</h3>
                  <p>A belief to try on: <strong>{L.reframe}</strong></p>
                  <form className="lz-form" onSubmit={save} noValidate>
                    <label className="sr-only" htmlFor="ll-fn">First name</label>
                    <input id="ll-fn" placeholder="First name" autoComplete="given-name" value={form.fn} onChange={(e) => setForm({ ...form, fn: e.target.value })} />
                    <label className="sr-only" htmlFor="ll-em">Email</label>
                    <input id="ll-em" type="email" placeholder="Email" autoComplete="email" required value={form.em} onChange={(e) => setForm({ ...form, em: e.target.value })} />
                    <input ref={hp} className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />
                    <button className="btn" disabled={sending}>{sending ? 'Sending…' : 'Email me my lens'}</button>
                  </form>
                  {status && <p className={`status${status.ok ? '' : ' bad'}`} role="status">{status.msg}</p>}
                  <button className="linkbtn" onClick={startOver}>↺ Start over</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
