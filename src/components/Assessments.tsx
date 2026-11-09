import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Reveal, SplitWords, onAnchor } from './ui';

type Q = 'D' | 'i' | 'S' | 'C';
const DISC: Record<Q, { name: string; c: string; words: string; motive: string; priorities: string[]; angle: number }> = {
  D: { name: 'Dominance', c: '#f7862a', words: 'Direct, firm, results-oriented, strong-willed', motive: 'Motivated by winning, competition and success.', priorities: ['Results', 'Action', 'Challenge'], angle: 225 },
  i: { name: 'Influence', c: '#fca927', words: 'Outgoing, enthusiastic, optimistic, lively', motive: 'Motivated by social recognition, group activities and relationships.', priorities: ['Enthusiasm', 'Action', 'Collaboration'], angle: 315 },
  S: { name: 'Steadiness', c: '#9ecb3c', words: 'Even-tempered, accommodating, patient, humble', motive: 'Motivated by cooperation, opportunities to help and sincere appreciation.', priorities: ['Support', 'Stability', 'Collaboration'], angle: 45 },
  C: { name: 'Conscientiousness', c: '#3f9fd0', words: 'Analytical, reserved, precise, systematic', motive: 'Motivated by opportunities to gain knowledge, show expertise and produce quality work.', priorities: ['Accuracy', 'Stability', 'Challenge'], angle: 135 },
};

const APPS = [
  { k: 'agile-eq', t: 'Agile EQ™', tag: 'Develop the emotional intelligence necessary to build a thriving agile culture.',
    d: 'Trains learners to read the interpersonal and emotional demands of a situation and respond appropriately, fusing DiSC® insights with active emotional intelligence development.',
    f: ['Discovering your DiSC style', 'Recognizing your EQ potential', 'Understanding your EQ strengths', 'Committing to strategies for building agility'], pdf: 'https://www.cummingscm.com/s/Sample-DiSC-Agile-EQ-Profile-1.pdf' },
  { k: 'workplace', t: 'Workplace', tag: 'Engage every individual in building more effective relationships at work.',
    d: 'Helps all employees, regardless of rank or title, understand themselves and others and appreciate the values, priorities and preferences each person brings.',
    f: ['Discovering your DiSC® style', 'Understanding the styles of others', 'Building more effective relationships', 'People-Reading and Comparison Reports (optional)'], pdf: 'https://www.cummingscm.com/s/Sample-DiSC-Workplace-Report-2.pdf' },
  { k: 'management', t: 'Management', tag: 'Teach managers to successfully engage, motivate, and develop their people.',
    d: 'Managers learn how their style shapes problem-solving, time management and decisions, and leave with concrete strategies to adapt to each direct report.',
    f: ['Your DiSC management style', 'Directing and delegating', 'Motivating and developing others', 'Working with your manager'], pdf: 'https://www.cummingscm.com/s/Sample-DiSC-Management-Profile-1.pdf' },
  { k: 'productive-conflict', t: 'Productive Conflict', tag: 'Harness the power of conflict by transforming destructive behavior into productive responses.',
    d: 'Combines cognitive behavioral science with DiSC® insights so people curb harmful reactions and turn disagreement into better relationships and outcomes.',
    f: ['Understanding self and others in conflict', 'Recognizing destructive behaviors', 'Redirecting them into productive responses'], pdf: 'https://www.cummingscm.com/s/Sample-DiSC-Productive-Conflict-Profile-1.pdf' },
  { k: 'work-of-leaders', t: 'Work of Leaders®', tag: 'Create impactful leaders through the process of vision, alignment, and execution.',
    d: 'Connects leadership styles to real-world demands, built on research with 300 experts across more than 150 organizations.',
    f: ['Crafting a vision', 'Building alignment', 'Championing execution', 'Seeing how your tendencies help and hinder'], pdf: 'https://www.cummingscm.com/s/Sample-DiSC-Work-of-Leaders-Profile-1.pdf' },
  { k: 'sales', t: 'Sales', tag: 'Build customer-centric interactions that improve outcomes.',
    d: 'Sales-specific insights, tactics and action plans that help salespeople read and adapt to each customer.',
    f: ['Recognizing customer buying styles', 'Understanding your DiSC® style', 'Adapting your approach to each buyer'], pdf: 'https://www.cummingscm.com/s/Sample-DiSC-Sales-Profile-1.pdf' },
];

const FIVE = [
  { t: 'Results', c: '#fca927', d: 'The team focuses on collective results, not individual status or ego.' },
  { t: 'Accountability', c: '#f7862a', d: "Teammates hold one another to high standards and call out each other's performance and behaviors." },
  { t: 'Commitment', c: '#9ecb3c', d: 'Members buy in to clear decisions, even when they initially disagreed.' },
  { t: 'Conflict', c: '#3f9fd0', d: 'People engage in unfiltered, constructive debate around ideas.' },
  { t: 'Trust', c: '#88326f', d: 'Members are vulnerable with one another and comfortable admitting mistakes, weaknesses and needs for help.' },
];

/* DiSC circle geometry */
const R = 150, CX = 170, CY = 170;
const arc = (a0: number, a1: number) => {
  const p = (a: number) => [CX + R * Math.cos((a * Math.PI) / 180), CY + R * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${CX},${CY} L${x0},${y0} A${R},${R} 0 0 1 ${x1},${y1} Z`;
};
const QUAD: Record<Q, [number, number]> = { D: [180, 270], i: [270, 360], S: [0, 90], C: [90, 180] };

export function Assessments() {
  const [q, setQ] = useState<Q>('D');
  const [layer, setLayer] = useState(4);

  return (
    <section id="assessments" className="block assess">
      <div className="wrap">
        <div className="sec-head center">
          <span className="kicker">Chapter four · Assessments</span>
          <h2 className="h2"><SplitWords text="A common language at" /> <em>every level</em></h2>
          <p className="lede">CCM is an authorized Everything DiSC® and The Five Behaviors® Partner. We run, debrief and follow through on every assessment.</p>
        </div>

        {/* ——— Everything DiSC ——— */}
        <div className="disc">
          <Reveal className="disc-map">
            <svg viewBox="0 0 340 340" role="img" aria-label="The Everything DiSC model: Dominance, Influence, Steadiness and Conscientiousness">
              {(Object.keys(DISC) as Q[]).map((k) => (
                <motion.path key={k} d={arc(...QUAD[k])} fill={DISC[k].c} stroke="#fff" strokeWidth="4" style={{ cursor: 'pointer', transformOrigin: `${CX}px ${CY}px` }}
                  animate={{ scale: q === k ? 1.05 : 1, opacity: q === k ? 1 : 0.6 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  onClick={() => setQ(k)} onMouseEnter={() => setQ(k)} tabIndex={0} role="button" aria-label={DISC[k].name} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setQ(k)} />
              ))}
              <circle cx={CX} cy={CY} r="44" fill="#fff" />
              {(Object.keys(DISC) as Q[]).map((k) => {
                const ang = (DISC[k].angle * Math.PI) / 180;
                return <text key={k} x={CX + 98 * Math.cos(ang)} y={CY + 98 * Math.sin(ang) + 14} textAnchor="middle" className="disc-letter" pointerEvents="none">{k}</text>;
              })}
              <text x={CX} y={CY + 7} textAnchor="middle" className="disc-mid">DiSC®</text>
            </svg>
          </Reveal>
          <div className="disc-side">
            <span className="label">Everything DiSC® · tap a style</span>
            <AnimatePresence mode="wait">
              <motion.div key={q} className="disc-card" style={{ ['--c' as string]: DISC[q].c }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <b className="disc-big">{q}</b>
                <div><h4>{DISC[q].name}</h4><p className="disc-words">{DISC[q].words}</p><p>{DISC[q].motive}</p></div>
              </motion.div>
            </AnimatePresence>
            <p className="disc-note">Four styles, one shared language. Everyone has a blend, and knowing yours makes every conversation easier.</p>
          </div>
        </div>

        <div className="apps-grid">
          {APPS.map((x, i) => (
            <Reveal key={x.k} delay={i * 0.05}>
              <a className="app-tile" href={x.pdf} target="_blank" rel="noopener">
                <b>{x.t}</b><span>{x.tag}</span><small>View sample ↗</small>
              </a>
            </Reveal>
          ))}
        </div>

        {/* ——— The Five Behaviors ——— */}
        <div className="five">
          <div className="five-copy">
            <span className="label">The Five Behaviors®</span>
            <h3 className="sub-h">Build a truly cohesive team</h3>
            <p className="lede">Each behavior is the foundation for the next. Tap a layer.</p>
            <AnimatePresence mode="wait">
              <motion.div key={layer} className="five-card" style={{ ['--c' as string]: FIVE[layer].c }} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <b>{FIVE[layer].t}</b><p>{FIVE[layer].d}</p>
              </motion.div>
            </AnimatePresence>
            <p className="disc-note">For individuals on any team (up to 30) or intact teams of 5–12. <a href="#contact" onClick={onAnchor}>Ask which fits →</a></p>
          </div>
          <div className="pyramid">
            <svg viewBox="0 0 400 352" role="img" aria-label="The Five Behaviors pyramid: Trust at the base, then Conflict, Commitment, Accountability and Results at the top">
              {FIVE.map((f, i) => {
                const top = i * 72, bot = top + 64;
                const half = (y: number) => 46 + (y / 352) * 146;
                const d = `M${200 - half(top)},${top} H${200 + half(top)} L${200 + half(bot)},${bot} H${200 - half(bot)} Z`;
                const fromBottom = 4 - i;
                return (
                  <motion.g key={f.t} style={{ cursor: 'pointer' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ delay: 0.15 + fromBottom * 0.18, type: 'spring', stiffness: 120, damping: 14 }} onClick={() => setLayer(i)} onMouseEnter={() => setLayer(i)}
                    tabIndex={0} role="button" aria-label={f.t} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLayer(i)}>
                    <motion.path d={d} fill={f.c} animate={{ opacity: layer === i ? 1 : 0.72 }} stroke={layer === i ? '#241a21' : 'transparent'} strokeWidth="3" />
                    <text x="200" y={top + 40} textAnchor="middle" className="pyr-t" fill={i === 4 ? '#fff' : '#241a21'}>{f.t}</text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
