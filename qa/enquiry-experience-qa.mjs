import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { chromium } from 'playwright';

const target = process.argv[2] || 'http://localhost:3210/';
const output = resolve(process.argv[3] || 'qa-output/enquiry-experience.json');
await mkdir(dirname(output), { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    // These checks do not send analytics or submit enquiries.
    await context.route('**/www.googletagmanager.com/**', route => route.abort());
    const page = await context.newPage();
    await page.goto(new URL('#project-enquiry', target).href);
    const dialog = page.getByRole('dialog', { name: 'Start a project' });
    await dialog.waitFor({ state: 'visible' });
    await page.locator('.project-enquiry-form[data-status="ready"]').waitFor({ timeout: 30000 });
    const initial = await dialog.evaluate(element => ({
      top: element.scrollTop,
      horizontalOverflow: element.scrollWidth > element.clientWidth + 2,
      bodyLocked: getComputedStyle(document.body).overflow === 'hidden',
      focused: document.activeElement?.getAttribute('aria-label'),
    }));
    assert.equal(initial.top, 0, 'Dialog must open at its top');
    assert.equal(initial.horizontalOverflow, false, 'Dialog must fit horizontally');
    assert.equal(initial.bodyLocked, true, 'Background must not scroll while dialog is open');
    assert.equal(initial.focused, 'Close project enquiry', 'Initial keyboard focus must remain at the top');

    const iframeElement = await page.locator('.hs-form-frame iframe').elementHandle();
    const frame = await iframeElement.contentFrame();
    const formLayout = await frame.evaluate(() => ({
      width: innerWidth,
      contentWidth: document.documentElement.scrollWidth,
      height: innerHeight,
      contentHeight: document.documentElement.scrollHeight,
    }));
    assert.ok(formLayout.contentWidth <= formLayout.width + 2, 'Embedded form must fit horizontally');
    assert.ok(formLayout.contentHeight <= formLayout.height + 2, 'Form must use the dialog scroll, not a nested scroll');

    await page.screenshot({ path: resolve(dirname(output), `enquiry-${viewport.width}.png`) });
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(new URL(page.url()).hash, '', 'Escape must clear the enquiry hash');
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).overflow), 'hidden');

    const trigger = page.getByRole('button', { name: 'Start project', exact: true }).first();
    await trigger.click();
    await dialog.evaluate(element => { element.scrollTop = element.scrollHeight; });
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(await trigger.evaluate(element => element === document.activeElement), true, 'Closing restores trigger focus');
    await trigger.click();
    assert.equal(await dialog.evaluate(element => element.scrollTop), 0, 'Reopening resets dialog scroll');
    await page.getByRole('button', { name: 'Close project enquiry' }).click();
    results.push({ viewport, status: 'pass', initial, formLayout });
    await context.close();
  }

  const failedContext = await browser.newContext();
  await failedContext.route('**/www.googletagmanager.com/**', route => route.abort());
  await failedContext.route('**/*.hsforms.net/**', route => route.abort());
  const failedPage = await failedContext.newPage();
  await failedPage.goto(new URL('#project-enquiry', target).href);
  const failure = failedPage.getByRole('alert').filter({ hasText: 'The enquiry form couldn’t load.' });
  await failure.waitFor({ state: 'visible', timeout: 20000 });
  assert.match(await failure.getByRole('link', { name: 'email Stefan' }).getAttribute('href'), /^mailto:stefan@smsystems\.au/);
  assert.equal(await failedPage.locator('.hs-form-frame').isVisible(), false);
  results.push({ scenario: 'blocked-form-script', status: 'pass', submissionAttempted: false });
  await failedContext.close();
} catch (error) {
  results.push({ status: 'fail', error: error.message });
  process.exitCode = 1;
} finally {
  await browser.close();
  const report = { schema_version: 1, target, generated_at: new Date().toISOString(), results, status: results.some(r => r.status === 'fail') ? 'fail' : 'pass' };
  await writeFile(output, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
}
