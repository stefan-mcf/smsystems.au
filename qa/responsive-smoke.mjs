import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

function parseArgs(argv) {
  const options = {
    out: resolve('qa-output/responsive-smoke.json'),
    url: 'https://smsystems.au/',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--out') options.out = resolve(argv[++index]);
    else if (value === '--url') options.url = argv[++index];
    else throw new Error(`Unknown argument: ${value}`);
  }

  return options;
}

const profiles = [
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const outputDirectory = dirname(options.out);
  await mkdir(outputDirectory, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const profile of profiles) {
    const page = await browser.newPage({ viewport: profile.viewport });
    const response = await page.goto(options.url, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Decline' }).click().catch(() => {});

    const startProject = page.getByRole('button', { name: 'Start project' }).first();
    await startProject.waitFor({ state: 'visible', timeout: 10000 });
    await startProject.click();

    const dialog = page.locator('dialog[open]');
    await dialog.waitFor({ state: 'visible', timeout: 10000 });
    const formFrame = dialog.locator('iframe[title="Form"]');
    await formFrame.waitFor({ state: 'visible', timeout: 20000 });
    const emailRoute = dialog.getByRole('link', { name: 'Email Stefan' });

    const layout = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    const screenshotPath = resolve(
      outputDirectory,
      `live-responsive-${profile.name}.png`,
    );
    await page.screenshot({ path: screenshotPath });

    const checks = {
      httpOk: Boolean(response?.ok()),
      titlePresent: (await page.title()).trim().length > 0,
      startProjectVisible: await startProject.isVisible(),
      dialogVisible: await dialog.isVisible(),
      hubSpotFormVisible: await formFrame.isVisible(),
      emailRouteVisible: await emailRoute.isVisible(),
      noHorizontalOverflow: layout.scrollWidth <= layout.innerWidth + 2,
    };
    results.push({
      profile: profile.name,
      viewport: profile.viewport,
      status: Object.values(checks).every(Boolean) ? 'pass' : 'fail',
      checks,
      screenshot: screenshotPath,
    });
    await page.close();
  }

  await browser.close();
  const report = {
    schema: 'sm-systems.responsive-smoke.v1',
    generatedAt: new Date().toISOString(),
    target: options.url,
    status: results.every((result) => result.status === 'pass') ? 'pass' : 'fail',
    results,
  };
  await writeFile(options.out, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ status: report.status, output: options.out }, null, 2));
  process.exitCode = report.status === 'pass' ? 0 : 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 2;
});
