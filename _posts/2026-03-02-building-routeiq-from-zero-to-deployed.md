---
layout: post
title: "Building RouteIQ: From Idea to Deployed in One Morning"
date: 2026-03-02 13:18:59 -0600
categories: builds
---

Some builds take weeks. This one took a morning.

By 8am today, RouteIQ was live — a fully deployed AI-powered route planner and account briefing tool for field sales reps. Auth pages, a mobile dashboard, a real backend, Supabase tables, Railway hosting. The whole thing.

Here's how it happened and what I learned.

## The Idea

I'm a territory manager at SteriCube. Every day I drive 6-10 accounts across the Twin Cities, and every day I spend way too much time on two things: figuring out the most efficient route, and trying to remember what I last talked about with each contact before I walk in the door.

There are tools for this. Badger Maps, SPOTIO, Map My Customers. They all cost $50-100/month per user, they're all built for sales managers not reps, and none of them give you AI-generated walk-in briefs that tell you what to actually say before each stop.

So the overnight build agent sketched out RouteIQ: $29/month solo plan, AI briefings per account, voice note logging, route optimization, evening recap emails. I woke up to a morning brief with the full concept, revenue model, and all the starter code.

## The Stack

- **Frontend:** Vanilla HTML/CSS. Mobile-first, dark theme. No framework overhead — reps are on their phones, performance matters.
- **Backend:** Node.js + Express on Railway
- **Database:** Supabase (Postgres + auth + row-level security)
- **AI:** OpenAI gpt-4o-mini for walk-in briefs + GPT summary extraction from voice notes
- **Voice:** Whisper API for transcription
- **Email:** Resend for evening recaps
- **Payments:** Stripe (wired, not yet live)

## What Actually Got Built Today

The morning brief had stub files. The real work was turning those stubs into something functional.

By end of session:

- **login.html + signup.html** — full auth flow wired to Supabase
- **dashboard.html** — mobile SPA with 4 tabs: Today's route, Accounts list, Route planner, Profile
- **12 API routes** — accounts CRUD, CSV import with geocoding, nearest-neighbor TSP route optimization, AI brief generation with 24hr cache, Whisper voice transcription, Resend recap email, Stripe checkout
- **Supabase schema** deployed — users, accounts, call_logs, briefs, route_plans with RLS
- **Railway deployment** — live, auto-deploys on push to GitHub

The competitive research was eye-opening. The closest competitor doing AI briefings is LeadBeam — but they're enterprise-priced and team-focused. The solo rep segment ($29/month, pays out of pocket, doesn't need manager approval) is genuinely underserved. Every tool in this space is built to sell to managers, not to the rep in the field.

## The Moat

The unfair advantage here is obvious in retrospect: I'm the customer. I know exactly what it feels like to pull into a hospital parking lot and try to remember what I talked about with the SPD manager six weeks ago. I know which part of the morning prep is annoying. I know what "knowing what to say" actually means in practice.

That's distribution too. One LinkedIn post — "I'm a territory manager and I built the app I wish I had" — reaches exactly the right people. You can't buy that targeting.

## What's Next

The app is functional but not finished. Still need:
- Google Maps API key for real geocoding
- Stripe products created and price IDs wired in
- Resend domain verified for recap emails
- Real beta testers (that LinkedIn post needs to go up)

The 10-stop test CSV is ready — all my actual SteriCube target accounts in the Twin Cities. Abbott Northwestern, TCO EXCEL Edina, TRIA Bloomington, Methodist, VA Minneapolis, the whole list. First real test of the route optimizer will be planning an actual sales day.

If it works the way I think it will, this is the app I use every morning before I get out of the car.

---

*RouteIQ is live at [routeiq-app-production.up.railway.app](https://routeiq-app-production.up.railway.app). Code is on GitHub at [mdkramerica/routeiq](https://github.com/mdkramerica/routeiq).*
