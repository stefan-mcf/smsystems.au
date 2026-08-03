import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const target = process.argv[2] ?? 'http://127.0.0.1:3013/work/rfid-subscription-access-system/';
const outputDirectory = resolve('qa-output/rfid-page');
const profiles = [
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const profile of profiles) {
  const page = await browser.newPage({ viewport: profile.viewport });
  const response = await page.goto(target, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Decline' }).click().catch(() => {});
  const figures = page.locator('.case-study-shot');
  await figures.first().waitFor({ state: 'visible' });
  for (let index = 0; index < 6; index += 1) {
    const image = figures.nth(index).locator('img');
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => {
      if (element.complete && element.naturalWidth > 0) return;
      return new Promise((resolve, reject) => {
        element.addEventListener('load', resolve, { once: true });
        element.addEventListener('error', reject, { once: true });
      });
    });
  }

  const pageState = await page.evaluate(() => {
    const images = [...document.querySelectorAll('.case-study-shot img')];
    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      visibleText: document.body.innerText.toLowerCase(),
      images: images.map((image) => ({
        src: image.getAttribute('src'),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      })),
    };
  });

  await page.screenshot({
    path: resolve(outputDirectory, profile.name + '-page.png'),
    fullPage: true,
  });

  await figures.nth(2).locator('.image-lightbox-trigger').click();
  const dialog = page.locator('.image-lightbox-dialog[open]');
  await dialog.waitFor({ state: 'visible' });
  await page.waitForTimeout(250);
  const lightbox = await page.evaluate(() => {
    const image = document.querySelector('.image-lightbox-dialog[open] .image-lightbox-stage img');
    if (!(image instanceof HTMLImageElement)) return null;
    const rect = image.getBoundingClientRect();
    const scale = Math.min(
      rect.width / image.naturalWidth,
      rect.height / image.naturalHeight,
    );
    const contentWidth = image.naturalWidth * scale;
    const contentHeight = image.naturalHeight * scale;
    const contentLeft = rect.left + (rect.width - contentWidth) / 2;
    const contentTop = rect.top + (rect.height - contentHeight) / 2;
    return {
      left: contentLeft,
      right: contentLeft + contentWidth,
      top: contentTop,
      bottom: contentTop + contentHeight,
      width: contentWidth,
      height: contentHeight,
      objectFit: getComputedStyle(image).objectFit,
    };
  });
  await page.screenshot({ path: resolve(outputDirectory, profile.name + '-lightbox.png') });

  const forbidden = 'pr' + 'oof';
  const containmentTolerance = Math.max(2, profile.viewport.height * 0.01);
  const checks = {
    httpOk: Boolean(response?.ok()),
    noHorizontalOverflow: pageState.scrollWidth <= pageState.innerWidth + 2,
    sixFrames: pageState.images.length === 6,
    exactDimensions: pageState.images.every(
      (image) => image.naturalWidth === 1280 && image.naturalHeight === 960,
    ),
    repositoryLinked:
      (await page.locator('a[href="https://github.com/stefan-mcf/rfid-subscription-access-system"]').count()) === 1,
    forbiddenWordAbsent: !pageState.visibleText.includes(forbidden),
    lightboxContained: Boolean(
      lightbox &&
        lightbox.objectFit === 'contain' &&
        lightbox.left >= -containmentTolerance &&
        lightbox.right <= profile.viewport.width + containmentTolerance &&
        lightbox.top >= -containmentTolerance &&
        lightbox.bottom <= profile.viewport.height + containmentTolerance,
    ),
  };

  results.push({
    profile: profile.name,
    viewport: profile.viewport,
    status: Object.values(checks).every(Boolean) ? 'pass' : 'fail',
    checks,
    lightbox,
  });
  await page.close();
}

await browser.close();
const report = {
  target,
  status: results.every((result) => result.status === 'pass') ? 'pass' : 'fail',
  results,
};
await writeFile(
  resolve(outputDirectory, 'report.json'),
  JSON.stringify(report, null, 2) + '\n',
);
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.status === 'pass' ? 0 : 1;
