---
name: portfolio-visual-qa
description: Audit, debug and refine a completed creative admissions portfolio website for visual consistency, usability, accessibility, responsive layout, links, media playback, reduced-motion and factual integrity. Use immediately before declaring the site ready, or when the user asks for review/fixes.
---

# Portfolio QA — Visual + Admissions + Engineering

## Use this checklist in order

1. **Build sanity:** inspect scripts/dependencies, run installed lint/typecheck/build commands as available, log blockers accurately.
2. **Source audit:** cross-check claim-level data against provided student sources. Flag anything inferred, falsely credited, placeholder, unverifiable or copied from other students' PDFs.
3. **Admissions 30-second skim:** Above fold says who student is and medium/interest; Work link visible; selected projects explain unique role and output; no unsubstantiated superlatives.
4. **Visual:** look at screenshots at 1440×900, 1024×768, 768×1024, 390×844 and 320×700. Check text contrast, clip/crop, image quality, overlapping type, unintended line breaks, blank fold and footer.
5. **Function:** every nav item, project/card, carousel, contact action, résumé download and social link must work. Hide or annotate unprovided links rather than point to `#`.
6. **Accessibility:** keyboard-only navigation, focus visibility, skip link, meaningful alt text, heading hierarchy, robust overlay/menu states, form labels/errors if forms exist.
7. **Motion:** test normal and `prefers-reduced-motion: reduce`; reading/navigation must remain fully functional, with no mandatory intro, flashing, scroll-jacking or cursor trap.
8. **Performance:** check above-the-fold media size, font count/weights, lazy loading, CLS from missing dimensions, unnecessary JS motion libraries.
9. **Privacy:** confirm no confidential file names, minor's private data, identifiable children photos without public permission, personal mobile numbers in published source.

## Execution

Use available project tools (Playwright, browser devtools, screenshots, browser testing skill). Do not claim screenshots or successful tests that were not actually run. If browser automation is unavailable, execute available static checks and state visual checks remain to be performed manually.

## Output report

Deliver `QA_REPORT.md` with `Pass / Needs Fix / Blocked` for each area, prioritized issues (P0: broken claims/links/access; P1: mobile/readability; P2: cosmetic), changes made and remaining limitations. Fix P0/P1 issues when repo writes are available.
