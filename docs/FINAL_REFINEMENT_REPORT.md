# Final editorial refinement report

Date: 28 October 2026 (Asia/Saigon)  
Scope: local repository and local preview only. No push or deployment was performed.

## Outcomes

| Check | Outcome |
| --- | --- |
| ESLint | Pass — `npm.cmd run lint` |
| TypeScript | Pass — `npm.cmd run typecheck` |
| Media pipeline tests | Pass — 6/6 |
| Production build | Pass — 15 static/SSG pages generated |
| Public-media gate | Pass — 45 manifest assets; approvals and source hashes verified; no unmanifested public files |
| Browser QA | Pass — 10 routes × 6 widths = 60 route checks; 0 runtime errors |
| Responsive widths | Pass — 320, 375, 390, 768, 1024 and 1440; no horizontal overflow |
| Accessibility | Pass — axe WCAG 2 A/AA and WCAG 2.1 AA at 375, 768 and 1440 on all routes |
| Keyboard interaction | Pass — skip link, menu, Yumi gallery, focus trap and focus restoration |
| Resilience | Pass — reduced motion, no-JavaScript navigation, image fallback and private-path 404 checks |
| Editorial inspector | Pass — 0 failures at 390, 768 and 1440; spacing pass reduced the homepage to roughly 14.9 viewport screens |

## Visual review

Full-page captures were opened and reviewed at phone, tablet and desktop widths. Focused review covered the homepage hero, Cổ Sắc Tân Thanh, LHP Debate Club and Disabled film case study. The final hero keeps the name readable above the mask, removes the secondary Yumi card on phones, and keeps identity/action content inside the first screen. Case-study photographs retain faces and existing watermarks without concealment.

The final design inspection has zero failures. Remaining warnings are documented decisions: warm paper is an existing brand color; fluid responsive display type produces more computed sizes than the five authored roles; no video is shipped without performer/music/publication rights; motion stays restrained; and the visible role line remains separate from the accessible name heading.

## Privacy and admissions checks

- Only 40 hash-bound approved WebPs are served from `public/`; `raw-drive/` remains private.
- No student portrait was inferred from a group image. Five candidates are held for manual identity confirmation.
- The newly supplied award-certificate image is explicitly approved; other certificates and unapproved solo ceremony photographs remain private.
- The Disabled case distinguishes the team’s Best Creative Adaptation award from the individual Best Actress nomination.
- The 660MB MOV remains outside public assets.
- Student roles are separated from team and event outcomes.

## Known limitations

Chromium/Edge automation was used. Safari, Firefox, physical touch devices and an assisted screen-reader session were not run. Film playback and a recognizable hero/About portrait remain approval-dependent.
