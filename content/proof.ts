export type ProofItem = {
  slug: string;
  title: string;
  lane: string;
  problemShape: string;
  primaryLink?: string;
  primaryLinkLabel?: string;
  caseStudyLink?: string;
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
      width?: number;
      height?: number;
    }[];
    clientVersion?: string;
    limits?: string;
  };
  featured?: boolean;
  anchorClient?: boolean;
  featuredBuild?: boolean;
};

export const proofItems: ProofItem[] = [
  {
    slug: 'zendesk-ai-support-copilot',
    title: 'Zendesk AI Support Copilot + Jira on AWS',
    lane: 'Flagship build',
    problemShape:
      'A human-reviewed support system combining cited AI assistance, safety routing, a native Zendesk app, an approval-gated Jira handoff, and verified AWS commissioning.',
    caseStudyLink: '/work/zendesk-ai-support-copilot/',
    primaryLink:
      'https://github.com/stefan-mcf/zendesk-ai-support-copilot',
    primaryLinkLabel: 'View GitHub repository',
    caseStudy: {
      proofStrip: [
        {
          label: 'CONTROLLED ROUTING',
          title: 'Draft, escalate, or block',
          body: 'Citations, confidence, sensitive-data checks, injection controls, and policy decide what reaches human review.',
        },
        {
          label: 'HUMAN AUTHORITY',
          title: 'No public-reply path',
          body: 'The native Zendesk app keeps every suggestion private and requires an explicit approval before provider writes.',
        },
        {
          label: 'ENGINEERING HANDOFF',
          title: 'One task, verified callback',
          body: 'Jira receives one approved task and returns its issue key without replay creating a second work item.',
        },
      ],
      screenshots: [
        {
          src: '/zendesk-ai-support-copilot/01-human-reviewed-support-console.png',
          alt: 'Native Zendesk sidebar showing a human-approved AI escalation and verified Jira task key.',
          caption:
            'Low-confidence incident routing suppresses the customer-facing draft, then one human approval completes the private engineering handoff.',
          width: 1280,
          height: 960,
        },
        {
          src: '/zendesk-ai-support-copilot/02-jira-engineering-handoff.png',
          alt: 'Jira task created from approved Zendesk context with a verified callback.',
          caption:
            'Approved Zendesk context becomes one Jira task, with the issue key returned through the protected callback.',
          width: 1280,
          height: 960,
        },
        {
          src: '/zendesk-ai-support-copilot/03-evaluation-release-gate.png',
          alt: 'Forty-case controlled evaluation showing route, citation, risk, draft, and sensitive-data results.',
          caption:
            'Forty fixed synthetic cases exercise draft, escalation, and block routes before provider handoff.',
          width: 1280,
          height: 960,
        },
        {
          src: '/zendesk-ai-support-copilot/04-aws-architecture.png',
          alt: 'Verified AWS deployment architecture from Zendesk review through Jira callback.',
          caption:
            'The commissioned path joins the Zendesk app, authenticated AWS runtime, encrypted retrieval storage, Bedrock, Jira, secrets, and monitoring.',
          width: 1280,
          height: 960,
        },
        {
          src: '/zendesk-ai-support-copilot/05-provider-delivery-state.png',
          alt: 'Jira Automation audit showing webhook, task creation, callback, and replay controls.',
          caption:
            'The provider state records one controlled task, a successful callback, and zero public Zendesk replies.',
          width: 1280,
          height: 960,
        },
      ],
    },
    featured: true,
    featuredBuild: true,
  },
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
          body: 'Diagnosis JSON, replay success/refusal records, dead-letter traces, implementation notes, and reviewable run records.',
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
          body: 'Representative local runs cover HubSpot-like contact, Shopify-like order, and Stripe-like payment intake with dead-letter records.',
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
          body: 'pytest, Ruff, mypy, example verification, rendered output checks, and executor verification for every fixture bundle.',
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
    slug: 'conversion-measurement-inbound-lead-system',
    title: 'Conversion measurement and inbound lead system',
    lane: 'Live',
    problemShape:
      'A live SM Systems website path connecting HubSpot enquiry capture, versioned GTM and GA4 events, the main Airtable base, human qualification, Make routing, deal creation, event QA, and reporting.',
    caseStudyLink: '/work/conversion-measurement-inbound-lead-system/',
    primaryLink:
      'https://github.com/stefan-mcf/conversion-measurement-inbound-lead-system',
    primaryLinkLabel: 'View GitHub repository',
    caseStudy: {
      proofStrip: [
        {
          label: 'MEASUREMENT PATH',
          title: 'Seven non-PII events',
          body: 'Page views, case-study views, important CTA clicks, form start, and confirmed generate_lead are routed through versioned GTM tags.',
        },
        {
          label: 'LEAD OPERATIONS',
          title: 'One deduplicated route',
          body: 'A confirmed enquiry becomes one HubSpot contact and one matching inbound record in the main Airtable base.',
        },
        {
          label: 'QA CONTROL',
          title: 'Duplicate caught and repaired',
          body: 'The Playwright harness caught two generate_lead events, then passed the repaired exactly-once path with zero PII findings.',
        },
      ],
      screenshots: [
        {
          src: '/conversion-measurement/live-enquiry-path.png',
          alt: 'Live SM Systems HubSpot enquiry form beside the website, contact, main Airtable and qualification path.',
          caption:
            'Live enquiry flow from smsystems.au to HubSpot and the main Airtable base, with deal creation held behind human qualification.',
          width: 1280,
          height: 960,
        },
        {
          src: '/conversion-measurement/versioned-events.png',
          alt: 'Seven-event conversion plan beside a cropped native GTM workspace and published version details.',
          caption:
            'Versioned GTM and GA4 event design with a stable submission ID and no personal data in analytics.',
          width: 1280,
          height: 960,
        },
        {
          src: '/conversion-measurement/event-qa-repair.png',
          alt: 'Failing duplicate-event QA report beside the repaired exactly-once passing report.',
          caption:
            'Deterministic QA catches a duplicated generate_lead event before the repaired path passes exactly once.',
          width: 1280,
          height: 960,
        },
        {
          src: '/conversion-measurement/human-gated-routing.png',
          alt: 'Native active Make scenario with valid, duplicate, malformed, review and qualification routes.',
          caption:
            'Active Make routing handles confirmed, duplicate, malformed and review-required outcomes without prospect communication.',
          width: 1280,
          height: 960,
        },
        {
          src: '/conversion-measurement/main-airtable-qa-routes.png',
          alt: 'Native Measurement QA Runs table in the main SM Systems Pipeline Airtable base.',
          caption:
            'Website, delivery, review and qualification checks retained in the existing main Airtable operating base.',
          width: 1280,
          height: 960,
        },
      ],
    },
    featured: true,
    featuredBuild: true,
  },
  {
    slug: 'airtable-make-opportunity-pipeline',
    title: 'Airtable & Make opportunity pipeline',
    lane: 'Built',
    problemShape:
      'A private opportunity and delivery pipeline connecting owner-approved intake, Airtable records, Make routing, duplicate checks, review decisions, and project handoffs.',
    caseStudyLink: '/work/airtable-make-opportunity-pipeline/',
    caseStudy: {
      proofStrip: [
        {
          label: 'OPERATING VIEW',
          title: 'One Airtable pipeline',
          body: 'Owner-approved intake, opportunities, activities, exceptions, and project handoffs remain visible in one operating view.',
        },
        {
          label: 'ROUTING CONTROLS',
          title: 'Four tested outcomes',
          body: 'The Make router handles valid, duplicate, invalid, and owner-review paths without automating applications or messages.',
        },
        {
          label: 'DELIVERY HANDOFF',
          title: 'Scope and acceptance retained',
          body: 'Won work becomes a project only after handoff approval, with the accepted scope, criteria, and next milestone saved.',
        },
      ],
      screenshots: [
        {
          src: '/airtable-make/pipeline-overview.png',
          alt: 'Pipeline overview showing sent outreach, source lists, opportunities, delivered work, outreach mix, and source coverage.',
          caption:
            'Operating view bringing outreach, source coverage, opportunities, and delivered work into one pipeline.',
          width: 1504,
          height: 705,
        },
        {
          src: '/airtable-make/outreach-analytics.png',
          alt: 'Outreach analytics showing source coverage and manual follow-up controls.',
          caption:
            'Ledger-backed outreach coverage with clear source visibility and manual follow-up controls.',
          width: 1504,
          height: 705,
        },
        {
          src: '/airtable-make/airtable-opportunities.png',
          alt: 'Airtable opportunities view showing owner-approved records routed into decision-required and review-hold states.',
          caption:
            'Airtable opportunities view showing owner-approved records routed into decision and review states.',
          width: 1504,
          height: 705,
        },
        {
          src: '/airtable-make/delivery-handoff.png',
          alt: 'Delivered Precision Residential Construction website beside its Airtable project record and accepted delivery path.',
          caption:
            'Delivered website shown beside its Airtable project record, with accepted scope and criteria retained.',
          width: 1504,
          height: 771,
        },
        {
          src: '/airtable-make/make-router.png',
          alt: 'Opportunity intake router in Make showing the connected Airtable workflow, successful route tests, and inactive final state.',
          caption:
            'Make scenario showing the connected router, successful route tests, and inactive final state.',
          width: 1504,
          height: 705,
        },
      ],
    },
    featured: true,
    featuredBuild: true,
  },
  {
    slug: 'n8n-service-lead-routing',
    title: 'n8n service enquiry intake and routing',
    lane: 'Built',
    problemShape:
      'A customer quote form, local duplicate checks, human review, exception holds, an operator register, and five synthetic routing scenarios implemented in n8n 2.31.6.',
    caseStudyLink: '/work/n8n-service-lead-routing/',
    primaryLink: 'https://github.com/stefan-mcf/n8n-service-lead-routing',
    primaryLinkLabel: 'View GitHub repository',
    caseStudy: {
      proofStrip: [
        {
          label: 'FORM INTAKE',
          title: 'Structured service request',
          body: 'Contact details, service, location, timing, project details, and consent enter through one n8n form.',
        },
        {
          label: 'ROUTING',
          title: 'Five explicit outcomes',
          body: 'Accepted, duplicate, invalid, human-review, and integration-exception records each move to a named state.',
        },
        {
          label: 'OPERATOR STATE',
          title: 'Register and review gate',
          body: 'The local register retains each outcome while uncertain enquiries wait for a written human decision.',
        },
      ],
      screenshots: [
        {
          src: '/n8n-service-lead/customer-intake.png',
          alt: 'Structured service enquiry form implemented with the native n8n Form Trigger.',
          caption:
            'The quote request collects contact, service, location, timing, project details, and consent before routing begins.',
          width: 1280,
          height: 960,
        },
        {
          src: '/n8n-service-lead/routing-workflow.svg',
          alt: 'Readable map of the inactive n8n service enquiry workflow from intake through recorded outcomes.',
          caption:
            'The inactive workflow applies validation, persistent duplicate checks, human review, exception holds, and controlled handoff preparation.',
          width: 1280,
          height: 960,
        },
        {
          src: '/n8n-service-lead/operator-register.png',
          alt: 'Native n8n Service Enquiry Register containing five synthetic routing outcomes.',
          caption:
            'The local Service Enquiry Register holds accepted, duplicate, invalid, human-review, and integration-exception states.',
          width: 1280,
          height: 960,
        },
        {
          src: '/n8n-service-lead/human-review.png',
          alt: 'Native n8n human review form with approve, hold, and reject decision paths.',
          caption:
            'Regulated or unclear enquiries wait for an explicit decision and written reason before the workflow continues.',
          width: 1280,
          height: 960,
        },
      ],
    },
    featured: true,
    featuredBuild: true,
  },
  {
    slug: 'hubspot-lead-to-deal-crm',
    title: 'HubSpot lead-to-deal and Zendesk handoff',
    lane: 'Built',
    problemShape:
      'A controlled customer path from a seven-stage HubSpot pipeline and linked CRM records into approved Zendesk customer context with provider readback and duplicate-safe replay.',
    caseStudyLink: '/work/hubspot-lead-to-deal-crm/',
    primaryLink:
      'https://github.com/stefan-mcf/hubspot-zendesk-customer-handoff',
    primaryLinkLabel: 'View GitHub repository',
    caseStudy: {
      proofStrip: [
        {
          label: 'CRM FOUNDATION',
          title: 'Seven-stage HubSpot lifecycle',
          body: 'Linked companies, contacts, and deals move through controlled qualification and proposal stages using stable record keys.',
        },
        {
          label: 'PROVIDER HANDOFF',
          title: 'Approved Zendesk context',
          body: 'A closed-won HubSpot relationship maps into one Zendesk organization and linked end user without creating a ticket.',
        },
        {
          label: 'REPLAY CONTROL',
          title: 'Readback and reconciliation',
          body: 'Provider IDs are read back and reused while invalid, unapproved, incomplete, or mismatched inputs remain blocked.',
        },
      ],
      screenshots: [
        {
          src: '/hubspot-lead-to-deal/lead-to-deal-pipeline-framed.png',
          alt: 'Cropped native HubSpot deal board showing the SM Systems lead-to-deal pipeline.',
          caption:
            'Seven-stage HubSpot pipeline configured and verified with controlled company, contact, and deal records.',
          width: 1280,
          height: 960,
        },
        {
          src: '/hubspot-lead-to-deal/deal-stage-history-framed.png',
          alt: 'Cropped native HubSpot deal record showing creation and controlled deal stage activity receipts.',
          caption:
            'Native HubSpot activity retains deal creation and controlled stage-change receipts on one auditable record.',
          width: 1280,
          height: 960,
        },
        {
          src: '/hubspot-zendesk-handoff/01-crm-to-support-lifecycle.png',
          alt: 'Controlled CRM-to-support lifecycle from an approved HubSpot relationship to mapped Zendesk customer context.',
          caption:
            'The handoff keeps validation, provider sequencing, readback, reconciliation, and communication boundaries visible.',
          width: 1280,
          height: 960,
        },
        {
          src: '/hubspot-zendesk-handoff/02-hubspot-approved-relationship.png',
          alt: 'Native HubSpot deal record showing a closed-won stage, linked contact, and primary company.',
          caption:
            'The native HubSpot record shows the controlled closed-won deal and its linked contact and company records.',
          width: 1280,
          height: 960,
        },
        {
          src: '/hubspot-zendesk-handoff/03-mapping-and-approval-controls.png',
          alt: 'HubSpot to Zendesk field mapping beside approval and payload validation controls.',
          caption:
            'Explicit field mappings, stable keys, exact payload hashes, and owner approval gate both provider stages.',
          width: 1280,
          height: 960,
        },
        {
          src: '/hubspot-zendesk-handoff/04-zendesk-customer-context.png',
          alt: 'Native Zendesk organization views showing service context, one linked end user, and zero tickets.',
          caption:
            'The native Zendesk organization views show retained onboarding context, one linked end user, and the controlled zero-ticket state.',
          width: 1280,
          height: 960,
        },
        {
          src: '/hubspot-zendesk-handoff/05-reconciliation-and-exceptions.png',
          alt: 'Idempotent HubSpot and Zendesk reconciliation checks beside CLI exception coverage.',
          caption:
            'The second run reuses every record while invalid, unapproved, incomplete, or mismatched inputs remain blocked.',
          width: 1280,
          height: 960,
        },
      ],
    },
    featured: true,
    featuredBuild: true,
  },
  {
    slug: 'precision-residential-construction-website',
    title: 'Precision Residential Construction website',
    lane: 'Client project',
    problemShape:
      'A customer-facing residential construction website combining services, project photography, before-and-after work, direct contact options, and a structured quote enquiry form.',
    primaryLink: 'https://prconstruction.au/',
    primaryLinkLabel: 'Visit live website',
    caseStudyLink: '/work/precision-residential-construction/',
    caseStudy: {
      proofStrip: [
        {
          label: 'CUSTOMER WEBSITE',
          title: 'Services and completed work',
          body: 'A clear path through services, completed work, and before-and-after results.',
        },
        {
          label: 'LEAD CAPTURE',
          title: 'Quote enquiry form',
          body: 'A structured enquiry flow for contact details, suburb, service type, timing, and preferred contact method.',
        },
        {
          label: 'DIRECT CONTACT',
          title: 'Call and email actions',
          body: 'Prominent phone, quote, and email paths across desktop and mobile layouts.',
        },
      ],
      screenshots: [
        {
          src: '/precision/website-homepage.png',
          alt: 'Precision Residential Construction homepage with service navigation, contact actions, and residential project photography.',
          caption:
            'Customer-facing homepage with clear service navigation, phone contact, and quote actions.',
          width: 1280,
          height: 720,
        },
        {
          src: '/precision/website-services.png',
          alt: 'Precision Residential Construction services section showing decking, framing, pergolas, renovations, cladding, and exterior carpentry.',
          caption:
            'Services section covering the company’s residential carpentry and construction work.',
          width: 1280,
          height: 720,
        },
        {
          src: '/precision/website-before-after.png',
          alt: 'Precision Residential Construction before-and-after section comparing the original brick facade with the completed timber re-clad.',
          caption:
            'Before-and-after project presentation showing the completed exterior transformation.',
          width: 1280,
          height: 720,
        },
        {
          src: '/precision/website-projects.png',
          alt: 'Precision Residential Construction recent projects gallery showing completed hardwood and glass-balustrade decking.',
          caption:
            'Recent-project gallery presenting completed work with clear project descriptions.',
          width: 1280,
          height: 720,
        },
        {
          src: '/precision/website-quote-crm.png',
          alt: 'Precision Residential Construction quote enquiry form collecting contact details, project location, service type, timeframe, preferred contact method, and project details.',
          caption:
            'Structured quote intake captures the project details needed for CRM follow-up.',
          width: 1280,
          height: 720,
        },
      ],
    },
    featured: true,
    anchorClient: true,
  },
  {
    slug: 'rfid-subscription-access-system',
    title: 'RFID carwash subscription access system',
    lane: 'Client project',
    problemShape:
      'A carwash subscription and access system linking customer plan selection, checkout, accounts, tag registration, backend decisions, database records, and operator dashboards.',
    caseStudyLink: '/work/rfid-subscription-access-system/',
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
          width: 2048,
          height: 1060,
        },
        {
          src: '/rfid/operator-tag-setup.png',
          alt: 'RFID operator dashboard Tag Setup workspace with tag selection, claim-code activation, and manual activation controls.',
          caption:
            'Tag Setup workspace for selecting tags, activating customer claim codes, and managing tag assignments.',
          width: 2048,
          height: 1060,
        },
        {
          src: '/rfid/operator-wash-test.png',
          alt: 'RFID operator dashboard Wash Test workspace with automation modes and wash-output signal indicators.',
          caption:
            'Wash Test workspace for selecting an automation mode and monitoring wash-output signals.',
          width: 2048,
          height: 1060,
        },
        {
          src: '/rfid/subscription-website.png',
          alt: 'Subscription website showing Standard, Premium, and Ultimate monthly wash-plan cards.',
          caption:
            'Customer plan-selection screen showing Standard, Premium, and Ultimate options before checkout.',
          width: 2048,
          height: 1060,
        },
      ],
    },
    featured: true,
    anchorClient: true,
  },
];
