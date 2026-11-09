import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import { GRIT } from '../data/content';
import { Magnetic, Reveal, SplitWords, Tilt, onAnchor } from './ui';

function Letter({ i, p, l, still }: { i: number; p: MotionValue<number>; l: (typeof GRIT.letters)[number]; still: boolean }) {
  const s = 0.08 + i * 0.12;
  const y = useTransform(p, [s, s + 0.2], [i % 2 ? -260 : 260, 0]);
  const rot = useTransform(p, [s, s + 0.2], [i % 2 ? 25 : -25, 0]);
  const op = useTransform(p, [s, s + 0.14], [0, 1]);
  const blur = useTransform(p, [s, s + 0.2], ['blur(18px)', 'blur(0px)']);
  const wordOp = useTransform(p, [s + 0.18, s + 0.3], [0, 1]);
  const wordY = useTransform(p, [s + 0.18, s + 0.3], [16, 0]);
  return (
    <motion.div className="gl" style={{ ['--c' as string]: l.c }}>
      <motion.b style={still ? undefined : { y, rotate: rot, opacity: op, filter: blur }}>{l.l}</motion.b>
      <motion.span style={still ? undefined : { opacity: wordOp, y: wordY }}>{l.w}</motion.span>
    </motion.div>
  );
}

const WHY = [
  ['Transformation, not training', 'A developmental journey with coaching, a capstone and measured impact.'],
  ['Built around your work', 'Scenarios, roles and language from your organization, not generic examples.'],
  ['Certified tools, one partner', 'Authorized Everything DiSC® and Five Behaviors® Partner. We assess, coach and measure.'],
  ['A certified diverse supplier', 'WOSB, MBE and SDB certified, supporting supplier-diversity and small-business goals.'],
];

export function Grit() {
  const pinRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  const scale = useTransform(p, [0.7, 1], [1, 0.82]);
  const tagOp = useTransform(p, [0.62, 0.75], [0, 1]);
  const topOp = useTransform(p, [0, 0.08], [0, 1]);
  const [prog, setProg] = useState(3);
  const progs = [...GRIT.programs];
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: lp } = useScroll({ target: lineRef, offset: ['start 85%', 'start 35%'] });

  return (
    <section id="grit" className="grit">
      <div ref={pinRef} className={reduce ? '' : 'grit-pin-wrap'}>
        <div className="grit-pin">
          <motion.div className="grit-top" style={{ opacity: reduce ? 1 : topOp }}>
            <span className="kicker">Chapter three · Signature program</span>
            <h2>The GRIT Leadership Series<sup style={{ fontSize: '.45em', verticalAlign: 'super' }}>™</sup></h2>
          </motion.div>
          <motion.div className="grit-letters" style={{ scale: reduce ? 1 : scale }}>
            {GRIT.letters.map((l, i) => <Letter key={l.l} i={i} p={p} l={l} still={!!reduce} />)}
          </motion.div>
          <motion.p className="grit-tag" style={{ opacity: reduce ? 1 : tagOp }}>
            Lasting leadership change takes intentional development, resilience, accountability and the resolve to turn learning into measurable action. GRIT is a developmental journey, not another training program.
          </motion.p>
        </div>
      </div>

      <div className="wrap block" style={{ paddingTop: 0 }}>
        <div className="sec-head">
          <span className="kicker">The GRIT framework</span>
          <h2 className="h2"><SplitWords text="Four stages that build on each other" /></h2>
          <p className="lede">Every GRIT program moves leaders through all four stages, at the depth their role requires. Stage four is where learning becomes results.</p>
        </div>
        <div className="stages" ref={lineRef}>
          <motion.span className="stage-line" style={{ scaleX: reduce ? 1 : lp }} aria-hidden="true" />
          {GRIT.stages.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <Tilt className={`glass spot stage-card${i === 3 ? ' final' : ''}`} style={{ ['--c' as string]: s.c, height: '100%' }}>
                <span className="n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="programs">
          <div>
            <span className="kicker">The GRIT programs</span>
            <h3 className="h2" style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', margin: '1rem 0 2rem' }}>A program for every level of leadership</h3>
            <div className="stairs" role="group" aria-label="GRIT programs">
              {progs.map((g, i) => (
                <motion.button key={g.t} className="stair glass" aria-pressed={prog === i} onClick={() => setProg(i)}
                  style={{ height: `${g.h}%`, background: `linear-gradient(180deg, rgba(255,255,255,${0.05 + i * 0.03}), color-mix(in srgb, var(--plum) ${30 + i * 18}%, transparent))` }}
                  initial={reduce ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6 }}>
                  <h4>{g.t}</h4><small>{g.d}</small>
                </motion.button>
              ))}
            </div>
          </div>
          <div className="prog-detail">
            <motion.div key={prog} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="glass" style={{ padding: '1.8rem' }}>
              <span className="label">GRIT {progs[prog].t}</span>
              <p className="big">{progs[prog].t}</p>
              <p className="lede" style={{ marginTop: '.6rem' }}>Built for <b style={{ color: 'var(--text)' }}>{progs[prog].d.toLowerCase()}</b>, moving through Lead Self, Lead Others, Lead Organizations and a Transform &amp; Sustain capstone at the depth the role requires.</p>
            </motion.div>
            <div className="glass women">
              <h4>GRIT Women</h4>
              <p>For women advancing into greater responsibility.</p>
              <Magnetic><a className="btn sm" href="#contact" onClick={onAnchor}>Ask about a cohort <span className="arr">→</span></a></Magnetic>
            </div>
          </div>
        </div>

        <div className="sec-head" style={{ marginTop: 'clamp(5rem,9vw,7rem)', marginBottom: 0 }}>
          <span className="kicker">How it works</span>
          <h2 className="h2" style={{ fontSize: 'clamp(1.9rem,4vw,3rem)' }}>From first conversation to <em>measured results</em></h2>
        </div>
        <div className="steps6">
          {GRIT.steps.map((s, i) => (
            <Reveal key={s.t} className="step6" delay={i * 0.08}>
              <i>0{i + 1}</i><h4>{s.t}</h4><p>{s.d}</p>
            </Reveal>
          ))}
        </div>

        <div className="why4">
          {WHY.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}><div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.5rem', height: '100%' }}>
              <b style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '2.2rem', color: 'var(--amber)', lineHeight: 1 }}>{i + 1}</b>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{t}</h4><p style={{ color: 'var(--muted)', fontSize: '.95rem' }}>{d}</p>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
