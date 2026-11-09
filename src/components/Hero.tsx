import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { CountUp, Magnetic, Pinwheel, burst, onAnchor } from './ui';

const LINES = ['Developing people.', 'Strengthening organizations.', 'Elevating performance.'];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Scroll story: as you leave the hero the pinwheel opens its petals, turns, and drifts — the first "chapter break".
  const spread = useTransform(scrollYProgress, [0, 1], [0, 26]);
  const turn = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const stageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Pointer depth
  const px = useMotionValue(0), py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 20 }), sy = useSpring(py, { stiffness: 80, damping: 20 });
  const tiltX = useTransform(sy, (v) => v * -12), tiltY = useTransform(sx, (v) => v * 12);
  const cardAx = useTransform(sx, (v) => v * -26), cardAy = useTransform(sy, (v) => v * -26);
  const cardBx = useTransform(sx, (v) => v * 34), cardBy = useTransform(sy, (v) => v * 34);

  // Fun: click the pinwheel to "blow" on it
  const [spins, setSpins] = useState(0);
  const blow = (e: React.MouseEvent) => { setSpins((s) => s + 1); burst(e.clientX, e.clientY, 24); };

  return (
    <section id="top" ref={ref} className="hero"
      onPointerMove={(e) => { if (reduce || e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); px.set((e.clientX - r.left) / r.width - 0.5); py.set((e.clientY - r.top) / r.height - 0.5); }}>
      <div className="aurora" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="wrap hero-grid">
        <motion.div style={{ y: reduce ? 0 : copyY, opacity: fade }}>
          <motion.span className="kicker" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>We embrace learning</motion.span>
          <h1 className="h1">
            {LINES.map((l, i) => (
              <span className="ln" key={l}>
                <motion.span initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.35 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  className={i === 2 ? 'grad-text' : undefined}>{i === 1 ? <>Strengthening <em>organizations.</em></> : l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9 }}>
            Leadership development, executive coaching and facilitation for government agencies, global corporations and mission-driven organizations, backed by 30+ years in the room with leaders.
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.9 }}>
            <Magnetic><a className="btn" href="#compass" onClick={onAnchor}>Take the free Growth Compass <span className="arr" aria-hidden="true">→</span></a></Magnetic>
            <Magnetic><a className="btn ghost" href="#contact" onClick={onAnchor}>Book a strategy call</a></Magnetic>
          </motion.div>
          <motion.div className="chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }}>
            {['WBENC', 'WOMEN-OWNED', 'NMSDC', 'DBE', 'EVERYTHING DiSC® PARTNER', 'DDI', 'INSIDEOUT'].map((c) => <span key={c}>{c}</span>)}
          </motion.div>
        </motion.div>

        <motion.div className="stage" style={{ y: reduce ? 0 : stageY }}>
          <motion.div style={{ position: 'absolute', inset: 0, rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
            <motion.div className="orbit" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}><i style={{ background: '#fca927', color: '#fca927' }} /></motion.div>
            <motion.div className="orbit o2" animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}><i style={{ background: '#8dd8f7', color: '#8dd8f7' }} /></motion.div>
            <motion.div className="orbit o3" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}><i style={{ background: '#9ecb3c', color: '#9ecb3c' }} /></motion.div>
            <button className="core" onClick={blow} aria-label="Spin the CCM pinwheel" data-cursor="big">
              <span className="core-disc glass" />
              <motion.span style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', rotate: turn }}>
                <motion.span style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}
                  initial={reduce ? false : { rotate: -120, scale: 0.4, opacity: 0 }} animate={{ rotate: spins * 720, scale: 1, opacity: 1 }}
                  transition={{ duration: spins ? 1.8 : 1.6, delay: spins ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <Pinwheel spread={spread} />
                </motion.span>
              </motion.span>
            </button>
          </motion.div>
          <motion.div className="float-card glass fc-a" style={{ x: cardAx, y: cardAy }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}>
            <b><CountUp to={20000} suffix="+" /></b><small>professionals trained</small>
          </motion.div>
          <motion.div className="float-card glass fc-b" style={{ x: cardBx, y: cardBy }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.35 }}>
            <b><CountUp to={30} suffix="+ yrs" /></b><small>developing leaders</small>
          </motion.div>
          <motion.div className="float-card glass fc-c" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
            <span className="live" /> Tap the pinwheel
          </motion.div>
        </motion.div>
      </div>
      <motion.div className="scroll-hint" style={{ opacity: fade }} aria-hidden="true"><i />Scroll</motion.div>
    </section>
  );
}
