// My Leadership Lens: lens profiles, lens sources and scenario playbooks (ported from the EQ Masterclass tool).
export type LensKey = 'ach' | 'self' | 'har' | 'vig' | 'cer' | 'con';
export const ORDER: LensKey[] = ['ach', 'self', 'har', 'vig', 'cer', 'con'];

export interface Lens { name: string; short: string; desc: string; gift: string; blind: string; reframe: string; emotion: string; urge: string; color: string }
export const LENSES: Record<LensKey, Lens> = {
  ach: { name: 'The Achiever Lens', short: 'Achiever', color: '#fca927',
    desc: 'You read situations through effort and results. Somewhere along the way you learned that what you produce proves your worth, so you notice quickly when work or commitment falls short.',
    gift: 'Drive, high standards, and follow-through people can count on.',
    blind: "You may read other people's struggles as a lack of commitment, and push past signs of burnout in yourself.",
    reframe: 'My value is in who I help others become, as well as what I deliver.',
    emotion: 'Frustration and impatience', urge: 'Fight: push harder and take control' },
  self: { name: 'The Self-Reliant Lens', short: 'Self-Reliant', color: '#f7862a',
    desc: 'You read situations through the question "Can I count on this?" Experience taught you that relying on others carries risk, so you step in and own outcomes yourself.',
    gift: 'Ownership, resourcefulness, and calm under pressure.',
    blind: 'Under-delegating, carrying too much, and leaving others little room to grow.',
    reframe: 'Trusting others is how I multiply my impact.',
    emotion: 'Irritation with a pull toward resentment', urge: 'Fight: take it back and do it yourself' },
  har: { name: 'The Harmonizer Lens', short: 'Harmonizer', color: '#9ecb3c',
    desc: 'You read situations through the health of the relationship. You learned that conflict costs something, so you are tuned to tension and work to keep the peace.',
    gift: 'Diplomacy, warmth, and a team that feels safe together.',
    blind: 'Delaying hard conversations until small issues become big ones.',
    reframe: 'Clarity is a form of kindness.',
    emotion: 'Anxiety and discomfort', urge: 'Appease: smooth it over' },
  vig: { name: 'The Guardian Lens', short: 'Guardian', color: '#8dd8f7',
    desc: 'You read situations for risk. Being blindsided taught you to watch closely, protect yourself and your people, and trust carefully.',
    gift: 'You anticipate problems early and protect your team.',
    blind: 'Assuming bad intent, or holding back trust that people have already earned.',
    reframe: 'I can stay alert and still lead with openness.',
    emotion: 'Suspicion and unease', urge: 'Flight: protect yourself and pull back' },
  cer: { name: 'The Expert Lens', short: 'Expert', color: '#b0578f',
    desc: 'You read situations through competence. You learned that leaders are expected to have the answer, so not knowing can feel like a threat to your credibility.',
    gift: 'Preparation, sound judgment, and deep expertise.',
    blind: 'Difficulty saying "I don\'t know," and solving problems your team could learn to solve.',
    reframe: 'Great leaders ask great questions, not just give answers.',
    emotion: 'Embarrassment and a sense of threat', urge: 'Fight: defend your position' },
  con: { name: 'The Connector Lens', short: 'Connector', color: '#d56bb4',
    desc: 'You read situations through people and belonging. Feeling seen mattered deeply in your story, so you notice how others feel and care about whether they are okay.',
    gift: 'Empathy, trust, and people who feel valued around you.',
    blind: 'Taking things personally, or softening accountability to protect the relationship.',
    reframe: 'Caring about people includes holding them to high expectations.',
    emotion: 'Hurt and worry', urge: 'Appease: rescue and reassure' },
};

export interface Source { id: string; title: string; hint: string; c: string; chips: [string, LensKey][] }
export const SOURCES: Source[] = [
  { id: 'up', title: 'Upbringing & Family', hint: 'Family values, parenting style, traditions, early messages', c: '#8dd8f7', chips: [
    ['Praise came for achievement', 'ach'], ['Conflict at home meant tension', 'har'], ['Expected to have the right answer', 'cer'],
    ['I learned to fend for myself early', 'self'], ['Close-knit, people-first family', 'con'], ['Home life felt unpredictable', 'vig']] },
  { id: 'life', title: 'Life Experiences', hint: 'Successes, failures, relationships, lessons learned', c: '#d56bb4', chips: [
    ['A mentor who believed in me', 'con'], ['Big wins from outworking others', 'ach'], ['Someone dropped the ball and I paid for it', 'self'],
    ["A layoff or betrayal I didn't see coming", 'vig'], ["Being judged when I didn't know something", 'cer'], ['A conflict that damaged a relationship', 'har']] },
  { id: 'beliefs', title: 'Beliefs & Worldview', hint: 'What you believe about yourself and others', c: '#fca927', chips: [
    ['Hard work equals value', 'ach'], ['If I want it done right, I do it myself', 'self'], ['Leaders should always have the answer', 'cer'],
    ['Conflict should be avoided', 'har'], ['Trust is earned slowly', 'vig'], ['People do their best when they feel valued', 'con']] },
  { id: 'env', title: 'Environment & Culture', hint: 'Community, society, workplace, norms', c: '#9ecb3c', chips: [
    ['Hierarchical, expert-led culture', 'cer'], ['Collaborative, team-based culture', 'con'], ['Fast, results-driven workplace', 'ach'],
    ['Polite culture with little direct feedback', 'har'], ['Frequent reorganizations or politics', 'vig'], ['Lean teams, everyone wears many hats', 'self']] },
  { id: 'mem', title: 'Emotional Memories', hint: 'Positive moments, painful moments, imprints', c: '#f7862a', chips: [
    ['Being blindsided', 'vig'], ['The sting of a heated argument', 'har'], ['Feeling truly seen by a leader', 'con'],
    ['Embarrassment of being wrong in public', 'cer'], ['Pride after a hard-won result', 'ach'], ['Being let down when I counted on someone', 'self']] },
];

export type ScenarioKey = 'missed' | 'challenged' | 'silent';
export const SCENARIOS: { id: ScenarioKey; label: string; short: string }[] = [
  { id: 'missed', short: 'A missed deadline', label: 'A direct report misses a deadline on a project you care about.' },
  { id: 'challenged', short: 'Challenged in public', label: 'Your idea is challenged in front of senior leaders.' },
  { id: 'silent', short: 'A teammate goes quiet', label: 'A usually engaged teammate has gone quiet in meetings.' },
];

/** [story, autopilot behavior, autopilot result, choice, chosen behavior, chosen result] */
export const PLAY: Record<LensKey, Record<ScenarioKey, string[]>> = {
  ach: {
    missed: ["They're not taking this as seriously as I am.", 'You send a sharp message and add daily check-ins.', 'The work gets done, but your report feels micromanaged and stops raising problems early.', 'Get curious before judging the effort.', 'You ask what got in the way and what support would help them land it.', 'You uncover a hidden blocker, fix it together, and gain a report who flags risks early.'],
    challenged: ["If my idea doesn't hold up, my credibility drops.", 'You push harder, pile on data, and talk over the objection.', 'You may win the point, but senior leaders see someone rigid.', 'Treat the challenge as input that can make the idea stronger.', 'You thank them, ask what concern sits behind the question, and adjust.', 'Leaders see confidence and openness, and the idea improves.'],
    silent: ["They've checked out. Their output will slip next.", 'You assign more visible tasks to test their commitment.', 'The pressure deepens their withdrawal.', "Assume there is a reason you can't see yet.", 'You check in privately and ask how they are doing, not how the work is doing.', 'They open up, and you keep a valued contributor.'],
  },
  self: {
    missed: ['I knew I should have done this myself.', 'You take the task back and finish it late at night.', 'The deadline is met, but your report learns nothing and you carry more.', 'Separate this miss from their ability to grow.', 'You agree on a recovery plan with clear checkpoints and let them own it.', 'They build capability, and you get your evenings back.'],
    challenged: ['No one is going to back me up here.', 'You defend the idea alone and stop sharing early drafts.', 'You become the bottleneck for your own ideas.', 'Invite others into the problem.', 'You ask the group to help pressure-test the idea.', 'Shared ownership turns critics into co-authors.'],
    silent: ["I'll just cover their part so the work keeps moving.", 'You quietly absorb their responsibilities.', 'The real issue stays hidden and your workload grows.', 'Name what you notice instead of compensating for it.', "You share what you've observed and ask what would help.", "The issue surfaces early and the team's load stays balanced."],
  },
  har: {
    missed: ['If I bring this up, it will get awkward.', 'You say "no worries" and quietly shift the timeline.', 'The pattern repeats, and your frustration builds where no one can see it.', 'Kindness and clarity can coexist.', 'You name the impact calmly and agree on a new date together.', 'Expectations are clear and the relationship holds.'],
    challenged: ['Disagreement in this room is dangerous.', 'You concede quickly to keep the peace.', "A good idea dies, and leaders don't see your conviction.", 'Healthy debate is not conflict.', 'You acknowledge the concern and explain your reasoning in one clear sentence.', 'You show you can hold a position with respect.'],
    silent: ['Better not to make a big deal of it.', 'You wait and hope it resolves on its own.', 'Distance grows and the teammate feels unnoticed.', 'Checking in is care, not confrontation.', 'You reach out one-on-one with a simple, warm question.', 'They feel seen, and trust grows.'],
  },
  vig: {
    missed: ["Something is going on that I'm not being told.", 'You start documenting and tighten oversight.', 'Your report senses distrust and becomes guarded.', 'Ask before assuming intent.', 'You ask directly what happened and listen for the full story.', 'Facts replace suspicion, and trust is protected.'],
    challenged: ["They're trying to undermine me.", 'You get defensive and remember who spoke against you.', 'Relationships with peers turn cautious and political.', 'Most challenges are about the idea, not about you.', 'You respond to the substance and follow up with the challenger afterward.', 'A potential rival becomes an ally.'],
    silent: ['They might be looking for the exit.', 'You start planning around them and share less information.', 'Your distance confirms their sense of being on the outside.', 'Lead with openness instead of protection.', 'You invite them to a candid conversation about how things are going.', 'You get the real story while there is still time to act.'],
  },
  cer: {
    missed: ['I should have seen this coming. It reflects on me.', 'You step in with the fix before hearing them out.', "You solve today's problem and teach dependence.", 'Your job is to build answers, not hold them all.', 'You ask, "What do you think the next step should be?"', 'Your report grows in judgment and confidence.'],
    challenged: ["If I can't answer this perfectly, I'll look incompetent.", 'You over-explain and avoid admitting a gap.', 'The room senses defensiveness more than expertise.', '"I don\'t know yet" is a credible answer.', 'You name the open question and commit to a follow-up date.', 'Your credibility rises because you stay composed and honest.'],
    silent: ["I should know what's going on with my own team.", 'You diagnose the problem yourself and act on your theory.', 'You fix the wrong problem.', 'Curiosity beats certainty.', 'You ask open questions and let them explain.', 'You understand what is really happening.'],
  },
  con: {
    missed: ['Did I fail to support them? They must be overwhelmed.', 'You extend the deadline and take on part of the work.', 'Accountability softens, and the team notices the double standard.', 'Support includes honest expectations.', 'You offer help and restate what done looks like and by when.', 'They feel cared for and accountable.'],
    challenged: ["They don't value what I bring.", 'You take it personally and pull back from future discussions.', 'Your voice goes missing from rooms where it matters.', 'The challenge is about the idea, not your worth.', 'You stay engaged and ask what would make the idea work for them.', 'You strengthen both the relationship and the idea.'],
    silent: ['Did I do something to upset them?', 'You over-reassure and steer around any hard topic.', 'The conversation stays on the surface.', 'Care enough to ask the real question.', 'You ask warmly and directly what has changed for them.', 'Honest care opens a real conversation.'],
  },
};
