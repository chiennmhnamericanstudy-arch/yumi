# FINAL MASTER PROMPT — LOCAL GOOGLE DRIVE + CODEX / ĐỖ TRẦN NHƯ NGỌC

You are a senior U.S. admissions communication portfolio strategist, creative editorial art director, senior Next.js engineer, and motion/accessibility specialist.

## 0. SOURCE PRIORITY AND FACTUAL SAFETY
Read in order:
1. `AGENTS.md` and this file; use this file when it differs from old `CODEX_MASTER_PROMPT.md`.
2. `docs/STUDENT_CONTENT_EN.md` and `sources/DO_TRAN_NHU_NGOC_RESUME.docx` (facts, awards, roles).
3. `docs/DESIGN_SYSTEM.md`, `DESIGN_REFERENCE.md`, `docs/DRIVE_FOLDER_REFERENCE.md`.
4. `docs/media-audit/MEDIA_INVENTORY.csv`, `docs/media-audit/MEDIA_AUDIT.md`, and `docs/media-audit/APPROVAL_TEMPLATE.csv` once generated.
5. `raw-drive/` (the full downloaded Google Drive directory, which is PRIVATE LOCAL SOURCE, never a publicly served directory), and `assets/` (legacy selected sources).
6. `.agents/skills/*/SKILL.md` and any installed taste-skill, frontend-design, web-design-guidelines, react-best-practices, accessible-animation or micro-interaction skills if present.

**Important:** The user has downloaded the COMPLETE Drive folder LOCALLY. Work from `raw-drive/` first, do NOT assume the live Google Drive URL is a usable local media API, and do NOT rely on extracting only the 29 old PDF images if original Yumi image files are available. Do not rename/move/delete originals. Review the 30 Yumi image files against the 29 embedded portfolio artworks and detect duplicates, including near-duplicates. Treat archived thumbnail art as a fallback. The archive may contain nested wrapper directories; discover recursively.

If the user has not yet completed local download, or `raw-drive/` does not exist, start with usable existing kit assets and explicitly document missing assets; never pretend to have processed inaccessible files.

## 1. INITIAL MANDATORY ACTIONS
1. Inspect current repo and check if a Next.js app exists; preserve existing code if so.
2. Verify `raw-drive/` exists and run `python tools/audit_drive_assets.py --root raw-drive`. Analyze file inventory, duplicates, probable hero imagery, artwork, events, certificates and 3 video sources. If Python is unavailable, implement an equivalent Node.js-only inventory or instruct user to use existing manifest; do not claim scan ran.
3. Do an **editorial media selection report** in `docs/media-audit/CODEX_ASSET_SELECTION.md` with best candidates for hero, cultural media, Yumi, debate, Blue Rose, film and flashmob, including filenames, factual visual descriptions and your intended crops. Mark unclear identities and missing consent as requiring human review.
4. Review `APPROVAL_TEMPLATE.csv`. Only media explicitly approved with publish=yes, rights_ok=yes, privacy_ok=yes may be placed into `public/media/approved`. If no approved media, build complete page layouts with clearly labeled private local previews/placeholders and DO NOT deploy yet. Never auto-approve all images or publish children's recognizable faces without explicit authorization. Use `python tools/prepare_approved_assets.py` only after approvals exist.
5. Generate stable typed project data and media catalog from verified facts. Never fabricate an image, source citation, testimonial, audience metrics, personal quotes, award, link or brand partnership.

## 2. CENTRAL CREATIVE DIRECTION
**HERITAGE IN MOTION — Giving Tradition a New Voice.**
Visual theme: premium interactive magazine + authentic Vietnamese Hát Bội culture + Như Ngọc's expressive character art (warm paper, deep ink, vermilion, cobalt, pink pastel).

Color tokens: paper #F7F2EA, ink #17171C, red #D94537, cobalt #344BC4, blush #F4D7DE, mint #DDECE5, gold #DFAE56.
Type pairing: Syne display + DM Sans body + sparse Fraunces italic. Ensure Vietnamese font coverage.
Borrow PRINCIPLES, not images/content/layout copies, from the three student reference PDFs.

Hero proposal: "Stories deserve to be seen, heard, and remembered." Always identify her as a current student/aspiring communicator; do not pose fictional art as a photographic likeness. Maintain authentic youth voice.

## 3. IMPLEMENTATION SCOPE
Framework: Next.js App Router + TypeScript + Tailwind; CSS grid + optional Motion for React and minimal GSAP where helpful. Prefer fast, accessible, responsive pages and intentional animation over visual overload.
Routes:
- `/` Editorial home: identity, strongest real Hát Bội work, curated projects, verified impact and personal-art signature, simple next steps.
- `/work` Work index with short descriptions.
- `/work/co-sac-tan-thanh` Cultural communication flagship: storytelling and real mask-workshop media.
- `/work/yumi-project` Creative studio gallery using original Yumi folder images; group Editorial Portrait, Character Systems, Comics, Applied Illustration; accessible lightbox.
- `/work/lhp-debate` Debate program management & public-speaking media.
- `/work/blue-rose` Volunteer photography essay, Ham Can Impact Day, verifiable context.
- `/work/disabled-film` Film imagery and click-to-watch only if optimized and approved video exists; otherwise descriptive project with a legitimate video URL only if validated.
- `/about`, `/resume`, `/contact` with actual information; email CTA, no default phone number.

Each project: The Question -> My Role -> The Work -> The Reach -> Reflection. Any first-person inferred reflection must be clearly labeled for student approval before publishing.

## 4. VERIFIED FACTS — DO NOT EXAGGERATE
Use `docs/STUDENT_CONTENT_EN.md` for exact phrasing and résumé for precedence. Highlights: Cổ Sắc Tân Thanh founder, 20-member team, 30 social content pieces, 1,200 page likes, 20-person workshop, 40 child cultural activity, VND 30m charity, HCMC Hát Bội Theatre collaboration. Yumi Project illustration and cultural keychains; no verified sales. LHP Debate Club 10-member team, two in-person tournaments 36 teams/200+ participants, **helped manage** VND 140m operating budget, plus personal debate awards listed separately. Diary of Blue Rose led 20 members/15 collaborators; contributions VND 46m from members/families, 160 Ham Can students and gifts; no double-counting. Disabled film team won creative adaptation; Như Ngọc nominated for Best Actress only. Distinguish personal work versus team outcomes.

## 5. PRIVACY, ASSETS, PERFORMANCE
Never include `raw-drive/`, `sources/`, `assets/` or `docs/media-audit` in a deployed public directory. Audit `.gitignore` before staging Git. Never commit private phone numbers, children's photos without approval, or huge source video. Identify and quarantine files with `watermarked` in their filename; do not remove watermarks. Convert approved HEIC/HEIF and JPG/PNG to optimized WebP; use responsive `next/image`. Keep 660MB .mov out of `public`, ask user for compressed video or valid hosting URL. Do not embed unreliable Drive-preview image URLs as production media.

Prepare an editorial review preview. Consent check before production deployment. Provide README and clear usage notes.

## 6. COMPLETION & VERIFICATION
Implement actual site, no generic placeholder pretending to be a real project. Run `npx tsc --noEmit`, `npm run lint` if script exists, and `npm run build`; correct failures. Verify desktop and mobile layouts, keyboard navigation, reduced-motion behavior, lightbox, image alt text, SEO metadata, broken routes, reading hierarchy and fast image loading. If browser screenshots unavailable, disclose unverified visual aspects.

Produce: (1) completed source, (2) docs/media-audit/CODEX_ASSET_SELECTION.md, (3) docs/CONTENT_APPROVAL_NEEDED.md, (4) build results and deployment checklist, (5) instructions for user's Vercel preview and final deployment. Do not actually publish without the user authorizing deployment and content rights.
