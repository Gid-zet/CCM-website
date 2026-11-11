# Cummings Consulting & Management — website

A single-page, highly interactive site for CCM built with **React 18 + TypeScript + Vite**, **Framer Motion** (scroll-linked storytelling, parallax, layout morphs), **Lenis** (smooth scroll) and **three.js / React Three Fiber** (the 3D brain). Light, white-led design with plum bands for drama, frosted-glass surfaces, a pinwheel that spins faster the faster you scroll, and the brand palette sampled from the CCM logo.

## What's on the page

| Chapter | What it does |
| --- | --- |
| Hero | Kinetic headline, 3D pointer-depth pinwheel stage (tap it to spin), aurora light, scroll parallax that opens the petals |
| Chapter one · The challenge | Pinned scroll story: four leadership challenges stack in as you scroll |
| Chapter two · Services | Tilt + spotlight glass cards that morph into a detail sheet |
| Impact | Count-up stats |
| Chapter three · GRIT Leadership Series™ | Scroll-driven journey: vertical scroll travels sideways along a road (Assess → Design → Launch → Learn → Coach → Sustain → Transformation) with a pinwheel traveler; stacks vertically on phones |
| Chapter four · Assessments | Interactive Everything DiSC® model with "where do you lean" sliders, the six DiSC applications with sample downloads, and a Five Behaviors® pyramid with Personal vs Team Development |
| **Growth Compass** (lead magnet) | 10-question assessment, gated results, six profiles, recommended services — **sent to GoHighLevel** |
| **Leadership Lens** | 3-step EQ tool (what shaped you → your lens → see it in your brain). Step 3 is an interactive 3D brain: drag to rotate, tap regions, or press Play to watch the thalamus, prefrontal cortex, hippocampus, amygdala and brainstem light up with neural pulses for each moment, then compare amygdala hijack vs the pause. "Email me my lens" is **sent to GoHighLevel** |
| How we work, Testimonials, Government | Format switcher, draggable testimonial card, capability snapshot |
| Insights + newsletter | **Newsletter signup → GoHighLevel** |
| Contact | **Message form → GoHighLevel**, or the GHL booking calendar embedded |

## GoHighLevel connection

Every form posts to `/api/lead` (a Vercel serverless function in `api/lead.ts`). It:

1. **Upserts the contact** (matched on email) with name, phone, company, tags and CCM's existing custom fields — Compass Result, Recommended/Secondary Service, Lead Temperature, Organization Type, Focus, Situation, Biggest Challenge, 12-Month Goal, Delivery Preference, Group Size, Start Timeline, Scores, Notes, Job Title, Email Consent.
2. **Adds a note** with the full submission.
3. Creates an **opportunity in Sales Lead Pipeline → New Lead** for Growth Compass *Hot/Warm* leads and contact-form inquiries.
4. Optionally **forwards the payload to a GHL Workflow inbound webhook** so you can trigger emails, SMS, alerts and tasks.

Tags applied: `website-lead`, `form-<compass|lens|newsletter|contact>`, `compass-completed`, `compass-result-<profile>`, `interest-<service>`, `lead-<hot|warm|nurture>`, `segment-<government|corporate|nonprofit|smb>`, `leadership-lens-completed`, `lens-<type>`, `newsletter-subscriber`, `contact-form`, `consent-email`, `consent-sms`.

### Setup (Vercel)

1. Import this repo into Vercel (framework preset: Vite — `vercel.json` is included).
2. In GoHighLevel: **Settings → Private Integrations → Create** with scopes `contacts.write`, `contacts.readonly`, `opportunities.write`, `locations/customFields.readonly`. Copy the token.
3. In Vercel **Settings → Environment Variables**, add the values from `.env.example`:
   - `GHL_PRIVATE_TOKEN` — the token from step 2 (keep it secret; never commit it)
   - `GHL_LOCATION_ID` = `QKI3AUqCPx7cdgcAH6iu`
   - `GHL_PIPELINE_ID` = `kC5OhXO4nLX2aw7a9VRH` (Sales Lead Pipeline)
   - `GHL_PIPELINE_STAGE_ID` = `cbd9cba9-a0f0-4f9a-a901-c2c48f0424f0` (New Lead)
   - `GHL_INBOUND_WEBHOOK_URL` — optional, from a Workflow with an *Inbound Webhook* trigger
4. Redeploy.

**No serverless hosting?** Set `VITE_GHL_WEBHOOK_URL` to a GHL inbound-webhook URL at build time and the browser posts straight to your workflow instead.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173 (forms need `vercel dev` to reach /api/lead locally)
npm run build
```

Respects `prefers-reduced-motion` (pinned sequences become normal sections), keyboard-accessible, and works down to 320px wide.

## Analytics (Vercel Web Analytics)

`<Analytics />` from `@vercel/analytics/react` is in `src/App.tsx`, so every visit and page view is recorded once **Web Analytics is enabled** for the project in the Vercel dashboard (project → Analytics → Enable).

Custom events (shown in the dashboard's **Events** panel; these need a Vercel Pro or Enterprise plan) are sent through `src/lib/analytics.ts`. No personal data is ever included:

| Event | Properties | When |
| --- | --- | --- |
| Compass Started | – | "Start my compass" clicked |
| Compass Questions Done | – | Reached the details gate |
| Compass Completed | result, temperature | Details submitted, result shown |
| Lens Started | – | "Take the test" clicked |
| Lens Revealed | lens | Lens type revealed |
| Lens Brain Viewed | moment | A moment chosen for the 3D brain |
| Lens Choice | choice (react/pause) | Choice made at the pause |
| Lead Submitted | form, ok | Any form sent to GoHighLevel |
| Book Call Click | section | Any booking / "Book a strategy call" link |
| Sample Download | file | A DiSC / Five Behaviors sample PDF |
| Outbound Link | url, section | Any link to another site |
