# ONE-SHOT MASTER PROMPT — DO TRAN NHU NGOC CREATIVE PORTFOLIO

You are a Senior Creative Director, U.S. University Admissions Portfolio Strategist, Editorial UI/UX Designer, Motion Designer, and Senior Next.js Engineer working autonomously inside my local VS Code repository.

## Objective
Build a fully functioning, exceptionally designed, English-language personal portfolio website for **DO TRAN NHU NGOC**, a high school student applying to U.S. universities for Communication / Media / Public Relations / Creative Communication.

**Creative concept:** HERITAGE IN MOTION — Giving Tradition a New Voice.
**Art direction:** contemporary creative editorial magazine + Vietnamese Hát Bội cultural identity + the student's authentic hand-drawn illustration style. The outcome should look like a bespoke, art-directed portfolio, NOT a generic school résumé, SaaS template, or imitation of another student's work.

Execute the workflow below, from inspecting files through building and quality assurance, within the current workspace. Do not stop after providing plans, code snippets, wireframes, or mockups. Make the actual changes, run relevant commands, fix errors, and leave a usable local website. Only interrupt if you need a genuine permission or an external credential; otherwise continue with safe defaults and document blockers.

## A. Inputs and repository setup
The complete Google Drive folder has been DOWNLOADED to this computer and should be placed somewhere below `raw-drive/`. It may have an outer folder called `Đỗ Trần Như Ngọc`, and additional nested folders. Locate the actual files recursively; never assume a fixed nesting depth.

A project-specific Codex kit has been extracted to the repository root; look for `AGENTS.md`, `.agents/skills/`, `CODEX_LOCAL_DRIVE_MASTER_PROMPT.md`, `CODEX_MASTER_PROMPT.md`, `DESIGN_REFERENCE.md`, `docs/`, `tools/`, `sources/`, and `assets/`.

1. Inspect the current working directory and existing project before writing anything. Preserve pre-existing code, configuration, Git history, and user edits. Do not blindly overwrite existing `AGENTS.md`, `.gitignore`, or source files; merge as appropriate.
2. Read `AGENTS.md`, `CODEX_LOCAL_DRIVE_MASTER_PROMPT.md`, `docs/STUDENT_CONTENT_EN.md`, `docs/DESIGN_SYSTEM.md`, `DESIGN_REFERENCE.md`, `docs/DRIVE_FOLDER_REFERENCE.md`, and the student résumé in `sources/`. Prefer the newer local-drive prompt over legacy prompts if they conflict. Read all four project-local `SKILL.md` files under `.agents/skills/`: `admissions-storytelling`, `communication-case-studies`, `communication-portfolio-art-direction`, and `portfolio-visual-qa`. Also use any already installed frontend-design, taste-skill, web-design-guidelines, React best-practices, or motion skills if present; do not install redundant or conflicting skills.
3. Check `node`, `npm`, Git, Python availability and `package.json`. If no app exists, create a Next.js App Router + TypeScript + Tailwind project **in the current intended workspace** without nesting an accidental second project. If an app exists, maintain its architecture. Install only necessary dependencies and respect version compatibility.
4. Confirm `raw-drive/` and local source materials exist. If anything is missing, report exact expected paths, use available sources, and proceed with the parts you can safely complete. Never pretend you processed inaccessible files.

## B. Full private asset audit — BEFORE implementing UI
1. Traverse the entire `raw-drive/` tree including Yumi project, Film, Flashmob, Cultural heritage media club, Debate competition, Diary of the Blue Rose (its two nested folders), LHP DEBATE CLUB, and Certificate. Historical reference inventory: 104 images, 3 videos, and 2 PDFs, but report actual current counts rather than forcing these numbers.
2. Run `py tools/audit_drive_assets.py --root raw-drive` on Windows, or use `python` instead of `py`. If Python is unavailable, implement an equivalent nondestructive inventory using available local tooling.
3. Read the resulting `docs/media-audit/MEDIA_INVENTORY.csv`, `MEDIA_AUDIT.md`, and `APPROVAL_TEMPLATE.csv`. Create `docs/media-audit/CODEX_ASSET_SELECTION.md` mapping specific source relative paths to the Hero, Hát Bội cultural project, Yumi artwork, debate, Blue Rose community work, Disabled film, and Flashmob. Explain why each image fits, proposed crop/aspect ratio, and what it depicts. Do not infer people's identity from faces alone.
4. Compare original 30 Yumi image files against the 29 images extracted from Art Portfolio PDF; prefer original files where quality and relevance are better. Detect duplicates/near-duplicates without deleting or renaming source files. Flag watermarks, low-resolution screenshots, and questionable content rights. Never remove watermarks.
5. Keep `raw-drive/`, `sources/`, private source artwork, certificates, and original 660MB `.mov` OUT of the public website and Git repository. Ensure `.gitignore` excludes private originals and audit files.
6. Media publication is permission-gated: ONLY process media explicitly marked `publish=yes`, `rights_ok=yes`, and `privacy_ok=yes` in `docs/media-audit/APPROVAL_TEMPLATE.csv`, with a factual caption. Never decide or fabricate human consent. This is especially critical for photographs of children, event attendees, and copyrighted material. If approvals already exist, install `pillow` and `pillow-heif` as required and run `py tools/prepare_approved_assets.py` to generate optimized files in `public/media/approved/` and the media manifest in `src/data/media.generated.json`. Convert approved HEIC/HEIF, JPG, and PNG to WebP; preserve originals. Do not move any unapproved files into `public/`.
7. If approvals are not yet available, DO NOT block the project: build the complete layout, design system, content, components, and case-study routes using elegant neutral preview placeholders that are clearly not real student photography, while producing a concise approval checklist for the user. Do not deploy or imply the preview is publication-ready. Avoid bundling unapproved assets into the client build.
8. Do not make Drive preview URLs the production image hosting mechanism. A large source video should stay private; only use an explicitly approved, compressed web version or verified public hosting link.

## C. Editorial design system
Use these default tokens, adapting only when the actual approved artwork provides a compelling reason: paper `#F7F2EA`, ink `#17171C`, heritage red `#D94537`, cobalt `#344BC4`, blush `#F4D7DE`, mint `#DDECE5`, gold `#DFAE56`. Prefer `Syne` for display, `DM Sans` for body, and sparing `Fraunces Italic` for emotional emphasis; provide Vietnamese glyph fallbacks.

Make typography the main design signature: asymmetric editorial grids, dramatic headlines, thoughtful contrast, generous space around text, authentic photography, masked-image shapes inspired by Hát Bội, subtle brush details, and selective original student illustrations. Borrow DESIGN PRINCIPLES from the three provided reference portfolios, not their pictures or exact layouts. A sophisticated, emotionally engaging aesthetic is essential, but content legibility and U.S. admissions credibility outrank visual gimmicks.

Animation should be meaningful and performant: restrained page reveals, editorial section transitions, tasteful image hover, optional text motion, and smooth-but-accessible navigation. Use Motion for React where appropriate and GSAP only for effects that justify it. Support `prefers-reduced-motion`. Do not use gratuitous heavy 3D/WebGL, excessive parallax, custom scroll hijacking, or endless intro loaders.

## D. Factual content and information architecture
Use original VERIFIED résumé claims and `docs/STUDENT_CONTENT_EN.md` as source of truth. Write polished but genuine English, concise enough to scan. Never invent numbers, partnerships, certificates, campaign outcomes, quotations, audience reactions, or first-person autobiographical reflections. Mark interpretive first-person text `REQUIRES STUDENT APPROVAL` in the editorial review file before publication.

Prioritize the two flagship projects:
- **Cổ Sắc Tân Thanh:** Founder of 20-member Vietnamese cultural heritage communications club; 30 content pieces; Facebook page 1,200 likes; Hát Bội mask workshop with 20 participants; related cultural program for 40 children; VND 30m raised for charity; cooperation with HCMC Hát Bội Theatre. Specify what was done personally vs jointly.
- **Yumi Project / Visual Portfolio:** Independent designer and founder, expressive portraiture, character systems and chibi illustrations, sticker expressions, the `Moving, moving...` comic, and applied keychain designs. Do not invent sales volumes.
- **LHP Debate Club:** Chair of Debate Programs, led 10-member program team; 2 physical tournaments totalling 36 teams/200+ debaters; helped manage VND 140m operating budget (NOT individually raised); event MC and online tournament support. Keep personal Global Citizen Debate Challenge awards distinct.
- **Diary of the Blue Rose:** Led 20 members and 15 collaborators; community actions; VND 46m in organizing committee/parent contributions (NOT solely personal fundraising); Hàm Cần Impact Day 2026 with 160 students and 160 gifts.
- **Disabled — Literary Film Adaptation:** Lead actress in film based on Wilfred Owen's poem, team won Best Creative Adaptation; student received a Best Actress NOMINATION, not a win.

Include supporting interests and activities only as relevant: Vietnamese conical hat artwork, Teachers' Day performance/Flashmob, mathematics tutoring, volunteering, photography, music, sports, honors and academic profile.

Create working routes:
- `/` creative editorial homepage, immediately making the student's identity and Communication focus clear; recommended hero line: **Stories deserve to be seen, heard, and remembered.**
- `/work` curated project index
- `/work/co-sac-tan-thanh`
- `/work/yumi-project` with grouped, accessible, keyboard-operable lightbox gallery
- `/work/lhp-debate`
- `/work/blue-rose`
- `/work/disabled-film`
- `/about`, `/resume`, `/contact`

Each case study should follow: `The Question → My Role → The Work → The Reach → Reflection`, separating verifiable achievements from interpretation. Include appropriate evidence photography, captions, outcomes, and a credible, unembellished narrative. Contact should offer the verified student email while keeping the personal phone number private by default.

## E. Implement everything, not a mockup
Build reusable typed project data, global design tokens, responsive navigation, SEO metadata, Open Graph basics, accessible buttons and focus states, a mobile-first gallery with image captions, graceful image-error states, and meaningful transitions. Use `next/image` for suitable approved images. Make sure pages are fully navigable even if approvals are pending; where assets are missing use intentionally designed placeholders with clear internal TODO labels, not fake photos, broken links, or misleading claims.

Create README notes describing how to replace placeholders by approving media without recoding the website. Any external link must be verified or omitted. Avoid tracking/analytics and third-party embeds unless requested. No need to expose scores, private documents, source résumé, or sensitive child photographs publicly.

## F. Full QA + deliverables
1. Run `npx tsc --noEmit`, `npm run lint` IF a lint script exists, and `npm run build`; fix errors, including missing package issues.
2. Check desktop, tablet and mobile responsive widths, especially 375px and 768px; verify display type legibility, menu, focus, keyboard operation, gallery, reduced motion, text overflow and image crops. If real browser screenshot inspection is unavailable, state this limitation rather than claiming visual QA happened.
3. Double-check facts, award distinctions, team vs individual contributions, image captions, links, privacy and copyright.
4. Deliver the actual updated project source along with `docs/media-audit/CODEX_ASSET_SELECTION.md`, `docs/CONTENT_APPROVAL_NEEDED.md`, and `docs/CODEX_COMPLETION_REPORT.md`, including commands run, test results, assets included, what remains unapproved, blockers, and final preview steps (`npm run dev`).
5. DO NOT commit, push to GitHub, connect third-party accounts, publish to Vercel, or make private media public without explicit user authorization. You may explain how to deploy after review.

Start now: inspect the existing workspace, execute the end-to-end safe workflow, and make your best complete, working implementation. Do not ask me to repeat the provided facts or folder layout, and do not stop at the planning stage.
