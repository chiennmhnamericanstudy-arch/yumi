import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
const root = process.cwd();
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/media.generated.json"), "utf8"),
);
const allowed = new Set(catalog.map((m) => m.src));
const errors = [];
// Parse quoted UTF-8 CSV fields, including commas and line breaks in captions.
function parseCSV(text) {
  const rows = [];
  let row = [],
    field = "",
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') {
        field += '"';
        i++;
      } else quoted = !quoted;
    } else if (c === "," && !quoted) {
      row.push(field);
      field = "";
    } else if (c === "\n" && !quoted) {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  const keys = rows.shift();
  return rows
    .filter((r) => r.length > 1)
    .map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ""])));
}
const approvalsPath = path.join(root, "docs/media-audit/APPROVAL_TEMPLATE.csv");
const approvals = fs.existsSync(approvalsPath)
  ? parseCSV(fs.readFileSync(approvalsPath, "utf8").replace(/^\uFEFF/, ""))
  : [];
for (const item of catalog) {
  if (!/^\/media\/approved\/[a-z0-9-]+--[a-f0-9]{10}\.webp$/.test(item.src))
    errors.push(`Unsafe media path: ${item.src}`);
  if (!item.alt?.trim() || !item.width || !item.height)
    errors.push(`Missing caption/dimensions: ${item.src}`);
  if (!fs.existsSync(path.join(root, "public", item.src)))
    errors.push(`Missing file: ${item.src}`);
  const hash = item.src.match(/--([a-f0-9]{10})\.webp$/)?.[1];
  const row = approvals.find(
    (r) =>
      r.sha256?.startsWith(hash) &&
      r.section === item.section &&
      r.caption.trim() === item.alt &&
      ["publish", "rights_ok", "privacy_ok"].every(
        (k) => r[k].trim().toLowerCase() === "yes",
      ),
  );
  if (!row) {
    errors.push(`Current approval missing or revoked: ${item.src}`);
    continue;
  }
  const sourceRoot = path.resolve(root, "raw-drive");
  const original = path.resolve(sourceRoot, row.relative_path);
  if (!original.startsWith(sourceRoot + path.sep) || !fs.existsSync(original)) {
    errors.push(`Source missing or outside private root: ${item.src}`);
    continue;
  }
  if (
    createHash("sha256").update(fs.readFileSync(original)).digest("hex") !==
    row.sha256
  )
    errors.push(`Source changed after approval: ${item.src}`);
}
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isSymbolicLink()) {
      errors.push(`Symlink in public: ${p}`);
      continue;
    }
    if (e.isDirectory()) walk(p);
    else {
      const url =
        "/" +
        path.relative(path.join(root, "public"), p).split(path.sep).join("/");
      if (!allowed.has(url)) errors.push(`Unmanifested public file: ${url}`);
    }
  }
}
walk(path.join(root, "public"));
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Public media check passed: ${catalog.length} manifest assets; no unmanifested public files.`,
);
