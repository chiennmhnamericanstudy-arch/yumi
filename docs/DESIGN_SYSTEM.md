# HERITAGE IN MOTION — Visual Direction & Implementation

**North star:** An independent cultural magazine reinterpreted for a Gen-Z communicator. Contrast daring editorial hierarchy with the student's gentle, cobalt-outlined character illustration style. NOT a generic scholarship landing page, and NOT a maximalist spray-paint clone.

## References to reinterpret (never copy)
1. Le Hoang Bach: black-and-white portrait/collage, typography as emotional chapter markers, graphic intensity and narrative arc.
2. Phan Nguyen Linh Dung: red-black editorial pages, documentary performance photography, large type and strong section dividers.
3. Nguyen Phuc Son: dynamic asymmetric page layouts, hand-drawn marks, strong project headlines and proof-oriented galleries.
4. Ngọc's *own* 2026 Visual Portfolio: cobalt outlines, pastel/chibi characters, energetic small expressions and personal illustration-led visual storytelling (actual art in `assets/art`). The fourth reference should prevail in personal identity decisions.

## Palette (usage, not rigid templates)
- Warm paper background: `#F7F2EA` (55–65% surfaces)
- Ink dark: `#17171C` (text, dividers, hero panels)
- Heritage vermilion: `#D94537` (Hát Bội/project 01 accent; 5–10%)
- Character cobalt: `#344BC4` (illustration/project 02 accent; 5–10%)
- Blush: `#F4D7DE` (art gallery decorative background)
- Pale mint: `#DDECE5` (community softer sections)
- Muted gold: `#DFAE56` (occasional cultural details only)
- True white `#FFFFFF` (cards/content where needed)

Typography: `Syne` for editorial large headlines; `DM Sans` for accessible body and UI; `Fraunces` italic for occasional emotional quotes or small editorial accents. Use 2 regular font families at a time where possible, ensure Vietnamese glyph support for every font and fallback. Never use graffiti fonts as body text.

## Composition
- Desktop: 12-column editorial grid; 1440px max content; 24–64px gutters; generous negative space; bold picture-first case study covers; tall portrait columns next to text; numbered issue-like project indexes `01 / 05`.
- Mobile: fully designed single-column 375/390px layout; avoid horizontal overflow and tiny typography; no hover-dependent info; face and headline remain legible.
- Hero: one exceptional real image with constrained overlay OR illustrated composition using original student art. Do not substitute a fictional headshot. Suggested mix: typographic treatment `NHU / NGOC` + original character motif (clearly artwork) + candid proof image, with a straightforward role statement.
- Header: sticky minimal editorial navigation; brand / Work / Studio / About / Résumé / Contact.
- Section motifs: abstract brush strokes or angular borders created with CSS/SVG, but **never imitate a sacred/traditional Hát Bội symbol inaccurately**; use actual documented mask artwork when possible.
- Gallery: 2–4 columns desktop masonry using CSS columns/grid; preserve artwork aspect ratios and original credits; preview opens accessible lightbox with captions, keyboard Esc/arrow support.
- Case study page: one dramatic hero followed by human-readable Context / Role / Approach / Evidence / Reflection, alternating polished imagery and concise narrative. Show numbers near the relevant artifact, not as uncontextualized boasting.

## Motion
- Subtle viewport reveals: 280–650 ms.
- Entrance typography stagger only at the opening; meaningful image clip reveals and underline drawing.
- Gallery tilt/parallax only slight, optional and disabled for reduced motion/touch.
- Project-card interaction: controlled image crop/scale <=1.04, editorial title underline/counter.
- No scroll hijack, page-trapping preloader, constant Marquee of crucial text, autoplay audio, drag-only interactions, flashy particle backgrounds.

## Section ordering
Hero → featured **Cổ Sắc Tân Thanh** → statement/verified stats → Yumi illustration studio → Debate → Diary of the Blue Rose → Disabled film → Behind the Creative Voice (about + dance + hands-on volunteering) → select awards → contact.

## Engineering acceptance
- Next.js App Router, TypeScript, Tailwind (if starting new) or adapt existing stack after audit.
- Local optimized copies of all images. Never hotlink Drive thumbnail URLs as primary site images.
- Use next/image responsive `sizes`, descriptive alt based on actual content, lazy-load below fold.
- Generate SEO metadata, Open Graph and route-specific metadata.
- Accessibly keyboard-operable gallery and visible focus; WCAG AA body contrast; prefers-reduced-motion support.
- Image sources must not be confused with independent identity/face verification.
- Any website copy in `STUDENT_CONTENT_EN.md` labeled proposed reflects advisor-authored drafts; ask student to confirm first-person voice before publication.
