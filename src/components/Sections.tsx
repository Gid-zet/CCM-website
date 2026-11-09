import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type PanInfo } from 'framer-motion';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FORMATS, JOURNEY, LINKS, QUOTES, STATS } from '../data/content';
import { BOOKING_URL, EQ_URL, submitLead } from '../lib/ghl';
import { CountUp, Magnetic, Pinwheel, Reveal, SplitWords, Tilt, burst, onAnchor } from './ui';

/* ——— Impact ——— */
export function Impact() {
  return (
    <section className="block impact dark" aria-labelledby="impact-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Our impact</span>
          <h2 id="impact-h" className="h2"><SplitWords text="Three decades of helping leaders and teams do their best work" /></h2>
        </div>
        <div className="impact-row">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <Tilt className="glass spot stat" style={{ ['--c' as string]: s.c, height: '100%' }}>
                <motion.span className="meter" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }} />
                <b><CountUp to={s.n} suffix={s.suf} /></b>
                <span className="l">{s.l}</span><span className="s">{s.s}</span>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— How we work ——— */
function Scene({ k }: { k: string }) {
  if (k === 'virtual') return (
    <div className="vgrid">
      {[['TC', '#fca927', true], ['AR', '#8dd8f7'], ['JM', '#9ecb3c'], ['KS', '#d56bb4'], ['DP', '#f7862a'], ['LW', '#8dd8f7']].map(([n, c, talk], i) => (
        <motion.div key={n as string} className={`tile${talk ? ' talk' : ''}`} style={{ ['--t' as string]: c as string }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}><b>{n as string}</b></motion.div>
      ))}
    </div>
  );
  if (k === 'onsite') return (
    <svg viewBox="0 0 400 260" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <rect x="10" y="10" width="380" height="240" rx="18" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.2)" strokeDasharray="4 6" />
      <rect x="140" y="22" width="120" height="10" rx="4" fill="#fff6fb" />
      <circle cx="200" cy="60" r="12" fill="#fca927" stroke="#fff6fb" strokeWidth="2" />
      {[[100, 140], [200, 170], [300, 140]].map(([x, y], t) => (
        <motion.g key={t} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 * t, type: 'spring' }} style={{ transformOrigin: `${x}px ${y}px` }}>
          <circle cx={x} cy={y} r="34" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.25)" />
          {[0, 1, 2, 3, 4].map((s) => { const a = (s / 5) * Math.PI * 2; return <circle key={s} cx={x + Math.cos(a) * 48} cy={y + Math.sin(a) * 48} r="9" fill={['#d56bb4', '#fca927', '#8dd8f7', '#9ecb3c', '#f7862a'][s]} stroke="#1a0915" strokeWidth="2" />; })}
        </motion.g>
      ))}
    </svg>
  );
  return (
    <div className="gantt">
      {[['Kickoff workshop', 0, 12, '#fca927'], ['Live virtual sessions', 10, 70, '#8dd8f7'], ['1:1 coaching', 25, 70, '#d56bb4'], ['Progress check-ins', 45, 55, '#9ecb3c']].map(([l, x, w, g], i) => (
        <div className="grow" key={l as string}><span>{l as string}</span>
          <span className="gt"><motion.i style={{ left: `${x}%`, width: `${w}%`, ['--g' as string]: g as string }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} /></span>
        </div>
      ))}
    </div>
  );
}

export function HowWeWork() {
  const [f, setF] = useState(0);
  const cur = FORMATS[f];
  const jref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: jref, offset: ['start 85%', 'start 40%'] });
  return (
    <section className="block" aria-labelledby="how-h">
      <div className="wrap">
        <div className="how-grid">
          <div>
            <span className="kicker">How we work</span>
            <h2 id="how-h" className="h2" style={{ margin: '1rem 0' }}>We meet you where you are, <em>literally and strategically</em></h2>
            <p className="lede" style={{ marginBottom: '1.6rem' }}>Pick the format that fits your team. The same facilitators and the same standard, wherever the room is.</p>
            <div className="tabs" role="tablist" aria-label="Delivery format">
              {FORMATS.map((x, i) => (
                <button key={x.k} role="tab" aria-selected={f === i} onClick={() => setF(i)}>
                  {f === i && <motion.span layoutId="fmt-pill" className="pill" style={{ background: x.c }} transition={{ type: 'spring', stiffness: 300, damping: 28 }} />}
                  {x.t}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={cur.k} className="fmt" style={{ ['--c' as string]: cur.c }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h3>{cur.t}</h3><p>{cur.d}</p><ul>{cur.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </motion.div>
            </AnimatePresence>
          </div>
          <Tilt className="glass scene" style={{ ['--c' as string]: cur.c }} max={5}>
            <span className="scene-tag"><i />{cur.k === 'virtual' ? 'Live session' : cur.k === 'onsite' ? 'In the room' : '12-week program'}</span>
            <div className="scene-body"><AnimatePresence mode="wait"><motion.div key={cur.k} style={{ width: '100%' }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}><Scene k={cur.k} /></motion.div></AnimatePresence></div>
          </Tilt>
        </div>
        <ol className="journey" ref={jref}>
          <motion.span className="jline" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
          {JOURNEY.map((j, i) => (
            <Reveal as="li" key={j.t} delay={i * 0.15} style={{ ['--c' as string]: j.c }}>
              <span className="jn">{i + 1}</span><h3>{j.t}</h3><p>{j.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ——— Testimonials (swipe/drag) ——— */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const q = QUOTES[i];
  const go = (n: number) => { setDir(n > i ? 1 : -1); setI((n + QUOTES.length) % QUOTES.length); };
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (reduce || paused) return; const t = setTimeout(() => go(i + 1), 7000); return () => clearTimeout(t); });
  const end = (_: unknown, info: PanInfo) => { if (info.offset.x < -60) go(i + 1); else if (info.offset.x > 60) go(i - 1); };
  return (
    <section className="block tint" aria-labelledby="tq-h">
      <div className="wrap tq">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <span className="kicker">What participants say</span>
          <h2 id="tq-h" className="h2">Rated by the people <em>in the room</em></h2>
          <div className="score">
            <div className="ring">
              <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="3" />
                <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="#88326f" strokeWidth="3" strokeLinecap="round" pathLength={100} initial={{ strokeDasharray: '0 100' }} whileInView={{ strokeDasharray: '98 100' }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} /></svg>
              <b><CountUp to={98} suffix="%" /></b>
            </div>
            <p>of participants rate their CCM experience positively, across more than 20,000 people trained.</p>
          </div>
          <div className="qdots">{QUOTES.map((x, k) => <button key={k} aria-label={`Show testimonial ${k + 1}`} aria-pressed={k === i} style={{ ['--c' as string]: x.c }} onClick={() => go(k)} />)}</div>
        </div>
        <motion.figure className="qcard" style={{ ['--c' as string]: q.c, ['--fg' as string]: q.fg, margin: 0 }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25} onDragEnd={end}
          onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          <div className="qnav2"><span>{i + 1} / {QUOTES.length}</span><button onClick={() => go(i - 1)} aria-label="Previous testimonial">←</button><button onClick={() => go(i + 1)} aria-label="Next testimonial">→</button></div>
          <span className="glyph" aria-hidden="true">“</span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={i} custom={dir} initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', flex: 1 }}>
              <blockquote>{q.q}</blockquote>
              <figcaption><span className="av">{q.o.charAt(0)}</span><span><b>{q.o}</b><small>{q.r}</small></span></figcaption>
            </motion.div>
          </AnimatePresence>
        </motion.figure>
      </div>
    </section>
  );
}

/* ——— Government ——— */
export function Government() {
  return (
    <section id="government" className="block dark" aria-labelledby="gov-h">
      <div className="wrap gov">
        <div>
          <span className="kicker">Government &amp; procurement</span>
          <h2 id="gov-h" className="h2" style={{ marginTop: '1rem' }}>A certified, woman-owned partner for <em>public-sector</em> and enterprise teams</h2>
          <p className="lede" style={{ marginTop: '1rem' }}>CCM is a woman-owned, small disadvantaged business with past performance across federal agencies and Fortune 500 companies.</p>
          <div className="pp">
            <div className="pp-row"><span className="pp-k">Federal</span><span className="pp-v">{['NASA', 'CDC', 'USDA NASS'].map((x) => <span key={x}>{x}</span>)}</span></div>
            <div className="pp-row"><span className="pp-k">Enterprise</span><span className="pp-v">{['Boeing', 'BMW', 'Honda', 'Comcast'].map((x) => <span key={x}>{x}</span>)}</span></div>
          </div>
          <div className="cta-row">
            <Magnetic><a className="btn" href={LINKS.capability} target="_blank" rel="noopener">View capability statement <span className="arr">→</span></a></Magnetic>
            <a className="btn ghost" href="#contact" onClick={onAnchor}>Talk to us about a contract</a>
          </div>
        </div>
        <Tilt max={6}>
          <motion.div className="cap" initial={{ rotate: -3, y: 40, opacity: 0 }} whileInView={{ rotate: -1.2, y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div className="cap-foil" />
            <div className="cap-head"><img src="/ccm-logo.jpg" alt="" width="144" height="48" /><div><b>Cummings Consulting &amp; Management, LLC</b><small>Alpharetta, GA · Capability snapshot</small></div></div>
            <div className="seals">
              {[['WBENC', "Women's Business Enterprise", '#88326f'], ['NMSDC', 'Minority Supplier', '#d68a06'], ['DBE', 'Disadvantaged Business Enterprise', '#2b9cc9']].map(([b, s, c]) => (
                <div className="seal" key={b} style={{ ['--c' as string]: c }}><span className="sr">✓</span><b>{b}</b><small>{s}</small></div>
              ))}
            </div>
            <dl className="cap-facts">
              <div><dt>Business type</dt><dd>Woman-owned small disadvantaged business</dd></div>
              <div><dt>Partner credentials</dt><dd>Everything DiSC® · Five Behaviors® · DDI · InsideOut Coaching</dd></div>
              <div><dt>Delivery</dt><dd>Virtual, on-site and blended, nationwide</dd></div>
            </dl>
          </motion.div>
        </Tilt>
      </div>
    </section>
  );
}

/* ——— Insights + newsletter ——— */
export function Insights() {
  const [f, setF] = useState({ fn: '', em: '' });
  const [st, setSt] = useState<null | { ok: boolean; msg: string }>(null);
  const [busy, setBusy] = useState(false);
  const hp = useRef<HTMLInputElement>(null);
  const sub = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.em.trim())) { setSt({ ok: false, msg: 'Enter an email like name@company.com.' }); return; }
    setBusy(true);
    const r = await submitLead({ type: 'newsletter', contact: { firstName: f.fn.trim(), email: f.em.trim() }, tags: ['newsletter-subscriber'], consent: { email: true }, website: hp.current?.value });
    setBusy(false);
    setSt(r.ok ? { ok: true, msg: `✓ You're in, ${f.fn.trim() || 'friend'}. Watch for Tuesday's read.` } : { ok: false, msg: r.error || 'Something went wrong. Please try again.' });
    if (r.ok) { const b = (e.target as HTMLElement).getBoundingClientRect(); burst(b.left + b.width / 2, b.top + b.height / 2, 30); }
  };
  return (
    <section id="insights" className="block tint" aria-labelledby="ins-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Insights</span>
          <h2 id="ins-h" className="h2"><SplitWords text="Fresh ideas for leaders, every Tuesday and Thursday" /></h2>
        </div>
        <div className="ins">
          <Reveal>
            <Tilt max={4} className="glass spot" style={{ borderRadius: 28, height: '100%' }}>
              <a className="feat" href={LINKS.blog} target="_blank" rel="noopener" style={{ borderRadius: 28 }}>
                <div className="cover" aria-hidden="true">
                  {[0, 1, 2].map((k) => <motion.i key={k} style={{ width: `${8 + k * 7}rem`, height: `${8 + k * 7}rem` }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 5, delay: k * 0.6, repeat: Infinity }} />)}
                  <b>II</b>
                </div>
                <div className="feat-body">
                  <span className="feat-meta"><em>Featured</em> From the CCM blog</span>
                  <h3>The Power of the Pause</h3>
                  <p style={{ color: 'var(--muted)' }}>The space between what you feel and what you do is where leadership happens. One idea to try with your team this week.</p>
                  <span className="go">Read on the blog →</span>
                </div>
              </a>
            </Tilt>
          </Reveal>
          <Reveal delay={0.1}>
            <form className="glass news" onSubmit={sub} noValidate style={{ height: '100%' }}>
              <span className="label" style={{ color: 'rgba(26,9,21,.7)', marginBottom: 0 }}>Newsletter</span>
              <h3>Get it in your inbox</h3>
              <p>Practical leadership and team-effectiveness ideas, plus first notice of upcoming masterclasses.</p>
              <div className="form">
                <div className="field"><label htmlFor="nl-fn">First name</label><input id="nl-fn" autoComplete="given-name" value={f.fn} onChange={(e) => setF({ ...f, fn: e.target.value })} /></div>
                <div className="field"><label htmlFor="nl-em">Work email</label><input id="nl-em" type="email" required autoComplete="email" value={f.em} onChange={(e) => setF({ ...f, em: e.target.value })} /></div>
                <input ref={hp} className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />
                <div className="field full"><button className="btn" disabled={busy}>{busy ? 'Subscribing…' : 'Subscribe'}</button></div>
              </div>
              {st && <p className={`status${st.ok ? '' : ' bad'}`} role="status">{st.msg}</p>}
              <ul className="perks"><li>Two short reads a week</li><li>Early access to masterclasses</li><li>Unsubscribe any time</li></ul>
              <a href={EQ_URL} target="_blank" rel="noopener" style={{ fontWeight: 700 }}>Explore the EQ Masterclass →</a>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ——— Contact + booking ——— */
export function Contact() {
  const [tab, setTab] = useState<'msg' | 'book'>('msg');
  const [f, setF] = useState({ fn: '', ln: '', em: '', ph: '', org: '', msg: '', ce: true });
  const [st, setSt] = useState<null | { ok: boolean; msg: string }>(null);
  const [busy, setBusy] = useState(false);
  const hp = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const sub = async (e: FormEvent) => {
    e.preventDefault();
    if (!f.fn.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.em.trim())) { setSt({ ok: false, msg: 'Please add your first name and a valid email.' }); return; }
    setBusy(true);
    const r = await submitLead({
      type: 'contact', contact: { firstName: f.fn.trim(), lastName: f.ln.trim(), email: f.em.trim(), phone: f.ph.trim(), companyName: f.org.trim() },
      tags: ['contact-form'], note: f.msg.trim() ? `Website message:\n${f.msg.trim()}` : undefined, consent: { email: f.ce }, website: hp.current?.value,
    });
    setBusy(false);
    setSt(r.ok ? { ok: true, msg: "✓ Thank you. We'll be in touch within one business day." } : { ok: false, msg: r.error || 'Something went wrong. Please try again or book a time.' });
    if (r.ok) { const b = (e.target as HTMLElement).getBoundingClientRect(); burst(b.left + b.width / 2, b.top + 40, 40); }
  };
  return (
    <section id="contact" ref={ref} className="block closing" aria-labelledby="ct-h">
      <motion.div className="close-mark" style={{ rotate: rot }} aria-hidden="true"><Pinwheel /></motion.div>
      <div className="wrap close-grid">
        <div>
          <span className="kicker">Let's talk</span>
          <h2 id="ct-h" className="h2" style={{ margin: '1rem 0' }}>Ready to strengthen your leaders and <em>teams?</em></h2>
          <p style={{ fontSize: '1.15rem', maxWidth: '34rem' }}>Book a 30-minute strategy call or send us a note. We'll talk through your goals and recommend the right mix of training, coaching and facilitation.</p>
          <ol className="call-steps">
            <li><b>1. We listen</b><span>Your goals, your people, your timeline</span></li>
            <li><b>2. We recommend</b><span>The right mix for your team</span></li>
            <li><b>3. You decide</b><span>No pressure and no obligation</span></li>
          </ol>
        </div>
        <div className="glass contact-card">
          <div className="contact-tabs" role="tablist" aria-label="Contact options">
            <button role="tab" aria-selected={tab === 'msg'} onClick={() => setTab('msg')}>Send a message</button>
            <button role="tab" aria-selected={tab === 'book'} onClick={() => setTab('book')}>Book a time</button>
          </div>
          {tab === 'book' ? (
            <>
              <iframe className="booking-frame" src={BOOKING_URL} title="Book a strategy call with CCM" loading="lazy" />
              <p className="fine" style={{ marginTop: '.6rem' }}>Trouble loading? <a href={BOOKING_URL} target="_blank" rel="noopener">Open the booking page</a>.</p>
            </>
          ) : (
            <form className="form" onSubmit={sub} noValidate>
              <div className="field"><label htmlFor="ct-fn">First name</label><input id="ct-fn" autoComplete="given-name" required value={f.fn} onChange={(e) => setF({ ...f, fn: e.target.value })} /></div>
              <div className="field"><label htmlFor="ct-ln">Last name</label><input id="ct-ln" autoComplete="family-name" value={f.ln} onChange={(e) => setF({ ...f, ln: e.target.value })} /></div>
              <div className="field"><label htmlFor="ct-em">Work email</label><input id="ct-em" type="email" autoComplete="email" required value={f.em} onChange={(e) => setF({ ...f, em: e.target.value })} /></div>
              <div className="field"><label htmlFor="ct-ph">Phone <small>(optional)</small></label><input id="ct-ph" type="tel" autoComplete="tel" value={f.ph} onChange={(e) => setF({ ...f, ph: e.target.value })} /></div>
              <div className="field full"><label htmlFor="ct-org">Organization <small>(optional)</small></label><input id="ct-org" autoComplete="organization" value={f.org} onChange={(e) => setF({ ...f, org: e.target.value })} /></div>
              <div className="field full"><label htmlFor="ct-msg">How can we help?</label><textarea id="ct-msg" maxLength={2000} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} placeholder="Tell us about your team and what you'd like to change." /></div>
              <input ref={hp} className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />
              <label className="check"><input type="checkbox" checked={f.ce} onChange={(e) => setF({ ...f, ce: e.target.checked })} /> Email me leadership insights from CCM.</label>
              <div className="field full"><button className="btn dark" disabled={busy} style={{ justifyContent: 'center' }}>{busy ? 'Sending…' : <>Send message <span className="arr">→</span></>}</button></div>
              {st && <p className={`status${st.ok ? '' : ' bad'}`} role="status" style={{ gridColumn: '1 / -1' }}>{st.msg}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ——— Footer ——— */
export function Footer() {
  return (
    <footer className="foot dark">
      <div className="wrap">
        <Reveal><p className="foot-big">We embrace<br /><em className="grad-text">learning.</em></p></Reveal>
        <div className="foot-grid">
          <div>
            <span className="foot-logo"><img src="/ccm-logo.jpg" alt="Cummings Consulting & Management" width="156" height="52" /></span>
            <p style={{ color: 'var(--muted)', marginTop: '1rem', maxWidth: '20rem' }}>Creating solutions for your business, starting with your team. Alpharetta, Georgia.</p>
          </div>
          <div><h4>Explore</h4><ul>{[['services', 'Services'], ['grit', 'GRIT Leadership Series'], ['assessments', 'Everything DiSC® & Five Behaviors®'], ['government', 'Government']].map(([h, l]) => <li key={h}><a href={`#${h}`} onClick={onAnchor}>{l}</a></li>)}</ul></div>
          <div><h4>Tools</h4><ul>{[['compass', 'Growth Compass'], ['lens', 'Leadership Lens'], ['insights', 'Newsletter']].map(([h, l]) => <li key={h}><a href={`#${h}`} onClick={onAnchor}>{l}</a></li>)}<li><a href={EQ_URL} target="_blank" rel="noopener">EQ Masterclass</a></li></ul></div>
          <div><h4>Connect</h4><ul><li><a href={BOOKING_URL} target="_blank" rel="noopener">Book a strategy call</a></li><li><a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn</a></li><li><a href={LINKS.instagram} target="_blank" rel="noopener">Instagram</a></li><li><a href={LINKS.facebook} target="_blank" rel="noopener">Facebook</a></li></ul></div>
        </div>
        <div className="foot-bottom"><span>© {new Date().getFullYear()} Cummings Consulting &amp; Management, LLC. All rights reserved.</span><a href="#top" onClick={onAnchor}>Back to top ↑</a></div>
      </div>
      <div className="stripe"><i /><i /><i /><i /></div>
    </footer>
  );
}
