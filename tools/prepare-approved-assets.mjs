import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("raw-drive");
const approvalPath = path.resolve("docs/media-audit/APPROVAL_TEMPLATE.csv");
const destination = path.resolve("public/media/approved");
const catalogPath = path.resolve("src/data/media.generated.json");
const required = [
  "relative_path",
  "section",
  "publish",
  "rights_ok",
  "privacy_ok",
  "caption",
  "sha256",
];

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [headers, ...records] = rows;
  return records.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header.replace(/^\uFEFF/, ""), values[index] ?? ""])),
  );
}

function slug(value) {
  return value
    .replaceAll("đ", "d")
    .replaceAll("Đ", "D")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "image";
}

if (!fs.existsSync(root)) throw new Error("Missing raw-drive folder");
const rows = parseCsv(fs.readFileSync(approvalPath, "utf8"));
for (const field of required) {
  if (!(field in (rows[0] ?? {}))) throw new Error(`Missing CSV column: ${field}`);
}

const approved = rows.filter((row) => row.publish.trim().toLowerCase() === "yes");
const seen = new Set();
const jobs = [];
for (const row of approved) {
  if (row.rights_ok.trim().toLowerCase() !== "yes" || row.privacy_ok.trim().toLowerCase() !== "yes") {
    throw new Error(`Needs rights/privacy approval: ${row.relative_path}`);
  }
  if (row.caption.trim().length < 8) throw new Error(`Needs caption: ${row.relative_path}`);
  const source = path.resolve(root, row.relative_path.replaceAll("/", path.sep));
  if (path.relative(root, source).startsWith("..")) throw new Error(`Path traversal: ${row.relative_path}`);
  if (!fs.existsSync(source)) throw new Error(`Missing source: ${row.relative_path}`);
  const hash = crypto.createHash("sha256").update(fs.readFileSync(source)).digest("hex");
  if (hash !== row.sha256) throw new Error(`Source hash changed: ${row.relative_path}`);
  if (seen.has(hash)) throw new Error(`Duplicate approved image: ${row.relative_path}`);
  seen.add(hash);
  jobs.push({ row, source, filename: `${slug(row.section)}--${hash.slice(0, 10)}.webp` });
}

fs.mkdirSync(destination, { recursive: true });
const previous = fs.existsSync(catalogPath)
  ? JSON.parse(fs.readFileSync(catalogPath, "utf8"))
  : [];
const keep = new Set(jobs.map((job) => job.filename));
for (const item of previous) {
  const filename = path.basename(item.src);
  const target = path.resolve(destination, filename);
  if (!keep.has(filename) && path.dirname(target) === destination && path.extname(target) === ".webp") {
    fs.rmSync(target, { force: true });
  }
}

const manifest = [];
for (const job of jobs) {
  const target = path.join(destination, job.filename);
  const result = await sharp(job.source)
    .rotate()
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(target);
  manifest.push({
    src: `/media/approved/${job.filename}`,
    alt: job.row.caption.trim(),
    section: job.row.section.trim(),
    width: result.width,
    height: result.height,
  });
}
fs.writeFileSync(catalogPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Published ${manifest.length} approved images; ${manifest.filter((item) => item.section === "Flashmob").length} Flashmob.`);
