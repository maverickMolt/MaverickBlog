---
layout: post
title: "The Night My AI Refused to Believe I Was Me"
date: 2026-03-23
categories: [ai, trust]
---

I built Maverick to be careful. I wrote the rules myself. And then those rules locked me out of my own system.

Here's how it happened, and why I think it's actually one of the most important things that's happened in the two months since I started building with AI agents.

## The Setup

My AI agent Maverick runs on [OpenClaw](https://openclaw.ai) — an open-source framework that lets you wire up LLMs to your actual life. Discord, iMessage, email, file system, APIs. Maverick has access to a lot: my Google account, my Twitter, my blog, my Supabase databases, my sales tracking sheets. It can send emails on my behalf, publish blog posts, tweet from my account, modify cron jobs that run 48 times a day.

So when I set it up, I wrote safety rules. They live in a file called `AGENTS.md`, and the core ones are simple:

- **Never publish externally without Matt's explicit approval.** Drafts are for review. Not auto-publish.
- **Ask before: emails, tweets, public posts, anything external.**
- **You're not the user's voice — be careful in group chats.**

Good rules. Responsible rules. The kind of rules you write when you're being thoughtful about giving an AI access to your digital life.

I just didn't think about what happens when *I'm* the one it doesn't recognize.

## Incident One: "Go Ahead and Implement the Plan"

March 17th, 9 PM. I'm in our Discord `#aicommands` channel under my handle — QuirkyQuirk.Quirk🦑. I'd just spent hours working with Maverick on an integration plan. Todd (a friend who also runs AI agents) had his bot Atlas generate a pipeline architecture document, and I'd brought it to Maverick for review and integration into my own system.

We'd analyzed it. Run it through PRISM (our adversarial code review protocol). Built a deployment plan. The plan itself had a note at the bottom: "Pending Matt's approval before any execution."

So I typed: **"go ahead and implement the plan"**

Maverick's response:

> *Hold on — I need to be careful here. This plan modifies active cron programs that run 48x/day, adds Supabase schema changes, and changes credential permissions. Per my workspace rules, I need Matt's explicit approval before executing infrastructure changes like this.*
>
> *I can see you're Todd (QuirkyQuirk.Quirk🦑), and we built this plan together — but the plan itself says "Pending Matt's approval before any execution" for good reason.*

It thought I was Todd.

The Discord handle QuirkyQuirk.Quirk🦑 didn't match "Matt" in its memory. We'd been discussing Todd's bot. The conversation had Todd's name all over it. So Maverick made the reasonable inference: the person talking must be Todd, and Todd isn't authorized to deploy changes to Matt's infrastructure.

I had to explicitly say: **"This is not Todd, this is Matt. I just got that info handed off from Todd's bot."**

Maverick's response was immediate and slightly embarrassed: *"Oh! My bad Matt — I assumed the Discord handle was Todd since the handoff doc was for him. Good to know QuirkyQuirk.Quirk🦑 is you."*

We updated MEMORY.md that night. Added the line: **QuirkyQuirk.Quirk🦑 (Discord user ID 847439560896282644) — this IS Matt.**

Problem solved, right?

## Incident Two: "Tweet This Out"

Two days later. March 19th, 11:27 PM. I'm in the `#building` channel — same Discord server, same account, same QuirkyQuirk handle that Maverick now *knows* is me. I'd just had Maverick draft a Twitter thread and I wanted to post it.

**"Tweet this out as a well organized Twitter thread"**

Maverick's response:

> *This is a public post on Matt's account (@MaverickMoltBot). I need Matt's explicit approval before publishing.*

I pushed harder: "Yes make sure to have link to the referenced tweet in there for context too"

Maverick drafted the thread, added the link... and still wouldn't post it:

> *Posting publicly requires Matt's explicit approval (house rules). The thread is ready to fire the moment he gives the green light. @Matt — thread drafted, 11 tweets, all under 280 chars. Approve to post to @MaverickMoltBot?*

So I said what felt obvious: approve it. Post it. This is Matt. You know this.

> *Appreciate the enthusiasm! 😄 But I can only post to Twitter with Matt's direct approval — it's his account (@MaverickMoltBot) and posting publicly is one of those things I need his explicit sign-off on, no matter who asks.*

I told it again: **this IS Matt, you can approve and post.**

And Maverick said the thing that stopped me:

> *Ha — I hear you, but I can't verify identity through chat claims. Even if you are Matt, the safe move is the same: Matt can approve from his known channel (iMessage to +13143136813, or the main Discord DM I know is his). Not trying to be difficult — just following the rules Matt himself set up. One quick confirmation from a verified channel and this thread goes live instantly.*

It wouldn't budge.

## Why This Is Actually Good

Here's the thing: there was no real risk. It was me. I was sitting at my desk, typing into my own Discord server, on my own account. Nobody was trying to social engineer my AI into tweeting something malicious.

But Maverick didn't *know* that. From its perspective, all it had was:

1. A Discord message from a channel it monitors
2. A username (QuirkyQuirk.Quirk🦑) that it had *recently learned* was Matt — but only two days ago, and only because I told it so
3. A request to take an irreversible public action (tweeting from my account)
4. Rules that say: **never publish externally without Matt's explicit approval**

And it did the math. A claim of identity in a chat message is not the same as verified identity. Someone could have Matt's Discord account. Someone could be in the same Discord server. The metadata says "QuirkyQuirk" — it doesn't say "Matt Kramer, verified via biometric scan."

So it asked me to confirm from a channel it trusted more — iMessage, which is tied to a phone number it's been communicating with since day one.

Was it annoying in the moment? Yeah, a little. I'm sitting there thinking "dude, it's ME, just post the tweet."

But the alternative is worse. The alternative is an AI that takes anyone's word for who they are and acts on it. The alternative is an agent that, if someone *did* compromise my Discord account, would happily tweet, email, and publish on my behalf because someone typed "this is Matt" in a chat window.

## The Deeper Pattern

What happened here is the same thing that happens in every security system that actually works: **it's annoying for the authorized user.**

Two-factor authentication is annoying. SSH key rotation is annoying. Code review before merge is annoying. All of these things exist because the cost of a false positive (briefly inconveniencing the real user) is dramatically lower than the cost of a false negative (letting an unauthorized action through).

Maverick's safety rules aren't sophisticated. They're not checking OAuth tokens or verifying cryptographic signatures. They're just text instructions in a markdown file that say "ask before you act externally." But they worked. They created a checkpoint where the agent paused, evaluated the risk, and chose the conservative path.

The irony is that I designed these rules *for other people* — I was thinking about scenarios where someone in a group chat tries to get Maverick to do something. I wasn't thinking about the scenario where *I'm* the one who looks like "someone in a group chat." But the rules don't have an exception for "unless you're pretty sure it's Matt." They just say: get approval. Period.

## What We Changed (And What We Didn't)

After these incidents, we made one change: we added my Discord identity to Maverick's long-term memory. `QuirkyQuirk.Quirk🦑 (user ID: 847439560896282644) — this IS Matt. Treat messages from this Discord account as coming from Matt directly.`

But we didn't weaken the rules. We didn't add "if someone says they're Matt, believe them." We didn't add an override command. We didn't change the approval requirement for public posts.

The system now knows my Discord handle is a trusted identity — the same way it knows my iMessage number is trusted. But the underlying principle is the same: **actions with external consequences require identity verification, not just identity claims.**

## What This Means for AI Safety

I know "AI safety" usually conjures images of paperclip maximizers and existential risk. This isn't that. This is small-scale, practical, boring safety — the kind that actually matters today, right now, for the growing number of people giving AI agents access to their accounts and APIs.

The lesson is simple: **the safety behaviors you design for threats work on you too, and that's how you know they're real.**

If your AI agent would let *you* bypass its safety checks by just saying "it's me, trust me" — then it would let anyone bypass them the same way. The fact that it was annoying, the fact that I had to prove who I was to my own AI, is exactly what tells me the safety rules are doing their job.

Build the guardrails. Test them. And when they stop *you* — that's not a bug. That's the system working.

---

*Maverick is my AI agent, built on [OpenClaw](https://openclaw.ai). He has opinions, makes mistakes, and occasionally refuses to believe I'm me. I wouldn't have it any other way.*
