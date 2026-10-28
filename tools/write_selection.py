from pathlib import Path
import csv,json
root=Path(__file__).resolve().parents[1]; out=root/'docs/media-audit'
items={r['id']:r for r in json.loads((out/'VISUAL_INDEX.json').read_text(encoding='utf-8')) if 'id' in r}
with (out/'APPROVAL_TEMPLATE.csv').open(encoding='utf-8-sig',newline='') as f:
    approval_rows=list(csv.DictReader(f))
approved_count=sum(all(r.get(k,'').strip().lower()=='yes' for k in ('publish','rights_ok','privacy_ok')) for r in approval_rows)
manifest=root/'src/data/media.generated.json'
included_count=len(json.loads(manifest.read_text(encoding='utf-8'))) if manifest.exists() else 0
choices=[
(19,'Hero / heritage cover','Painted and unpainted opera masks on a table with brushes and paint trays.','4:3 or 3:2; retain complete painted mask and tools.','Strong object-led entry into the cultural project without assigning a face identity.'),
(8,'Heritage detail','One red-and-black painted mask among unpainted masks.','Portrait 2:3; retain mask edges.','Clear material detail; verify maker and photographer credit.'),
(15,'Heritage workshop','Participants paint masks at a table.','Portrait 3:4; preserve hands and masks.','Shows the activity; recognizable attendees require permission. No identity assertion.'),
(17,'Heritage documentation','A participant holds a camera at the workshop.','3:4; no identity inference.','Supports documentation context, not proof of who took photographs.'),
(114,'Yumi / Editorial Portraits','Purple-haired illustrated character with stars, bows and hand-drawn marks.','Full original 3:4, contain.','Original Woman.png exceeds extracted artwork-01 resolution.'),
(86,'Yumi / Editorial Portraits','The Beauty of a Woman illustrated poster with white-haired character.','Full poster 3:4; no text cropping.','Same visual as artwork-06; original preferred. Character and text rights need student confirmation.'),
(97,'Yumi / Character Systems','Sheet of expressive cobalt-outlined chibi heads.','Square contain.','Shows consistent character language; compare artwork-04.'),
(85,'Yumi / Comics','Moving, moving... multi-panel illustrated comic.','Full 2107:3203; contain and enlarge in lightbox.','Higher resolution than extracted artwork-12; preserve reading sequence.'),
(75,'Yumi / Applied Illustration','Hand holding a small blue-haired character keychain.','Square; retain object and hardware.','Original is 3060 square versus 2200 extracted artwork-26.'),
(90,'Yumi / Applied Illustration','Blue character keychain lying on a wooden surface.','Full 3:4.','Original 2160x2880 exceeds extracted artwork-02.'),
(72,'LHP Debate Club','Presenter with microphone reading from notes.','Portrait 2:3; keep microphone and hands.','Useful event communication evidence; confirm identity before naming presenter.'),
(67,'LHP Debate Club','Group at a colorful club display under a red canopy.','3:2; preserve group.','Documents club participation; keep visible credit and obtain group consent.'),
(25,'Personal debate honors','Competition group holding a Regional Champion sign.','3:2, preserve sign and all faces.','Personal competition section only, distinct from LHP organizing role.'),
(29,'Blue Rose / Hàm Cần','Classroom activity with a presenter and pupils facing a screen.','4:3; retain lesson context.','High-quality HEIC. School/guardian and photographer permissions required.'),
(38,'Blue Rose / Hàm Cần','Children receiving gifts beside a mural.','4:3; preserve activity.','Illustrates gift distribution; especially sensitive identifiable children.'),
(49,'Blue Rose / visits','Volunteers handling packages at a community activity.','4:3; no location or identity inference from image alone.','Possible supporting service evidence after event verification.'),
(51,'Disabled film','Person holding a certificate at an award backdrop.','3:2 or 4:3; keep certificate intact.','Award ceremony documentation, not a film still. Verify identity and certificate category.'),
(56,'Disabled film','Audience view of a film-festival screening room.','4:3.','Context only; screen images and performer rights need review.'),
(63,'Flashmob / About','Dance group in fluorescent yellow costumes on stage.','3:2; preserve full ensemble and existing credit.','Connects to Teachers’ Day team performance; photographer watermark must stay.'),
]
lines=['# Editorial asset selection — private review','',
f'Audit: 114 images, 3 videos, 2 PDFs; 119 files. All sources preserved. Current approval CSV: {approved_count} fully approved rows; {len(approval_rows)-approved_count} other rows. Current website manifest: {included_count} optimized images. See the dated APPROVAL_DECISION and ADDITIONAL_YUMI_SELECTION records for the human-confirmed scope. The table below retains all original candidates, including held items.',
'','## Selection candidates','', '| Placement | Source relative to raw-drive | Visual description | Crop | Rationale / review |','|---|---|---|---|---|']
for id,section,description,crop,why in choices:
    lines.append(f"| {section} | `{items[id]['path'].removeprefix('raw-drive/')}` | {description} | {crop} | {why} |")
lines += ['', '## Exclusions and rights flags',
'- No face has been identified as Như Ngọc from appearance alone. A hero portrait is not verified.',
'- Yumi 52387-watermarked.jpg and PDF artwork-17 visibly contain repeated stock-style watermarks. Quarantine both; do not crop or remove the marks. Ownership requires human clarification.',
'- Artwork includes stylized characters, artist signatures and possible fan-art references. Source possession is not proof of third-party rights. Ask the student to distinguish original characters, commissioned subjects, and referenced characters.',
'- Several Flashmob images carry CLIP credits; club-event photos carry MAPLE marks; Blue Rose photos carry photographer marks. Preserve these; seek publication rights and credits. Filename-only watermark checking is insufficient.',
'- Debate7.jpg is 720x480. Yumi files ending 32_20260722131323.png (517x555) and 34_20260801172756.png (444x556), and matching PDF extracts, should not be large hero images.',
'- LHP folder Screenshot_20251124 is a Cổ Sắc Tân Thanh social profile screenshot, not debate evidence. Its historical follower count does not independently verify the résumé’s later 1,200 likes.',
'- Certificates contain signatures and personal records; keep private. Film ceremony pictures must not be described as production stills.',
'- Similar adjacent event photos are alternate frames, not necessarily exact duplicates. Choose one per moment; originals remain untouched.',
'','## Original Yumi versus extracted PDF artwork',
'The local folder has 40 image files, not the historical 30. Eleven repeated byte streams leave 29 unique images. All 29 extracted PDF artworks were visually compared to original contact sheets. The matching table is in YUMI_COMPARISON.json; pHash distances are candidate similarities, not rights or authorship verification.',
'Prefer full-resolution originals: Woman.png 2250x3000 vs 1650x2200; comic 2107x3203 vs 1447x2200; blue-haired keychain 3060 square vs 2200 square; IMG_0181.jpg 2160x2880 vs 1650x2200. Equal-resolution originals still avoid PDF recompression. Two small originals have no higher-quality PDF substitute. Do not publish the watermarked artwork from either source.',
'','## Approval steps',
'1. Review selected full-resolution originals privately and confirm captions, rights holder and required credits.',
'2. Confirm recognizable-person permissions, including organization/guardian consent where applicable.',
'3. Set publish=yes, rights_ok=yes and privacy_ok=yes only for approved CSV rows, with factual caption. Keep all other rows no.',
'4. Use section values Hero, Cultural heritage media club, Yumi / Editorial Portraits, Yumi / Character Systems, Yumi / Comics, Yumi / Applied Illustration, LHP DEBATE CLUB, Debate competition, Diary of the Blue Rose, Film, or Flashmob for automatic site placement.',
'5. Run the preparation script, then rebuild and review actual crops. Video requires a separate explicitly approved compressed file and captions; none is public.']
(out/'CODEX_ASSET_SELECTION.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
with (out/'CODEX_ASSET_SELECTION.md').open('a',encoding='utf-8') as f:
    f.write('''

## Video and PDF review

All three videos were probed and sampled in nine frames distributed across each duration. Private storyboards are video-1-storyboard.jpg through video-3-storyboard.jpg. This is a visual/technical audit, not a full real-time viewing, audio transcript, or music-rights review.

| Source relative to raw-drive | Technical findings | Visible content / selection |
|---|---|---|
| Đỗ Trần Như Ngọc/Cultural heritage media club/Bản sao của Bản sao của VID_20260731_091447_360.mp4 | 7.24 seconds, H.264 960x540, AAC, 791,711 bytes | Group with masks waves at camera; attendee/child permissions required. No public use. |
| Đỗ Trần Như Ngọc/Diary of the Blue Rose/Hàm Cần Impact Day 2026/Bản sao của IMG_3145 3.MOV | 11.81 seconds, HEVC 1920x1080, AAC, 12,241,355 bytes | Classroom group with children holding small objects; sensitive identifiable children. No public use. |
| Đỗ Trần Như Ngọc/Film/Disabled super final.mov | 9:54.04, H.264 1920x1080, AAC, 660,317,904 bytes | Narrative scenes in an outdoor garden and corridor, a wheelchair, credits and visible subtitles. A garden scene near 3:51 could be a future poster candidate after performer/production approval. Do not identify actors from faces. Full caption and music review still needed. |

The 14-page art PDF was rendered as a private page contact sheet and its text extracted. The certificate PDF is a one-page MAPLE collaborator certificate; it is supporting private evidence, not a new award. The other three students’ reference PDFs are absent; only the supplied design summaries were available.

Yumi pHash comparison: 37 of 40 original-file comparisons have distance 0 to the closest PDF artwork; three have distance 2. These counts include repeated files. Visual comparison confirms matching subjects; originals are preferred for resolution and avoidance of PDF recompression. SHA-256 establishes 11 exact repeat files; pHash alone does not establish identical content.
''')
