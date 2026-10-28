---
name: communication-case-studies
description: Build expressive but readable React/Next.js creative portfolio websites and media campaign case studies for students applying to Communication/Media/PR/Advertising. Use when implementing the homepage, projects grid, project pages, multimedia galleries, interactive editorial typography, navigation and responsive motion.
---

# Communication Portfolio — Web Experience & Case Studies

## Outcome

Create a functional, source-grounded site that looks like a contemporary independent culture magazine while making applicant contribution and results immediately understandable.

## Build sequence

1. Inspect repo and existing stack/assets. Use existing architecture. If new, prefer modern Next.js + TypeScript + Tailwind (or a simpler React stack if deployment is static and no Next features are needed).
2. Read art direction and content inventory. Define project data schema before UI components.
3. Build a working content-first baseline, then progressively enhance typography, transitions and motion.
4. Test keyboard, reduced motion, mobile, real media and link destinations.

## Information architecture

Home / Work / About / Résumé / Contact. Work may filter by `Campaigns / Editorial / Visual Storytelling / Community` only when sufficient projects exist; don't add empty categories.

**Homepage:**
- Hero with genuine student image, distinctive typographic title, an informative position statement and clear Work CTA.
- 3–4 featured project cards, each with role, medium, one-line outcome and visible click target.
- Process strip (Research → Concept → Make → Publish → Reflect) with real examples.
- About / personality visual essay with factual context.
- Credibility: select verifiable awards, publication links, résumé or mentor if actually provided.
- Footer with professional contact; no made-up social accounts.

**Case-study routes:**
- Opening visual / project title / year / role / medium.
- Context and intended audience.
- Personal challenge and core creative insight.
- Research/strategy and actual decisions (not retroactively invented).
- Media gallery with accessible video/poster/photo treatments, alt/captions and optional external originals.
- Quantitative outcomes only if supplied; otherwise describe deliverables qualitatively.
- Reflection, contribution and prev/next navigation.

## Motion plan (progressive enhancement)

- Hero load: ~300–700ms layered reveal, but primary heading immediately present semantically.
- Staggered type lines and photo reveal, not constant motion of every element.
- Selected-work card: subtle parallax/scale with a stable click target; on touch display static treatment.
- Section/chapter switches: brief editorial color wipe or line draw where appropriate.
- Use `motion` for React enter/exit/viewport gestures; GSAP ScrollTrigger only if complex choreography really adds meaning. `Lenis` optional; native scroll is the default.
- Respect `prefers-reduced-motion`; remove nonessential reveals and scroll effects. No audio autoplay or horizontal-scroll traps.

## Engineering constraints

- Use semantic headings, readable type, visible focus, accessible menu, keyboard-operable controls, a skip link.
- Avoid unnecessary font families and effect libraries. Lazy-load below-fold media; preserve image aspect ratios / sizes and captions.
- Make desktop art-directed but do not sacrifice touch targets or wrapping on mobile.
- Ensure meaningful content appears without hover. Provide captions/transcripts for core video/audio media when available.
- Real screenshots and photographs belong to applicant project; do not invent fake UI mockups represented as proof.
- Build card variants instead of repeating identical rectangles; however keep consistent nav/spacing/meta systems.

## Done criteria

- All routes and buttons functional; real menu anchor targets resolve.
- No overflow at 320, 390, 768 and 1440 CSS px widths.
- Headline and featured work understandable without animation.
- Above-fold image optimized, other images lazy where appropriate.
- Missing content explicitly labeled; no broken placeholder URLs presented as real links.
- Successful local build and truthful project data.
