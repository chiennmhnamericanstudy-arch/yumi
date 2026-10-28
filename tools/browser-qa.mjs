import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import assert from "node:assert/strict";
const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const out = "test-results";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const routes = [
  "/",
  "/work",
  "/work/co-sac-tan-thanh",
  "/work/yumi-project",
  "/work/lhp-debate",
  "/work/blue-rose",
  "/work/disabled-film",
  "/about",
  "/resume",
  "/contact",
];
const widths = [320, 375, 390, 768, 1024, 1440];
const report = { routes: [], interactions: [], errors: [], links: [] };
const approvedMedia = JSON.parse(
  fs.readFileSync("src/data/media.generated.json", "utf8"),
);
async function verifyImages() {
  for (const img of await page.locator("main img").all()) {
    if (!(await img.isVisible())) continue;
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(async (el) => {
      await el.decode();
      if (!el.naturalWidth || !el.alt.trim())
        throw new Error("Missing image pixels or alt text");
    });
  }
}
const context = await browser.newContext();
const page = await context.newPage();
page.on("pageerror", (e) => report.errors.push(e.message));
const links = new Set();
try {
  for (const width of widths) {
    await page.setViewportSize({
      width,
      height: width < 768 ? 844 : width === 768 ? 1024 : 900,
    });
    for (const route of routes) {
      const response = await page.goto(base + route, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1, `${route}: h1`);
      await verifyImages();
      await page.evaluate(() => window.scrollTo(0, 0));
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      assert.equal(overflow, false, `${width} ${route}: horizontal overflow`);
      assert.match(await page.title(), /Như Ngọc/);
      const current = await page
        .locator("a[href]")
        .evaluateAll((elements) => elements.map((a) => a.getAttribute("href")));
      current.filter((s) => s.startsWith("/")).forEach((s) => links.add(s));
      if (width === 375 || width === 768 || width === 1440) {
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        if (axe.violations.length)
          report.errors.push({
            width,
            route,
            axe: axe.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((n) => n.html),
            })),
          });
      }
      if (
        (route === "/" && [375, 768, 1440].includes(width)) ||
        width === 1440 ||
        width === 375
      ) {
        await page.screenshot({
          path: `${out}/${width}-${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}.png`,
          fullPage: true,
          animations: "disabled",
        });
      }
      report.routes.push({ width, route, status: response.status(), overflow });
    }
  }
  for (const link of links) {
    const r = await page.request.get(base + link);
    assert.equal(r.status(), 200, link);
    report.links.push(link);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(base);
  await page.keyboard.press("Tab");
  assert.equal(
    await page
      .locator(".skip-link")
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.keyboard.press("Enter");
  assert.equal(
    await page.locator("#main").evaluate((el) => el === document.activeElement),
    true,
  );
  report.interactions.push("Skip link focuses main");
  const menu = page.locator(".mobile-menu summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await page.waitForURL(base + "/work");
  assert.equal(await page.locator(".mobile-menu").getAttribute("open"), null);
  report.interactions.push("Mobile menu keyboard open and route close");
  await menu.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".mobile-menu").getAttribute("open"), null);
  report.interactions.push("Mobile menu Escape");
  await page.goto(base + "/work/yumi-project");
  await page.getByRole("button", { name: "Comics", exact: true }).click();
  const comics = approvedMedia.filter((m) => m.section === "Yumi / Comics");
  assert.equal(await page.locator(".gallery-item").count(), comics.length || 1);
  await page.getByRole("button", { name: "All", exact: true }).click();
  const galleryTitles = await page
    .locator(".gallery-open")
    .evaluateAll((buttons) =>
      buttons.map((b) => b.getAttribute("aria-label").replace(/^Open /, "")),
    );
  assert.equal(
    galleryTitles.length,
    approvedMedia.filter((m) => /^yumi/i.test(m.section)).length || 4,
  );
  const trigger = page.locator(".gallery-open").first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator("dialog").evaluate((d) => d.open), true);
  await page.keyboard.press("ArrowRight");
  assert.equal(
    await page.locator("#gallery-dialog-title").textContent(),
    galleryTitles[1],
  );
  await page.keyboard.press("ArrowLeft");
  assert.equal(
    await page.locator("#gallery-dialog-title").textContent(),
    galleryTitles[0],
  );
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator("dialog")
        .evaluate((d) => d.contains(document.activeElement)),
      true,
    );
  }
  const dialogAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  assert.equal(
    dialogAxe.violations.length,
    0,
    JSON.stringify(dialogAxe.violations),
  );
  await page.screenshot({
    path: `${out}/375-gallery-dialog.png`,
    fullPage: false,
  });
  await page.keyboard.press("Escape");
  assert.equal(
    await trigger.evaluate((e) => e === document.activeElement),
    true,
  );
  report.interactions.push(
    "Gallery filter, Enter, arrows, focus trap, Escape, return focus",
  );
  for (const media of approvedMedia) {
    const response = await page.request.get(base + media.src);
    assert.equal(response.status(), 200);
    assert.match(response.headers()["content-type"], /image\/webp/);
  }
  if (approvedMedia.length) {
    await page.route("**/_next/image?*", (route) => route.abort());
    await page.goto(base);
    await page
      .locator(".heritage-issue .media-figure")
      .first()
      .scrollIntoViewIfNeeded();
    await page
      .getByText("Image unavailable", { exact: false })
      .first()
      .waitFor();
    assert.equal(
      await page
        .getByRole("link", { name: /Read the cultural story/ })
        .isVisible(),
      true,
    );
    await page.unroute("**/_next/image?*");
    report.interactions.push(
      `${approvedMedia.length} approved WebP files, image decoding and failure fallback`,
    );
  }
  const reduced = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 375, height: 812 },
  });
  const rp = await reduced.newPage();
  await rp.goto(base);
  assert.equal(
    await rp.locator("h1").evaluate((e) => getComputedStyle(e).animationName),
    "none",
  );
  await rp.screenshot({
    path: `${out}/375-reduced-motion.png`,
    fullPage: true,
  });
  report.interactions.push(
    "Reduced motion: no hero animation, content visible",
  );
  await reduced.close();
  const noJS = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const np = await noJS.newPage();
  await np.goto(base);
  assert.equal(await np.locator("h1").isVisible(), true);
  await np.locator(".mobile-menu summary").click();
  assert.equal(
    await np.getByRole("navigation", { name: "Mobile navigation" }).isVisible(),
    true,
  );
  report.interactions.push("No-JavaScript content and mobile navigation");
  await noJS.close();
  for (const privateRoute of [
    "/raw-drive/test.jpg",
    "/sources/DO_TRAN_NHU_NGOC_RESUME.docx",
    "/docs/media-audit/APPROVAL_TEMPLATE.csv",
    "/assets/art/artwork-01-p01.jpeg",
    "/work/nonexistent",
  ]) {
    assert.equal((await page.request.get(base + privateRoute)).status(), 404);
  }
  const og = await page.request.get(base + "/opengraph-image");
  assert.equal(og.status(), 200);
  assert.match(og.headers()["content-type"], /image\/png/);
  report.interactions.push("Open Graph image and private-path 404s");
  assert.equal(report.errors.length, 0, JSON.stringify(report.errors, null, 2));
  report.result = "PASS";
} catch (e) {
  report.result = "FAIL";
  report.failure = e.message;
  throw e;
} finally {
  fs.writeFileSync(
    `${out}/browser-report.json`,
    JSON.stringify(report, null, 2),
  );
  await browser.close();
  console.log(
    JSON.stringify(
      {
        result: report.result,
        routeChecks: report.routes.length,
        links: report.links.length,
        interactions: report.interactions,
        errors: report.errors,
        failure: report.failure,
      },
      null,
      2,
    ),
  );
}
