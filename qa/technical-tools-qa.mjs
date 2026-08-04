import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const target = process.argv[2] ?? 'http://127.0.0.1:3013/';
const outputDirectory = resolve('qa-output/technical-tools');
const expectedTools = [
  {
    slug: 'automation-debugger',
    title: 'Automation Debugger',
    repository: 'https://github.com/stefan-mcf/automation-debugger',
  },
  {
    slug: 'api-webhook-bridge',
    title: 'API Webhook Bridge',
    repository: 'https://github.com/stefan-mcf/api-webhook-bridge',
  },
  {
    slug: 'review-router',
    title: 'Human Review Router',
    repository: 'https://github.com/stefan-mcf/review-router',
  },
];
const expectedLabels = ['Capability', 'Control', 'Boundary'];
const forbiddenTerms = [new RegExp('pr' + 'oof', 'i'), new RegExp('evi' + 'dence', 'i')];
const profiles = [
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
  { name: 'mobile-320', viewport: { width: 320, height: 720 } },
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const profile of profiles) {
  const page = await browser.newPage({ viewport: profile.viewport });
  const response = await page.goto(target, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Decline' }).click().catch(() => {});

  const section = page.locator('.home-tool-work');
  await section.scrollIntoViewIfNeeded();
  const cards = section.locator('.proof-card');

  await page.addStyleTag({
    content: '.site-header, .consent-reopen { visibility: hidden !important; }',
  });
  await section.screenshot({
    path: resolve(outputDirectory, `${profile.name}-collapsed.png`),
  });

  for (const expected of expectedTools) {
    const card = section.locator(`#${expected.slug}`);
    if (!(await card.evaluate((element) => element.open))) {
      await card.locator('summary').click();
    }
  }

  const state = await section.evaluate((element) => ({
    visibleText: element.innerText,
    slugs: [...element.querySelectorAll('.proof-card')].map((card) => card.id),
    titles: [...element.querySelectorAll('.proof-card-title')].map(
      (title) => title.textContent?.trim() ?? '',
    ),
    labelsByCard: [...element.querySelectorAll('.proof-card')].map((card) =>
      [...card.querySelectorAll('.proof-proof-strip article > span')].map(
        (label) => label.textContent?.trim() ?? '',
      ),
    ),
    linkLabels: [...element.querySelectorAll('.proof-card-detail > a')].map(
      (link) => link.textContent?.trim() ?? '',
    ),
    repositories: [...element.querySelectorAll('.proof-card-detail > a')].map(
      (link) => link.getAttribute('href'),
    ),
    laneBadgeCount: element.querySelectorAll('.proof-lane').length,
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    sectionWidth: element.getBoundingClientRect().width,
    cardsContained: [...element.querySelectorAll('.proof-card')].every((card) => {
      const sectionRect = element.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      return cardRect.left >= sectionRect.left - 1 && cardRect.right <= sectionRect.right + 1;
    }),
  }));

  for (const expected of expectedTools) {
    const card = section.locator(`#${expected.slug}`);
    await card.screenshot({
      path: resolve(outputDirectory, `${profile.name}-${expected.slug}.png`),
    });
  }

  const expectedSlugs = expectedTools.map((tool) => tool.slug);
  const expectedTitles = expectedTools.map((tool) => tool.title);
  const expectedRepositories = expectedTools.map((tool) => tool.repository);
  const checks = {
    httpOk: Boolean(response?.ok()),
    exactToolSet:
      JSON.stringify(state.slugs) === JSON.stringify(expectedSlugs),
    alignedTitles:
      JSON.stringify(state.titles) === JSON.stringify(expectedTitles),
    consistentStructure: state.labelsByCard.every(
      (labels) => JSON.stringify(labels) === JSON.stringify(expectedLabels),
    ),
    laneBadgesAbsent: state.laneBadgeCount === 0,
    consistentLinkLabels: state.linkLabels.every(
      (label) => label === 'View GitHub repository',
    ),
    correctRepositories:
      JSON.stringify(state.repositories) === JSON.stringify(expectedRepositories),
    forbiddenTerminologyAbsent: forbiddenTerms.every(
      (pattern) => !pattern.test(state.visibleText),
    ),
    dashCharactersAbsent:
      !state.visibleText.includes('\u2014') && !state.visibleText.includes('\u2013'),
    noHorizontalOverflow: state.scrollWidth <= state.innerWidth + 2,
    cardsContained: state.cardsContained,
  };

  results.push({
    profile: profile.name,
    viewport: profile.viewport,
    status: Object.values(checks).every(Boolean) ? 'pass' : 'fail',
    checks,
    state,
  });
  await page.close();
}

await browser.close();
const report = {
  schema: 'sm-systems.technical-tools-qa.v1',
  target,
  status: results.every((result) => result.status === 'pass') ? 'pass' : 'fail',
  results,
};
await writeFile(
  resolve(outputDirectory, 'report.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.status === 'pass' ? 0 : 1;
