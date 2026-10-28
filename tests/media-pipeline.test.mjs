import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
const project = process.cwd();
const python =
  process.env.PORTFOLIO_PYTHON ||
  path.join(project, ".venv", "Scripts", "python.exe");
const script = path.join(project, "tools", "prepare_approved_assets.py");
function run(args) {
  return spawnSync(python, args, {
    encoding: "utf8",
    env: { ...process.env, PYTHONUTF8: "1" },
  });
}
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-media-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, "raw"));
  assert.equal(
    run([
      "-c",
      'from PIL import Image; import sys; Image.new("RGB",(64,48),"white").save(sys.argv[1])',
      path.join(root, "raw", "test.png"),
    ]).status,
    0,
  );
  const hash = run([
    "-c",
    'import hashlib,sys; print(hashlib.sha256(open(sys.argv[1],"rb").read()).hexdigest())',
    path.join(root, "raw", "test.png"),
  ]).stdout.trim();
  const csv = path.join(root, "approval.csv");
  const manifest = path.join(root, "manifest.json");
  const dest = path.join(root, "public");
  function write(overrides = {}) {
    const r = {
      relative_path: "test.png",
      section: "Yumi / Comics",
      publish: "yes",
      rights_ok: "yes",
      privacy_ok: "yes",
      caption: "Synthetic fixture for pipeline testing only.",
      sha256: hash,
      ...overrides,
    };
    fs.writeFileSync(
      csv,
      Object.keys(r).join(",") +
        "\n" +
        Object.values(r)
          .map((v) => '"' + v.replaceAll('"', '""') + '"')
          .join(",") +
        "\n",
    );
  }
  const execute = () =>
    run([
      script,
      "--root",
      path.join(root, "raw"),
      "--approval",
      csv,
      "--dest",
      dest,
      "--json",
      manifest,
    ]);
  return { root, write, execute, manifest, dest };
}
test("requires all three human approval fields and factual caption", (t) => {
  const f = fixture(t);
  for (const row of [
    { rights_ok: "no" },
    { privacy_ok: "no" },
    { caption: "" },
    { publish: "yes", rights_ok: "true" },
  ]) {
    f.write(row);
    assert.notEqual(f.execute().status, 0);
    assert.ok(!fs.existsSync(f.manifest));
  }
});
test("does not treat true or approved as publish=yes", (t) => {
  const f = fixture(t);
  for (const publish of ["true", "approved", "no"]) {
    f.write({ publish });
    assert.equal(f.execute().status, 0);
    assert.deepEqual(JSON.parse(fs.readFileSync(f.manifest)), []);
  }
});
test("rejects traversal outside the private root", (t) => {
  const f = fixture(t);
  f.write({ relative_path: "../escape.png" });
  const r = f.execute();
  assert.equal(r.status, 2);
  assert.match(r.stdout, /path traversal/);
});
test("rejects changed source hash", (t) => {
  const f = fixture(t);
  f.write({ sha256: "wrong" });
  assert.equal(f.execute().status, 2);
});
test("converts an approved synthetic fixture and removes it on revocation", (t) => {
  const f = fixture(t);
  f.write();
  assert.equal(f.execute().status, 0);
  const m = JSON.parse(fs.readFileSync(f.manifest));
  assert.equal(m.length, 1);
  assert.equal(m[0].width, 64);
  assert.equal(m[0].height, 48);
  assert.match(
    m[0].src,
    /^\/media\/approved\/yumi-comics--[a-f0-9]{10}\.webp$/,
  );
  assert.equal(fs.readdirSync(f.dest).length, 1);
  f.write({ publish: "no" });
  assert.equal(f.execute().status, 0);
  assert.equal(fs.readdirSync(f.dest).length, 0);
  assert.deepEqual(JSON.parse(fs.readFileSync(f.manifest)), []);
});
test("rescan preserves human decisions for unchanged sources", (t) => {
  const f = fixture(t);
  const out = path.join(f.root, "audit");
  const audit = path.join(project, "tools/audit_drive_assets.py");
  assert.equal(
    run([audit, "--root", path.join(f.root, "raw"), "--output", out]).status,
    0,
  );
  const p = path.join(out, "APPROVAL_TEMPLATE.csv");
  fs.writeFileSync(
    p,
    fs.readFileSync(p, "utf8").replace(",no,no,no,", ",yes,yes,yes,"),
  );
  assert.equal(
    run([audit, "--root", path.join(f.root, "raw"), "--output", out]).status,
    0,
  );
  assert.match(fs.readFileSync(p, "utf8"), /,yes,yes,yes,/);
});
