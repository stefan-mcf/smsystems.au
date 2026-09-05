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
  technicalTool?: boolean;
};

export const proofItems: ProofItem[] = [
  {
    slug: 'zendesk-ai-support-copilot',
    title: 'Zendesk AI Support Copilot + Jira on AWS',
    lane: 'Flagship build',
    problemShape:
      'An internal SM Systems support system combining cited AI assistance, human review, a native Zendesk app, an approved Jira handoff, and controlled AWS testing.',
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
    title: 'Automation Debugger',
    lane: 'Workflow reliability',
    problemShape:
      'Classifies failed Zapier, Make, n8n, webhook, and API events, applies deterministic local corrections, blocks unsafe replays, and produces operator-ready reports.',
    primaryLink: 'https://github.com/stefan-mcf/automation-debugger',
    primaryLinkLabel: 'View GitHub repository',
    caseStudy: {
      proofStrip: [
        {
          label: 'Capability',
          title: 'Diagnose across platforms',
          body: 'Normalizes provider-shaped events into one traceable failure contract for CLI, API, and report generation.',
        },
        {
          label: 'Control',
          title: 'Refuse unsafe replay',
          body: 'Duplicate, invalid-signature, and already-applied events stop with zero destination operations.',
        },
        {
          label: 'Boundary',
          title: 'Local incident simulation',
          body: 'CLI and FastAPI runs use synthetic fixtures and local adapters; production provider repair remains separately authorized work.',
        },
      ],
    },
    featured: true,
    technicalTool: true,
  },
  {
    slug: 'api-webhook-bridge',
    title: 'API Webhook Bridge',
    lane: 'Integration reliability',
    problemShape:
      'Validates contact, order, and payment webhooks, maps approved fields, controls duplicate delivery, and records audit and dead-letter outcomes.',
    primaryLink: 'https://github.com/stefan-mcf/api-webhook-bridge',
    primaryLinkLabel: 'View GitHub repository',
    caseStudy: {
      proofStrip: [
        {
          label: 'Capability',
          title: 'Map approved events',
          body: 'Explicit JSON contracts transform approved payloads into deterministic destination-shaped operations.',
        },
        {
          label: 'Control',
          title: 'Protect delivery integrity',
          body: 'Request limits, schema validation, idempotency, and dead-letter handling prevent invalid or repeated work from appearing successful.',
        },
        {
          label: 'Boundary',
          title: 'Local integration surface',
          body: 'OpenAPI flows use synthetic fixtures and destination-shaped outputs; live provider calls, credentials, and cloud deployment remain separate implementation work.',
        },
      ],
    },
    featured: true,
    technicalTool: true,
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
    title: 'Human Review Router',
    lane: 'Human review controls',
    problemShape:
      'A deterministic control layer that applies typed policy to supplied classifications and confidence metadata, then completes low-risk work or pauses for human review.',
    primaryLink: 'https://github.com/stefan-mcf/review-router',
    primaryLinkLabel: 'View GitHub repository',
    caseStudy: {
      proofStrip: [
        {
          label: 'Capability',
          title: 'Apply routing policy',
          body: 'Consumes supplied classification and confidence metadata across six automation families without generating model output.',
        },
        {
          label: 'Control',
          title: 'Hold for human review',
          body: 'Ambiguous or high-risk work becomes a claimable review packet with an auditable resolution record.',
        },
        {
          label: 'Boundary',
          title: 'Local policy execution',
          body: 'CLI and FastAPI runs use synthetic fixtures; live model and provider connections remain separate implementation work.',
        },
      ],
    },
    featured: true,
    technicalTool: true,
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
      'A private SM Systems opportunity and delivery pipeline connecting approved intake, Airtable records, Make routing, duplicate checks, review decisions, and project handoffs.',
    caseStudyLink: '/work/airtable-make-opportunity-pipeline/',
    primaryLink:
      'https://github.com/stefan-mcf/airtable-make-opportunity-pipeline',
    primaryLinkLabel: 'View GitHub repository',
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
          width: 1280,
          height: 960,
        },
        {
          src: '/airtable-make/outreach-analytics.png',
          alt: 'Outreach analytics showing source coverage and manual follow-up controls.',
          caption:
            'Ledger-backed outreach coverage with clear source visibility and human-controlled follow-up status.',
          width: 1280,
          height: 960,
        },
        {
          src: '/airtable-make/airtable-opportunities.png',
          alt: 'Airtable opportunities view showing owner-approved records routed into decision-required and review-hold states.',
          caption:
            'Authenticated Airtable view showing Make-routed opportunities in decision-required and owner-review states.',
          width: 1280,
          height: 960,
        },
        {
          src: '/airtable-make/delivery-handoff.png',
          alt: 'Delivered Precision Residential Construction website beside its Airtable project record and accepted delivery path.',
          caption:
            'The delivered Precision website shown alongside its Airtable project record, accepted scope, and labelled acceptance path.',
          width: 1280,
          height: 960,
        },
        {
          src: '/airtable-make/make-router.png',
          alt: 'Opportunity intake router in Make showing the connected Airtable workflow, successful route tests, and inactive final state.',
          caption:
            'Authenticated Make view of the connected 14-module router, four bounded route tests, and final inactive state.',
          width: 1280,
          height: 960,
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
      'An internal n8n implementation connecting a quote form, duplicate checks, human review, and an operator register, tested with synthetic enquiries.',
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
      'An internal SM Systems workflow linking HubSpot CRM records to Zendesk customer context, with human approval, verified record creation, and duplicate handling.',
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
      'A paid-client responsive construction website launched through Cloudflare Pages with an n8n-backed quote enquiry and owner-notification path.',
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
          label: 'PRODUCTION LAUNCH',
          title: 'Cloudflare Pages and custom domain',
          body: 'Production deployment with custom-domain connection, DNS, SSL, canonical routing, Zoho Mail setup, and responsive desktop/mobile QA.',
        },
        {
          label: 'N8N LEAD INTAKE',
          title: 'Recorded enquiry and owner notification',
          body: 'The production form posts to n8n; a labelled commissioning enquiry reached the owner and received a reply.',
        },
      ],
      screenshots: [
        {
          src: '/precision/01-live-paid-client-website.png',
          alt: 'Responsive Precision Residential Construction website shown on desktop and mobile.',
          caption:
            'The paid-client website is live on its custom domain with responsive desktop and mobile layouts.',
          width: 1280,
          height: 960,
        },
        {
          src: '/precision/02-services-at-a-glance.png',
          alt: 'Precision Residential Construction services section showing decking, framing, pergolas, renovations, cladding, and exterior carpentry.',
          caption:
            'Six residential service categories are organised into one scannable customer-facing view.',
          width: 1280,
          height: 960,
        },
        {
          src: '/precision/03-before-and-after-transformation.png',
          alt: 'Precision Residential Construction before-and-after section comparing the original brick facade with the completed timber re-clad.',
          caption:
            'A direct before-and-after comparison makes the completed exterior transformation clear.',
          width: 1280,
          height: 960,
        },
        {
          src: '/precision/04-completed-work-in-context.png',
          alt: 'Precision Residential Construction recent projects gallery showing completed hardwood and glass-balustrade decking.',
          caption:
            'Finished-project photography is paired with concise scope details across three residential builds.',
          width: 1280,
          height: 960,
        },
        {
          src: '/precision/05-production-quote-intake.png',
          alt: 'Precision Residential Construction quote enquiry form collecting contact details, project location, service type, timeframe, preferred contact method, and project details.',
          caption:
            'Structured project details post to the production n8n workflow for recording and owner notification.',
          width: 1280,
          height: 960,
        },
      ],
    },
    featured: true,
    anchorClient: true,
  },
  {
    slug: 'rfid-subscription-access-system',
    title: 'RFID subscription and access platform',
    lane: 'Client project',
    problemShape:
      'A client system linking verified customer accounts, per-vehicle subscriptions, Stripe sandbox billing, local-first RFID decisions, operator controls, and a request-driven AWS data layer.',
    caseStudyLink: '/work/rfid-subscription-access-system/',
    primaryLink:
      'https://github.com/stefan-mcf/rfid-subscription-access-system',
    primaryLinkLabel: 'View GitHub repository',
    caseStudy: {
      proofStrip: [
        {
          label: 'ACCESS',
          title: 'Decision and field controls',
          body: 'Tag registration, entitlement checks, repeat protection, operator modes, and explicit field-commissioning gates.',
        },
        {
          label: 'SUBSCRIPTION',
          title: 'Customer and billing lifecycle',
          body: 'Verified accounts, per-vehicle plans, Stripe sandbox Checkout, Billing Portal access, and signed lifecycle events.',
        },
        {
          label: 'CLOUD',
          title: 'Request-driven PostgreSQL',
          body: 'A live migration from fixed RDS compute to private Aurora Serverless v2 with observed zero-ACU idle state.',
        },
      ],
      screenshots: [
        {
          src: '/rfid/06-operator-and-edge-access-decisions.png',
          alt: 'RFID operator dashboard showing an access decision, subscription context, runtime status, and recent allowed or denied events.',
          caption:
            'The operator view brings together allow-or-deny results, customer context, durable runtime state, and recent events.',
          width: 1280,
          height: 960,
        },
        {
          src: '/rfid/07-tag-assignment-and-claim-lookup.png',
          alt: 'RFID operator tag setup showing reader selection, customer claim-code lookup, and controlled manual assignment.',
          caption:
            'Tag assignment supports reader selection and customer claim codes while retaining a controlled operator fallback.',
          width: 1280,
          height: 960,
        },
        {
          src: '/rfid/08-wash-controls-outputs-disabled.png',
          alt: 'RFID operator wash controls showing off, manual, and automatic modes with all physical outputs disabled.',
          caption:
            'Modes and output indicators remain visible without treating a dashboard action as confirmation of physical movement.',
          width: 1280,
          height: 960,
        },
        {
          src: '/rfid/01-subscription-to-access-decision.png',
          alt: 'RFID system architecture connecting the customer portal, Stripe sandbox, AWS FIFO processing, Aurora PostgreSQL, the access API, and field controls.',
          caption:
            'Customer, billing, durable state, access decisions, and field controls are separated by explicit system boundaries.',
          width: 1280,
          height: 960,
        },
        {
          src: '/rfid/02-vehicle-plan-selection.png',
          alt: 'Customer portal presenting Standard, Premium, and Ultimate wash-plan choices for one vehicle.',
          caption:
            'Each vehicle receives its own explicit plan choice before customer and billing details move forward.',
          width: 1280,
          height: 960,
        },
        {
          src: '/rfid/03-vehicle-details-before-checkout.png',
          alt: 'Customer portal capturing vehicle registration and optional fleet context before secure checkout.',
          caption:
            'Registration anchors the plan to a specific vehicle before the customer enters the secure billing handoff.',
          width: 1280,
          height: 960,
        },
        {
          src: '/rfid/04-customer-account-and-access-state.png',
          alt: 'Customer account showing a vehicle plan, access status, tag readiness, and per-vehicle billing controls with private identifiers removed.',
          caption:
            'The customer workspace keeps plan, vehicle, tag readiness, payment state, and billing actions visible without exposing private account details.',
          width: 1280,
          height: 960,
        },
        {
          src: '/rfid/05-stripe-sandbox-billing-state.png',
          alt: 'Stripe sandbox subscription and paid test-invoice state with private customer identifiers excluded.',
          caption:
            'Sandbox subscription and invoice state anchor the signed event lifecycle. The displayed amount is a temporary test price, not commercial pricing.',
          width: 1280,
          height: 960,
        },
        {
          src: '/rfid/09-aurora-serverless-database-migration.png',
          alt: 'Before-and-after database architecture comparing fixed RDS PostgreSQL with Aurora Serverless v2 and verified acceptance checks.',
          caption:
            'The live service moved to Aurora Serverless v2, preserved record counts, returned to zero ACU at idle, and retired the old RDS instance.',
          width: 1280,
          height: 960,
        },
      ],
    },
    featured: true,
    anchorClient: true,
  },
];
