# Image selection manifest — editorial refinement

Date: 28 October 2026  
Scope: local working website only; no push or deployment authorized in this refinement.

## Publication gate

The authoritative machine manifest is `src/data/media.generated.json`. It contains 45 optimized WebP files whose source rows currently have `publish=yes`, `rights_ok=yes`, and `privacy_ok=yes` in `docs/media-audit/APPROVAL_TEMPLATE.csv`.

| Area | Approved public images | Current use |
| --- | ---: | --- |
| Cultural heritage media club | 6 | Hero atmosphere, Hát Bội chapter, Cổ Sắc Tân Thanh case study |
| Debate competition | 5 | Debate case-study competition evidence and personal-recognition context |
| LHP Debate Club | 3 | Homepage debate chapter and program-management case study |
| Diary of the Blue Rose | 6 | Homepage field notes and community case study, including four Hàm Cần Impact Day 2026 photographs |
| Film | 3 | Disabled cover, award ceremony replacement, festival-documentation gallery and homepage film chapter |
| Flashmob | 8 | Homepage performance essay and About performance archive; visible CLIP marks preserved |
| Yumi original artwork | 14 | Hero artwork, atmospheric collage, homepage studio archive and keyboard gallery |

## Derived hero asset

`src/assets/hat-boi-performer-v2.webp` is the current transparent-background hero asset supplied in the latest user attachment (`Ornate Chinese Opera Performer.png`) and optimized to WebP (866×768, alpha, ~178 KB). It replaces the earlier `hat-boi-mask-cutout-v1.webp` in the hero. The previous asset remains in source history but is no longer referenced by the homepage. The illustration is used as an editorial opera-performer object, not presented as a documentary photograph or historically authenticated Hát Bội costume.

## Film replacement asset

The user explicitly approved the supplied `MEITU_20260515_210512816.jpg` for local publication on 28 October 2026. It is optimized as `film--bff093c47f.webp` and is now the first Film media item, replacing the screening-room image on `/work`. The caption identifies Như Ngọc and the Best Creative Adaptation certificate; the award distinction remains documented in the case study.

## Student portrait shortlist — manual identification required

No image is currently labeled with verified identity as Như Ngọc. These candidates are not to be used as the student portrait until the student identifies herself and confirms the intended crop:

1. `raw-drive/Đỗ Trần Như Ngọc/Cultural heritage media club/Bản sao của 616467984_122165365028919420_3975705344014126208_n.jpg` — approved for publication as a generic participant image; identity is unconfirmed.
2. `raw-drive/Đỗ Trần Như Ngọc/LHP DEBATE CLUB/Bản sao của MC.jpg` — approved for publication as a generic presenter image; identity is unconfirmed.
3. `raw-drive/Đỗ Trần Như Ngọc/Debate competiton/Bản sao của Debate7.jpg` — clear speaker view; not approved in the current public manifest and identity is unconfirmed.
4. `raw-drive/Đỗ Trần Như Ngọc/Film/MEITU_20260515_210512816.jpg` — source candidate replaced by the user-supplied approved copy; now published as the Film index image with certificate consent recorded in the approval CSV.
5. `raw-drive/Đỗ Trần Như Ngọc/Film/MEITU_20260515_211335436.jpg` — clear solo award portrait; certificate/personal-data review and identity confirmation required.

Until one candidate is manually identified, the hero deliberately uses authentic Hát Bội material and original Yumi artwork rather than implying that another person is the applicant.

## Film and video hold

The three approved film images document the award ceremony, screening and team ceremony. Additional production stills and solo ceremony photographs remain private. The original MOV is not copied to `public`; a compressed, captioned preview requires separate performer, music and publication-rights confirmation.
