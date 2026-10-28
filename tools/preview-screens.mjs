import { chromium } from "@playwright/test";
import fs from "node:fs";

const out = "test-results/redesign";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const page = await browser.newPage();
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
    for (const route of ["/", "/work", "/work/yumi-project", "/about"]) {
      const response = await page.goto(`http://127.0.0.1:3000${route}`, {
        waitUntil: "networkidle",
      });
      if (response.status() !== 200)
        throw new Error(`${route}: ${response.status()}`);
      for (const img of await page.locator("main img").all()) {
        if (!(await img.isVisible())) continue;
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((el) => el.decode());
      }
      await page.evaluate(() => scrollTo(0, 0));
      const check = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        imageFailures: [...document.querySelectorAll("main img")].filter(
          (img) => img.complete && !img.naturalWidth,
        ).length,
        images: [...document.querySelectorAll("main img")].map((img) => ({
          alt: img.alt,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          renderedHeight: Math.round(img.getBoundingClientRect().height),
        })),
      }));
      if (check.overflow || check.imageFailures)
        throw new Error(`${width} ${route}: ${JSON.stringify(check)}`);
      const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({
        path: `${out}/${width}-${name}.png`,
        fullPage: true,
        animations: "disabled",
      });
      console.log(width, route, "OK");
    }
  }
} finally {
  await browser.close();
}
