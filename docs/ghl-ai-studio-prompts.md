# Rebuilding the CCM website in GoHighLevel AI Studio

A step-by-step prompt pack. Paste each prompt into AI Studio **one at a time**, check the preview, then move to the next.
Building section by section gives far better results than one giant prompt: AI Studio treats reference links as
inspiration rather than a copy, and long single prompts tend to get simplified.

**Before you start**
- AI Studio is under **Labs** and has to be switched on for the CCM sub-account.
- Have the live Vercel site open in another tab to compare against.
- Save a version (Version History) after each step that looks right, so you can roll back.
- Attach screenshots of the matching section of the live site to each prompt when you can. Screenshots steer the layout better than words.
- Prompt 2 pastes three content files at the end of this document. They carry the exact wording and scoring, so AI Studio doesn't make up its own.

---

## Prompt 1 · Foundation (brand, layout, every section in order)

> Attach: a full-page screenshot of the live site, and the CCM logo.
> Reference URL: your live Vercel URL.

```
Build a single-page website for Cummings Consulting & Management (CCM), a woman-owned leadership development, coaching and facilitation firm in Alpharetta, Georgia that serves government agencies, global corporations and mission-driven organizations.
Audience: HR and L&D leaders, executives and federal/state procurement officers.
Goal: get visitors to take the free Growth Compass assessment or book a 30-minute strategy call.
Constraints: one long scrolling page with anchor navigation, premium and playful, fully responsive down to 320px, accessible (real buttons, labels, focus outlines, respects reduced motion), use my exact copy and do not invent statistics, reviews or clients.

Use the reference URL and screenshots for layout and style. Recreate this design system:
- Colors: plum #88326f (primary), deep plum #4a1a3d, ink #1a0915, amber #fca927 (buttons), orange #f7862a, sky #8dd8f7, lime #9ecb3c, rose #d56bb4. Light sections are white #ffffff or blush #faf5f8 with text #241a21 and muted #5d4c58. Dark sections use a radial gradient from #4a1a3d to #160611 with white text.
- Fonts (Google Fonts): Urbanist 700/800 for headings, Source Sans 3 for body, Fraunces italic for accent words inside headings.
- Accent words in headings are Fraunces italic in plum (or amber on dark sections).
- Small uppercase "kicker" labels above headings with letter-spacing and a short four-color bar (plum, amber, sky, lime) before them.
- Buttons are fully rounded pills: amber with dark text for primary, plum with white text, or a subtle outlined ghost style. Arrows nudge right on hover.
- Cards are frosted glass: white at 85–92% opacity, backdrop blur, 1px soft border, large radius (28px), soft plum-tinted shadow.
- A thin rainbow scroll-progress bar fixed at the very top (plum → amber → sky → lime).
- Smooth scrolling, and sections and headings reveal on scroll (fade and rise, headings word by word).

Sections, in this order, each with the id shown:
1. Floating rounded glass navigation bar (top, centered, not full width) with the CCM pinwheel logo, links (Services, GRIT, Assessments, Growth Compass, Leadership Lens, Insights) and an amber "Book a strategy call" button. Collapses to a hamburger menu on tablets and phones.
2. Hero (id top), light.
3. Client logo marquee: "Trusted by" NASA, Boeing, BMW, Honda, Comcast, CDC, USDA NASS, Igloo, JBT Marel.
4. The challenge story (id story), blush.
5. Services (id services), white.
6. Impact numbers, dark.
7. GRIT Leadership Series journey (id grit), dark.
8. Assessments: Everything DiSC and The Five Behaviors (id assessments), white.
9. Growth Compass assessment (id compass), blush.
10. Leadership Lens interactive test (id lens), dark.
11. How we work (virtual / on-site / blended), white.
12. Testimonials, blush.
13. Government and procurement (id government), dark.
14. Insights and newsletter (id insights), blush.
15. Contact and booking (id contact), amber-to-orange gradient.
16. Footer, dark.

For now build the structure, styles and navigation with placeholder content in each section. I will give you the exact content and interactions section by section next.
```

---

## Prompt 2 · Load the exact content

```
Create three data files with EXACTLY the content I paste below, without rewording anything: src/data/content.ts, src/data/compass.ts and src/data/lens.ts. Every section must read its copy, scoring and options from these files. Do not invent any other copy.
```
Then paste the three files from **Appendix A** below into the same message.

---

## Prompt 3 · Navigation and hero

```
Build the hero section (id top) on a white background:
- Soft blurred brand-color "aurora" blobs drifting slowly behind (plum, amber, sky, lime, low opacity).
- Left: kicker "We embrace learning". Headline on three lines that slide up one after another on load: "Developing people." / "Strengthening organizations." (organizations in Fraunces italic plum) / "Elevating performance." (animated plum→rose→orange gradient text). Then the paragraph: "Leadership development, executive coaching and facilitation for government agencies, global corporations and mission-driven organizations, backed by 30+ years in the room with leaders." Buttons: amber "Take the free Growth Compass →" (scrolls to #compass) and ghost "Book a strategy call" (scrolls to #contact). Under them small pill badges: WBENC, WOMEN-OWNED, NMSDC, DBE, EVERYTHING DiSC® PARTNER, DDI, INSIDEOUT.
- Right: the CCM four-petal pinwheel logo inside a frosted circular disc, surrounded by three slowly rotating orbit rings, each carrying a small glowing dot (amber, sky, lime). The whole stage tilts in 3D toward the mouse. As the visitor scrolls down, the four petals drift apart and the pinwheel rotates. Clicking the pinwheel spins it twice and bursts petal-shaped confetti in brand colors.
- Floating frosted cards around it that count up when shown: "20,000+ professionals trained", "30+ yrs developing leaders", and a small pill with a pulsing lime dot "Tap the pinwheel".
- A small "Scroll" mouse hint at the bottom.
The small pinwheel logo in the nav bar spins continuously and spins faster the faster the visitor scrolls.
```

---

## Prompt 4 · The challenge story

```
Build "The challenge" section (id story) on the blush background as a pinned scroll story about 4 screens tall:
The left column stays fixed while the visitor scrolls: kicker "Chapter one · The challenge", heading "What today's organizations ask of their leaders" (leaders in Fraunces italic), a giant counter "01 / 04" that changes as each card arrives (colored to match the card), and four progress dashes. Near the end the line "Sound familiar? That's exactly where CCM comes in." fades in.
The right column is a stack of four white cards (the CHALLENGES list in content.ts). Each card slides up from below and lands slightly lower than the previous one, so earlier titles stay visible like a fanned deck; earlier cards shrink and fade a little. Each card has a colored left edge bar, a soft colored glow in the corner, a big italic number (01–04) and the title and description.
With reduced motion, show the four cards as a simple list instead.
```

---

## Prompt 5 · Services and impact

```
Services (id services, white): kicker "Chapter two · What we do", heading "Solutions for your business, starting with your team", line "Every engagement is built around your goals and your people, delivered virtually, on-site or as a blend of both. Tap a service to look closer."
Show the six SERVICES from content.ts as frosted cards in a 3-column grid (2 on tablet, 1 on phone). Each card has a small colored icon tile, title, description, a soft glow in its brand color, and "See what's included →". Cards tilt slightly toward the mouse with a light spotlight following the cursor.
Clicking a card expands it smoothly into a centered dialog filled with the service color: title, description, a checklist of the four items, an amber "Book a strategy call →" button (closes and scrolls to #contact) and an outlined "Explore [service]" link to its url. Close with ✕, Escape or clicking outside.

Impact (dark section): kicker "Our impact", heading "Three decades of helping leaders and teams do their best work", then four frosted stat cards from STATS in content.ts. Numbers count up when scrolled into view, each with a thin colored bar along the top that grows.
```

---

## Prompt 6 · GRIT scroll journey

```
Build the GRIT Leadership Series section (id grit) on the dark background as a horizontal scroll journey: while the visitor scrolls DOWN, the content moves SIDEWAYS through a row of panels, then the page continues normally.
Along the bottom, a road: a thin line that fills with a plum→amber→sky→lime gradient as they progress, eight milestone dots labeled Start, Assess, Design, Launch, Learn, Coach, Sustain, Transform (each lights up amber when reached), and a small CCM pinwheel "traveler" that rides along the line and spins as it moves.
Panels (frosted dark glass cards with a faint giant italic step number in the corner; each animates in as it slides into view):
1. Intro (no card): kicker "Chapter three · The GRIT Leadership Series™", giant serif letters G R I T in amber, rose, sky and lime with the words Great, Resolve, Instills, Transformation under them, the line "GRIT is a developmental journey, not another training program. Keep scrolling and we'll take you through it, stop by stop." and an amber "Scroll to begin the journey →" with a nudging arrow.
2. 01 Assess: "Start with a clear picture". "We listen to leaders and sponsors, then run diagnostics so every leader has an honest starting point." Chips: Everything DiSC® and The Five Behaviors® (both link to #assessments), 360 assessment. Note: "Before kickoff we agree with your sponsor on what success looks like and how we will report on it."
3. 02 Design: "Built around your leaders". A mini staircase of four clickable bars (Foundations, Elevate, Advanced, Executive from GRIT.programs, rising heights); the selected one turns amber and a note shows its audience, plus "Plus GRIT Women, for women advancing into greater responsibility."
4. 03 Launch: "Kick off with purpose". "Sponsors open the program so leaders know why it matters. Peers form a cohort that learns together and holds each other accountable." Checklist: Sponsor kickoff, Peer cohort formed, Senior leaders kept informed throughout.
5. 04 Learn (wide): "Four stages that build". The four GRIT.stages as colored cards (number, title, description).
6. 05 Coach: "Learning that keeps moving". "Group and one-on-one coaching between sessions turns insight into habit. This is where behavior actually changes." Three speech bubbles: "What will you try this week?", "What got in the way?", "What did you notice?"
7. 06 Sustain (wide): "A capstone and measured results". "Leaders apply what they learned to a real business challenge. Most providers stop at level 1. GRIT is measured all the way to level 4." Four rising bars: Level 1 Experience (Session evaluations: was it relevant and useful?), Level 2 Learning (Before-and-after self and 360 ratings.), Level 3 Application (Manager check-ins and capstone evidence of skills used on the job.), Level 4 Results (Business measures agreed with your sponsor, such as retention or promotion readiness.) — Level 4 in amber.
8. Finale (no card): a slowly spinning pinwheel, kicker "Destination", huge italic gradient word "Transformation.", "One accountable partner through every step. We stay through coaching and measurement." and an amber "Bring GRIT to your leaders →" to #contact.
After the journey, "Why CCM for GRIT" with four frosted cards: Transformation, not training / Built around your work / Certified tools, one partner / A certified diverse supplier (copy: A developmental journey with coaching, a capstone and measured impact. · Scenarios, roles and language from your organization, not generic examples. · Authorized Everything DiSC® and Five Behaviors® Partner. We assess, coach and measure. · WOSB, MBE and SDB certified, supporting supplier-diversity and small-business goals.)
On phones (under 760px) and with reduced motion, stack the panels vertically instead of scrolling sideways.
```

---

## Prompt 7 · Everything DiSC and The Five Behaviors

```
Build the Assessments section (id assessments, white): kicker "Chapter four · Assessments", heading "A common language at every level" (every level in Fraunces italic plum), paragraph "As an authorized Everything DiSC® and The Five Behaviors® Partner since 2020, CCM administers, debriefs and follows through on every assessment. Research shows companies that put employee development first are 2.6 times more likely to outperform the competition."

Part 1, two columns:
- Left: an interactive SVG DiSC circle in four quadrants: D top-left (orange #f7862a), i top-right (amber #fca927), S bottom-right (lime #9ecb3c), C bottom-left (blue #3f9fd0), with big white letters and a white center disc reading "DiSC® model". Axis labels: top "Fast-paced & outspoken", bottom "Cautious & reflective", left "Questioning & skeptical", right "Accepting & warm". Hovering or clicking a quadrant enlarges it slightly and selects it; the others fade. A dark dot marks the visitor's position and springs smoothly when it moves.
- Right: label "Everything DiSC®", heading "Four styles. One shared language.", a card for the selected style (big letter, name, descriptors, motivation, three priority pills):
  D Dominance — Direct, firm, results-oriented, strong-willed — Motivated by winning, competition and success. — Results, Action, Challenge.
  i Influence — Outgoing, enthusiastic, optimistic, lively — Motivated by social recognition, group activities and relationships. — Enthusiasm, Action, Collaboration.
  S Steadiness — Even-tempered, accommodating, patient, humble — Motivated by cooperation, opportunities to help and sincere appreciation. — Support, Stability, Collaboration.
  C Conscientiousness — Analytical, reserved, precise, systematic — Motivated by opportunities to gain knowledge, show expertise and produce quality work. — Accuracy, Stability, Challenge.
  Below it a "Try it: where do you naturally lean?" box with two sliders (Cautious & reflective ↔ Fast-paced & outspoken, and Questioning & skeptical ↔ Accepting & warm) that move the dot on the circle and say "You may lean toward [style]", a "Surprise me ↻" link that randomizes, and the note "A quick illustration of the model, not an assessment. Your full Everything DiSC® profile is far richer."
Part 2: a pill tab bar with the six DiSC applications (Agile EQ™, Workplace, Management, Productive Conflict, Work of Leaders®, Sales). The selected tab has a plum pill that slides between tabs. The panel below shows the tagline, description, "The profile focuses on" list, a plum "Enroll now" button (to #contact) and an outlined "Download sample" link. Use the APPS content in Appendix B.
Part 3, The Five Behaviors® (in a soft blush-to-cream rounded panel): heading "Activate your team's potential", paragraph "Teams change as the workplace evolves. The Five Behaviors® helps people build the skills to collaborate well wherever they work, so the whole team achieves results through cohesive teamwork." A five-layer SVG pyramid that builds up from the bottom as it scrolls into view: Trust (plum, base), Conflict (blue), Commitment (lime), Accountability (orange), Results (amber, top). Hovering or tapping a layer shows its card (descriptions in Appendix B). Two selectable cards: Personal Development (Build a culture of teamwork · Who: Anyone · People: Up to 30 · Team tenure: No requirements) and Team Development (Develop a cohesive intact team · Who: Intact teams · People: 5–12 · Team tenure: 6-week minimum tenure), each with a "Download sample →" link when selected.
```

---

## Prompt 8 · Growth Compass (lead magnet)

```
Build the Growth Compass (id compass, blush background with soft plum and amber glows). Two columns: left sticky intro, right a frosted app card.
Left: kicker "Free leadership assessment", heading "The CCM Growth Compass" (Growth Compass in animated gradient text), "Find out what your leaders and team need next. Ten quick questions, an instant personalized result, and the service that fits.", pills "About 3 minutes · 10 questions · Instant results", and a large CCM pinwheel whose four petals fill in as the visitor progresses and which turns 36° per question.
Right card, one screen at a time with smooth slide transitions:
1. Intro: "Where should your leadership growth point next?", a short explainer, the six profile names as colored chips, amber "Start my compass →".
2. The 10 QUESTIONS from compass.ts, one per screen, with "Question X of 10" and a gradient progress bar. Choice questions show colored option tiles; tapping one highlights it and auto-advances after a short pause. The "temperature check" question shows six statements, each with a three-way segmented control (Not yet / Sometimes / Absolutely); Next unlocks when all are answered. The last question is an optional text box with a "See my result →" button. Every screen has "← Back".
3. Gate: on the left a card in the result color with the result name and summary BLURRED and a lock badge "Your Growth Compass is ready"; on the right a form: First name*, Last name*, Work email*, Phone (optional), Organization (required unless they chose "Myself as a leader"), Job title (optional), checkbox "Email me leadership insights and follow-up about my result. Unsubscribe any time." (on by default), checkbox "Text me about my result and booking. Message and data rates may apply. Reply STOP to opt out.", amber "Show my results →". Validate inline with friendly messages.
4. Results: header band in the result color with a slowly spinning pinwheel badge, "[First name], your Growth Compass result", result name and meaning; animated horizontal score bars for the six needs (largest first); the key challenge they named as a quote; a "Recommended for you" service card (why text, plum "Book a strategy call →" opening the booking link, outlined "Explore [service]") and, if present, an "Also worth a look" secondary service; when appropriate, a starter box suggesting the EQ Masterclass (https://learneq.cummingscm.com/eq-masterclass); "↺ Take it again" and a confirmation line. Burst petal confetti when results appear.
Scoring must follow the score() function in compass.ts exactly (including lead temperature Hot/Warm/Nurture, second recommendation when within 70%, and the starter rule).
```

---

## Prompt 9 · Leadership Lens with the 3D brain

```
Build the Leadership Lens (id lens) as an eye-catching dark section with soft plum and sky glows. Header centered: kicker "Free · 2-minute test", big heading "What's your Leadership Lens?" (Leadership Lens in amber→orange→rose gradient), line "Your past quietly shapes how you lead. Find your lens, then watch it play out inside your brain."
Below, two columns: left a large interactive 3D brain, right a white card that shows ONE step at a time with smooth fade/rise transitions.

The 3D brain (use three.js with @react-three/fiber and @react-three/drei; load it lazily):
- A translucent, holographic brain: two hemispheres with cortical folds (sphere geometry displaced with ridged noise, flattened where they meet), a cerebellum and a brainstem, rendered with a fresnel rim-glow shader (pink by default, orange when the alarm fires, light blue when the thinking brain leads).
- Glowing pulsing nodes for five regions: Thalamus (#d56bb4, center), Prefrontal cortex (#8dd8f7, front, both sides), Hippocampus (#9ecb3c), Amygdala (#fca927, deep and low, both sides), Brainstem & body (#ff7a70). Hover shows a small label; clicking shows the region info (Appendix B).
- Curved neural pathways between regions with bright pulses travelling along the active ones.
- Slow auto-rotate, drag to turn, no zoom, gentle floating bob. Pause rendering when off screen. If WebGL is unavailable, show a friendly message and keep the test working.
- While the visitor is on the intro and question screens, the brain cycles through its regions every ~2 seconds as an attract animation. On the intro screen, four floating glowing labels sit around it: "Prefrontal cortex · The thinking brain", "Amygdala · The alarm", "Hippocampus · The memory keeper", "Thalamus · The relay station".

The card steps:
1. Intro: "Which one are you?", "Six lenses. One is yours." (second sentence Fraunces italic plum), the six lens names as colored chips, "Your family, your experiences and the places you've worked built a lens you lead through every day. Find yours, then see what it does to your brain under pressure.", pills "⏱ 2 minutes · 👆 Just tap · 🧠 See it in 3D", and a large glowing amber "Take the test →".
2. Five screens, one per SOURCE in lens.ts (progress dashes, "1 of 5", title, "Tap anything that feels true for you.", six tappable chips that fill with the source color). Buttons "← Back" and "Next →" (shows "Skip" if nothing tapped); the last screen shows "Reveal my lens →".
3. Lens reveal: count each tapped chip toward its lens; the top lens is theirs. Show the lens name big in Fraunces in its color with a springy pop, its first sentence, two small boxes "Your gift" and "Watch out for", and "See it in action →".
4. "Which of these feels familiar?" — the three SCENARIOS as large buttons.
5. Six "Inside your brain" beats, one per screen with Next: Something happens (the scenario) / Your lens reads it / Old memories join in / A story forms (the lens's story line from PLAY in big italic quotes) / Your alarm fires (the lens emotion) / Your body wants to react (the lens urge). The brain lights the matching regions and pathways for each beat: thalamus → prefrontal cortex → hippocampus → prefrontal + hippocampus → amygdala → amygdala + brainstem.
6. "Now it's your choice." with two buttons: "React right away" (red tint) and "Pause first" (blue tint). The brain shows the pause state (prefrontal calming the amygdala).
7. Result: autopilot shows "Your alarm takes the wheel." with the autopilot behavior and result (brain turns orange: amygdala hijack, amygdala→brainstem pathways); pause shows "Your thinking brain leads." with the chosen behavior and result (brain turns blue: prefrontal→amygdala and brainstem pathways). Link to see the other version, and "Finish →".
8. Takeaway: "You don't respond to events. You respond to your story about them.", "A belief to try on: [reframe]", an inline form (First name, Email, amber "Email me my lens"), a success message with confetti, and "↺ Start over".
On phones the brain sits above the card.
```

---

## Prompt 10 · How we work, testimonials, government, insights, contact, footer

```
How we work (white): left "We meet you where you are, literally and strategically", line "Pick the format that fits your team. The same facilitators and the same standard, wherever the room is.", a pill tab switcher Virtual / On-site / Blended whose colored pill slides between tabs, and the selected FORMATS description and bullets. Right: a dark rounded "scene" that animates per format: a 3×2 video-call grid of initials (one tile ringed lime as the speaker) for Virtual; a top-down room with three round tables of colored seats for On-site; a 12-week Gantt with bars growing for Kickoff workshop, Live virtual sessions, 1:1 coaching and Progress check-ins for Blended. Below, the four JOURNEY steps (Assess, Design, Deliver, Sustain) with a gradient line that draws across as it scrolls in.

Testimonials (blush): left "Rated by the people in the room", a ring chart that fills to 98% with the number counting up and "of participants rate their CCM experience positively, across more than 20,000 people trained.", and dots to switch quotes. Right: a big rounded quote card in the quote's color (QUOTES in content.ts) with a large serif quote mark, the quote, an initial avatar, organization and role, "1 / 4" with ← → buttons. Swipe or drag to change, auto-advance every 7 seconds, pause on hover.

Government (id government, dark): "A certified, woman-owned partner for public-sector and enterprise teams" (public-sector in Fraunces italic amber), "CCM is a woman-owned, small disadvantaged business with past performance across federal agencies and Fortune 500 companies.", rows "FEDERAL: NASA, CDC, USDA NASS" and "ENTERPRISE: Boeing, BMW, Honda, Comcast" as chips, amber "View capability statement →" (https://www.cummingscm.com/capability-statement) and ghost "Talk to us about a contract". Right: a white capability card slightly rotated, with an animated rainbow foil strip on top, the logo and "Cummings Consulting & Management, LLC · Alpharetta, GA · Capability snapshot", three seals (WBENC Women's Business Enterprise, NMSDC Minority Supplier, DBE Disadvantaged Business Enterprise) and rows Business type: Woman-owned small disadvantaged business · Partner credentials: Everything DiSC® · Five Behaviors® · DDI · InsideOut Coaching · Delivery: Virtual, on-site and blended, nationwide. It tilts toward the mouse.

Insights (id insights, blush): "Fresh ideas for leaders, every Tuesday and Thursday". Left: a featured article card "The Power of the Pause" (cover: amber→orange→plum gradient with pulsing rings and a big serif "II"), "The space between what you feel and what you do is where leadership happens. One idea to try with your team this week.", "Read on the blog →" (https://www.cummingscm.com/blog-3-1). Right: an amber newsletter card "Get it in your inbox", "Practical leadership and team-effectiveness ideas, plus first notice of upcoming masterclasses.", First name + Work email + dark "Subscribe", perks (Two short reads a week, Early access to masterclasses, Unsubscribe any time) and "Explore the EQ Masterclass →".

Contact (id contact, amber→orange gradient with a huge faint pinwheel rotating as you scroll): "Ready to strengthen your leaders and teams?" (teams in Fraunces italic), "Book a 30-minute strategy call or send us a note. We'll talk through your goals and recommend the right mix of training, coaching and facilitation.", three steps 1. We listen · 2. We recommend · 3. You decide. Right: a frosted white card with two tabs: "Send a message" (First name, Last name, Work email, Phone optional, Organization optional, "How can we help?", checkbox Email me leadership insights from CCM, dark "Send message →") and "Book a time" (my CCM booking calendar).

Footer (dark): huge "We embrace learning." (learning in gradient italic), logo on white, "Creating solutions for your business, starting with your team. Alpharetta, Georgia.", columns Explore / Tools / Connect (LinkedIn https://www.linkedin.com/company/69708207/, Instagram https://www.instagram.com/cummingscmllc/, Facebook https://www.facebook.com/profile.php?id=100067385511487), copyright line, "Back to top ↑" and a four-color stripe at the very bottom.
```

---

## Prompt 11 · Connect the forms and calendar to the CRM

Click each form in the preview and use **Connect**, or paste:

```
Connect all four forms to my HighLevel CRM so every submission creates or updates a contact (matched on email):
1. Growth Compass gate form: first name, last name, email, phone, company name, plus these contact custom fields: compass_result, recommended_service, secondary_service, lead_temperature, organization_type, compass_completed_date, compass_notes, compass_focus, current_situation, biggest_challenge, 12month_goal, delivery_preference, group_size, start_timeline, compass_scores, job_title, email_updates_consent. Add tags: website-lead, form-compass, compass-completed, compass-result-[profile slug], interest-[service tag], lead-[hot|warm|nurture], segment-[government|corporate|nonprofit|smb], consent-email / consent-sms when ticked.
2. Leadership Lens email form: first name, email; tags website-lead, form-lens, leadership-lens-completed, lens-[type], interest-eq-masterclass; save the lens summary as a note.
3. Newsletter: first name, email; tags website-lead, form-newsletter, newsletter-subscriber.
4. Contact form: name, email, phone, company; tags website-lead, form-contact, contact-form; save the message as a note.
Use my existing CCM strategy-call calendar for the "Book a time" tab and every "Book a strategy call" button.
Add a hidden honeypot field to each form to block bots.
```

Then in **Automation → Workflows**, create a workflow with the **AI Studio Form Submitted** trigger (or External Tracking Event → Form submission) to:
- create an opportunity in **Sales Lead Pipeline → New Lead** for Compass leads tagged `lead-hot` or `lead-warm`, and for contact-form messages;
- send the Compass result email and any team alert.

---

## Prompt 12 · Polish pass

```
Final polish: check every section at 1440px, 768px and 375px with no horizontal scrolling; make sure every button and link is keyboard reachable with a visible amber focus outline; respect prefers-reduced-motion (turn the pinned story and GRIT journey into normal stacked sections and stop auto-animations); lazy-load the 3D brain; set the page title "Cummings Consulting & Management | Leadership Development, Coaching & Facilitation", a meta description, a theme color #1a0915 and the pinwheel favicon.
```

---

## Checks before publishing
- Submit each form on the preview domain. Confirm the contact appears in **Contacts** with the right tags and custom fields, and that the workflow fires.
- Take the Growth Compass with "Leaders across our organization → Federal government → growing fast → leaders aren't ready → all Not yet → leaders ready to step up → Blended → 51 to 250 → This quarter". The result should be **The Bench Builder**, Leadership Development, lead temperature **Hot**.
- Compare every number, client name and quote with the live site. AI Studio sometimes fills gaps with invented copy.
- Expect a short manual cleanup in the code editor. The 3D brain and the sideways GRIT scroll are the parts most likely to need it. If AI Studio can't install the three.js packages, ask it for an animated SVG brain with the same five glowing regions as a fallback.

---

## Appendix B · Extra copy for prompts 7 and 9

**DiSC applications (APPS)**
- Agile EQ™ — Develop the emotional intelligence necessary to build a thriving agile culture. — Trains learners to read the interpersonal and emotional demands of a situation and respond appropriately, fusing DiSC® insights with active emotional intelligence development. — Focus: Discovering your DiSC style; Recognizing your EQ potential; Understanding your EQ strengths; Committing to strategies for building agility. — Sample: https://www.cummingscm.com/s/Sample-DiSC-Agile-EQ-Profile-1.pdf
- Workplace — Engage every individual in building more effective relationships at work. — Helps all employees, regardless of rank or title, understand themselves and others and appreciate the values, priorities and preferences each person brings. — Focus: Discovering your DiSC® style; Understanding the styles of others; Building more effective relationships; People-Reading and Comparison Reports (optional). — Sample: https://www.cummingscm.com/s/Sample-DiSC-Workplace-Report-2.pdf
- Management — Teach managers to successfully engage, motivate, and develop their people. — Managers learn how their style shapes problem-solving, time management and decisions, and leave with concrete strategies to adapt to each direct report. — Focus: Your DiSC management style; Directing and delegating; Motivating and developing others; Working with your manager. — Sample: https://www.cummingscm.com/s/Sample-DiSC-Management-Profile-1.pdf
- Productive Conflict — Harness the power of conflict by transforming destructive behavior into productive responses. — Combines cognitive behavioral science with DiSC® insights so people curb harmful reactions and turn disagreement into better relationships and outcomes. — Focus: Understanding self and others in conflict; Recognizing destructive behaviors; Redirecting them into productive responses. — Sample: https://www.cummingscm.com/s/Sample-DiSC-Productive-Conflict-Profile-1.pdf
- Work of Leaders® — Create impactful leaders through the process of vision, alignment, and execution. — Connects leadership styles to real-world demands, built on research with 300 experts across more than 150 organizations. — Focus: Crafting a vision; Building alignment; Championing execution; Seeing how your tendencies help and hinder. — Sample: https://www.cummingscm.com/s/Sample-DiSC-Work-of-Leaders-Profile-1.pdf
- Sales — Build customer-centric interactions that improve outcomes. — Sales-specific insights, tactics and action plans that help salespeople read and adapt to each customer. — Focus: Recognizing customer buying styles; Understanding your DiSC® style; Adapting your approach to each buyer. — Sample: https://www.cummingscm.com/s/Sample-DiSC-Sales-Profile-1.pdf

**Five Behaviors layers**
- Results — The team focuses on collective results, not individual status or ego.
- Accountability — Teammates hold one another to high standards and call out each other's performance and behaviors.
- Commitment — Members buy in to clear decisions, even when they initially disagreed.
- Conflict — People engage in unfiltered, constructive debate around ideas.
- Trust — Members are vulnerable with one another and comfortable admitting mistakes, weaknesses and needs for help.
- Samples: Personal Development https://www.cummingscm.com/s/Sample-5Bs-Personal-Development-Profile-2.pdf · Team Development https://www.cummingscm.com/s/Sample-5Bs-Team-Profile-2.pdf

**Brain regions (Leadership Lens)**
- Thalamus · The relay station — Every sight and sound passes through here first. It sends the signal two ways: a fast road to the amygdala and a slower road to the thinking brain.
- Prefrontal cortex · The thinking brain — Interprets the event through your lens, weighs options and chooses a response. When you pause, it can calm the amygdala.
- Hippocampus · The memory keeper — Pulls in past experiences that look similar to this moment, adding context and, sometimes, old emotion.
- Amygdala · The alarm — Scans for threat or reward and fires in milliseconds, often before the thinking brain has caught up.
- Brainstem & body · The reaction — Turns the alarm into a body response: heart rate, tension and the urge to fight, flee, freeze or appease.

**Links**
- Booking calendar: https://api.leadconnectorhq.com/widget/booking/x6kwJG2JUgRYf8v7gDMQ
- EQ Masterclass: https://learneq.cummingscm.com/eq-masterclass

---

## Appendix A · Content files to paste in Prompt 2

### src/data/content.ts

```ts
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
```

### src/data/compass.ts

```ts
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
```

### src/data/lens.ts

```ts
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
```
