export type ServiceProof = {
  title: string;
  description: string;
  href: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type ServiceItem = {
  slug: string;
  name: string;
  shortLabel: string;
  summary: string;
  description: string;
  fitTitle: string;
  fit: string;
  signals: string[];
  capabilities: {
    label: string;
    title: string;
    body: string;
  }[];
  process: {
    title: string;
    body: string;
  }[];
  proof: ServiceProof[];
  metaTitle: string;
  metaDescription: string;
};

export const serviceItems: ServiceItem[] = [
  {
    slug: 'business-websites-quote-systems',
    name: 'Business websites and quote systems',
    shortLabel: 'Websites / enquiry',
    summary:
      'Customer-facing websites that explain the work clearly and turn genuine interest into structured enquiries.',
    description:
      'SM Systems builds practical websites for Australian service businesses, with clear service information, credible completed work, direct contact routes, quote forms, and the measurement needed to understand the enquiry path.',
    fitTitle: 'A clearer path from search to a useful enquiry.',
    fit:
      'This service fits businesses whose website undersells the work, makes customers hunt for answers, or passes incomplete enquiry details into an inconsistent follow-up process.',
    signals: [
      'Services and locations are difficult to understand from the current website.',
      'Quote requests arrive without enough information for a useful first response.',
      'Contact actions, trust signals, or conversion tracking are inconsistent.',
    ],
    capabilities: [
      {
        label: 'Customer experience',
        title: 'Clear services, completed work, and contact paths.',
        body:
          'Structure the site around what prospective customers need to understand before they call, email, or request a quote.',
      },
      {
        label: 'Enquiry system',
        title: 'Quote forms that collect useful context.',
        body:
          'Capture service type, location, timing, contact preference, and project details in a form shaped around the business.',
      },
      {
        label: 'Measurement',
        title: 'A conversion path that can be checked.',
        body:
          'Set up the important enquiry events and handoffs so form success, calls, and next steps can be verified.',
      },
    ],
    process: [
      {
        title: 'Map the customer path',
        body:
          'Review the current website, services, completed work, enquiry routes, and the information needed before follow-up.',
      },
      {
        title: 'Build the narrow conversion path',
        body:
          'Create the core pages, contact actions, quote flow, and responsive experience before adding secondary content.',
      },
      {
        title: 'Verify and hand over',
        body:
          'Test the published experience, confirm the enquiry path, and leave clear operating notes for future updates.',
      },
    ],
    proof: [
      {
        title: 'Precision Residential Construction website',
        description:
          'A published service-business website with service navigation, project photography, before-and-after comparisons, direct contact routes, and a structured quote enquiry.',
        href: '/work/precision-residential-construction/',
        image: {
          src: '/precision/website-homepage.png',
          alt: 'Precision Residential Construction homepage with service navigation and quote actions',
          width: 1280,
          height: 720,
        },
      },
    ],
    metaTitle: 'Business websites and quote systems | SM Systems',
    metaDescription:
      'Business websites and structured quote systems for Australian service businesses, including service content, completed project work, enquiry forms, and conversion measurement.',
  },
  {
    slug: 'workflow-automation-integrations',
    name: 'Workflow automation and integrations',
    shortLabel: 'Automation / integration',
    summary:
      'Reliable workflows that connect forms, APIs, payments, CRMs, spreadsheets, dashboards, and the people operating them.',
    description:
      'SM Systems builds workflow automation and integrations around the tools a business already uses. Each engagement starts with a bounded path, explicit data rules, visible exceptions, and a handoff that someone can operate.',
    fitTitle: 'Connect the systems without hiding the failure points.',
    fit:
      'This service fits teams relying on copy-paste, brittle no-code flows, disconnected software, or automations that technically run but are difficult to trust and maintain.',
    signals: [
      'The same record is copied manually between two or more systems.',
      'Failures, duplicates, or incomplete records are discovered too late.',
      'A webhook or API exists, but the production handoff is still unclear.',
    ],
    capabilities: [
      {
        label: 'Integration',
        title: 'APIs, webhooks, and system handoffs.',
        body:
          'Define the source, destination, field contract, authentication boundary, and expected response for each connection.',
      },
      {
        label: 'Automation',
        title: 'Workflows with visible decision paths.',
        body:
          'Build routing, validation, retry, exception, and review steps in n8n, Make, or a purpose-built service where appropriate.',
      },
      {
        label: 'Operation',
        title: 'Operating records someone can maintain.',
        body:
          'Leave test cases, readback, logging expectations, failure notes, and a clear description of what owns the next step.',
      },
    ],
    process: [
      {
        title: 'Define one complete handoff',
        body:
          'Name the source, destination, required fields, business rules, and the conditions that should stop or reroute a record.',
      },
      {
        title: 'Prove the controlled path',
        body:
          'Build and test the smallest end-to-end route with representative inputs and visible success and exception outcomes.',
      },
      {
        title: 'Harden the operation',
        body:
          'Add the monitoring, rerun safety, documentation, and ownership notes justified by the workflow.',
      },
    ],
    proof: [
      {
        title: 'Zendesk AI Support Copilot and Jira handoff',
        description:
          'A human-reviewed AI support path with a native Zendesk app, controlled provider writes, Jira callback, replay safety, and verified AWS commissioning.',
        href: '/work/zendesk-ai-support-copilot/',
        image: {
          src: '/zendesk-ai-support-copilot/04-aws-architecture.png',
          alt: 'Verified Zendesk, Jira, and AWS support workflow architecture',
          width: 1280,
          height: 960,
        },
      },
      {
        title: 'n8n service enquiry intake and routing',
        description:
          'A customer quote form, persistent duplicate checks, human review, exception holds, and an operator register implemented in n8n.',
        href: '/work/n8n-service-lead-routing/',
        image: {
          src: '/n8n-service-lead/routing-workflow.svg',
          alt: 'n8n service enquiry workflow from form intake through routing and controlled handoff',
          width: 1280,
          height: 960,
        },
      },
      {
        title: 'Airtable and Make opportunity pipeline',
        description:
          'A controlled opportunity path connecting intake, qualification, follow-up, delivery, and approved handoff states.',
        href: '/work/airtable-make-opportunity-pipeline/',
        image: {
          src: '/airtable-make/make-router.png',
          alt: 'Make opportunity router connected to an Airtable workflow',
          width: 1504,
          height: 705,
        },
      },
    ],
    metaTitle: 'Workflow automation and integrations | SM Systems',
    metaDescription:
      'Workflow automation, API and webhook integrations, n8n and Make workflows, data routing, exception handling, and maintainable system handoffs.',
  },
  {
    slug: 'crm-lead-routing-operational-systems',
    name: 'CRM, lead routing, and operational systems',
    shortLabel: 'CRM / operations',
    summary:
      'Controlled intake, record ownership, dashboards, and operator tools built around the way the business actually works.',
    description:
      'SM Systems builds CRM and operational systems that carry useful context from first enquiry through qualification, ownership, delivery, and reporting. The emphasis is on clear states, reliable records, and visible human decisions.',
    fitTitle: 'Give every record an owner, a state, and a next step.',
    fit:
      'This service fits businesses where leads, jobs, customer records, or operational decisions are spread across inboxes, spreadsheets, CRM notes, and tools with conflicting versions of the truth.',
    signals: [
      'Leads or requests arrive without a clear owner or qualification state.',
      'Duplicate, incomplete, or disconnected records weaken follow-up.',
      'Operators lack one dependable view of what happened and what happens next.',
    ],
    capabilities: [
      {
        label: 'Intake',
        title: 'Validated records from the first handoff.',
        body:
          'Define required context, deduplication rules, consent boundaries, and the route into the system of record.',
      },
      {
        label: 'Control',
        title: 'Clear stages, ownership, and review gates.',
        body:
          'Model the states a real operator needs, including qualified, held, approved, exception, won, lost, and delivered outcomes.',
      },
      {
        label: 'Visibility',
        title: 'Dashboards and tools for daily operation.',
        body:
          'Present the records, actions, and status needed to run the process without rebuilding business logic in a report.',
      },
    ],
    process: [
      {
        title: 'Map records and decisions',
        body:
          'Identify the source records, owners, required fields, stage changes, approvals, and downstream actions.',
      },
      {
        title: 'Commission a controlled path',
        body:
          'Configure or build one complete route, then test associations, deduplication, state changes, and operator actions.',
      },
      {
        title: 'Document the operating boundary',
        body:
          'Record what is automated, what requires approval, which operating records are retained, and how changes should be made safely.',
      },
    ],
    proof: [
      {
        title: 'Zendesk AI Support Copilot and Jira handoff',
        description:
          'A controlled support operation connecting cited AI routing, human approval, private Zendesk actions, Jira task creation, and provider readback.',
        href: '/work/zendesk-ai-support-copilot/',
        image: {
          src: '/zendesk-ai-support-copilot/01-human-reviewed-support-console.png',
          alt: 'Human-reviewed Zendesk support workflow with a verified Jira handoff',
          width: 1280,
          height: 960,
        },
      },
      {
        title: 'HubSpot lead-to-deal and Zendesk handoff',
        description:
          'A controlled customer path from HubSpot pipeline stages and linked records into approved Zendesk customer context with provider readback and replay controls.',
        href: '/work/hubspot-lead-to-deal-crm/',
        image: {
          src: '/hubspot-lead-to-deal/lead-to-deal-pipeline.png',
          alt: 'HubSpot CRM lead-to-deal pipeline with controlled stages',
          width: 1149,
          height: 648,
        },
      },
      {
        title: 'RFID subscription and access platform',
        description:
          'A connected customer, Stripe sandbox, tag administration, access-decision, operator-control, and Aurora Serverless system.',
        href: '/work/rfid-subscription-access-system/',
        image: {
          src: '/rfid/01-subscription-to-access-decision.png',
          alt: 'RFID subscription and access platform architecture',
          width: 1280,
          height: 960,
        },
      },
    ],
    metaTitle: 'CRM, lead routing, and operational systems | SM Systems',
    metaDescription:
      'CRM setup, lead routing, record controls, dashboards, and operator systems with clear ownership, review states, and maintainable business workflows.',
  },
];

export function getService(slug: string) {
  return serviceItems.find((service) => service.slug === slug);
}
