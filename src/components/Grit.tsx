import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { GRIT } from '../data/content';
import { Magnetic, Pinwheel, Reveal, onAnchor } from './ui';

const MILESTONES = ['Start', 'Assess', 'Design', 'Launch', 'Learn', 'Coach', 'Sustain', 'Transform'];

const MEASURE = [
  ['Level 1', 'Experience', 'Session evaluations: was it relevant and useful?'],
  ['Level 2', 'Learning', 'Before-and-after self and 360 ratings.'],
  ['Level 3', 'Application', 'Manager check-ins and capstone evidence of skills used on the job.'],
  ['Level 4', 'Results', 'Business measures agreed with your sponsor, such as retention or promotion readiness.'],
];

const WHY = [
  ['Transformation, not training', 'A developmental journey with coaching, a capstone and measured impact.'],
  ['Built around your work', 'Scenarios, roles and language from your organization, not generic examples.'],
  ['Certified tools, one partner', 'Authorized Everything DiSC® and Five Behaviors® Partner. We assess, coach and measure.'],
  ['A certified diverse supplier', 'WOSB, MBE and SDB certified, supporting supplier-diversity and small-business goals.'],
];

function useIsNarrow() {
  const [n, setN] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches);
  useEffect(() => {
    const m = window.matchMedia('(max-width: 760px)');
    const f = () => setN(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return n;
}

function Stop({ n, title, kicker, children, wide }: { n?: string; title: ReactNode; kicker?: string; children?: ReactNode; wide?: boolean }) {
  return (
    <article className={`jp${wide ? ' wide' : ''}`}>
      <motion.div className="jp-in" initial={{ opacity: 0, y: 40, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ amount: 0.45 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        {n && <span className="jp-n">{n}</span>}
        {kicker && <span className="kicker">{kicker}</span>}
        <h3 className="jp-t">{title}</h3>
        {children}
      </motion.div>
    </article>
  );
}

function Panels() {
  const [prog, setProg] = useState(3);
  return (
    <>
      <article className="jp intro">
        <div className="jp-in">
          <span className="kicker">Chapter three · The GRIT Leadership Series™</span>
          <div className="grit-letters">
            {GRIT.letters.map((l, i) => (
              <motion.div key={l.l} className="gl" style={{ ['--c' as string]: l.c }} initial={{ opacity: 0, y: i % 2 ? -80 : 80, rotate: i % 2 ? 12 : -12 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ amount: 0.3 }} transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                <b>{l.l}</b><span>{l.w}</span>
              </motion.div>
            ))}
          </div>
          <p className="grit-tag">A leadership journey, not another training program. Scroll to travel it.</p>
          <span className="jp-go" aria-hidden="true">Scroll to begin the journey <i>→</i></span>
        </div>
      </article>

      <Stop n="01" kicker="Assess" title={<>Start with a clear <em>picture</em></>}>
        <p>Every leader gets an honest starting point.</p>
        <div className="jp-chips">
          <a href="#assessments" onClick={onAnchor} className="jp-chip" style={{ ['--c' as string]: '#fca927' }}>Everything DiSC®</a>
          <a href="#assessments" onClick={onAnchor} className="jp-chip" style={{ ['--c' as string]: '#9ecb3c' }}>The Five Behaviors®</a>
          <span className="jp-chip" style={{ ['--c' as string]: '#8dd8f7' }}>360 assessment</span>
        </div>
      </Stop>

      <Stop n="02" kicker="Design" title={<>Built around <em>your</em> leaders</>}>
        <p>Pick the level that fits. Tap one.</p>
        <div className="mini-stairs" role="group" aria-label="GRIT programs">
          {GRIT.programs.map((g, i) => (
            <button key={g.t} aria-pressed={prog === i} onClick={() => setProg(i)} style={{ height: `${g.h}%` }}>
              <b>{g.t}</b>
            </button>
          ))}
        </div>
        <p className="jp-note"><strong>{GRIT.programs[prog].t}</strong> · {GRIT.programs[prog].d}</p>
      </Stop>

      <Stop n="03" kicker="Launch" title={<>Kick off with <em>purpose</em></>}>
        <p>Sponsors open it. A peer cohort forms that learns together and holds each other accountable.</p>
      </Stop>

      <Stop n="04" kicker="Learn" title={<>Four stages that <em>build</em></>} wide>
        <p>Practice on real challenges, one stage at a time.</p>
        <div className="jp-stages">
          {GRIT.stages.map((s, i) => (
            <motion.div key={s.n} className="jp-stage" style={{ ['--c' as string]: s.c }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.5 }} transition={{ delay: 0.15 + i * 0.12 }}>
              <span>{s.n}</span><b>{s.t}</b>
            </motion.div>
          ))}
        </div>
      </Stop>

      <Stop n="05" kicker="Coach" title={<>Learning that <em>keeps moving</em></>}>
        <p>Coaching between sessions turns insight into habit.</p>
        <div className="jp-bubbles" aria-hidden="true">
          <span>"What will you try this week?"</span><span>"What got in the way?"</span><span>"What did you notice?"</span>
        </div>
      </Stop>

      <Stop n="06" kicker="Sustain" title={<>A capstone and <em>measured</em> results</>} wide>
        <p>A capstone on real work, measured all the way to business results.</p>
        <div className="jp-levels">
          {MEASURE.map(([l, t, d], i) => (
            <motion.div key={l} className="jp-level" initial={{ opacity: 0, scaleY: 0.4 }} whileInView={{ opacity: 1, scaleY: 1 }} viewport={{ amount: 0.5 }} transition={{ delay: 0.1 + i * 0.12 }} style={{ ['--h' as string]: `${55 + i * 15}%` }}>
              <small>{l}</small><b>{t}</b>
            </motion.div>
          ))}
        </div>
      </Stop>

      <article className="jp finale">
        <motion.div className="jp-in" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: 0.45 }} transition={{ duration: 0.8 }}>
          <div className="finale-mark"><Pinwheel /></div>
          <span className="kicker">Destination</span>
          <h3 className="jp-t">Transformation.</h3>
          <p>One partner, every step of the way.</p>
          <Magnetic><a className="btn" href="#contact" onClick={onAnchor}>Bring GRIT to your leaders <span className="arr">→</span></a></Magnetic>
        </motion.div>
      </article>
    </>
  );
}

export function Grit() {
  const reduce = useReducedMotion();
  const narrow = useIsNarrow();
  const horizontal = !reduce && !narrow;
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.0005 });
  const x = useTransform(smooth, (v) => -v * dist);
  const travelerLeft = useTransform(smooth, (v) => `${v * 100}%`);
  const travelerRot = useTransform(smooth, (v) => v * 1440);
  const [stop, setStop] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStop(Math.round(v * (MILESTONES.length - 1))));

  useLayoutEffect(() => {
    if (!horizontal) return;
    const measure = () => { if (track.current) setDist(track.current.scrollWidth - window.innerWidth); };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    addEventListener('resize', measure);
    return () => { ro.disconnect(); removeEventListener('resize', measure); };
  }, [horizontal]);

  return (
    <section id="grit" className="grit dark">
      {horizontal ? (
        <div ref={wrap} className="journey-wrap" style={{ height: `calc(100vh + ${dist}px)` }}>
          <div className="journey-pin">
            <motion.div ref={track} className="journey-track" style={{ x }}><Panels /></motion.div>
            <div className="road" aria-hidden="true">
              <div className="road-line"><motion.i style={{ scaleX: smooth }} /></div>
              {MILESTONES.map((m, i) => (
                <span key={m} className={`ms${i <= stop ? ' on' : ''}`} style={{ left: `${(i / (MILESTONES.length - 1)) * 100}%` }}><i /><b>{m}</b></span>
              ))}
              <motion.span className="traveler" style={{ left: travelerLeft }}><motion.span style={{ rotate: travelerRot, display: 'block' }}><Pinwheel /></motion.span></motion.span>
            </div>
          </div>
        </div>
      ) : (
        <div className="journey-vertical wrap"><Panels /></div>
      )}

    </section>
  );
}
