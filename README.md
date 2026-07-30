# SM Systems

Source for [smsystems.au](https://smsystems.au/), my portfolio for automation, integration, and operational systems work.

The site includes client work and case studies covering:

- customer-facing websites and enquiry paths;
- CRM implementation and lead-to-deal routing;
- n8n, Make, Airtable, and HubSpot workflows;
- measurement and event QA;
- API, webhook, and operator-facing automation tools.

## Stack

- Next.js and TypeScript
- Static export hosted on GitHub Pages
- Playwright-based responsive checks
- GitHub Actions deployment

## Quick start

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run build
npm run qa:event
npm run qa:responsive
```

The responsive check expects a locally running development server.

## Publication boundary

Public screenshots are sanitized before publication. Private planning notes, client data, credentials, and local machine paths do not belong in this repository.
