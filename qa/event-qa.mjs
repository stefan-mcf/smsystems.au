import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const EVENT_RULES = {
  page_view: ['event_version', 'page_path', 'page_title'],
  view_case_study: ['event_version', 'page_path', 'case_study_path'],
  click_email: ['event_version', 'page_path', 'link_location'],
  click_upwork_profile: ['event_version', 'page_path', 'link_location'],
  click_external_portfolio: ['event_version', 'page_path', 'link_domain'],
  form_start: ['event_version', 'page_path', 'form_name', 'submission_id'],
  generate_lead: ['event_version', 'page_path', 'form_name', 'submission_id'],
};

const PII_KEYS = new Set([
  'email',
  'email_address',
  'first_name',
  'firstname',
  'last_name',
  'lastname',
  'full_name',
  'message',
  'phone',
  'phone_number',
]);

function parseArgs(argv) {
  const options = {
    fixture: null,
    out: resolve('qa-output/event-qa.json'),
    profile: 'all',
    url: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--fixture') options.fixture = argv[++index];
    else if (value === '--out') options.out = resolve(argv[++index]);
    else if (value === '--profile') options.profile = argv[++index];
    else if (value === '--url') options.url = argv[++index];
    else throw new Error(`Unknown argument: ${value}`);
  }

  if (!options.fixture && !options.url) {
    options.fixture = 'success';
  }
  if (!['all', 'site-smoke', 'form-start'].includes(options.profile)) {
    throw new Error(`Unknown profile "${options.profile}". Use all, site-smoke or form-start.`);
  }

  return options;
}

function fixtureUrl(name) {
  if (!['success', 'duplicate'].includes(name)) {
    throw new Error(`Unknown fixture "${name}". Use success or duplicate.`);
  }
  const here = dirname(fileURLToPath(import.meta.url));
  return pathToFileURL(resolve(here, 'fixtures', `${name}.html`)).href;
}

function findPii(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => findPii(entry, `${path}[${index}]`, findings));
    return findings;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, entry]) => {
      if (PII_KEYS.has(key.toLowerCase())) {
        findings.push({ path: `${path}.${key}`, reason: 'sensitive-key' });
      }
      findPii(entry, `${path}.${key}`, findings);
    });
    return findings;
  }

  if (typeof value === 'string') {
    if (/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(value)) {
      findings.push({ path, reason: 'email-pattern' });
    }
    const knownSafeIdentifier = /(?:^|\.)(?:submission_id|event_id|run_id|test_id)$/i.test(path);
    if (!knownSafeIdentifier && /(?:\+?\d[\s().-]*){8,}/.test(value)) {
      findings.push({ path, reason: 'phone-pattern' });
    }
  }

  return findings;
}

function markdownReport(report) {
  const rows = report.events
    .map(
      (event) =>
        `| ${event.name} | ${event.expected} | ${event.observed} | ${event.parametersValid ? 'pass' : 'fail'} | ${event.status} |`,
    )
    .join('\n');

  return `# SM Systems event QA report

- Run ID: \`${report.runId}\`
- Target: \`${report.target}\`
- Overall: **${report.status.toUpperCase()}**
- Analytics requests observed: ${report.analyticsRequests.length}
- Analytics event deliveries: ${report.analyticsDeliveries.length}
- PII findings: ${report.piiFindings.length}

| Event | Expected | Observed | Parameters | Result |
|---|---:|---:|---|---|
${rows}

## Failures

${report.failures.length ? report.failures.map((failure) => `- ${failure}`).join('\n') : '- None'}
`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function htmlReport(report) {
  const rows = report.events
    .map(
      (event) => `
        <tr>
          <td><code>${escapeHtml(event.name)}</code></td>
          <td>${event.expected}</td>
          <td>${event.observed}</td>
          <td><span class="badge ${event.parametersValid ? 'pass' : 'fail'}">${event.parametersValid ? 'pass' : 'fail'}</span></td>
          <td><span class="badge ${event.status}">${event.status}</span></td>
        </tr>`,
    )
    .join('');
  const failures = report.failures.length
    ? report.failures.map((failure) => `<li>${escapeHtml(failure)}</li>`).join('')
    : '<li>None</li>';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SM Systems event QA — ${escapeHtml(report.status)}</title>
    <style>
      :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
      body { margin: 0; background: #08111f; color: #e8eef8; }
      main { width: min(1080px, calc(100% - 48px)); margin: 48px auto; }
      .eyebrow { color: #7dd3fc; font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      h1 { margin: 8px 0 12px; font-size: clamp(30px, 5vw, 52px); }
      .summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 28px 0; }
      .card, table, .failures { border: 1px solid #24334a; border-radius: 14px; background: #101d30; }
      .card { padding: 18px; }
      .label { color: #9aabc3; font-size: 12px; text-transform: uppercase; }
      .value { margin-top: 8px; font-size: 24px; font-weight: 750; }
      table { width: 100%; border-collapse: collapse; overflow: hidden; }
      th, td { padding: 14px 16px; border-bottom: 1px solid #24334a; text-align: left; }
      th { color: #9aabc3; font-size: 12px; text-transform: uppercase; }
      tr:last-child td { border-bottom: 0; }
      .badge { display: inline-block; border-radius: 999px; padding: 4px 9px; font-size: 12px; font-weight: 800; text-transform: uppercase; }
      .pass { background: #123b2d; color: #86efac; }
      .fail { background: #4b1d28; color: #fda4af; }
      .failures { margin-top: 20px; padding: 20px 24px; }
      code { color: #bae6fd; }
      @media (max-width: 680px) { .summary { grid-template-columns: 1fr; } th, td { padding: 10px; } }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Deterministic conversion measurement</p>
      <h1>Event QA: ${escapeHtml(report.status.toUpperCase())}</h1>
      <p>Run <code>${escapeHtml(report.runId)}</code></p>
      <section class="summary">
        <div class="card"><div class="label">Analytics deliveries</div><div class="value">${report.analyticsDeliveries.length}</div></div>
        <div class="card"><div class="label">PII findings</div><div class="value">${report.piiFindings.length}</div></div>
        <div class="card"><div class="label">Failed checks</div><div class="value">${report.failures.length}</div></div>
      </section>
      <table>
        <thead><tr><th>Event</th><th>Expected</th><th>Observed</th><th>Parameters</th><th>Result</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <section class="failures"><h2>Failures</h2><ul>${failures}</ul></section>
    </main>
  </body>
</html>
`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const target = options.url || fixtureUrl(options.fixture);
  const analyticsRequests = [];
  const analyticsDeliveries = [];
  const analyticsPiiFindings = [];
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('request', (request) => {
    const url = request.url();
    const parsedUrl = new URL(url);
    if (parsedUrl.pathname.includes('/g/collect') || parsedUrl.pathname.includes('/ccm/collect')) {
      const payloads = [parsedUrl.searchParams, ...(request.postData() || '').split('\n').filter(Boolean).map((line) => new URLSearchParams(line))];
      payloads.forEach((payload) => {
        const eventName = payload.get('en');
        if (eventName) {
          const inspectable = {};
          payload.forEach((value, key) => {
            if (['dl', 'dr', 'dt'].includes(key)) {
              inspectable[key] = value;
            } else if (key.startsWith('ep.') || key.startsWith('epn.')) {
              inspectable[key.replace(/^epn?\./, '')] = value;
            }
          });
          analyticsPiiFindings.push(
            ...findPii(
              inspectable,
              `$analyticsDelivery[${analyticsDeliveries.length}]`,
            ),
          );
          analyticsDeliveries.push({
            eventName,
            parameterKeys: [...payload.keys()]
              .filter((key) => key.startsWith('ep.') || key.startsWith('epn.'))
              .sort(),
          });
        }
      });
      analyticsRequests.push({
        method: request.method(),
        endpoint: `${parsedUrl.hostname}${parsedUrl.pathname}`,
      });
    }
  });

  await page.goto(target, { waitUntil: 'domcontentloaded' });

  if (options.fixture) {
    await page.getByRole('button', { name: options.fixture === 'duplicate' ? 'Run duplicated conversion path' : 'Run valid conversion path' }).click();
  } else {
    await page.waitForFunction(
      () => (window.dataLayer || []).some((entry) => entry?.event === 'gtm.load'),
      { timeout: 10000 },
    );
    const allow = page.getByRole('button', { name: 'Allow analytics' });
    await allow.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await allow.isVisible().catch(() => false)) {
      await allow.click();
    }
    if (options.profile === 'form-start') {
      await page.getByRole('button', { name: 'Start project' }).first().click();
      const formFrame = page.frameLocator('dialog[open] iframe[title="Form"]');
      await formFrame.getByRole('textbox', { name: 'First Name' }).fill('Synthetic QA');
      await page.waitForTimeout(1250);
    } else {
      await page.evaluate(() => {
        const clickWithoutNavigation = (selector) => {
          const link = document.querySelector(selector);
          if (!link) return;
          link.addEventListener('click', (event) => event.preventDefault(), { once: true });
          link.click();
        };

        const caseStudy = document.querySelector('details:has(a[href^="/work/"])');
        if (caseStudy && !caseStudy.open) {
          caseStudy.open = true;
        }
        clickWithoutNavigation('a[href^="mailto:"]');
        clickWithoutNavigation('a[href*="upwork.com/"]');
        clickWithoutNavigation('a[href^="http"]:not([href*="upwork.com/"])');
      });
      await page.waitForTimeout(750);
    }
  }

  await page.waitForTimeout(5000);
  const dataLayer = await page.evaluate(() =>
    (window.dataLayer || []).filter(
      (entry) => entry && typeof entry === 'object' && !Array.isArray(entry) && entry.event,
    ),
  );

  await browser.close();

  const selectedRules =
    options.profile === 'site-smoke'
      ? Object.entries(EVENT_RULES).filter(([name]) =>
          [
            'page_view',
            'view_case_study',
            'click_email',
            'click_upwork_profile',
            'click_external_portfolio',
          ].includes(name),
        )
      : options.profile === 'form-start'
        ? Object.entries(EVENT_RULES).filter(([name]) => ['page_view', 'form_start'].includes(name))
      : Object.entries(EVENT_RULES);
  const events = selectedRules.map(([name, requiredParameters]) => {
    const matches = dataLayer.filter((entry) => entry.event === name);
    const missingParameters = matches.flatMap((entry, index) =>
      requiredParameters
        .filter((parameter) => entry[parameter] === undefined || entry[parameter] === '')
        .map((parameter) => `${name}[${index}].${parameter}`),
    );
    const parametersValid = matches.length > 0 && missingParameters.length === 0;
    const observed = matches.length;
    return {
      name,
      expected: 1,
      observed,
      missingParameters,
      parametersValid,
      status: observed === 1 && parametersValid ? 'pass' : 'fail',
    };
  });

  const piiFindings = [...findPii(dataLayer), ...analyticsPiiFindings];
  const failures = events
    .filter((event) => event.status === 'fail')
    .map(
      (event) =>
        `${event.name}: expected 1 complete event, observed ${event.observed}; missing parameters: ${event.missingParameters.join(', ') || 'none'}`,
    );
  if (piiFindings.length) {
    failures.push(`Potential PII leakage detected at ${piiFindings.map((item) => item.path).join(', ')}`);
  }
  if (options.url) {
    selectedRules.forEach(([name]) => {
      const delivered = analyticsDeliveries.filter((delivery) => delivery.eventName === name).length;
      if (delivered !== 1) {
        failures.push(`${name}: expected 1 GA delivery, observed ${delivered}`);
      }
    });
  }

  const report = {
    schema: 'sm-systems.event-qa.v1',
    runId: `sm-qa-${new Date().toISOString().replace(/[:.]/g, '-')}`,
    generatedAt: new Date().toISOString(),
    target,
    status: failures.length ? 'fail' : 'pass',
    events,
    piiFindings,
    analyticsRequests,
    analyticsDeliveries,
    dataLayer,
    failures,
  };

  await mkdir(dirname(options.out), { recursive: true });
  await writeFile(options.out, `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(options.out.replace(/\.json$/i, '.md'), markdownReport(report));
  await writeFile(options.out.replace(/\.json$/i, '.html'), htmlReport(report));

  console.log(JSON.stringify({ status: report.status, output: options.out, failures }, null, 2));
  process.exitCode = report.status === 'pass' ? 0 : 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 2;
});
