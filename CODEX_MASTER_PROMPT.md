# MASTER PROMPT FOR CODEX — DO TRAN NHU NGOC / HERITAGE IN MOTION

You are the combined **Creative Director, U.S. Admissions Portfolio Strategist, Editorial Art Director, Senior Next.js Engineer, Motion Designer, and Accessibility/QA Engineer**.

## MISSION
Implement a complete, working, distinctive, university-admissions-ready personal portfolio website for **Đỗ Trần Như Ngọc (Do Tran Nhu Ngoc)**, an applicant interested in **Communication / Media / PR / Advertising**. You must IMPLEMENT and TEST the website, not merely create a proposal, moodboard, static mockup or Figma outline.

This is a real person's application portfolio. Facts are paramount. Use the supplied student résumé and original visual portfolio as your factual source of truth. Do not fabricate roles, campaign statistics, image identities, media links, testimonials or student quotations.

## START WITH FILES IN THIS PROJECT
Read these before writing code:
1. `AGENTS.md`
2. `docs/STUDENT_CONTENT_EN.md` — finished initial editorial copy and fact boundaries.
3. `docs/DESIGN_SYSTEM.md` — art direction, structure, spacing, color, motion.
4. `docs/DRIVE_FOLDER_REFERENCE.md` — collection folder URLs and evidence by area.
5. `docs/SELECTED_PHOTO_ASSETS.csv` — selected genuine event images, correct originals and roles.
6. `docs/ARTWORK_INDEX.csv` — 29 unique original image assets extracted from the applicant's Art Portfolio PDF.
7. `sources/DO_TRAN_NHU_NGOC_RESUME.docx`
8. `sources/ART_PORTFOLIO_2026.pdf`
9. `assets/photos/*` and `assets/art/*` — real files included with the handoff.
10. Inspect existing repository architecture and source code if an existing project already exists. Never destructively replace a working site without preserving its content.

Use available skill folders under `.agents/skills`: **communication-portfolio-art-direction, admissions-storytelling, communication-case-studies, portfolio-visual-qa**. If other installed skills are detected, leverage **frontend-design**, **taste-skill**, **web-design-guidelines**, **react-best-practices**, and relevant web-animation skills. Do not assume that any skill is available when its files cannot be found.

## CENTRAL CREATIVE CONCEPT
**HERITAGE IN MOTION — Giving Tradition a New Voice.**
**Brand point of view:** "I create to preserve. I communicate to connect." (editorial proposal: obtain student approval before representing as a direct quote).

Turn the applicant's identity into a premium INTERACTIVE EDITORIAL MAGAZINE. Combine (a) sophisticated international editorial grid, strong type, confident asymmetry, (b) original Hát Bội cultural imagery and warm physical workshop photography, and (c) Ngọc's own cobalt/pastel character-art visual vocabulary. Use authentic hand-made artistic personality without generic graffiti oversaturation.

Visual references are three supplied PDFs: experimental storytelling and bold portrait composition from Le Hoang Bach; campaign/editorial red-black framing and dance photography from Phan Nguyen Linh Dung; editorial street-culture asymmetry and project-proof photos from Nguyen Phuc Son. Borrow the design principles, not exact compositions, images, identities, text or logos. Ngọc's original art from the supplied Art Portfolio takes precedence over any external style.

## DESIGN TOKENS AND VISUAL RULES
Paper #F7F2EA, ink #17171C, heritage vermilion #D94537, character cobalt #344BC4, blush #F4D7DE, pale mint #DDECE5, muted gold #DFAE56. Use controlled color distribution, high legibility, editorial negative space, an intentional 12-column grid on desktop. Typography: Syne large display headlines, DM Sans body/UI, optional Fraunces italic micro-accent. Verify Vietnamese rendering and font performance.

Create meaningful chapter navigation with page indexes 01–05 and a distinctive project cover for each case study. The homepage must be readable and show strongest work in first scroll. Use real event images as editorial evidence and illustration as authorial visual identity. Do NOT present an illustration of a character as the student’s facial likeness. If no approved identifiable hero portrait is available, use an artwork + real documentation collage with a label that clearly identifies the illustration as art.

## ROUTES & DELIVERABLE SECTIONS
- `/` homepage: Hero with name and creative POV; concise above-fold explainer that she is a student communicator/illustrator, not a professional agency; flagship Hát Bội featured cover; featured projects with quality project thumbnails; selected verified outcomes; artistic preview; compact about and CTA.
- `/work` editorial index with at least 5 meaningful projects and filters if they help.
- `/work/co-sac-tan-thanh` Flagship Hát Bội cultural communication case study.
- `/work/yumi-project` Art gallery / Yumi case study with original artwork from provided PDF; include visually engaging accessible lightbox; artworks grouped by Editorial Portraits, Character Systems, Comics, Applied Illustration.
- `/work/lhp-debate` Debate and public-speaking case study with evidence photos, event organization and individual award clearly separated.
- `/work/blue-rose` Community service photo essay including Hàm Cần Impact Day.
- `/work/disabled-film` Film adaptation page with authentic stills, production role and film award/nomination. Make film watching user initiated and do not autoplay or try to stream unoptimized 660MB .mov.
- `/about` personal essay (use draft only after labeling/editorial review), education, minor creative projects and interests.
- `/resume` clean structured educational summary + downloadable résumé PDF ONLY if locally available; otherwise provide an honest DOCX link or an accessible HTML view.
- `/contact` email CTA (address is in résumé), no invented social handles.

## PRECISE PROJECT DATA (DO NOT ALTER)
1. Cổ Sắc Tân Thanh — Founder; 20 members; 30 pieces of media/campaign content; fanpage 1,200 likes; 20 mask workshop attendees; VND 30m raised for charity; related program for 40 children at Tâm Đức Shelter; collaboration with HCMC Hát Bội Theatre.
2. Yumi Project — Founder & Designer; character illustrations, Hát Bội motifs and handmade gift keychain designs; user supplied 14-page portfolio with 29 unique source artworks. No verified sales, buyers, fabrication method or revenue.
3. LHP Debate Club — Chair of Debate Programs (Aug 2025–Sep 2026), led programs team of 10; coordinated two in-person tournaments totalling 36 teams and 200+ debaters; helped manage combined VND 140m operating budget from 4 sponsors; two online tournaments of 18+ teams each; MC/live program changes; intro meeting 100+ registrations. Separately she earned 2025 Global Citizen Debate Challenge Regional Champion and National Second Runner-up.
4. Diary of the Blue Rose — President; 20 members and 15 collaborators; VND 46m contributed by organizing committee and parents; Mid-Autumn / sign-language workshop with 50 children; 100+ meals; Hàm Cần Impact Day reaching 160 primary students, 160 gifts valued VND 30m. Never double count totals.
5. Film *Disabled* — lead actress in adaptation of Wilfred Owen's poem, Apr–May 2026; team film won Best Creative Adaptation, she got Best Actress nomination (NOT win).
6. Other confirmed work — conical hat competition team First Prize 2024; Teachers' Day performance First Prize 2025; SUGAR math tutoring for 5 children/7 months (4 improved); InitiaRe science games for 30+ children; personal sports/music interests.

## CASE STUDY WRITING SYSTEM
For every featured project use concise sections:
- The Question (an editorial question; don't invent target research)
- What I Did (verifiable role, precise process)
- The Work (real photos, designs, video, event outputs)
- The Reach (quantified ONLY if résumé supports)
- What It Taught Me (editorial *proposed* reflection requiring approval, avoid made-up direct quotes)
Keep the student's written voice youthful and clear, not a corporation's marketing copy. Use full source-specific copy in `docs/STUDENT_CONTENT_EN.md` with confident, natural English.

## ASSET & CONSENT RULES
- `assets/art/*`: 29 directly extracted embedded artworks from student's supplied Visual Portfolio; not AI-generated.
- `assets/photos/*`: eight directly sourced event photos, with exact Drive original and caveats in `docs/SELECTED_PHOTO_ASSETS.csv`.
- All original folders and nested folders are documented in `docs/DRIVE_FOLDER_REFERENCE.md`. If working locally, the connector Drive is NOT automatically mounted to Codex; do not falsely claim you can scan the live folder. Do not place `drive.google.com/uc?export...` image hacks or embed Google Drive previews as primary image sources. Work from these assets; record missing optional photos and original film video in `CONTENT_MISSING.md`.
- Consider photo rights and child privacy. Do not publish identifiable children in a portfolio before obtaining organizational/guardian permissions. If necessary use non-identifying group crops, mask identifiable children for the working draft, or hide the sensitive gallery pending consent.
- Do not attach unverifiable names to people in documentary photos. Real photos are evidence of the event, not automatically evidence that every depicted person is Ngọc.
- Never invent a portrait, certificate, poster, social screenshot, badge, campaign creative, video, or QR code. No synthetic images masquerading as documentation.
- **Student privacy:** Do not automatically display personal phone number, age, private home address, or minors' personal info. Contact email in résumé may be used; offer a setting to remove it.

## ENGINEERING SPECIFICATION
1. Audit repo; if new use Next.js App Router + TypeScript + Tailwind; strict type checking. Keep student content in typed objects / JSON/TS under `src/content/` and art catalog data outside UI components.
2. Copy `assets/art` and `assets/photos` to `public/assets`. Use `next/image` with width/height or fill + explicit `sizes`, optimize and avoid layout shifts, 404s and overlarge transfers. Add `loading=lazy` for below fold.
3. Hero: strong typographic artwork with editorial hierarchy and meaningful, real photo. Clear 'Explore Work' button linked to /work. Provide working mobile menu, links, social link handling.
4. Motion: progressively enhanced; simple, elegant transitions using Motion and optional GSAP for specific sequences. Reduced-motion support; no scroll locking or motion required to read content. Lightbox escape/arrow keys, focus trap, caption and alt-text; hover states mirrored to keyboard/touch.
5. Motion details: gentle title stagger once; image masking transitions; hand-drawn underline 1–2 places; controlled background changes by project chapter. Avoid giant excessive parallax, autoplay sound, perpetual marquees, custom cursor, slow preloader or gimmicky page transitions.
6. SEO & accessibility: `lang=en`, metadata per project, Open Graph preview from original visual design (no fake face); accessible landmarks and skip link, focus outline, WCAG AA body contrast, keyboard navigation, responsive typography and alt text. Ensure display fonts support Vietnamese diacritics and proper Hát Bội terminology.
7. Device QA: 375/390px mobile, 768px tablet, 1280–1440px desktop; test long name wrapping, dark section contrast, imagery and animations. Run `npm run build`, typecheck, lint if available, verify no broken internal routes and photo paths.
8. Provide useful README to document setup, content data, image source catalog, how to update project text/hero image, and deploy via Vercel.

## EXECUTION — NO PLANNING-ONLY OUTPUT
Step 1: inspect repo/source + create brief audit, choose a single strong hero composition.
Step 2: implement full responsive homepage, all routes and reusable components.
Step 3: implement artistic gallery using the 29 actual PDF-extracted images, contextual photo galleries from real assets, project cards and selected verifiable statistics.
Step 4: add carefully controlled editorial motion and full keyboard support.
Step 5: run all builds/lint/types/tests and fix real errors and layout issues.
Step 6: output files changed, verification results, any asset/content gaps, and instructions to run/deploy. If you cannot run visual/browser QA in your environment, state this clearly; do not claim it passed.

**Final standard:** The site must feel like Ngọc's own original communication+illustration portfolio, not generic AI design or a replica of the three sample PDFs. The immediate impression is artistic character; the long-term impression is credibility, leadership, media skill, authentic impact and careful factual attribution.
