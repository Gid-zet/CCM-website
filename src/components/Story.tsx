import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import { CHALLENGES, CLIENTS } from '../data/content';

export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <div className="marquee" aria-label="Clients">
      <div className="wrap marquee-row">
        <span className="marquee-label">Trusted by</span>
        <div className="marquee-mask">
          <motion.div className="marquee-track" animate={reduce ? undefined : { x: ['0%', '-50%'] }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}>
            {row.map((c, i) => <span key={i} aria-hidden={i >= CLIENTS.length}>{c}</span>)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DeckCard({ i, p, c }: { i: number; p: MotionValue<number>; c: (typeof CHALLENGES)[number] }) {
  const n = CHALLENGES.length;
  const start = i / n, end = (i + 1) / n;
  // Each card slides up into place during its slice of the scroll, then shrinks back as the next one lands on top.
  const y = useTransform(p, [start - 0.18, start], i === 0 ? ['0%', '0%'] : ['115%', '0%']);
  const scale = useTransform(p, [end - 0.05, end + 0.2], [1, i === n - 1 ? 1 : 0.9]);
  const dim = useTransform(p, [end - 0.05, end + 0.2], [1, i === n - 1 ? 1 : 0.45]);
  const rot = useTransform(p, [start - 0.18, start], i === 0 ? [0, 0] : [6, 0]);
  return (
    <motion.article className="deck-card glass" style={{ y, scale, opacity: dim, rotate: rot, zIndex: i, ['--c' as string]: c.c, ['--i' as string]: i }}>
      <span className="bar" /><span className="blob" />
      <span className="num" style={{ color: c.c }}>0{i + 1}</span>
      <h3>{c.t}</h3>
      <p>{c.d}</p>
    </motion.article>
  );
}

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setIdx(Math.min(CHALLENGES.length - 1, Math.max(0, Math.floor(v * CHALLENGES.length)))));

  const answer = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);

  if (reduce) {
    return (
      <section id="story" className="block wrap">
        <div className="sec-head"><span className="kicker">Chapter one · The challenge</span><h2 className="h2">What today's organizations ask of their leaders</h2></div>
        <div style={{ display: 'grid', gap: '1rem' }}>{CHALLENGES.map((c) => <article key={c.t} className="glass" style={{ padding: '1.6rem' }}><h3>{c.t}</h3><p className="lede">{c.d}</p></article>)}</div>
      </section>
    );
  }

  return (
    <section id="story" ref={ref} className="story tint" aria-label="The challenge">
      <div className="story-pin">
        <div className="wrap story-grid">
          <div>
            <span className="kicker">Chapter one · The challenge</span>
            <h2 className="h2" style={{ marginTop: '1rem' }}>What today's organizations ask of their <em>leaders</em></h2>
            <div className="story-count" aria-hidden="true">
              <motion.span key={idx} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'inline-block', color: CHALLENGES[idx].c }}>0{idx + 1}</motion.span>
              <small>/ 0{CHALLENGES.length}</small>
            </div>
            <div className="story-dots" aria-hidden="true">{CHALLENGES.map((c, i) => <i key={i} className={i <= idx ? 'on' : ''} style={{ ['--c' as string]: c.c }} />)}</div>
            <motion.p className="story-answer" style={{ opacity: answer }}>
              Sound familiar? That's exactly where <b>CCM</b> comes in.
            </motion.p>
          </div>
          <div className="deck">{CHALLENGES.map((c, i) => <DeckCard key={c.t} i={i} p={scrollYProgress} c={c} />)}</div>
        </div>
      </div>
    </section>
  );
}
