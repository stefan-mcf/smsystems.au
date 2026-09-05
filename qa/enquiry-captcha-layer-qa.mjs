import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const target = process.argv[2] || 'http://localhost:3210/';
const output = resolve(process.argv[3] || 'qa-output/enquiry-captcha-layer.json');
const browser = await chromium.launch();
const results = [];
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(target);
    await page.getByRole('button', { name: 'Decline', exact: true }).click();
    const trigger = page.getByRole('button', { name: 'Start project', exact: true }).first();
    await trigger.click();
    const dialog = page.locator('#project-enquiry');
    assert.notEqual(await dialog.getAttribute('aria-modal'), 'true', 'The external challenge must remain accessible to assistive technology');
    assert(await page.locator('.project-enquiry-background').evaluate((element) => element.inert));
    const close = page.getByRole('button', { name: 'Close project enquiry', exact: true });
    await close.press('Shift+Tab');
    assert(await dialog.getByRole('link', { name: 'Read how your information is handled.', exact: true }).evaluate((element) => element === document.activeElement));
    await page.keyboard.press('Tab');
    assert(await close.evaluate((element) => element === document.activeElement));

    // A synthetic sibling iframe reproduces the provider's DOM placement.
    // This tests layering and interaction, not a real CAPTCHA or submission.
    await page.evaluate(() => {
      const overlay = document.createElement('div');
      overlay.id = 'qa-provider-overlay';
      Object.assign(overlay.style, { position: 'fixed', inset: '80px 20px auto', zIndex: '2000000000' });
      const frame = document.createElement('iframe');
      frame.title = 'Synthetic external challenge';
      frame.srcdoc = '<button onclick="this.dataset.clicked=\'yes\'">Synthetic challenge control</button>';
      Object.assign(frame.style, { width: '250px', height: '100px', background: 'white' });
      overlay.append(frame);
      document.body.append(overlay);
    });
    const control = page.frameLocator('iframe[title="Synthetic external challenge"]').getByRole('button');
    await control.click({ timeout: 5000 });
    assert.equal(await control.getAttribute('data-clicked'), 'yes');
    await page.evaluate(() => document.getElementById('qa-provider-overlay').remove());

    const field = page.frameLocator('iframe[title="Form"]').getByRole('textbox', { name: 'Name', exact: true });
    await field.fill('');
    await field.press('Shift+Tab');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.getElementById('project-enquiry').open);
    await page.waitForFunction(() => document.activeElement?.getAttribute('aria-controls') === 'project-enquiry');
    assert(await trigger.evaluate((element) => element === document.activeElement));
    assert.equal(await page.locator('.project-enquiry-background').evaluate((element) => element.inert), false);
    results.push({ width, status: 'pass', focusLoop: true, externalIframeInteractive: true, keyboardExitFromForm: true, escapeFromDialog: true, focusRestored: true });
    await page.close();
  }
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify({ status: 'pass', target, results, limitation: 'Synthetic overlay boundary test. No CAPTCHA solved or enquiry submitted. Escape inside the cross-origin HubSpot iframe does not close the outer dialog in either the starting live site or this change; move focus out or use the visible Close control.' }, null, 2) + '\n');
  console.log(JSON.stringify({ status: 'pass', results }, null, 2));
} finally {
  await browser.close();
}
