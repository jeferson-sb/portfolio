---
id: 9k3m7qlz2p
title: "Use Case: Decoupling a CPU-Bound Core on heavy Astro Calculations Logic"
published_at: 2026-09-06T12:00:00.000Z
tags: nodejs, architecture, performance, decision-making
excerpt: "Most mobile app logic is I/O-bound. This is the story of the exception — a core that did real numerical computation on-device — and the decisions involved in pulling it into its own Node.js package: not just 'make it faster', but what that unlocks for bundle size, tooling, algorithm design, and the very different failure modes of a serverless backend."
slug: decoupling-a-cpu-bound-core
crosspostedOn: ''
crosspostLink: ''
og_image: https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/og%2Fdecoupling-a-cpu-bound-core.webp?alt=media&token=73e6de05-ef2d-41bc-93dc-c31727b5c3e4
---

Most of what a mobile app does is I/O with a UI wrapped around it: fetch data, render it, respond to a tap, fetch more data. The CPU is rarely the bottleneck; the network and the human are. This project had a genuine exception to that: a feature whose core was real numerical computation — planetary positions, house cusps, aspects between bodies, all derived from an astronomical library rather than a database call.

Just pure calculation, no side-effects. The **how** in what I treated this, let's say, unusual case is what actually brings me lessons to future decisions.

That difference in kind, not just degree, is what made every decision after it unusual, and it's what I actually want to write about: not the classes involved, but the reasoning behind pulling this logic out of the app entirely and rebuilding it as its own thing.

## Recognizing the shape of the problem before reaching for a fix

The instinct when something is slow on a phone is to optimize where it runs: memoize, debounce, move work off the render path. None of that addresses the *actual shape of this problem*, which was that a piece of numerical logic had ended up living inside a client at all.

The computation depends on a date, a time, and a place. It was never about the device asking for it, never on the specific user beyond those three inputs. Logic like that doesn't have a natural reason to be duplicated across every install; it has a natural reason to live in exactly one place and be asked, not recomputed.

That reframing — "this isn't a performance bug, it's a placement bug" — is the actual first decision, and it's the one that made every later decision (algorithms, caching, packaging) manageable instead of being a pile of unrelated optimizations bolted onto a mobile codebase.

So instead of adding any new feature or fixing any immediate bug, I sat and thought to myself: "I need to gently reframe the team decision around building new things until we are certain how the core feature work, how can we add test coverage and how do we make life easier for people to onboard the project in the future".

> <i>"When you find you have to add a feature to a program, and the program's code is not structured in a convenient way to add the feature, first refactor the program to make it easy to add the feature, then add the feature.”</i> ― Martin Fowler, Refactoring: Improving the Design of Existing Code

## Understanding the core

I could see that 70% of features (the ones that relied on astro computations) had a few TypeScript classes that were responsible for handling most of the operations. From this starting point, I began looking for the main types and domain-specific language like "Ascendant", "Houses", "Ephemeris" and understood it's object shape and each method at a **high level**.

From that point forward, I could see where the core feature computation begins, which configurations it receives and the multiple scenarios we had to test. Because that's the thing with this project is that there are so many scenarios between planet A x planet B, planet C x sign Z, so on and so forth, not to mention the date manipulation work (astronomical computations relied on another time system).

At the heart of it, we had this:

```c
int32 flag = swe_calc_ut(
  info[0].As<Napi::Number>().DoubleValue(),
  info[1].As<Napi::Number>().Int32Value(),
  info[2].As<Napi::Number>().Int32Value(),
  xx,
  serr
);
Napi::Object obj = Napi::Object::New(env);
```

The main function used for celestial objects calculations that was expose to the Node.js library via Node-API (N-API).

```ts
const positionInSky = swe.calc_ut(
  julianDate.universalTime,
  id,
  flags
)
```

## Deciding the unit of decoupling: unified package

Once the logic was clearly misplaced, the next question was what to extract it *into*. A tempting, smaller move would have been: keep it in the app, just make the native binding faster. That would have fixed one dimension (speed) and left two others untouched:

- **Bundle size.** The app was carrying ephemeris data files and a native module as shipped assets, on every install, regardless of whether that user ever opened the astrology feature that week. Any client-side fix leaves that weight in place; only moving the computation off the client removes it.
- **Freedom to build other things around it.** Logic embedded in one mobile app's codebase, bound to that app's runtime, can only ever be called from that app. A standalone Node package behind a small API can be called by the app, by an internal admin tool, by a batch job that precomputes something overnight, by a completely different client built later — none of which exist yet, but none of which are possible at all if the logic never leaves the mobile repo. That optionality was a bigger part of the decision than the performance number, even though performance is the easier thing to point at afterward.

So the unit of decoupling was deliberately bigger than "refactor this class": it was "this becomes its own core package, with its own release cycle, consumed by the app over a network boundary instead of compiled into it." Makes sense?

## The problem doesn't have one algorithm

Once I had decoupled the core, the team begins to ask? How do develop the new feature? Do we know what's necessary? The feature in question was doing astro forecasts (sounds fancy but it's basically more calculations and parameters to "predict" a result).

This is the part I think is easy to get wrong if you treat "compute an conjunction duration" as a single problem with a single best algorithm. It isn't.

I learned two important things from this:
- Clever math looks cool but doesn't cover all edge cases
- Two or more algorithms strategies is better than one

So, let's say computing positions in the sky iteratively on a algorithm that varies depending on the case is not only more readable but also easy to extend than having a complex one-size-fits-all solution.

And yes for this problem I actually am talking about the Strategy Pattern being used:

```ts
class AspectEstimationShort implements Strategy {}
class AspectEstimationLong implements Strategy {}

const sourceEph = new SourceEphemeries(new AspectEstimationLong())
```

## Latency at the edge of the platform, not just the algorithm

Getting the computation itself fast and correctly-shaped is only half the latency story once it's living behind a cloud function instead of inline in the app. Serverless platforms like GCP's Cloud Functions pay a cold-start tax when a request lands on an instance that isn't already warm. For a feature people tend to check once a day out of habit, that's precisely the shape of latency users notice — not "the app is slow," but "it was slow that one time."

The lever that's specific to *this* problem, more than most: the output is unusually cacheable. Two different users asking "what's transiting right now" at the same moment are asking the exact same question about the sky — the answer doesn't depend on who's asking, only on a timestamp. That's a much stronger caching story than most per-user application data gets, and it's worth deciding deliberately whether the cache lives close to the compute (in-process, per warm instance) or in front of it (a shared layer that also smooths over cold starts by serving a recent answer while a fresh instance spins up).

For this problem, I sticked to cache close to the compute as a initial improvement and also to avoid giving "incorrect" forecasts since this is very time-sensitive and per-user, we decided to allow some latency as a trade-off.

## The throughline

Every decision above traces back to the same first move: noticing that a piece of logic was CPU-bound and placement-independent, and treating that as an *architectural fact rather than a performance complaint*.

Decoupling it became a question of unit (a package, not a refactor) because the payoff wasn't only speed. The algorithm question stopped being "make the loop faster" and became "does this problem actually have one shape, or does it have two" once it became clear the same routine's cost varied wildly depending on the inputs it happened to get. And the latency question at the infrastructure layer turned out to have a lever — caching a fact that's true for everyone, not just one user — that doesn't exist for most application data at all.

Thankfully enough, from this use case I was able to come up with really documentation around the library and the "new" core, so the idea of not only "Don't leave broken windows" but also making things more understandable to everyone. We pulled out the "mystery" behind how the app worked under the hood to something anybody can dig deeper, extend features or bring something totally new.

Fun stuff! Until next time.
