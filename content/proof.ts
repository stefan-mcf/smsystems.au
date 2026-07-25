export type ProofItem = {
  slug: string;
  title: string;
  lane: string;
  problemShape: string;
  primaryLink?: string;
  primaryLinkLabel?: string;
  caseStudy?: {
    outcome?: string;
    problem?: string;
    whatBuilt?: string;
    proofStrip?: {
      label: string;
      title: string;
      body: string;
    }[];
    evidence?: string[];
    screenshots?: {
      src: string;
      alt: string;
      caption: string;
    }[];
    clientVersion?: string;
    limits?: string;
  };
  featured?: boolean;
  anchorClient?: boolean;
};

export const proofItems: ProofItem[] = [
  {
    slug: 'automation-debugger',
    title: 'Automation debugger',
    lane: 'Workflow diagnostics',
    problemShape:
      'A local debugger that normalizes event data, assigns trace IDs, classifies failure types, and produces reviewable diagnosis and replay reports.',
    primaryLink: 'https://github.com/stefan-mcf/automation-debugger',
    primaryLinkLabel: 'View GitHub README',
    caseStudy: {
      proofStrip: [
        {
          label: 'Built',
          title: 'Fixture-based debugger',
          body: 'Nine fixture classes cover malformed dates, duplicates, invalid signatures, retry loops, and platform-export quirks.',
        },
        {
          label: 'Tested',
          title: '44 passing tests',
          body: 'The recorded local run has 44 passing pytest tests, plus passing Ruff and mypy checks over the fixture-safe implementation.',
        },
        {
          label: 'Output',
          title: 'Reviewable artifacts',
          body: 'Diagnosis JSON, replay success/refusal records, dead-letter traces, implementation notes, and screenshot evidence.',
        },
      ],
    },
    featured: true,
  },
  {
    slug: 'api-webhook-bridge',
    title: 'API and webhook bridge',
    lane: 'Integrations',
    problemShape:
      'A FastAPI bridge that receives synthetic webhook events, validates fields, maps them through explicit JSON configs, and records audit trails with dead-letter handling.',
    primaryLink: 'https://github.com/stefan-mcf/api-webhook-bridge',
    primaryLinkLabel: 'View GitHub README',
    caseStudy: {
      proofStrip: [
        {
          label: 'Built',
          title: 'Field-mapped bridge',
          body: 'Explicit JSON configs map source events to destination-shaped operations with correlation IDs and duplicate detection.',
        },
        {
          label: 'Tested',
          title: 'Synthetic contracts',
          body: 'Local walkthrough covers HubSpot-like contact, Shopify-like order, and Stripe-like payment intake with dead-letter records.',
        },
        {
          label: 'Output',
          title: 'Audit + dead-letter',
          body: 'Every payload gets an audit trail; unsafe or unmapped payloads write to dead-letter instead of pretending success.',
        },
      ],
    },
    featured: true,
  },
  {
    slug: 'sheets-airtable-sync',
    title: 'Sheets and Airtable sync',
    lane: 'Reporting',
    problemShape:
      'A reconciliation sync that loads synthetic source events, matches orders to payments, classifies exceptions, and emits Airtable-ready operations plus Sheets-ready CSV ledger rows.',
    primaryLink: 'https://github.com/stefan-mcf/sheets-airtable-sync',
    primaryLinkLabel: 'View GitHub README',
    caseStudy: {
      proofStrip: [
        {
          label: 'Built',
          title: 'Reconciliation engine',
          body: 'Canonical contract normalizes orders, payments, refunds, duplicates, orphans, and invalid payloads into one ledger.',
        },
        {
          label: 'Tested',
          title: 'Multi-format outputs',
          body: 'Sync reports in JSON, Markdown, and HTML; Sheets-ready CSV; reconciliation preview API; exception queue.',
        },
        {
          label: 'Output',
          title: 'Quality gates',
          body: 'pytest, Ruff, mypy, example verification, screenshot rendering, and executor verification for every fixture bundle.',
        },
      ],
    },
    featured: true,
  },
  {
    slug: 'review-router',
    title: 'Review-gated AI router',
    lane: 'AI review checkpoints',
    problemShape:
      'A deterministic router that validates workflow contracts, attaches confidence metadata, auto-completes only when policy allows, and writes review packets when it should pause.',
    primaryLink: 'https://github.com/stefan-mcf/review-router',
    primaryLinkLabel: 'View GitHub README',
    caseStudy: {
      proofStrip: [
        {
          label: 'Built',
          title: 'Confidence-gated routing',
          body: 'Typed workflow contracts with fixture-based routing, confidence scoring, and deterministic auto-complete boundaries.',
        },
        {
          label: 'Tested',
          title: 'Six workflow families',
          body: 'Lead enrichment, inbox triage, support urgency, RSS summarization, creative-pack review, and debug replay.',
        },
        {
          label: 'Output',
          title: 'CLI + FastAPI surfaces',
          body: 'Same control pattern exposed through CLI and FastAPI with OpenAPI surface, review queue, and quality gates.',
        },
      ],
    },
    featured: true,
  },
  {
    slug: 'rfid-subscription-access-system',
    title: 'RFID carwash subscription access system',
    lane: 'Client project',
    problemShape:
      'A carwash subscription and access system linking customer plan selection, checkout, accounts, tag registration, backend decisions, database records, and operator dashboards.',
    caseStudy: {
      proofStrip: [
        {
          label: 'CUSTOMER FLOW',
          title: 'Plans and checkout',
          body: 'Customer plan selection, account and signup flows, and secure checkout-session handling.',
        },
        {
          label: 'ACCOUNT TOOLS',
          title: 'Account and tag management',
          body: 'Customer accounts, subscription records, and operator-managed tag assignments.',
        },
        {
          label: 'OPERATOR VIEW',
          title: 'Dashboard and events',
          body: 'Operator visibility into access decisions, wash tiers, runtime status, and event history.',
        },
      ],
      screenshots: [
        {
          src: '/rfid/operator-dashboard.png',
          alt: 'RFID operator dashboard showing access decisions, wash tiers, system status, and recent event history.',
          caption:
            'Operator dashboard for reviewing access decisions, wash tiers, system status, and event history.',
        },
        {
          src: '/rfid/operator-tag-setup.png',
          alt: 'RFID operator dashboard Tag Setup workspace with tag selection, claim-code activation, and manual activation controls.',
          caption:
            'Tag Setup workspace for selecting tags, activating customer claim codes, and managing tag assignments.',
        },
        {
          src: '/rfid/operator-wash-test.png',
          alt: 'RFID operator dashboard Wash Test workspace with automation modes and wash-output signal indicators.',
          caption:
            'Wash Test workspace for selecting an automation mode and monitoring wash-output signals.',
        },
        {
          src: '/rfid/subscription-website.png',
          alt: 'Subscription website showing Standard, Premium, and Ultimate monthly wash-plan cards.',
          caption:
            'Customer plan-selection screen showing Standard, Premium, and Ultimate options before checkout.',
        },
      ],
    },
    featured: true,
    anchorClient: true,
  },
];
