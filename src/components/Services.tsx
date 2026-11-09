import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SERVICES } from '../data/content';
import { Reveal, SplitWords, Tilt, onAnchor } from './ui';

export function Services() {
  const [open, setOpen] = useState<string | null>(null);
  const svc = SERVICES.find((s) => s.k === open);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [open]);

  return (
    <section id="services" className="block">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Chapter two · What we do</span>
          <h2 className="h2"><SplitWords text="Solutions for your business, starting with your team" /></h2>
          <p className="lede">Every engagement is built around your goals and your people, delivered virtually, on-site or as a blend of both. Tap a service to look closer.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06}>
              <Tilt className="glass spot" style={{ borderRadius: 28, height: '100%' }}>
                <motion.button layoutId={`svc-${s.k}`} className="svc" style={{ ['--c' as string]: s.c, background: 'transparent', width: '100%', height: '100%' }} onClick={() => setOpen(s.k)} aria-haspopup="dialog">
                  <span className="glow" aria-hidden="true" />
                  <span className="ico" aria-hidden="true"><i /></span>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <span className="more">See what's included <span aria-hidden="true">→</span></span>
                </motion.button>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {svc && (
          <motion.div className="svc-modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div layoutId={`svc-${svc.k}`} className="svc-modal" role="dialog" aria-modal="true" aria-label={svc.name}
              style={{ ['--c' as string]: svc.c, ['--fg' as string]: svc.fg }} onClick={(e) => e.stopPropagation()}>
              <button className="x" onClick={() => setOpen(null)} aria-label="Close" autoFocus>✕</button>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <span className="kicker" style={{ color: 'inherit' }}>Service</span>
                <h3>{svc.name}</h3>
                <p>{svc.desc}</p>
                <ul>{svc.items.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="acts">
                  <a className="btn" href="#contact" onClick={(e) => { setOpen(null); onAnchor(e); }}>Book a strategy call <span className="arr">→</span></a>
                  <a className="btn ghost" href={svc.url} target="_blank" rel="noopener">Explore {svc.name}</a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
