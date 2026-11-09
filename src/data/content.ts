export const CLIENTS = ['NASA', 'Boeing', 'BMW', 'Honda', 'Comcast', 'CDC', 'USDA NASS', 'Igloo', 'JBT Marel'];

export const SERVICES = [
  { k: 'ld', name: 'Leadership Development', c: '#88326f', fg: '#fff', desc: 'Build leadership capability at every level, from first-time supervisors to senior executives.',
    items: ['Foundational leadership training', 'Advanced leadership competencies', 'Specialized leadership programs', 'Assessment and development planning'], url: 'https://www.cummingscm.com/leadership-development' },
  { k: 'coach', name: 'Coaching for Success', c: '#fca927', fg: '#2c0f24', desc: 'Personalized coaching that helps leaders and teams perform, adapt and grow through change.',
    items: ['One-on-one executive coaching', 'Team coaching', 'Transition coaching', 'Specialized coaching areas'], url: 'https://www.cummingscm.com/coaching-for-success' },
  { k: 'fac', name: 'Facilitation', c: '#9ecb3c', fg: '#2c0f24', desc: 'Expert-led sessions that turn discussion into decisions and plans your team owns.',
    items: ['Strategic planning sessions', 'Problem-solving workshops', 'Change management facilitation', 'Team building sessions'], url: 'https://www.cummingscm.com/facilitation' },
  { k: 'cons', name: 'Business Consulting', c: '#8dd8f7', fg: '#2c0f24', desc: 'Practical strategy, structure and performance systems that align your organization to its goals.',
    items: ['Strategic planning', 'Organizational design', 'Performance management', 'Change management'], url: 'https://www.cummingscm.com/business-consulting' },
  { k: 'ttt', name: 'Train-the-Trainer', c: '#f7862a', fg: '#2c0f24', desc: 'Equip your internal trainers with the skills, standards and certification to deliver with confidence.',
    items: ['Skill-building for every training role', 'Industry-ready certification and standards', 'Facilitation mastery for teams and leaders', 'Backed by 30+ years of expertise'], url: 'https://www.cummingscm.com/train-the-trainer' },
  { k: 'assess', name: 'Assessments', c: '#b0578f', fg: '#fff', desc: 'Validated tools that give leaders and teams a shared language for how they work together.',
    items: ['Everything DiSC® and Agile EQ™', 'Work of Leaders', 'Productive Conflict', 'The Five Behaviors® team development'], url: 'https://www.cummingscm.com/assessments' },
];

export const CHALLENGES = [
  { t: 'Experts become managers overnight', d: 'Top performers are promoted into leading people, often without a structured bridge into the role.', c: '#88326f' },
  { t: 'The leadership bench is thin', d: 'Retirements and turnover put institutional knowledge and the next generation of leaders at risk.', c: '#fca927' },
  { t: "Change doesn't slow down", d: 'New technology, restructuring and shifting priorities demand resilient leaders who can bring people with them.', c: '#8dd8f7' },
  { t: "Training doesn't stick", d: 'One-off workshops fade within weeks when there is no coaching, practice or accountability behind them.', c: '#9ecb3c' },
];

export const STATS = [
  { n: 20000, suf: '+', l: 'Professionals trained', s: 'Leadership, coaching and team effectiveness', c: '#fca927' },
  { n: 98, suf: '%', l: 'Positive evaluations', s: 'From participants across our programs', c: '#9ecb3c' },
  { n: 30, suf: '+', l: 'Years of experience', s: 'Developing leaders in every sector', c: '#8dd8f7' },
  { n: 15, suf: '+', l: 'Industries served', s: 'Federal agencies to global manufacturers', c: '#d56bb4' },
];

export const QUOTES = [
  { o: 'Boeing Leadership Development', r: 'Participant', q: 'Outstanding facilitators! Theresa and Karimah Steward were simply outstanding.', c: '#88326f', fg: '#fff' },
  { o: 'NASA', r: 'Participant', q: 'The instructor was superlative. Well thought out and effective presentation skills all tied together to maximize effectiveness.', c: '#fca927', fg: '#2c0f24' },
  { o: 'Boeing Leadership Development', r: 'Participant', q: 'The facilitator was fantastic and enthusiastic. It made for a memorable learning experience.', c: '#8dd8f7', fg: '#2c0f24' },
  { o: 'Department of Agriculture', r: 'Participant', q: 'Very inclusive, interactive… insightful and useful.', c: '#9ecb3c', fg: '#2c0f24' },
];

export const JOURNEY = [
  { t: 'Assess', d: 'We start with your goals and use assessments where they help, so we know where your people are today.', c: '#b8479a' },
  { t: 'Design', d: 'We build the program around your people, culture and calendar. Nothing comes off a shelf.', c: '#fca927' },
  { t: 'Deliver', d: 'Facilitated sessions, workshops and coaching, in the format that suits your team.', c: '#8dd8f7' },
  { t: 'Sustain', d: 'Follow-up coaching and check-ins so the learning shows up in everyday work.', c: '#9ecb3c' },
];

export const FORMATS = [
  { k: 'virtual', t: 'Virtual', c: '#8dd8f7', d: 'Live, interactive sessions on Zoom or Teams for distributed teams.',
    items: ['Breakouts, polls and real practice, never a lecture', 'Sessions sized for attention, from 60 to 180 minutes', 'Easy to bring in people across time zones'] },
  { k: 'onsite', t: 'On-site', c: '#fca927', d: 'Facilitators in the room with your people, at your location or an offsite.',
    items: ['High-energy, hands-on workshops', 'Real conversations on your real challenges', 'Ideal for leadership retreats and team launches'] },
  { k: 'blended', t: 'Blended', c: '#9ecb3c', d: 'A kickoff in person, live virtual sessions, and coaching in between.',
    items: ['Kickoff workshop to build momentum', 'Live virtual sessions over 8 to 12 weeks', '1:1 coaching and progress check-ins'] },
];

export const GRIT = {
  letters: [
    { l: 'G', w: 'Great', c: '#fca927' },
    { l: 'R', w: 'Resolve', c: '#d56bb4' },
    { l: 'I', w: 'Instills', c: '#8dd8f7' },
    { l: 'T', w: 'Transformation', c: '#9ecb3c' },
  ],
  stages: [
    { n: '01', t: 'Lead Self', d: 'Self-awareness, emotional intelligence and resilience.', c: '#d56bb4' },
    { n: '02', t: 'Lead Others', d: 'Communication, coaching, influence and accountability.', c: '#fca927' },
    { n: '03', t: 'Lead Organizations', d: 'Strategic thinking, change, innovation and execution.', c: '#8dd8f7' },
    { n: '04', t: 'Transform & Sustain', d: 'A capstone, applied on the job, with measurable impact.', c: '#9ecb3c' },
  ],
  programs: [
    { t: 'Foundations', d: 'Emerging leaders and high-potentials', h: 40 },
    { t: 'Elevate', d: 'New and middle managers', h: 58 },
    { t: 'Advanced', d: 'Senior and experienced leaders', h: 76 },
    { t: 'Executive', d: 'C-suite and enterprise executives', h: 100 },
  ],
  steps: [
    { t: 'Assess', d: 'Listen to leaders and sponsors. Run DiSC® and 360 diagnostics.' },
    { t: 'Design', d: 'Align the program to your goals, roles and real work.' },
    { t: 'Launch', d: 'Kick off with sponsors so leaders know why it matters.' },
    { t: 'Learn', d: 'Facilitated sessions with practice on live challenges.' },
    { t: 'Coach', d: 'Coaching keeps learning moving between sessions.' },
    { t: 'Sustain', d: 'A capstone on real work, and measured results.' },
  ],
};

export const LINKS = {
  linkedin: 'https://www.linkedin.com/company/69708207/',
  instagram: 'https://www.instagram.com/cummingscmllc/',
  facebook: 'https://www.facebook.com/profile.php?id=100067385511487',
  capability: 'https://www.cummingscm.com/capability-statement',
  blog: 'https://www.cummingscm.com/blog-3-1',
};
