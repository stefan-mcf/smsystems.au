import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const target = process.argv[2] ?? 'http://127.0.0.1:3013/';
const outputDirectory = resolve('qa-output/disclosures');
const profiles = [
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'mobile-320', viewport: { width: 320, height: 720 } },
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const profile of profiles) {
  const page = await browser.newPage({ viewport: profile.viewport });
  const response = await page.goto(target, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Decline' }).click().catch(() => {});

  const section = page.locator('.service-section');
  await section.scrollIntoViewIfNeeded();
  await page.addStyleTag({
    content: '.site-header, .consent-reopen { visibility: hidden !important; }',
  });

  const cards = section.locator('details.service-cell');
  const cardCount = await cards.count();
  const before = await page.evaluate(() => {
    const serviceCards = [...document.querySelectorAll('details.service-cell')];
    const allSummaries = [...document.querySelectorAll('details > summary')];
    return {
      serviceCards: serviceCards.map((card) => {
        const signalGroup = card.querySelector(
          '.service-cell-detail .service-cell-signals',
        );
        return {
          open: card.open,
          summarySignalGroups: card.querySelectorAll(
            'summary .service-cell-signals',
          ).length,
          detailSignalGroups: card.querySelectorAll(
            '.service-cell-detail .service-cell-signals',
          ).length,
          signalCount: signalGroup?.querySelectorAll('.service-signal').length ?? 0,
          signalGroupVisible:
            card.open && Boolean(signalGroup?.getClientRects().length),
        };
      }),
      allDisclosureSummariesClear: allSummaries.every(
        (summary) =>
          !summary.querySelector(
            'ul, ol, li, .service-cell-signals, .fit-signal-list',
          ),
      ),
    };
  });

  await section.screenshot({
    path: resolve(outputDirectory, `${profile.name}-collapsed.png`),
  });

  for (let index = 0; index < cardCount; index += 1) {
    const card = cards.nth(index);
    if (!(await card.evaluate((element) => element.open))) {
      await card.locator('summary').click();
    }
  }

  const after = await page.evaluate(() => {
    const serviceCards = [...document.querySelectorAll('details.service-cell')];
    return {
      serviceCards: serviceCards.map((card) => {
        const signalGroup = card.querySelector(
          '.service-cell-detail .service-cell-signals',
        );
        const relatedLinks = [
          ...card.querySelectorAll('.service-related-links a'),
        ];
        return {
          open: card.open,
          signalGroupVisible:
            card.open && Boolean(signalGroup?.getClientRects().length),
          signalCount: signalGroup?.querySelectorAll('.service-signal').length ?? 0,
          relatedLinkCount: relatedLinks.length,
          relatedLinks: relatedLinks.map((link) => ({
            href: link.getAttribute('href'),
            label: link.textContent?.trim(),
          })),
        };
      }),
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });

  await section.screenshot({
    path: resolve(outputDirectory, `${profile.name}-expanded.png`),
  });

  const relatedHrefs = [
    ...new Set(
      after.serviceCards.flatMap((card) =>
        card.relatedLinks.map((link) => link.href).filter(Boolean),
      ),
    ),
  ];
  const relatedDestinations = await Promise.all(
    relatedHrefs.map(async (href) => {
      const destination = await page.request.get(new URL(href, target).href);
      return {
        href,
        status: destination.status(),
        ok: destination.ok(),
      };
    }),
  );

  const checks = {
    httpOk: Boolean(response?.ok()),
    expectedServiceCount: cardCount === 3,
    allDisclosureSummariesClear: before.allDisclosureSummariesClear,
    signalsPlacedInDetails: before.serviceCards.every(
      (card) =>
        card.summarySignalGroups === 0 &&
        card.detailSignalGroups === 1 &&
        card.signalCount > 0,
    ),
    signalsHiddenWhenCollapsed: before.serviceCards.every(
      (card) => !card.open && !card.signalGroupVisible,
    ),
    signalsVisibleWhenExpanded: after.serviceCards.every(
      (card) => card.open && card.signalGroupVisible && card.signalCount > 0,
    ),
    relatedWorkLinked: after.serviceCards.every(
      (card, index) =>
        card.relatedLinkCount === [1, 3, 3][index] &&
        card.relatedLinks.every(
          (link) =>
            link.href?.startsWith('/work/') &&
            link.href.endsWith('/') &&
            Boolean(link.label),
        ),
    ),
    relatedDestinationsOk:
      relatedDestinations.length > 0 &&
      relatedDestinations.every((destination) => destination.ok),
    noHorizontalOverflow: after.scrollWidth <= after.innerWidth + 2,
  };

  results.push({
    profile: profile.name,
    viewport: profile.viewport,
    status: Object.values(checks).every(Boolean) ? 'pass' : 'fail',
    checks,
    before,
    after,
    relatedDestinations,
  });
  await page.close();
}

await browser.close();
const report = {
  schema: 'sm-systems.disclosure-qa.v1',
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
