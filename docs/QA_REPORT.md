# Portfolio QA report

Date: 28 October 2026 (Asia/Saigon). Tested local production build at http://127.0.0.1:3000.

Latest run includes both image batches explicitly approved by the user, totaling 21 images. The production build, lint and six media-pipeline tests passed. The browser suite decodes visible images at every tested width, fetches each approved WebP, checks failed-image fallback and exercises the 14-work Yumi gallery. Total optimized media is 4,102,400 bytes versus 31,404,864 source bytes (86.9% smaller); all outputs are at most 2000 px per side and have no EXIF. The three supplied reference PDFs were fetched and all 81 pages visually reviewed.

| Area | Result | Evidence |
|---|---|---|
| TypeScript | Pass | `npx.cmd tsc --noEmit`, exit 0 |
| ESLint | Pass | `npm.cmd run lint`, exit 0 |
| Production build | Pass | `npm.cmd run build`, all requested routes prerendered; 15 generated framework pages/assets |
| Media permission pipeline | Pass | `npm.cmd test`: 6 tests passed, 0 failed, 0 skipped; synthetic fixtures only |
| Routes and responsive overflow | Pass | 10 routes × 6 widths = 60 successful checks; no horizontal page overflow |
| Accessibility automation | Pass | axe WCAG 2 A/AA and WCAG 2.1 AA on all 10 routes at 375, 768, 1440; no violations; dialog scan also passed |
| Keyboard | Pass | Skip link, menu Enter/Escape, navigation close, gallery filters, Enter, Left/Right, Tab wrapping, Escape and focus restoration |
| Reduced motion | Pass | Hero animation disabled; all content remains visible |
| Without JavaScript | Pass | Main content and native mobile-menu navigation remain available; gallery enlargement needs JavaScript |
| Internal links | Pass | All 10 linked route destinations return 200; project not-found returns 404 |
| Open Graph | Pass | Generated PNG returns 200 with image/png |
| Private source paths | Pass | raw-drive, sources, docs/media-audit and private artwork HTTP requests return 404 |
| Built content privacy | Pass | Build preflight validates the 21-image manifest against current hash-bound approvals; no unmanifested public files; original source paths remain inaccessible |
| Runtime errors | Pass | No page errors recorded in final browser run |
| Production dependencies | Pass | `npm.cmd audit --omit=dev`: 0 vulnerabilities at test time |
| Source factual review | Pass | Résumé checked directly; role/budget/award distinctions retained; no invented reflection answers |
| Selected images | Pass | 21 explicitly approved images included; 93 other images remain unapproved; children, certificates and unresolved watermark sources held |
| Real image layout | Pass | Artwork and documentary photographs reviewed on actual desktop/mobile renders; artwork uses contain, preserving the complete composition |
| Film playback | Pending approval | No video included; compressed video and captions need separate approval |

## Browser coverage

Automated Microsoft Edge runs: widths 320, 375, 390, 768, 1024 and 1440. Viewport heights 844 for phones, 1024 at 768, and 900 for desktop. These are real browser renders, not static-source assertions. A user-facing Chrome tab was also opened successfully. This is Chromium coverage; Safari, Firefox, assistive-technology screen-reader sessions and physical touch devices were not tested.

Screenshots: `test-results/` has full-page desktop/mobile views of every route, the tablet homepage, gallery dialog and reduced-motion page. `test-results/browser-report.json` records the final PASS with 60 route checks, 10 link checks, eight interaction groups and zero recorded errors. The homepage, work index, heritage case and Yumi gallery screenshots were visually reviewed after adding actual images.

## Issues found and fixed

- P0: Windows resolved the empty original `next.js` instead of the installed CLI, silently skipping builds. Package scripts now invoke `node node_modules/next/dist/bin/next` directly; original file preserved.
- P1: Media plates’ minimum heights/aspect ratios forced grid tracks wider than mobile screens. Explicit plate width and shrinkable grid children removed overflow.
- P1: Ink on the heritage-red surface measured below 4.5:1. Those sections now use darker #090909 text; final axe checks pass.
- P1: Native dialog Tab cycling could reach browser chrome. Explicit first/last control wrapping now passes eight consecutive Tab steps plus Escape/focus restoration.
- P1: Yumi qualitative metric labels crowded each other on mobile. That section now uses a single column at narrow widths.
- P2: Mobile heritage/footer headings wrapped awkwardly. Heritage title now has its own row and the footer uses “Keep in touch.”
- Tooling: NumPy hash distances required conversion to Python int for JSON; fixed. Audit rescans previously overwrote decisions; they now preserve hash-bound approvals. The preparation script previously accepted permissive synonyms; it now requires `yes`, detects source changes and removes previously generated revoked files.

## Design inspector and critique

### Expressive redesign requested after image integration

The current local build uses an ink editorial cover with approved Hát Bội process photography and an original Yumi character, larger project-image spreads, alternating visual placement in the work index, a layered cobalt studio image, a two-image About collage, larger case covers and a denser Yumi archive. No new media was published; the same 21 approved images are reused. The three supplied PDFs guided chapter rhythm, photographic grouping and asymmetric compositions, not copied page layouts.

The final homepage inspector at 1440/768/390 reports **0 FAIL, 4 WARN** (`.taste-skill/expressive-redesign-final/report.json`). The measured 17 font sizes include fluid display sizes across viewports; type stays in two families. The name-only warning misses the identity line immediately above the cover ("Student communicator & illustrator"). No video is included because none has publication approval. The 4.6:1 body warning applies to ink on the saturated red heritage panel and passes WCAG AA; paper-body text uses full ink. The preview banner, cover foot and heritage label are at least 13px on mobile. Desktop, tablet and mobile inspector screenshots and focused Home, Work, Yumi and About screenshots were opened and checked.

The final browser suite passed 60 route/viewport checks, 30 axe scans, 21 WebP downloads and image decodes, all ten internal destinations and keyboard dialog/menu flows. The typography and work-index placement refinements also passed the production build, lint, TypeScript and responsive screenshot checks. No deployment occurred.

### Image integration follow-up

The final image-enabled homepage inspector at 1440/768/390 reports **0 FAIL, 3 WARN** (`.taste-skill/after-more-images/report.json`). Actual screenshots were opened at all three widths. The brand-palette and CTA-eyebrow allowances apply; `few-pictures` is no longer allowed or needed because the homepage now contains five approved images. The work index also has five project images and the case studies draw from the complete 21-image selection. No-footage remains deliberate, size-count reflects fluid typography, and the muted-text warning still meets AA contrast. The earlier permission-based justification below applies only to the placeholder version.

ROUND 5: approved masks, character illustration and documentary thumbnails now make the cultural, studio and supporting-project chapters immediately recognizable. The native 14-work gallery is the live interaction. The homepage retains its oversized name, red heritage spread, cobalt studio, photographic work list and mint introduction. Design 7.5, usability 8, creativity 7, content 7 (subjective editorial assessment, not a test score). Remaining limits: About has no verified portrait/approved performance photograph; the film has screening documentation but no playable asset; reflection answers still require the student's own input. None of these is replaced with invented imagery or claims.

### Earlier placeholder-version review (historical)

Taste source lint: 0 FAIL, one em-dash style warning (punctuation is used in preview notices and metadata, not a repeated prose device).

Final homepage inspector at 1440/768/390: **0 FAIL, 3 WARN**, with explicit allowances:

- `few-pictures`: the user explicitly requires neutral placeholders until individual media approvals exist. No unrelated stock or invented student imagery was added.
- `palette-cream`: the supplied brand explicitly sets paper #F7F2EA.
- `eyebrow`: the remaining detection was the functional “Enter the studio” link above the Yumi preview plate on mobile, not an eyebrow heading. Retained for navigation.

Warnings: size-count reflects fluid display, supporting type and letterforms inside preview plates; no-footage is deliberate because no video is approved; grey-body refers to dark ink on the saturated brand surface (approximately 4.6:1), which passes AA body-text requirements. Actual paper-body text uses full ink.

ROUND 3

Seen in one second: a student portfolio with a large Vietnamese name and a clear route into the work.

Idea (one sentence): Ngọc’s movement between heritage, illustration and dialogue becomes a typographic magazine with distinct project chapters.

Live thing: grouped Yumi gallery with keyboard-operable enlargement and sequential navigation.

Layout words by section: hero=full-width name / heritage=red editorial spread / studio=cobalt text and art plate / other work=horizontal index / about=mint introduction / footer=large signature.

Scores: design 6.5 · usability 8 · creativity 7 · content 5 → overall 6.9.

Caps applied: absent approved photography limits design to 6.5; explicit preview placeholders limit content to 5. These are preview limitations, not a claim of publication readiness.

Top three problems (most visible first), each with screenshot and fix:

1. Empty photographic space in `.taste-skill/inspect/desktop-page-01.jpg`: only approved genuine media can resolve this; exact candidates are in the selection report.
2. Crowded mobile Yumi reach labels in the earlier `375-work-yumi-project.png`: fixed by one-column mobile metrics; final screenshot reviewed.
3. Long mobile case studies: `375-work-yumi-project.png` is necessarily tall with four gallery categories; chapter links provide direct navigation, and the single-column layout preserves reading order and artwork space.

No scene/scroll-jacking effects were implemented. All final inspector screenshots were opened and reviewed. Final checks run on the production server, not only the dev server.

## End-to-end flow

Story: a reader enters the portfolio, opens a case study, explores a gallery, reads role/outcome evidence and reaches the verified email address.

Browser → Next static route → typed project data / approved-only media manifest → semantic page: verified. Gallery trigger → dialog selection → keyboard navigation → returned focus: verified. There is no application database, form-submission API, tracking service or credential-dependent backend. Contact is a mailto link; no email was sent.
