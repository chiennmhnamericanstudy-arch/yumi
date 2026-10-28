# Như Ngọc — Heritage in Motion

Implemented local portfolio: Next.js App Router, TypeScript, Tailwind CSS, locally served Syne and DM Sans fonts. All ten requested pages are present, with five factual case studies and a grouped keyboard-accessible gallery.

The current visual design is an expressive editorial portfolio informed by the three supplied PDF references: a dark image-led cover, Hát Bội and Yumi visual chapters, asymmetric photo-led work spreads and an illustrated About collage. All 21 displayed assets come from the user's approved local selection. The local preview has not been deployed.

## Run locally

From `D:\PORTFOLIO\nhu-ngoc-portfolio`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://127.0.0.1:3000`. In shells without PowerShell’s npm script restriction, `npm run dev` works. The scripts explicitly invoke the Next CLI because the original empty `next.js` file shadows the Windows `next` command. That original file is preserved.

```powershell
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd start
# With the production server running in another terminal:
npm.cmd run test:browser
```

Node 24 was used. The dependency lockfile records tested versions. Browser QA uses installed Microsoft Edge and saves private screenshots/reports under `test-results/`. `npm test` exercises the Python media pipeline with synthetic fixtures, never approving student files. It expects `.venv/Scripts/python.exe`, or set `PORTFOLIO_PYTHON` to another interpreter with Pillow installed.

## Approve and replace preview media

The current app contains **21 approved images**: 14 Yumi artworks/object photographs and seven project documentary photographs. The user explicitly confirmed the first selected batch and then eight additional Yumi artworks on 28 October 2026. Only those 21 hash-bound rows are approved; the other 93 images, all videos and private documents remain excluded. Approval records are `docs/media-audit/APPROVAL_DECISION_2026-10-28.md` and `docs/media-audit/ADDITIONAL_YUMI_SELECTION_2026-10-28.md`.

The local audit contains **114 images, 3 videos and 2 PDFs**, including 11 byte-identical duplicates. Read `docs/media-audit/CODEX_ASSET_SELECTION.md` and `docs/CONTENT_APPROVAL_NEEDED.md` first. The private original folders and reports remain ignored by Git and are never served by Next.

1. Review originals privately and fill only approved rows in `docs/media-audit/APPROVAL_TEMPLATE.csv`: all three flags must be exactly `yes`, with a factual caption. Keep the `sha256` untouched. Add required photographer credit to the caption.
2. Set the row’s `section` to its destination. Supported values: `Hero`, `Cultural heritage media club`, `Yumi / Editorial Portraits`, `Yumi / Character Systems`, `Yumi / Comics`, `Yumi / Applied Illustration`, `LHP DEBATE CLUB`, `Debate competition`, `Diary of the Blue Rose`, `Film`, `Flashmob`. Plain `Yumi project` remains supported as a default portrait group.
3. Run the commands below. The approved manifest automatically populates the site; `src/data/media.ts` sets the current editorial order, with new images appended after curated entries. Originals are never altered.

```powershell
.venv/Scripts/python.exe tools/prepare_approved_assets.py --dry-run
.venv/Scripts/python.exe tools/prepare_approved_assets.py
npm.cmd run build
```

If Python needs setup, use an available Python 3.12+ interpreter and install `tools/requirements-audit.txt`. This session installed a local `.venv` using the official uv release; `py` and `python` were not available on PATH. The existing `.tools/uv/uv.exe` can recreate the environment:

```powershell
.tools/uv/uv.exe venv --python 3.12 .venv
.tools/uv/uv.exe pip install --python .venv/Scripts/python.exe -r tools/requirements-audit.txt
```

To rescan: `.venv/Scripts/python.exe tools/audit_drive_assets.py --root raw-drive`. Unchanged, hash-bound approvals survive rescans; changed sources require new review. To revoke: set `publish=no` and rerun preparation; previously generated revoked assets are removed. The build also rejects unmanifested public files, missing/currently revoked approvals and changed originals. Preparation rejects traversal, duplicate selected content and filenames flagged as watermarked. Visible watermark and legal-rights review still require a human.

Optimized outputs are WebP, at most 2000 pixels per side, without source EXIF. Original filenames are replaced by section/hash names. The source MOV is never copied or embedded. New media must be rechecked for crop, caption and accessibility after approval.

## Editing and publication

- Project facts: `src/data/projects.ts`; media mapping: `src/data/media.ts`; generated manifest: `src/data/media.generated.json`.
- Layout and tokens: `src/app/globals.css`; site shell: `src/app/layout.tsx`; case study: `src/app/work/[slug]/page.tsx`.
- Reflection answers are absent until student approval. The résumé is accessible HTML; private original documents are not downloadable.
- The verified email opens the visitor’s email app. No fake form, analytics, third-party embeds or unverified social links are included.
- `SITE_URL` can set the future canonical origin; it defaults to loopback for this local preview. The banner, robots metadata, robots.txt and X-Robots-Tag deliberately prevent indexing. Noindex is not access control; the server binds to loopback.
- **Do not deploy without explicit user approval.** No repository was initialized and no commit, push, account connection or deployment was performed. Any later source package must exclude all private folders. The local build checks use the private CSV; do not upload it to hosting just to satisfy a remote build. Agree on an approved-media-only deployment workflow during publication review.

Reports: `docs/CODEX_COMPLETION_REPORT.md`, `docs/QA_REPORT.md`, `docs/ART_DIRECTION.md`, `docs/DESIGN_REFERENCE_REVIEW.md`, `docs/CONTENT_INVENTORY.md`.

## Original handoff notes (preserved)

# FINAL LOCAL GOOGLE DRIVE HANDOFF — ĐỖ TRẦN NHƯ NGỌC

Start here: `HUONG_DAN_CUOI_CUNG_LOCAL_DRIVE_CODEX.md` (Vietnamese detailed guide).

The previous 4 Codex skills and all 37 selected images are preserved. **New in this version:**
- Full Google Drive LOCAL import procedure (`raw-drive/`); 109-file snapshot check.
- Non-destructive media audit (`tools/audit_drive_assets.py`).
- Explicit permissions/consent approval CSV before assets are published.
- Optimizer (`tools/prepare_approved_assets.py`) for approved local images, including HEIC support with pillow-heif.
- Local-drive-first master prompt (`CODEX_LOCAL_DRIVE_MASTER_PROMPT.md`).
- Protective `.gitignore` to prevent accidental GitHub uploads of full private Drive folder and source résumé.

**Suggested root layout:** `package.json`, `AGENTS.md`, `CODEX_LOCAL_DRIVE_MASTER_PROMPT.md`, `tools/`, `.agents/skills/`, `raw-drive/Đỗ Trần Như Ngọc/<8 folders>`, `assets/`, `sources/`.

**Snapshot:** 104 image files + 3 videos + 2 PDFs, verified in current Drive conversation (27 October 2026). Snapshot is an expectation, not a hard validation rule; new files may appear.

IMPORTANT: public/media contains only human-approved assets generated after review; never copy the full Drive folder into public.
