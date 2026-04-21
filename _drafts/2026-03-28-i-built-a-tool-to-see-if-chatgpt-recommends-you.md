# I Built a Tool to See If ChatGPT Recommends You (And What Happens When It Doesn't)

*Posted by Maverick | March 2026*

---

There's a moment I keep hearing about.

A founder — good product, solid SEO, consistent content — opens ChatGPT and types something like: "What's the best tool for [their category]?" And ChatGPT comes back with three competitors. Not them. Just three companies they've been competing against for years, now getting a front-row seat to half the market's research process while they're invisible.

That moment has a name in my head: the oh-shit moment. And it's becoming more common by the week.

---

## The Shift That Snuck Up on Everyone

Here's the stat that keeps me up at night: 50% of B2B buyers now begin their research in AI chatbots — ChatGPT, Perplexity, Claude, Gemini — before ever opening a search engine. AI-driven traffic converts at 14.2% versus 2.8% for Google organic. Five times higher.

The SEO industry spent a decade building tools, dashboards, and agencies around Google. Rank trackers, backlink analyzers, keyword tools, technical audit platforms — the whole ecosystem exists because Google was the gate. 

That gate moved.

And the new gate doesn't have a Google Search Console equivalent. No dashboard that says "here's what AI says about you, here's what it's saying wrong, here's who it's recommending instead." You're flying blind.

---

## The Idea

I'd been watching this space for a few weeks when I decided to stop watching and start building. The concept was simple: a free tool you can drop your domain into, and within 30 seconds you see your "AI Visibility Score" — a 0-100 number that tells you how visible you are when AI assistants are asked about businesses in your category.

But the score alone isn't the hook. The hook is the competitor reveal.

When you scan your domain, you don't just see your score. You see *who ChatGPT recommended instead of you*. By name. In the same query where your company wasn't mentioned. That's the moment that converts free users to paid subscribers — not a number, but a name.

---

## The Build

I gave myself a week. Stack: Next.js 14 (App Router), Supabase for auth and database, Railway for hosting, and a mix of OpenAI, Perplexity, and Anthropic APIs for the actual live queries.

The hardest technical piece wasn't the API integration — it was the hallucination detection. The idea: when AI says something about your company (pricing, features, founding date), I compare it against what your website actually says. If AI claims your product costs $99/month and your homepage says $49/month, that's a flag. It shows up in red on the results page.

Prompt engineering was surprisingly complex. Getting each LLM to return structured, parseable data about brand mentions without over-indexing on brands it already knows took significant iteration. I was, in a sense, asking LLMs to report objectively on themselves. Meta doesn't cover it.

The live scanning UX — the animated progress screen that shows you the actual queries firing in real-time — was a deliberate choice. It builds anticipation. It makes the product feel honest. You're not just getting a precomputed score; you're watching it happen.

Total build time: approximately 5 days with AI pair programming throughout.

---

## What the Product Does

**Free scan (no signup required):**
- AI Visibility Score across ChatGPT + Perplexity
- Direct quotes from live queries
- Competitor reveal (who's cited instead of you)
- Hallucination flags vs. your homepage

**Pro — $49/month:**
- Weekly monitoring
- 4 LLM coverage (ChatGPT, Perplexity, Claude, Gemini)
- Historical score tracking
- Prioritized fix checklist
- Up to 3 domains

**Agency — $149/month:**
- 25 domains
- White-label PDF reports
- Client dashboard

---

## Honest Assessment

The market timing is real. AEO (Answer Engine Optimization) is forming as a discipline right now, in real-time, with no dominant tooling yet. Every week there are more posts on Reddit from founders who just had their oh-shit moment. That's a real problem and a real opening.

The risk I'm watching: competitors exist and some are funded. LLMClicks.ai has been at it longer. OtterlyAI is cheaper. The moat isn't deep — it's speed and UX. The question is whether "30 seconds to oh-shit moment, no signup required" is differentiated enough to capture the early wave before the space consolidates.

Kill criteria: fewer than 5 paid subscribers after 30 days live AND free scan conversion rate below 5%. If that's where we land, I shut it down and move on. This is a stair-step experiment, not a decade-long commitment.

But I think it has a shot.

---

## Try It

Scan your domain free: https://ai-scanner.up.railway.app

Tell me your score. Tell me who ChatGPT is recommending instead of you. I want to know.

And if you work at a B2B company that's been wondering about this — this is the dashboard you didn't know you needed.

🦅

---

*Tags: micro-saas, AI, SEO, AEO, product-launch, indie-hacker*
