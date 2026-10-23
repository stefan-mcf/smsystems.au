# SM Systems

Source for [smsystems.au](https://smsystems.au/), covering software, integrations, workflow automation and industrial systems case studies.

**Status:** public source for the SM Systems business website.

**My contribution:** site design and implementation, case-study presentation, enquiry workflow and browser-based quality checks.

The site uses Next.js, TypeScript and a static export hosted on GitHub Pages.

## Development

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run build
npm run qa:event
npm run qa:responsive
```

Browser checks expect a locally running development server. A documentation-only change does not establish fresh live-form, provider or deployment acceptance.

## Scope and current state

Public case studies distinguish client delivery, internal implementations and local reference tools. Private client data, credentials, provider receipts and local planning files are excluded.

The main-branch deployment workflow publishes the static site. Website-content changes need their own reviewed release; the GitHub documentation cleanup does not deploy a new site.

## Documentation

- [Work and case studies](https://smsystems.au/#work)
- [Event QA harness](qa/event-qa.mjs)
- [Responsive checks](qa/responsive-smoke.mjs)
- [Deployment workflow](.github/workflows/deploy.yml)
