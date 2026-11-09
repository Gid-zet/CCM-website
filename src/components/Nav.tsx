import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useVelocity } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Magnetic, Pinwheel, onAnchor } from './ui';

const LINKS = [
  ['services', 'Services'], ['grit', 'GRIT'], ['assessments', 'Assessments'], ['compass', 'Growth Compass'], ['lens', 'Leadership Lens'], ['insights', 'Insights'],
] as const;

/** The nav pinwheel spins like a real one: the faster you scroll, the faster it turns. */
function WindPinwheel() {
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const rot = useMotionValue(0);
  useAnimationFrame((_, dt) => {
    const v = Math.min(Math.abs(vel.get()), 6000);
    rot.set((rot.get() + (0.012 + v * 0.00012) * dt) % 360);
  });
  return <Pinwheel rotate={rot} className="brand-mark" />;
}

export function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    LINKS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <header className="nav">
        <motion.div className="nav-in glass" initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <a className="brand" href="#top" onClick={onAnchor} aria-label="Cummings Consulting & Management, back to top">
            <WindPinwheel />
            <span><b>Cummings</b><small>Consulting &amp; Management</small></span>
          </a>
          <nav aria-label="Primary">
            <ul>{LINKS.map(([id, l]) => <li key={id}><a href={`#${id}`} onClick={onAnchor} className={active === id ? 'on' : ''}>{l}</a></li>)}</ul>
          </nav>
          <div className="nav-cta">
            <Magnetic><a className="btn sm" href="#contact" onClick={onAnchor}>Book a strategy call <span className="arr" aria-hidden="true">→</span></a></Magnetic>
            <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><span /></button>
          </div>
        </motion.div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav className="menu" aria-label="Mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[...LINKS, ['contact', 'Book a call'] as const].map(([id, l], i) => (
              <motion.a key={id} href={`#${id}`} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}
                onClick={(e) => { setOpen(false); onAnchor(e); }}>{l}</motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
