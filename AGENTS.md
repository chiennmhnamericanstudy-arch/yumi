# Codex working instructions — DO TRAN NHU NGOC

Read `CODEX_MASTER_PROMPT.md` and all materials in `docs/` before modifying the site. Treat `sources/DO_TRAN_NHU_NGOC_RESUME.docx` as authoritative for biographical facts, outcomes, roles and dates; treat `sources/ART_PORTFOLIO_2026.pdf` and `assets/art` as authoritative for artistic image provenance. Visual assets must only be used as genuine documentary evidence with relevant privacy/consent review.

Prioritize a complete and working Communication admissions portfolio. Use the four project-local skills in `.agents/skills` when relevant. Other externally installed frontend/design skills may support quality but cannot override verified facts.

Current direction: HERITAGE IN MOTION; editorial cultural magazine, cobalt character art, Hát Bội documentation, carefully controlled motion and excellent accessibility.

Never invent awards, metrics, posts, customer counts or third-party recommendations. Do not credit all team outcomes as personal. Propose personal reflections for student approval. Be conservative with public display of phone numbers and photographs of children.

Ship working code, not an unimplemented plan. Audit source assets, implement, run build/lint/types, inspect responsive. Do not claim tests were run unless they actually ran.

## Final local Drive handoff — takes priority if a conflict
The user will download full Google Drive folder to `raw-drive/`. Read `CODEX_LOCAL_DRIVE_MASTER_PROMPT.md` first. Never treat `raw-drive` as public media; scan with `tools/audit_drive_assets.py`, then use explicit approval CSV and `tools/prepare_approved_assets.py`. Check `.gitignore` before Git staging. No auto-approval of children/third-party photos. Prior 37 selected assets are fallback, not evidence that all current Drive sources were inspected. Never publish a source video or student résumé from `sources/` automatically.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
