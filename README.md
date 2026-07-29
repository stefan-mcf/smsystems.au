# SM Systems portfolio

[smsystems.au](https://smsystems.au/) is my public portfolio for automation, integration, AI support, and operational systems work.

The site is structured around four flagship projects:

1. [Zendesk AI Support Copilot with Jira on AWS](https://smsystems.au/work/zendesk-ai-support-copilot/)
2. [Automation Debugger](https://smsystems.au/work/automation-debugger/)
3. [Conversion Measurement and Inbound Lead System](https://smsystems.au/work/conversion-measurement-inbound-lead-system/)
4. [Precision Residential Construction Website](https://smsystems.au/work/precision-residential-construction/)

Each project page explains the operating problem, my role, architecture, key decisions, implementation corrections, validation, result, and current boundary. Smaller Airtable, Make, n8n, Zendesk, Jira, and RFID implementations are retained as focused engineering notes.

## Architecture

```text
Next.js App Router
├── structured project content
├── reusable long-form project layout
├── static image assets
├── HubSpot project enquiry
├── consent-aware GA4 measurement
└── static export to GitHub Pages
```

## Stack

- Next.js 16, React 19, and TypeScript
- Static export hosted on GitHub Pages
- Playwright checks for conversion events and responsive behavior
- GitHub Actions for build and deployment

## Local development

```bash
npm ci
npm run dev
```

Create a production export:

```bash
npm run build
```

Run the browser checks against a local server:

```bash
npm run qa:event
npm run qa:responsive
```

## Content model

Project narratives live in [`content/projects.ts`](content/projects.ts). The shared renderer is [`components/projects/project-story.tsx`](components/projects/project-story.tsx), which keeps page structure consistent without flattening every project into the same three-card summary.

## Public content boundary

Screenshots are prepared for public use. Credentials, customer records, private planning material, cloud account identifiers, and local machine paths are excluded from the repository.
