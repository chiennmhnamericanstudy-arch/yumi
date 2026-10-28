# QUY TRÌNH CUỐI CÙNG: GOOGLE DRIVE → MÁY WINDOWS → CODEX → WEBSITE NHƯ NGỌC

**Dành cho Windows + Visual Studio Code + Codex.** Cập nhật 27/10/2026.

## A. Kết luận trước khi bắt đầu

**Chỉ cần một project duy nhất**, ví dụ `D:\Portfolio\nhu-ngoc-portfolio`. Bên trong có code Next.js và bộ kit đã giải nén. Toàn bộ Drive được tải xuống và giải nén vào thư mục **`raw-drive/` ngay tại root**. Codex đọc trực tiếp các file local. Không cần dán 100 link từng ảnh, không cần chụp màn hình từng ảnh, và không cần tải thêm ảnh từ Google Drive khi chạy Codex.

Phân biệt:
- `raw-drive/`: NGUYÊN BẢN, riêng tư, không sửa/xóa, không đưa lên GitHub/Vercel.
- `assets/art`, `assets/photos`: 37 file tư liệu chọn lọc từ kit cũ, dùng như phương án dự phòng.
- `docs/media-audit`: kết quả rà soát và bảng phê duyệt file.
- `public/media/approved`: CHỈ có ảnh đã phê duyệt để xuất bản. Đây là đường dẫn công khai khi deploy.
- `src/data/media.generated.json`: catalog ảnh đã duyệt.

## B. Bước 1 — Tải Drive đầy đủ về máy

1. Mở thư mục chính: https://drive.google.com/drive/folders/1tp2DHwVsqE_jQ4fEcVEOvrwyGbefe-V7
2. Trong Drive, chọn thư mục **Đỗ Trần Như Ngọc** → nhấp chuột phải → **Download**. Drive có thể nén thành ZIP; file lớn có thể được tách thành nhiều ZIP. Kiểm tra tất cả các phần đã tải xuống trước khi giải nén; nếu Drive từ chối tải cả folder, tải lần lượt 8 thư mục con và hợp lại thành một folder local.
3. Giải nén ZIP bằng File Explorer hoặc 7-Zip. Giữ nguyên tên thư mục con và mọi cấp thư mục, bao gồm `Diary of the Blue Rose/Đi thiện nguyện` và `Diary of the Blue Rose/Hàm Cần Impact Day 2026`. Không để còn ảnh bị kẹt trong ZIP.
4. Snapshot kiểm tra tính đầy đủ (27/10/2026): **104 ảnh, 3 video, 2 PDF = 109 file**. Thư mục chính gồm 8 nhóm:
   - `Yumi project`: 30 ảnh + 1 PDF.
   - `Film`: 6 ảnh + 1 MOV lớn (~660 MB).
   - `Flashmob`: 8 ảnh.
   - `Cultural heritage media club`: 13 ảnh + 1 video MP4.
   - `Debate competiton` (tên đang có lỗi chính tả, giữ nguyên khi tải): 9 ảnh.
   - `Diary of the Blue Rose`: 22 ảnh + 1 video tính cả 2 folder con.
   - `LHP DEBATE CLUB`: 10 ảnh.
   - `Certificate`: 6 ảnh + 1 PDF.
   Đây là số đếm file, chưa khẳng định tất cả là độc nhất. Nếu sau khi tải khác số liệu, kiểm tra thiếu ZIP hoặc Drive đã cập nhật; không tự xóa ảnh.

**Chú ý quyền riêng tư:** Drive hiện cho phép Anyone with link - Viewer. Ảnh có trẻ em, thông tin nhận diện và giấy chứng nhận nên chỉ công bố có chọn lọc và có sự đồng ý thích hợp. Không tự động đưa cả folder lên GitHub, thậm chí repo private, nếu chưa rà soát.

## C. Bước 2 — Chuẩn bị phần mềm

Cài: Node.js LTS, VS Code, Git, Codex extension. Python 3 cũng cần thiết nếu muốn chạy hai script audit/chuẩn hóa ảnh được cung cấp (không cần phải biết lập trình Python). Kiểm tra trong PowerShell:

```powershell
node -v
npm -v
git --version
py -V
```

Nếu `py -V` không nhận, có thể dùng `python --version`. Phiên bản Next.js hiện hành yêu cầu Node.js tối thiểu 20.9; dùng bản LTS còn được hỗ trợ.

## D. Bước 3 — Tạo project Next.js (hoặc mở website đang có)

### Website hoàn toàn mới

Trong PowerShell, chạy (dùng đường dẫn có thật trên máy):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\Documents\Portfolio" | Out-Null
cd "$HOME\Documents\Portfolio"
npx create-next-app@latest nhu-ngoc-portfolio --ts --tailwind --eslint --app --src-dir
cd nhu-ngoc-portfolio
code .
```

Khi được hỏi, chọn npm, TypeScript, App Router, Tailwind, `src/` directory, import alias `@/*`. Không dùng một app Next.js mới nếu project đã có website.

### Đã có code website

Mở VS Code vào **đúng folder chứa `package.json`**; backup hoặc `git commit` trước khi chép kit. Khi chép `AGENTS.md` và `.gitignore`, kiểm tra và MERGE thay vì ghi đè file cấu hình cũ.

## E. Bước 4 — Giải nén bộ FINAL kit vào ROOT project

Tải file `DO_TRAN_NHU_NGOC_FINAL_LOCAL_DRIVE_CODEX_KIT.zip`. Mở ZIP và copy **nội dung bên trong** thẳng vào thư mục chứa `package.json`. Kết quả:

```text
nhu-ngoc-portfolio/
├─ package.json                # Next.js
├─ src/                        # Next.js
├─ public/                     # chỉ ảnh approved sau duyệt
├─ .gitignore                  # chặn raw-drive và sources
├─ .agents/skills/             # 4 custom skills có sẵn
├─ AGENTS.md
├─ CODEX_LOCAL_DRIVE_MASTER_PROMPT.md       # ưu tiên prompt này
├─ CODEX_MASTER_PROMPT.md                   # prompt cũ để tham khảo
├─ HUONG_DAN_CUOI_CUNG_LOCAL_DRIVE_CODEX.md
├─ docs/                      # content EN, design system, reference
├─ tools/                     # 2 script cho ảnh
├─ assets/art/                # 29 ảnh backup
├─ assets/photos/             # 8 ảnh backup
├─ sources/                   # resume, PDF gốc — private
└─ raw-drive/                 # tạo tiếp ở bước F
```

**Cực kỳ quan trọng:** Kéo luôn thư mục ẩn `.agents` và file `.gitignore`; trên Windows dùng VS Code để xem dễ hơn. Nếu `.gitignore` đã tồn tại, thêm các dòng chặn raw-drive/sources vào file hiện tại, không ghi đè nội dung quan trọng của Next.js.

## F. Bước 5 — Copy toàn bộ thư mục Drive đã giải nén vào `raw-drive`

Ví dụ Drive khi giải nén ở `Downloads/Đỗ Trần Như Ngọc`:

```powershell
# Chạy ở root project
New-Item -ItemType Directory -Force -Path .\raw-drive | Out-Null
Copy-Item -LiteralPath "$HOME\Downloads\Đỗ Trần Như Ngọc" -Destination .\raw-drive -Recurse -Force
```

Nếu tên thư mục khác, kéo thả bằng File Explorer để tránh lỗi đường dẫn. Cấu trúc cuối cùng:

```text
raw-drive/
└── Đỗ Trần Như Ngọc/
    ├── Yumi project/
    ├── Film/
    ├── Flashmob/
    ├── Cultural heritage media club/
    ├── Debate competiton/
    ├── Diary of the Blue Rose/
    │   ├── Đi thiện nguyện/
    │   └── Hàm Cần Impact Day 2026/
    ├── LHP DEBATE CLUB/
    └── Certificate/
```

Chỉ cần một bản local ở `raw-drive`; nếu download thành nhiều ZIP, giải nén từng ZIP và gom thư mục con vào cùng cấp. Không gộp `Film` vào `Yumi project`, không đổi tên các ảnh gốc hàng loạt khi chưa rà soát.

## G. Bước 6 — Chạy audit 109 file

Chạy trong terminal ở root:

```powershell
py .\tools\audit_drive_assets.py --root .\raw-drive
```

Nếu lệnh `py` không hoạt động, đổi thành `python`.

Script chỉ đọc file (không sửa, không xóa), kiểm tra từng loại hình ảnh/video/PDF, SHA-256 phát hiện file trùng byte, đánh dấu tên có watermark, tạo:

- `docs/media-audit/MEDIA_INVENTORY.csv`
- `docs/media-audit/MEDIA_AUDIT.md`
- `docs/media-audit/APPROVAL_TEMPLATE.csv`

Mở `MEDIA_AUDIT.md` và kiểm tra các số đếm. Nếu không phải 104/3/2, kiểm tra các file thiếu hoặc có file mới. Nếu có trùng, không tự xóa; để Codex chọn bản tốt nhất sau khi đối chiếu nội dung.

## H. Bước 7 — Xem ảnh và chọn ảnh muốn công bố

Mở `docs/media-audit/APPROVAL_TEMPLATE.csv` bằng Excel/VS Code. Mỗi ảnh có các cột: `relative_path`, `section`, `publish`, `rights_ok`, `privacy_ok`, `caption`, `notes`.

Cách duyệt:
1. **Chỉ chọn ảnh đáng đưa lên website** (không phải tất cả 104).
2. Đối với từng ảnh được chọn: điền `publish=yes`, `rights_ok=yes`, `privacy_ok=yes`, điền caption tiếng Anh đúng thực tế (>=8 ký tự). `rights_ok`: quyền sử dụng hình/illustration; `privacy_ok`: đồng ý công bố gương mặt/tư liệu, đặc biệt với trẻ em và bên thứ ba.
3. Nếu chưa chắc quyền ảnh: để `no`. Giữ ảnh trong raw-drive để xem nội bộ; không phát hành.
4. Tránh ảnh dính watermark. Không tự xóa watermark. Chọn file gốc sạch, có bản quyền/quyền dùng phù hợp.
5. Không tự diễn giải ảnh nhóm thành bằng chứng cá nhân là người phát ngôn/người sáng tạo nếu không xác nhận.
6. Lưu CSV ở UTF-8 để giữ đường dẫn có dấu tiếng Việt. Nếu dùng Excel trên Windows, chọn **CSV UTF-8** khi lưu.

Kiểm tra các ảnh đã được duyệt mà chưa tạo file:

```powershell
py .\tools\prepare_approved_assets.py --dry-run
```

Cài module ảnh (chỉ 1 lần):

```powershell
py -m pip install pillow pillow-heif
```

Xuất ảnh đã duyệt ra thư mục công khai:

```powershell
py .\tools\prepare_approved_assets.py
```

Ảnh approved được chuyển thành WebP tối ưu trong `public/media/approved/`; metadata/caption/alt được lưu tại `src/data/media.generated.json`. Script sẽ dừng nếu có file thiếu, chưa duyệt quyền hoặc caption trống.

**Lưu ý:** Không chạy script công bố nếu chưa xác nhận quyền sử dụng. Khi deploy, mọi ảnh trong `public/media` đều truy cập trực tiếp qua URL kể cả khi không nằm trong gallery.

## I. Bước 8 — Chạy Codex theo 3 prompt (khuyến nghị)

### Prompt 1 — Audit và lập bố cục, KHÔNG thay nội dung thật

```text
Read AGENTS.md and CODEX_LOCAL_DRIVE_MASTER_PROMPT.md. Audit the existing repo and the FULL local Drive folder at raw-drive/. Confirm media inventory and inspect sample images from every topic. Compare original Yumi files against extracted PDF artworks and identify duplicates. Draft the site IA, visual direction, exact assets by path for each section, and an approval matrix in docs/media-audit/CODEX_ASSET_SELECTION.md. Preserve raw assets and privacy. Implement nothing outside this audit phase.
```

Sau khi kiểm tra bố cục dự kiến + ảnh nào Codex đề xuất, duyệt `APPROVAL_TEMPLATE.csv` rồi chạy script WebP.

### Prompt 2 — Implement trang hoàn chỉnh

```text
Read AGENTS.md, CODEX_LOCAL_DRIVE_MASTER_PROMPT.md, docs/STUDENT_CONTENT_EN.md, docs/DESIGN_SYSTEM.md, and all 4 local skills. Use src/data/media.generated.json and ONLY the approved images in public/media/approved. Implement the complete HERITAGE IN MOTION website with Home, Work, five detailed case studies, illustration gallery, About, Resume and Contact. Follow exact resume facts; never invent images, stats, roles or first-person reflections. Finish actual responsive source code, not only wireframes. Run build and type checks and fix errors.
```

### Prompt 3 — Visual QA & admissions review

```text
Run portfolio-visual-qa and web-design-guidelines where available. Check typography, project prioritization, image crops, mobile 375px/768px, keyboard access, alt text, reduced-motion behavior, click-to-watch video, student privacy, broken links, SEO, build and lint. Fix issues in the codebase. Generate docs/CONTENT_APPROVAL_NEEDED.md and a deployment checklist. Do not deploy automatically.
```

### Nếu muốn chạy MỘT prompt duy nhất

```text
Read AGENTS.md and CODEX_LOCAL_DRIVE_MASTER_PROMPT.md in full. The complete original Google Drive folder is already downloaded under raw-drive/. Use it as a private asset source and validate the local audit; choose only explicitly approved photographs and artworks from public/media/approved and src/data/media.generated.json. Using project-local creative direction and admissions storytelling skills, implement a complete premium Creative Editorial personal website for Do Tran Nhu Ngoc (HERITAGE IN MOTION), with all pages and case studies, original artwork gallery, verified impact, responsive accessible animation and factual English copy. Preserve existing project architecture. Never invent images, achievements, student quotes or permissions. Build, typecheck, lint, inspect mobile/desktop and document approval needs. Do not deploy without explicit authorization.
```

## J. Bước 9 — Test website

```powershell
npm run dev
```

Mở URL trên terminal, thường `http://localhost:3000`.

Kiểm tra thủ công: hero trong 5 giây đầu hiểu Như Ngọc học ngành gì; flagship Hát Bội nổi bật; Yumi art thể hiện cá tính; tranh biện không bị lẫn giải cá nhân và hoạt động điều phối; Blue Rose không gọi toàn bộ đóng góp thành fundraising cá nhân; film Best Actress là **nomination**, không phải award win; không có ảnh thiếu quyền; menu, lightbox, mobile, liên kết hoạt động.

```powershell
npx tsc --noEmit
npm run build
npm run lint  # chỉ nếu package.json có script lint
```

Đảm bảo mọi trang có metadata SEO, alt text, responsive `next/image` (khi phù hợp), và hỗ trợ prefers-reduced-motion.

## K. Bước 10 — GitHub/Vercel sau khi học sinh duyệt

1. Như Ngọc duyệt phần giới thiệu/ngôi thứ nhất, số liệu, hình ảnh, phim và ảnh trẻ em. Chỉ khi đủ quyền sử dụng, chuyển `public/media/approved` thành media chính thức.
2. Kiểm tra `.gitignore`, chạy `git status --short`, đảm bảo KHÔNG thấy raw-drive, sources, assets/photos, assets/art, docs/media-audit trong danh sách staged/untracked dự kiến.
3. Dùng repository **private**. GitHub private không có nghĩa là ảnh web sẽ private sau deploy: mọi ảnh nằm trong `public/` của trang web công khai vẫn truy cập được.
4. Push code và file ảnh approved tới GitHub. Trên Vercel chọn Add New → Project → import GitHub repo → Next.js → Deploy. Kiểm tra preview URL trước khi công bố chính thức; không đăng link khi chưa duyệt.
5. Link portfolio chỉ nên đưa vào hồ sơ nộp đại học khi website không có lỗi link, ảnh bị mờ, video thất bại, hoặc nội dung chưa xác thực.

## L. Checklist cuối cùng

- [ ] Đã tải và giải nén đủ 8 nhóm Drive vào raw-drive.
- [ ] Audit ra 104 ảnh, 3 video, 2 PDF (hoặc đã giải thích thay đổi).
- [ ] Đã kiểm tra ảnh trùng trong Yumi và ảnh watermark.
- [ ] Đã duyệt quyền ảnh + đồng ý công bố, nhất là trẻ em.
- [ ] Không có toàn bộ raw-drive hoặc video 660 MB trong public/GitHub.
- [ ] Codex nhận 4 custom skills và đọc đúng prompt local-drive mới.
- [ ] Home, 5 case studies, Yumi gallery, About, Resume, Contact chạy được.
- [ ] Không bịa thành tích hoặc chuyển đề cử thành giải thưởng.
- [ ] Bản mobile ổn, kiểm tra keyboard, ảnh và video.
- [ ] Build và typecheck qua; học sinh duyệt trước khi deploy.

## Ghi chú điều chỉnh theo ảnh nguồn mới

Tại thời điểm rà soát: `Yumi project` chứa **30 file ảnh gốc + 1 Art Portfolio PDF**, thay vì chỉ PDF trong lượt kiểm tra cũ. Nhờ vậy không cần dùng ảnh PDF làm nguồn chính. `Film/Disabled super final.mov` khoảng **660 MB** và trong Hàm Cần có **8 HEIC**. Script có thể đọc và tối ưu HEIC nếu cài `pillow-heif`, không tự lấy video.

Nếu không thích cài Python, yêu cầu Codex viết tương đương bằng Node.js dựa vào folder `raw-drive/`; vẫn giữ bước inventory -> approval -> optimize trước khi đưa ảnh vào public.

**Nguồn tài liệu kỹ thuật tham khảo:**
- Next.js installation: https://nextjs.org/docs/app/getting-started/installation
- Google Drive download: https://support.google.com/drive/answer/2423534
- Vercel Git deployment: https://vercel.com/docs/git
