// CCM Growth Compass: questions, scoring and result profiles (ported from the approved prototype).
export const C = { plum: '#88326f', deep: '#4a1a3d', amber: '#fca927', orange: '#f7862a', sky: '#8dd8f7', lime: '#9ecb3c', rose: '#b0578f' };

export type Need = 'bench' | 'stretch' | 'team' | 'direction' | 'systems' | 'scale';
export const NEEDS: Need[] = ['bench', 'stretch', 'team', 'direction', 'systems', 'scale'];
export const NEED_LABEL: Record<Need, string> = { bench: 'Bench', stretch: 'Stretch', team: 'Team', direction: 'Direction', systems: 'Systems', scale: 'Scale' };
export const NEED_COLOR: Record<Need, string> = { bench: C.plum, stretch: C.amber, team: C.rose, direction: C.lime, systems: C.sky, scale: C.orange };

export interface Result {
  name: string; slug: string; color: string; light: boolean; means: string;
  svc: string; svcTag: string; url: string; why: string;
}
export const RESULTS: Record<Need, Result> = {
  bench: { name: 'The Bench Builder', slug: 'bench-builder', color: C.plum, light: false,
    means: 'Your future depends on growing the next layer of leaders, and the bench is thinner than it should be.',
    svc: 'Leadership Development', svcTag: 'leadership-development', url: 'https://www.cummingscm.com/leadership-development',
    why: 'It builds leadership skill at every level, from first-time supervisors to executives, with assessment-based development plans. Work of Leaders is a strong starting point.' },
  stretch: { name: 'The Leader in Motion', slug: 'leader-in-motion', color: C.amber, light: true,
    means: 'You or a key leader are stretching into bigger demands, and support now pays off fast.',
    svc: 'Coaching for Success', svcTag: 'coaching-for-success', url: 'https://www.cummingscm.com/coaching-for-success',
    why: 'One-on-one and transition coaching gives a leader a thinking partner and a plan for the new role. Agile EQ is a useful first step.' },
  team: { name: 'The Untapped Team', slug: 'untapped-team', color: C.deep, light: false,
    means: 'The talent is there, but how the team communicates, trusts and handles conflict is holding it back.',
    svc: 'Assessments and Team Development', svcTag: 'assessments', url: 'https://www.cummingscm.com/assessments',
    why: 'The Five Behaviors, Everything DiSC and Productive Conflict give the team a shared language, and a facilitated session turns friction into working agreements.' },
  direction: { name: 'The Crossroads Navigator', slug: 'crossroads-navigator', color: C.lime, light: true,
    means: 'Big choices are ahead, and people are not yet pulling in one direction.',
    svc: 'Facilitation', svcTag: 'facilitation', url: 'https://www.cummingscm.com/facilitation',
    why: 'An expert-led strategic planning or change session turns discussion into decisions and a plan your team owns.' },
  systems: { name: 'The System Builder', slug: 'system-builder', color: C.sky, light: true,
    means: 'You have grown or changed faster than your structure, roles and performance systems.',
    svc: 'Business Consulting', svcTag: 'business-consulting', url: 'https://www.cummingscm.com/business-consulting',
    why: 'Practical strategy, organizational design and performance management align the organization to its goals.' },
  scale: { name: 'The Multiplier', slug: 'multiplier', color: C.orange, light: true,
    means: 'You want learning to reach more people without relying on outside trainers every time.',
    svc: 'Train-the-Trainer', svcTag: 'train-the-trainer', url: 'https://www.cummingscm.com/train-the-trainer',
    why: 'It equips internal trainers with the skills, standards and certification to deliver with confidence.' },
};

type Pts = Partial<Record<Need, number>>;
export interface ChoiceQ { id: string; field: string; key: string; t: string; h?: string; o: [string, Pts, string, string?][]; type?: undefined }
export interface RateQ { id: string; type: 'rate'; t: string; h?: string; items: [string, Need][] }
export interface TextQ { id: string; type: 'text'; field: string; key: string; t: string; h?: string }
export type Question = ChoiceQ | RateQ | TextQ;

export const QUESTIONS: Question[] = [
  { id: 'focus', field: 'Compass Focus', key: 'compass_focus', t: 'Who are you looking to grow?', h: 'Pick the one that fits best.', o: [
    ['Myself as a leader', { stretch: 3 }, C.amber], ['My team', { team: 3 }, C.rose], ['Leaders across our organization', { bench: 3 }, C.plum],
    ['Our whole organization', { systems: 2, direction: 1 }, C.sky], ['Our trainers or L&D team', { scale: 3 }, C.orange]] },
  { id: 'org', field: 'Organization Type', key: 'organization_type', t: 'What kind of organization are you with?', h: 'This helps us share relevant examples.', o: [
    ['Federal, state or local government', {}, C.plum, 'government'], ['Corporation or enterprise', {}, C.sky, 'corporate'],
    ['Nonprofit or mission-driven', {}, C.lime, 'nonprofit'], ['Small or mid-size business', {}, C.amber, 'smb']] },
  { id: 'situation', field: 'Current Situation', key: 'current_situation', t: 'Which sounds most like right now?', o: [
    ['Someone just stepped into a bigger role', { stretch: 2, bench: 1 }, C.amber], ["We're growing fast", { bench: 2, systems: 1 }, C.plum],
    ["We're going through change or a reorganization", { direction: 2, stretch: 1 }, C.lime], ['Things are steady, but we feel stuck', { team: 2, systems: 1 }, C.rose],
    ["We're planning for next year", { direction: 2, systems: 1 }, C.sky]] },
  { id: 'challenge', field: 'Biggest Challenge', key: 'biggest_challenge', t: "What's the biggest thing getting in the way?", h: 'Choose the one that costs you the most.', o: [
    ["Leaders aren't ready for what's next", { bench: 4 }, C.plum], ['Communication and conflict', { team: 4 }, C.rose],
    ['Low trust or accountability', { team: 3, stretch: 1 }, C.rose], ['Unclear direction or priorities', { direction: 4 }, C.lime],
    ['Inconsistent processes or performance', { systems: 4 }, C.sky], ["Training doesn't stick or scale", { scale: 4 }, C.orange]] },
  { id: 'temp', type: 'rate', t: 'Quick temperature check', h: 'How true is each statement today?', items: [
    ['We disagree openly and productively', 'team'], ['Everyone knows our top three priorities', 'direction'], ['Our managers lead people well', 'bench'],
    ['Roles and processes are clear', 'systems'], ['We can train our own people well', 'scale'], ['I feel equipped for what my role demands', 'stretch']] },
  { id: 'goal', field: '12-Month Goal', key: '12month_goal', t: 'A year from now, what would success look like?', o: [
    ['Leaders ready to step up', { bench: 3 }, C.plum], ['A team that truly works together', { team: 3 }, C.rose], ['A clear plan everyone owns', { direction: 3 }, C.lime],
    ['Systems that support performance', { systems: 3 }, C.sky], ['An in-house training capability', { scale: 3 }, C.orange], ['Me thriving in my role', { stretch: 3 }, C.amber]] },
  { id: 'format', field: 'Delivery Preference', key: 'delivery_preference', t: 'How do you prefer to learn?', h: 'We deliver all three.', o: [
    ['Virtual', {}, C.sky], ['On-site', {}, C.plum], ['Blended', {}, C.lime], ['Not sure yet', {}, C.amber]] },
  { id: 'size', field: 'Group Size', key: 'group_size', t: 'How many people would be involved?', o: [
    ['Just me', { stretch: 1 }, C.amber], ['2 to 10', {}, C.lime], ['11 to 50', {}, C.sky], ['51 to 250', {}, C.plum], ['More than 250', {}, C.rose]] },
  { id: 'when', field: 'Start Timeline', key: 'start_timeline', t: 'When would you like to start?', o: [
    ['In the next 30 days', {}, C.orange], ['This quarter', {}, C.amber], ['In the next 6 months', {}, C.lime], ['Just exploring', {}, C.sky]] },
  { id: 'notes', type: 'text', field: 'Compass Notes', key: 'compass_notes', t: "Anything you'd like us to know?", h: 'Optional. A sentence or two about your situation helps us prepare.' },
];

export const RATE = ['Not yet', 'Sometimes', 'Absolutely'];

export interface CompassState { ans: Record<string, number>; rate: Partial<Record<Need, number>>; notes: string }

export function score(st: CompassState) {
  const s = Object.fromEntries(NEEDS.map((k) => [k, 0])) as Record<Need, number>;
  QUESTIONS.forEach((q) => {
    if (!q.type && st.ans[q.id] !== undefined) {
      const pts = (q as ChoiceQ).o[st.ans[q.id]][1];
      (Object.keys(pts) as Need[]).forEach((k) => (s[k] += pts[k] || 0));
    }
  });
  (Object.keys(st.rate) as Need[]).forEach((k) => (s[k] += st.rate[k] === 0 ? 2 : st.rate[k] === 1 ? 1 : 0));
  const q4 = (QUESTIONS[3] as ChoiceQ).o[st.ans.challenge ?? 0], q6 = (QUESTIONS[5] as ChoiceQ).o[st.ans.goal ?? 0];
  const pref = [(Object.keys(q4[1]) as Need[]).sort((a, b) => (q4[1][b] || 0) - (q4[1][a] || 0))[0], (Object.keys(q6[1]) as Need[])[0]];
  const order = NEEDS.slice().sort((a, b) => {
    if (s[b] !== s[a]) return s[b] - s[a];
    const pa = pref.indexOf(a), pb = pref.indexOf(b);
    return (pa < 0 ? 9 : pa) - (pb < 0 ? 9 : pb);
  });
  const top = order[0];
  const second = s[order[1]] >= 0.7 * s[top] ? order[1] : null;
  const when = st.ans.when, size = st.ans.size, gov = st.ans.org === 0;
  const temp = when === 3 ? 'Nurture' : when <= 1 && (size >= 2 || gov) ? 'Hot' : when <= 2 ? 'Warm' : 'Nurture';
  const starter = st.ans.focus === 0 || temp === 'Nurture';
  return { s, top, second, temp: temp as 'Hot' | 'Warm' | 'Nurture', starter };
}
