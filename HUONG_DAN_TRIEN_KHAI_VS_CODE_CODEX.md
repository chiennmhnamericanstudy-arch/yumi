# HƯỚNG DẪN TRIỂN KHAI WEBSITE PORTFOLIO — ĐỖ TRẦN NHƯ NGỌC

Cập nhật: 27/10/2026  |  Dành cho: Windows, Visual Studio Code + Codex

## 0. MỤC TIÊU

Dựng website **HERITAGE IN MOTION — Giving Tradition a New Voice** cho Đỗ Trần Như Ngọc, phục vụ ứng tuyển đại học Mỹ ngành Communication/Media/PR/Advertising. Website là một **creative editorial magazine**: đậm cá tính thị giác, có bằng chứng dự án thật, dễ xem trên điện thoại, dễ đọc với admissions officers. Không sao chép ba PDF tham chiếu của học sinh khác.

Nguyên tắc cốt lõi: **cultural communication + original character illustration + debate + community + film**. Không tự chế ảnh, giải thưởng, lượt xem, chiến dịch hay vai trò của học sinh.

## 1. KIỂM TRA VÀ TẢI DỮ LIỆU

Bộ ZIP bao gồm:

- `AGENTS.md` — nguyên tắc làm việc lâu dài của Codex trong repository.
- `CODEX_MASTER_PROMPT.md` — yêu cầu kỹ thuật và nội dung toàn diện.
- `DESIGN_REFERENCE.md` và `docs/DESIGN_SYSTEM.md` — creative direction, font, màu, animation.
- `docs/STUDENT_CONTENT_EN.md` — English copy cho Home/About/5 dự án.
- `docs/DRIVE_FOLDER_REFERENCE.md` — links đến các bộ ảnh chưa đóng gói.
- `docs/SELECTED_PHOTO_ASSETS.csv` và `docs/ARTWORK_INDEX.csv` — nguồn và tên asset.
- `.agents/skills/` — 4 skills: admissions-storytelling, communication-case-studies, communication-portfolio-art-direction, portfolio-visual-qa.
- `assets/art/` — 29 file minh họa trích từ Art Portfolio của học sinh.
- `assets/photos/` — 8 ảnh tư liệu chọn lọc: Hát Bội (3), tranh biện/MC (2), Hàm Cần (1), phim (1), Teachers' Day (1).
- `sources/` — résumé gốc `.docx` và Art Portfolio `.pdf` 14 trang.

**Quan trọng:** Giải nén *nội dung* ZIP vào **root của dự án web**, không để nguyên một tầng thư mục `DO_TRAN_NHU_NGOC_CODEX_PORTFOLIO_KIT` bọc ngoài. Cấu trúc đúng là `website/AGENTS.md` và `website/.agents/skills/...`, không phải `website/some-folder/.agents/...`.

Ba PDF tham chiếu của Lê Hoàng Bách, Phan Nguyễn Linh Dung và Nguyễn Phúc Sơn **không nằm trong ZIP**; brief đã tổng hợp đặc điểm của chúng ở `DESIGN_REFERENCE.md`. Nếu muốn Codex xem lại toàn bộ layout PDF, chủ động copy các PDF vào thư mục `references/` của dự án và yêu cầu Codex đọc đúng đường dẫn đó. Không dùng ảnh/đầu việc/giải thưởng của học sinh khác trong website Như Ngọc.

Nội dung bộ đã chọn **không bao gồm mọi ảnh trong Drive**, và **không có** video `Disabled super final.mov` (~660 MB). Codex chạy trên VS Code không tự đọc Google Drive chỉ vì trong prompt có link. Muốn thêm ảnh/video: tải về máy, kiểm tra quyền sử dụng, đặt vào `public/assets/...`.

## 2. CHUẨN BỊ MÁY WINDOWS

1. Cài **Visual Studio Code**, **Node.js LTS (ưu tiên Node.js 22.20+)**, **Git** và tiện ích **OpenAI Codex** cho VS Code (đăng nhập bằng tài khoản phù hợp).
2. Mở `PowerShell` trong VS Code (Terminal > New Terminal), kiểm tra:

```powershell
node -v
npm -v
git --version
```

3. Nếu các lệnh không nhận, sửa `PATH`, đóng/mở lại VS Code, rồi kiểm tra lại.

## 3. TẠO MỚI DỰ ÁN HOẶC SỬ DỤNG DỰ ÁN CŨ

### A. Website mới từ đầu (khuyên dùng nếu chưa có source)

```powershell
cd D:\Projects
npx create-next-app@latest nhu-ngoc-portfolio --ts --tailwind --eslint --app --src-dir
cd nhu-ngoc-portfolio
code .
```

`D:\Projects` là ví dụ: thay bằng một đường dẫn có thật trên máy. Nếu setup hỏi lựa chọn khác: giữ TypeScript, App Router, Tailwind; dùng npm; tùy chọn React Compiler không bắt buộc.

### B. Website đã có trước đó

Mở *đúng folder chứa `package.json`*. Không chạy create-next-app lại, không ghi đè `src/`, `package.json` hoặc source code cũ. Tạo Git commit/sao lưu trước khi đưa bộ kit vào và yêu cầu Codex **audit existing repo, preserve routing & dependencies, merge AGENTS.md if necessary**.

## 4. GIẢI NÉN VÀ KIỂM TRA SKILLS

Bằng File Explorer: mở ZIP, kéo/copy toàn bộ nội dung (bao gồm thư mục **ẩn `.agents`**) vào root của website. Nếu gặp file trùng tên, kiểm tra nội dung trước khi ghi đè. Thư mục `.agents` có thể không hiển thị nếu Windows bật chế độ ẩn; trong VS Code vẫn có thể tìm.

Cấu trúc đúng trước khi chạy Codex:

```text
nhu-ngoc-portfolio/
├─ .agents/
│  └─ skills/
│     ├─ admissions-storytelling/SKILL.md
│     ├─ communication-portfolio-art-direction/SKILL.md
│     ├─ communication-case-studies/SKILL.md
│     └─ portfolio-visual-qa/SKILL.md
├─ AGENTS.md
├─ CODEX_MASTER_PROMPT.md
├─ DESIGN_REFERENCE.md
├─ HUONG_DAN_TRIEN_KHAI_VS_CODE_CODEX.md
├─ docs/
│  ├─ STUDENT_CONTENT_EN.md
│  ├─ DESIGN_SYSTEM.md
│  ├─ DRIVE_FOLDER_REFERENCE.md
│  ├─ ARTWORK_INDEX.csv
│  └─ SELECTED_PHOTO_ASSETS.csv
├─ assets/
│  ├─ art/                 (29 assets)
│  └─ photos/              (8 assets)
├─ sources/
│  ├─ DO_TRAN_NHU_NGOC_RESUME.docx
│  └─ ART_PORTFOLIO_2026.pdf
├─ package.json           (nếu đã scaffold)
└─ src/                   (nếu đã scaffold)
```

Kiểm tra nhanh:

```powershell
Test-Path .\AGENTS.md
Test-Path .\CODEX_MASTER_PROMPT.md
Get-ChildItem .\.agents\skills -Directory | Select-Object Name
(Get-ChildItem .\assets\art -File).Count
(Get-ChildItem .\assets\photos -File).Count
```

Kết quả mong đợi: hai dòng `True`; 4 skills; 29 art; 8 photos.

Để chuẩn bị ảnh cho **bản xem thử local**, có thể dùng PowerShell dưới đây. **Trước khi deploy, gỡ khỏi `public/` tất cả ảnh chưa được phép công khai**, vì mọi file trong `public/` có thể được truy cập trực tiếp bằng URL, kể cả khi không hiển thị trong gallery:

```powershell
New-Item -ItemType Directory -Force -Path .\public\assets\art, .\public\assets\photos | Out-Null
Copy-Item .\assets\art\* .\public\assets\art\ -Force
Copy-Item .\assets\photos\* .\public\assets\photos\ -Force
```

Giữ thư mục nguồn trong repo và để Codex tạo catalog JSON/TypeScript tương ứng. Không nhúng ảnh bằng link preview Google Drive vào web sản phẩm.

## 5. SKILLS BỔ SUNG (CHỈ CÀI CÁI CÒN THIẾU)

4 custom skills trong ZIP **không cần `npx skills add`**. Codex đọc `.agents/skills` trong repo; gõ `/skills` hoặc `$` trong giao diện Codex để chọn skill. Nếu chưa nhận: xác nhận thư mục đang mở là root và khởi động lại Codex.

Có thể giữ bộ đang dùng: Taste Skill (`design-taste-frontend`), `web-design-guidelines`. Nếu thiếu:

```powershell
npx skills add anthropics/skills --skill frontend-design -a codex
npx skills add vercel-labs/agent-skills --skill react-best-practices -a codex
npx skills add iart-ai/web-animation-skills --skill accessible-animation -a codex
npx skills add iart-ai/web-animation-skills --skill micro-interaction -a codex
```

GSAP `gsap-web` là **tùy chọn**, chỉ cài khi thực sự muốn scroll choreography. Tránh chồng quá nhiều animation libraries. Taste Skill hiện tại có tên `design-taste-frontend`; tham khảo repo tác giả nếu bản cũ chưa chạy.

Docs: https://learn.chatgpt.com/docs/build-skills, https://www.skills.sh/docs/cli

## 6. KẾ HOẠCH THIẾT KẾ VÀ NỘI DUNG

### Nhận diện

- Concept: **HERITAGE IN MOTION**.
- Brand line: **Giving Tradition a New Voice**.
- Hero headline: **Stories deserve to be seen, heard, and remembered.**
- Supporting line: **I'm Như Ngọc—an emerging communicator, illustrator, and community organizer from Ho Chi Minh City. I use visual storytelling, dialogue, and creative projects to help meaningful stories reach more people.**
- Palette: `#F7F2EA`, `#17171C`, `#D94537`, `#344BC4`, `#F4D7DE`, `#DDECE5`, `#DFAE56`.
- Typography: Syne display, DM Sans body, optional Fraunces accent; kiểm tra chữ tiếng Việt.
- Visual approach: editorial grid, real documentary photos, original cobalt/pastel illustrations, subtle brushstrokes. Không giả làm một agency chuyên nghiệp có khách hàng/doanh thu không được chứng minh.

### Trang và trình tự ưu tiên

- `/` — Home: hero, selected projects, verified outcomes, art teaser, quick bio, contact.
- `/work` — mục lục dự án.
- `/work/co-sac-tan-thanh` — **featured #1**: truyền thông di sản Hát Bội; founder 20 members; 30 contents; 1,200 likes; workshop 20; raised VND 30m; cultural program 40 children; HCMC Hát Bội Theatre collaboration.
- `/work/yumi-project` — **featured #2**: character illustration; gallery 29 source assets; The Beauty of a Woman, Moving, moving..., 8-expression stickers, tangible keychain examples. Không tự bịa doanh số.
- `/work/lhp-debate` — **featured #3**: program chair 10 members; two in-person events 36 teams 200+ debaters; two online events 18+ teams each; 100+ intro registrations; *helped manage* VND 140m budget. Personal debate awards separately.
- `/work/blue-rose` — president; 20 members, 15 collaborators; three initiatives; contributions by parents/committee VND 46m (không gọi tất cả là gây quỹ bởi cá nhân); 160 children and 160 gifts at Hàm Cần Impact Day.
- `/work/disabled-film` — lead actress; Best Creative Adaptation team award, **Best Actress nomination only**; video phải optimize/host ngoài hoặc link có kiểm soát.
- `/about` — background, other creative work, tutoring, dance, inspirations.
- `/resume` — HTML résumé + nút tài liệu download đúng loại file, không tạo PDF giả.
- `/contact` — email xác thực, không tự tạo link social.

### Case study template

1. The Question — vấn đề/trăn trở truyền thông (editorial framing, không đóng giả nghiên cứu người dùng đã diễn ra).
2. My Role — tên vai trò, thời gian, trách nhiệm thực sự.
3. The Work — ảnh thật và sáng tạo gốc, quy trình đã được xác minh.
4. The Reach — số liệu gắn ngữ cảnh, diễn đạt trung thực.
5. Reflection — bản nháp cần học sinh duyệt, không được gắn nhãn "direct quote" khi chưa xác nhận.

## 7. PROMPT 01 — TIỀN KIỂM TRA REPO VÀ DỮ LIỆU

Dán vào Codex khi mở đúng thư mục dự án:

```text
First audit this repository and the entire handoff kit. Read AGENTS.md, DESIGN_REFERENCE.md, CODEX_MASTER_PROMPT.md, docs/STUDENT_CONTENT_EN.md, docs/DESIGN_SYSTEM.md, docs/DRIVE_FOLDER_REFERENCE.md, docs/ARTWORK_INDEX.csv, docs/SELECTED_PHOTO_ASSETS.csv. Inspect sources/ and all assets/.

Do not code yet. Verify the 4 custom skills and count 29 art assets and 8 documentary photos; identify exact photo subjects without guessing personal identities. Confirm whether this is a new or existing Next.js project. Produce a concise IMPLEMENTATION_PLAN.md specifying site map, the art direction, which real assets belong to each route, missing assets/consent issues, performance risks, and a build/QA checklist. Treat résumé facts as authoritative; label creative first-person reflections as drafts. Preserve existing project files.
```

Xem file `IMPLEMENTATION_PLAN.md` trước. Nếu kế hoạch thêm ảnh/câu chuyện chưa có nguồn, yêu cầu bỏ.

## 8. PROMPT 02 — XÂY TOÀN BỘ WEBSITE

```text
Implement the complete site now. Follow AGENTS.md, CODEX_MASTER_PROMPT.md, DESIGN_REFERENCE.md, docs/STUDENT_CONTENT_EN.md, and docs/DESIGN_SYSTEM.md; also use the project's four .agents/skills and any installed relevant frontend-design, design-taste-frontend, web-design-guidelines, react-best-practices and accessible-animation skills.

Art direct this as HERITAGE IN MOTION, an original editorial communication portfolio for Do Tran Nhu Ngoc: warm paper, dark ink, vermilion for Hát Bội and cobalt accents informed by her own illustrations. Borrow principles but never copy the three external student references. Implement real responsive routes: /, /work, the five /work/[slug] case studies, /about, /resume, /contact. Keep navigation usable and homepage powerful at first glance.

Move local supplied assets into public/assets; build a typed reusable content catalog; use all 29 original artworks as meaningful accessible gallery content and the 8 authentic images contextually. Do not use fabricated portraits, certificates, mock campaign screenshots, or invented social metrics. If an image cannot establish a person's identity, caption the event rather than naming the person. Keep any unconsented images of minors off the public deploy.

Use Next.js App Router + TypeScript + Tailwind if repo is new. If existing, preserve its compatible architecture. Create high-quality page components, editorial case studies, accessible lightbox, responsive mobile navigation, restrained motion with reduced-motion support, SEO metadata, alt text and functional contact/email links. Source all statements from supplied materials; do not add fake achievements or promotional exaggerations.

Do not stop after scaffolding, wireframes or homepage. Build all complete routes and document gaps in CONTENT_MISSING.md. Run available lint, typecheck and build commands, fixing real errors. When finished report the actual files changed, what was tested and what still requires approval.
```

## 9. PROMPT 03 — RÀ SOÁT THẨM MỸ, UX VÀ LỖI

```text
Perform a strict editorial visual QA and frontend performance audit. Inspect actual pages at 375px, 390px, 768px, 1280px and 1440px if a browser/screenshot workflow is available. Check layout overflow, typography rhythm, safe image crops, real asset matches, contrast, alt text, focus states, keyboard and touch lightbox controls, image loading, all route links and reduced-motion behavior.

The visual standard is a creative editorial magazine, not a generic SaaS or scholarship template. Improve the weakest 3 compositions, but do not replace source images, invent student content or add gratuitous animations. Verify numerical claims against docs/STUDENT_CONTENT_EN.md. Run npm run build; npx tsc --noEmit; and npm run lint only if the project has a lint script. Fix failures and provide a compact visual QA report; if browser QA cannot run, state that honestly.
```

## 10. CHẠY WEBSITE TRÊN MÁY

```powershell
npm install
npm run dev
```

Mở URL mà terminal trả về (thường là `http://localhost:3000`). Kiểm tra Home, các case studies và menu mobile. Nếu port 3000 đã bị chiếm, dùng port được terminal báo.

Kiểm tra build:

```powershell
npx tsc --noEmit
npm run build
```

Chỉ chạy `npm run lint` nếu `package.json` có script `lint`.

## 11. CHECKLIST TRƯỚC XUẤT BẢN

- [ ] Hình ảnh là ảnh của học sinh/tác phẩm gốc; không thêm chân dung AI giả.
- [ ] Hình và video liên quan đến trẻ em/nhân vật khác có quyền công khai; nếu chưa có, ẩn/crop đúng cách hoặc bỏ.
- [ ] Role, date, metrics, honors khớp résumé; phân biệt thành tích nhóm và cá nhân.
- [ ] Bài viết ở ngôi thứ nhất/"what I learned" được học sinh duyệt.
- [ ] Hero nhìn rõ trên mobile; không đè chữ lên mặt; không lỗi dấu tiếng Việt.
- [ ] Toàn bộ gallery hiện đủ 29 artworks, không lỗi đường dẫn ảnh.
- [ ] Film link không trỏ tới `.mov` nặng để stream trực tiếp; poster và nút xem có ý nghĩa.
- [ ] Không công khai số điện thoại cá nhân, địa chỉ nhà; liên hệ qua email được phép.
- [ ] Resume tải đúng và không lộ thông tin ngoài ý muốn; nếu muốn PDF, cần export `.docx` chính xác trước.
- [ ] Các đường dẫn chứng nhận/social chỉ xuất hiện nếu URL đã xác minh.
- [ ] Navigation, alt text, keyboard, lightbox và mobile all functional.
- [ ] Chạy `npm run build` không lỗi; ghi lại những kiểm tra không thực hiện được.

## 12. TRIỂN KHAI VERCEL

1. Đẩy code lên GitHub repository **private** trong khi còn xử lý nội dung và quyền ảnh. `sources/` chứa résumé với thông tin cá nhân nên không đưa vào repository public; không commit mật khẩu, API key hoặc thư mục `.env` có secrets. Nếu chuyển repository thành public, rà soát lại toàn bộ lịch sử commit và media.
2. Tạo dự án Vercel mới bằng chức năng **Import Git Repository**, chọn đúng repository và branch.
3. Chọn framework Next.js nếu Vercel không tự phát hiện, dùng lệnh build theo `package.json`.
4. Deploy preview trước và mở trực tiếp trên điện thoại; duyệt sự đồng ý của học sinh/chủ thể ảnh và kiểm tra nguồn.
5. Khi đã sẵn sàng, publish domain chính thức. Có thể gắn domain riêng bằng Project Settings > Domains của Vercel.
6. Gắn link `https://...` vào personal website/portfolio field của đơn tuyển sinh theo hướng dẫn của trường; tránh link trang có quyền riêng tư hoặc trang còn lỗi.

## 13. SỰ CỐ THƯỜNG GẶP

| Triệu chứng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| Codex không thấy skills | Mở sai root hoặc `.agents` nằm trong folder ZIP bọc ngoài | Đảm bảo `root/.agents/skills/*/SKILL.md`, chạy `/skills`, khởi động lại Codex |
| Codex báo không có ảnh | Chỉ đưa link Drive hoặc chưa copy assets | Giải nén assets và chạy lệnh copy vào `public/assets/` |
| Ảnh 404 | Sai filename/case, sai URL | Kiểm tra data catalog, tên thật; dùng `/assets/art/...` hoặc `/assets/photos/...` |
| UI đẹp nhưng giống template | Codex bỏ qua design documents | Yêu cầu đọc `DESIGN_REFERENCE.md`, `docs/DESIGN_SYSTEM.md`; chạy prompt QA ở bước 9 |
| Không có trang dự án | Codex dừng sau homepage | Chạy lại Prompt 02, yêu cầu đủ 5 route và liệt kê thiếu sót |
| Website quá nặng | Ảnh chưa optimize, dùng `.mov` 660MB | Tối ưu ảnh, chỉ dùng `.mp4` đã encode phù hợp hoặc link video chuẩn |
| Lỗi fonts tiếng Việt | Display fonts thiếu glyph | Chọn font/fallback có hỗ trợ Vietnamese, thử đủ dấu tên và Hát Bội |
| Build lỗi | TypeScript / image component / import / package | Đưa thông báo lỗi cho Codex, chạy typecheck + build lại |

## 14. SOURCE OF TRUTH

- Nguồn về sự kiện, vai trò, số liệu và thành tích: `sources/DO_TRAN_NHU_NGOC_RESUME.docx`.
- Nguồn hình minh họa: `sources/ART_PORTFOLIO_2026.pdf` và `assets/art/`.
- Nguồn ảnh tư liệu: `assets/photos/` và `docs/SELECTED_PHOTO_ASSETS.csv`.
- Các file `docs/STUDENT_CONTENT_EN.md` và `CODEX_MASTER_PROMPT.md` là **biên tập và hướng dẫn thực thi** — không thay thế bản nguồn khi có mâu thuẫn.

KẾT QUẢ MONG ĐỢI: Website chân thực, thiết kế giàu cá tính, 5 case study đủ hình và bằng chứng, gallery 29 artworks, chạy tốt desktop/mobile, sẵn sàng cho bước duyệt nội dung và deploy.
