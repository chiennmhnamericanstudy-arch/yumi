import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "raw-drive");
const output = path.resolve("docs/media-audit");
const inventoryPath = path.join(output, "MEDIA_INVENTORY.csv");
const approvalPath = path.join(output, "APPROVAL_TEMPLATE.csv");

const kinds = new Map([
  [".jpg", "image"], [".jpeg", "image"], [".png", "image"],
  [".webp", "image"], [".heic", "image"], [".heif", "image"],
  [".gif", "image"], [".tif", "image"], [".tiff", "image"],
  [".bmp", "image"], [".mov", "video"], [".mp4", "video"],
  [".m4v", "video"], [".avi", "video"], [".pdf", "pdf"],
]);

const groupHints = [
  ["Yumi project", ["yumi project", "art portfolio"]],
  ["Cultural heritage media club", ["cultural heritage media club"]],
  ["Diary of the Blue Rose", ["diary of the blue rose", "di thien nguyen", "ham can impact day"]],
  ["LHP DEBATE CLUB", ["lhp debate club"]],
  ["Debate competition", ["debate competiton", "debate competition"]],
  ["Flashmob", ["flashmob"]], ["Film", ["film"]], ["Certificate", ["certificate"]],
];

function normalize(value) {
  return value.toLowerCase().replaceAll("đ", "d").normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

function categoryFor(relative) {
  const folder = normalize(path.dirname(relative).replaceAll("\\", "/"));
  return groupHints.find(([, hints]) => hints.some((hint) => folder.includes(hint)))?.[0]
    ?? "UNCLASSIFIED - verify folder location";
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || ["thumbs.db", "desktop.ini"].includes(entry.name.toLowerCase())) return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function parseCsv(source) {
  const records = [];
  let row = [], field = "", quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index], next = source[index + 1];
    if (char === '"' && quoted && next === '"') { field += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(field); field = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field); if (row.some(Boolean)) records.push(row); row = []; field = "";
    } else field += char;
  }
  if (field || row.length) { row.push(field); records.push(row); }
  const [headers = [], ...values] = records;
  return values.map((record) => Object.fromEntries(headers.map((header, index) => [header.replace(/^\uFEFF/, ""), record[index] ?? ""])));
}

function csvEscape(value) {
  const string = String(value ?? "");
  return /[",\r\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string;
}

function writeCsv(file, fields, rows) {
  const lines = [fields.join(","), ...rows.map((row) => fields.map((field) => csvEscape(row[field])).join(","))];
  fs.writeFileSync(file, `\uFEFF${lines.join("\r\n")}\r\n`, "utf8");
}

if (!fs.existsSync(root)) throw new Error(`Missing raw Drive folder: ${root}`);
fs.mkdirSync(output, { recursive: true });

const previousApprovals = fs.existsSync(approvalPath)
  ? new Map(parseCsv(fs.readFileSync(approvalPath, "utf8")).map((row) => [row.relative_path, row]))
  : new Map();
const firstByHash = new Map();
const rows = walk(root).sort().map((absolute) => {
  const relativePath = path.relative(root, absolute).replaceAll("\\", "/");
  const extension = path.extname(absolute).toLowerCase();
  const mediaType = kinds.get(extension) ?? "other";
  const hash = mediaType === "other" ? "" : sha256(absolute);
  const duplicateOf = hash && firstByHash.has(hash) ? firstByHash.get(hash) : "";
  if (hash && !duplicateOf) firstByHash.set(hash, relativePath);
  return {
    relative_path: relativePath,
    category: categoryFor(relativePath),
    media_type: mediaType,
    extension,
    bytes: fs.statSync(absolute).size,
    sha256: hash,
    duplicate_of: duplicateOf,
    watermark_filename: normalize(path.basename(absolute)).includes("watermark") ? "yes" : "no",
  };
});

const inventoryFields = ["relative_path", "category", "media_type", "extension", "bytes", "sha256", "duplicate_of", "watermark_filename"];
writeCsv(inventoryPath, inventoryFields, rows);

const approvals = rows.filter((row) => row.media_type === "image").map((row) => {
  const previous = previousApprovals.get(row.relative_path);
  const base = {
    relative_path: row.relative_path,
    section: row.category,
    publish: "no",
    rights_ok: "no",
    privacy_ok: "no",
    caption: "",
    notes: row.duplicate_of ? `Duplicate: ${row.duplicate_of}` : row.watermark_filename === "yes" ? "Watermark: preserve or replace only with approved original" : "",
    sha256: row.sha256,
  };
  if (previous?.sha256 === row.sha256) {
    for (const field of ["section", "publish", "rights_ok", "privacy_ok", "caption", "notes"]) base[field] = previous[field] ?? base[field];
  } else if (previous?.publish?.toLowerCase() === "yes") {
    base.notes = `Source hash changed; previous decision requires renewed review. ${previous.notes ?? ""}`.trim();
  }
  return base;
});
const approvalFields = ["relative_path", "section", "publish", "rights_ok", "privacy_ok", "caption", "notes", "sha256"];
writeCsv(approvalPath, approvalFields, approvals);

const counts = rows.reduce((result, row) => result.set(row.media_type, (result.get(row.media_type) ?? 0) + 1), new Map());
const approved = approvals.filter((row) => row.publish === "yes" && row.rights_ok === "yes" && row.privacy_ok === "yes").length;
console.log(JSON.stringify({ root, total: rows.length, counts: Object.fromEntries(counts), exactDuplicates: rows.filter((row) => row.duplicate_of).length, approved }, null, 2));
console.log(`Inventory: ${inventoryPath}`);
console.log(`Approval sheet: ${approvalPath}`);
