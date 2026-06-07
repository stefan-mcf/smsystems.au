export type ProofItem = {
  slug: string;
  title: string;
  lane: string;
  problemShape: string;
  whatItProves: string;
  boundary: string;
  primaryLink: string;
  primaryLinkLabel: string;
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
    whatItProves: 'A repeatable way to reproduce the fault, explain it, and leave a diagnosis packet someone else can review.',
    boundary: 'Portfolio entry for debugging workflow shape; not a blanket claim about every platform or production context.',
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
          title: '44 passing gates',
          body: 'ruff, mypy, and pytest back the local walkthrough and synthetic request/response contracts.',
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
    whatItProves: 'Readable payload mapping, retry-aware data paths, and evidence that the expected data made the trip.',
    boundary: 'Presented as evidence of workflow shape and implementation quality rather than universal integration coverage.',
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
    whatItProves: 'Configurable mapping, before-and-after checks, and reporting that makes cleanup decisions visible.',
    boundary: 'Portfolio entry for sync and reporting work under controlled fixtures and explicit output boundaries.',
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
    whatItProves: 'Approval gates, operator controls, and a practical boundary between automation and judgment.',
    boundary: 'Not a claim of autonomous magic; a portfolio lane for review-gated workflow design and implementation.',
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
    lane: 'Deployed client system',
    problemShape: 'A hands-free carwash access workflow: the customer chooses a wash plan, Stripe handles subscription checkout, an RFID tag identifies the vehicle at the bay, and the backend returns the approved package decision to operators.',
    whatItProves: 'Comfort across edge devices, backend flows, and the boring constraints that decide whether a system survives contact with the floor.',
    boundary: 'Framed as a deployed anchor-client system, not a generic packaged SaaS or broad-market claim.',
    primaryLink: '/#rfid-subscription-access-system',
    primaryLinkLabel: 'View case study',
    caseStudy: {
      proofStrip: [
        {
          label: 'BUILT',
          title: 'Subscription-to-tag flow',
          body: 'Customer plan selection, secure checkout, account/signup state, and operator RFID tag assignment.',
        },
        {
          label: 'DEPLOYED',
          title: 'Cloud runtime and database',
          body: 'ASP.NET Core API on AWS with Postgres persistence for tags, events, subscriptions, and signup state.',
        },
        {
          label: 'PROVED',
          title: 'Hands-free access path',
          body: 'Reader tag detection posts to the API, which approves or denies access and returns the selected wash tier.',
        },
      ],
      screenshots: [
        {
          src: '/rfid/operator-dashboard.png',
          alt: 'Sanitized RFID operator dashboard showing the approval workflow, tier decision, runtime health, and recent event structure without live customer or tag identifiers.',
          caption:
            'Sanitized operator dashboard view showing the approval workflow, tier decision, and event tracking without live identifiers.',
        },
        {
          src: '/rfid/subscription-website.png',
          alt: 'Modular National Cleaning subscription website showing Standard, Premium, and Ultimate monthly wash plan cards.',
          caption:
            'Customer plan-selection surface proving Standard, Premium, and Ultimate subscription setup before secure checkout.',
        },
      ],
    },
    featured: true,
    anchorClient: true,
  },
];
