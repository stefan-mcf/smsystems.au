import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const base = process.argv[2] || 'http://localhost:3210/';
const output = resolve(process.argv[3] || 'qa-output/measurement-preference.json');
const browser = await chromium.launch();
const page = await browser.newPage();
const requestedGtm = [];
const results = [];
try {
  await page.route('https://www.googletagmanager.com/**', async (route) => {
    requestedGtm.push(route.request().url());
    await route.abort();
  });
  await page.goto(`${base}?utm_source=internal-qa&utm_medium=test&utm_campaign=platform-review&email=must-not-be-measured%40example.invalid&sm_test=1`);
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  assert.equal(requestedGtm.length, 0, 'No GTM request before consent or after decline');
  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click();
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).click();
  await page.waitForFunction(() => window.dataLayer?.some((e) => e?.event === 'page_view'));
  assert.equal(requestedGtm.length, 1);
  const initialEvents = await page.evaluate(() => window.dataLayer.filter((e) => e?.event === 'page_view'));
  assert.equal(initialEvents.length, 1);
  assert.equal(initialEvents[0].page_path, '/');
  assert.equal(initialEvents[0].traffic_type, 'internal');
  assert(!initialEvents[0].page_location.includes('?'));
  results.push({ scenario: 'decline-then-allow', status: 'pass', pageViews: 1, gtmRequests: 1 });

  await page.locator('#services details').first().locator('summary').click();
  await page.getByRole('link', { name: 'Explore this service', exact: true }).first().click();
  await page.waitForFunction(() => window.dataLayer?.filter((e) => e?.event === 'page_view').length === 2);
  const navigation = await page.evaluate(() => ({
    views: window.dataLayer.filter((e) => e?.event === 'page_view'),
    source: JSON.parse(sessionStorage.getItem('sm_enquiry_source_v1')),
  }));
  assert(navigation.views[1].page_path.startsWith('/services/'));
  assert.equal(navigation.source.source, 'internal-qa');
  assert.equal(navigation.source.landingPage, new URL(base).origin + '/');
  assert(!JSON.stringify(navigation.views).includes('must-not-be-measured'));
  assert.equal(requestedGtm.length, 1);
  results.push({ scenario: 'client-navigation-and-original-source', status: 'pass', pageViews: 2 });

  await page.getByRole('button', { name: 'Discuss your project', exact: true }).first().click();
  const opens = await page.evaluate(() => window.dataLayer.filter((e) => e?.event === 'open_project_enquiry'));
  assert.equal(opens.length, 1);
  assert.equal(opens[0].form_name, 'sm_project_enquiry_v1');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click();
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).click();
  assert.equal(await page.evaluate(() => window.dataLayer.filter((e) => e?.event === 'page_view').length), 2);
  results.push({ scenario: 'enquiry-open-and-repeated-allow', status: 'pass', enquiryOpens: 1, pageViews: 2 });

  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click();
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  await page.getByRole('link', { name: 'Back to services', exact: true }).click();
  await page.waitForURL((url) => url.pathname === '/');
  assert.equal(await page.evaluate(() => window.dataLayer.filter((e) => e?.event === 'page_view').length), 2);
  await page.reload();
  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).waitFor();
  assert.equal(requestedGtm.length, 1, 'Reload after decline must not request GTM');
  assert.equal(await page.evaluate(() => window.__smAnalyticsConsent), 'denied');
  results.push({ scenario: 'withdrawal-and-reload', status: 'pass' });

  const report = { schema_version: 1, status: 'pass', target: base, generated_at: new Date().toISOString(), results, limitation: 'GTM network intentionally blocked; provider delivery is a separate verification. No enquiry submitted.' };
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
