export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type ProjectLink = {
  label: string;
  href: string;
  style?: 'primary' | 'secondary';
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  cardDescription: string;
  summary: string;
  status: string;
  role: string;
  timeframe: string;
  stack: string[];
  featured: boolean;
  heroImage: ProjectImage;
  facts: {
    value: string;
    label: string;
  }[];
  context: {
    title: string;
    paragraphs: string[];
  };
  ownership: {
    intro: string;
    items: string[];
  };
  systemFlow: string[];
  decisions: {
    title: string;
    body: string;
  }[];
  turningPoint: {
    title: string;
    body: string;
  };
  gallery: ProjectImage[];
  validation: {
    intro: string;
    items: string[];
  };
  result: {
    title: string;
    paragraphs: string[];
  };
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: 'zendesk-ai-support-copilot',
    title: 'Zendesk AI Support Copilot with Jira on AWS',
    shortTitle: 'Zendesk AI Support Copilot',
    category: 'AI support operations',
    cardDescription:
      'A private Zendesk app that prepares cited support suggestions, keeps every response behind agent approval, and carries engineering escalations through Jira.',
    summary:
      'I built and deployed a human-reviewed support copilot that combines retrieval, hosted inference, Zendesk context, and a closed-loop Jira handoff.',
    status: 'Internal production system',
    role: 'Product, system design, full-stack engineering, cloud deployment',
    timeframe: '2026',
    stack: [
      'React',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'pgvector',
      'AWS',
      'Amazon Bedrock',
      'Zendesk',
      'Jira',
    ],
    featured: true,
    heroImage: {
      src: '/zendesk-ai-support-copilot/human-reviewed-support-console.png',
      alt: 'Zendesk ticket sidebar showing a cited support suggestion and mandatory human review controls.',
      caption:
        'The private Zendesk sidebar keeps source context, uncertainty, edits, and the final action in one agent-owned review step.',
      width: 1280,
      height: 960,
    },
    facts: [
      { value: '40', label: 'fixed evaluation cases' },
      { value: '64', label: 'backend tests' },
      { value: '0', label: 'autonomous public replies' },
      { value: '1', label: 'closed-loop Jira route' },
    ],
    context: {
      title: 'Support agents needed useful assistance without giving up control.',
      paragraphs: [
        'A useful support assistant has to do more than produce fluent text. It needs to ground suggestions in approved material, expose uncertainty, preserve ticket context, and stop safely when a human decision is required.',
        'I designed the system around the agent review step. The model prepares a cited suggestion, but only the support agent can edit, approve, or reject it. Engineering issues follow a separate Jira path with a verified callback into Zendesk.',
      ],
    },
    ownership: {
      intro:
        'I owned the product shape and the implementation from the Zendesk sidebar through the cloud services and release checks.',
      items: [
        'Designed the agent review flow, action states, source display, and engineering escalation path.',
        'Built the React and TypeScript Zendesk app and the FastAPI service behind it.',
        'Implemented retrieval with PostgreSQL and pgvector, then connected inference through Amazon Bedrock.',
        'Built Jira creation and callback handling with idempotent updates in Zendesk.',
        'Deployed the service on AWS and wrote the evaluation and operational checks used before release.',
      ],
    },
    systemFlow: [
      'Zendesk ticket context',
      'retrieval and policy checks',
      'Bedrock suggestion',
      'agent review',
      'private note or Jira handoff',
      'verified ticket update',
    ],
    decisions: [
      {
        title: 'Human approval is a product requirement',
        body: 'The system cannot post a public reply by itself. A suggestion remains editable and visibly sourced until an agent makes the final decision.',
      },
      {
        title: 'Retrieval and generation have separate checks',
        body: 'Source selection, policy rules, and model output are inspected independently. This makes a weak source match easier to diagnose than a single opaque confidence score.',
      },
      {
        title: 'Engineering handoff is closed loop',
        body: 'A Jira task is not treated as complete at creation time. The route retains identifiers on both sides and verifies the resulting private Zendesk update.',
      },
    ],
    turningPoint: {
      title: 'The first controlled escalation exposed two real integration defects.',
      body: 'The Zendesk project selector returned an unexpected value and the first webhook body arrived empty. The route stayed closed, created no duplicate note or Jira task, and gave me a narrow failure to inspect. I repaired the selector mapping and request construction, then reran the same case through Jira creation and Zendesk callback.',
    },
    gallery: [
      {
        src: '/zendesk-ai-support-copilot/jira-engineering-handoff.png',
        alt: 'Jira engineering handoff showing linked identifiers and the return path to Zendesk.',
        caption:
          'The escalation keeps linked provider identifiers so the engineering result can be associated with the originating ticket.',
        width: 1280,
        height: 960,
      },
      {
        src: '/zendesk-ai-support-copilot/evaluation-release-gate.png',
        alt: 'Release evaluation dashboard for the fixed support case set.',
        caption:
          'A fixed 40-case set checks retrieval, abstention, policy handling, and handoff behavior before a release is accepted.',
        width: 1280,
        height: 960,
      },
      {
        src: '/zendesk-ai-support-copilot/aws-architecture.png',
        alt: 'AWS architecture for the Zendesk support copilot.',
        caption:
          'The deployed path separates the Zendesk interface, API, retrieval store, model service, Jira integration, and operational records.',
        width: 1280,
        height: 960,
      },
    ],
    validation: {
      intro:
        'The release checks cover behavior at the user interface, API, retrieval, provider integration, and deployment layers.',
      items: [
        '64 backend tests across request handling, policy gates, retrieval, provider adapters, and failure paths.',
        'A fixed 40-case evaluation covering supported answers, weak context, abstention, policy-sensitive requests, and Jira escalation.',
        'Provider readback confirming private Zendesk notes, Jira linkage, callbacks, and zero autonomous public replies.',
        'AWS health, persistence, and deployment checks against the running internal service.',
      ],
    },
    result: {
      title: 'A working support system with clear authority at every step.',
      paragraphs: [
        'The result is an internal production deployment that support agents can operate inside Zendesk. It provides cited suggestions, records review decisions, and gives engineering issues a traceable route through Jira.',
        'The system currently uses controlled synthetic support data. It does not represent paid-client traffic, autonomous customer replies, a general accuracy claim, or measured commercial return.',
      ],
    },
    links: [
      {
        label: 'Read the related Zendesk to Jira note',
        href: '/work/zendesk-jira-support-escalation/',
        style: 'secondary',
      },
      { label: 'Discuss an AI support system', href: '/#contact', style: 'primary' },
    ],
  },
  {
    slug: 'automation-debugger',
    title: 'Automation Debugger',
    shortTitle: 'Automation Debugger',
    category: 'Automation reliability',
    cardDescription:
      'A Python toolkit for diagnosing failed Zapier, Make, n8n, and webhook runs before a retry creates duplicate or incorrect downstream work.',
    summary:
      'I built a local diagnostic toolkit that classifies workflow failures, refuses unsafe retries, and produces a repair record another engineer can follow.',
    status: 'Open source project',
    role: 'Product design, Python engineering, API, test suite, documentation',
    timeframe: '2026',
    stack: ['Python', 'FastAPI', 'Pydantic', 'pytest', 'Ruff', 'mypy'],
    featured: true,
    heroImage: {
      src: '/automation-debugger/routing-diagnosis.png',
      alt: 'Automation Debugger classifying a routing mismatch with a traceable diagnosis.',
      caption:
        'A normalized event and trace ID turn an unclear failed run into a specific routing diagnosis.',
      width: 1280,
      height: 760,
    },
    facts: [
      { value: '44', label: 'passing tests' },
      { value: '9', label: 'failure classes' },
      { value: '2', label: 'interfaces, CLI and API' },
      { value: '0', label: 'live provider writes' },
    ],
    context: {
      title: 'Blind retries can turn one automation failure into several business problems.',
      paragraphs: [
        'A failed workflow often arrives as a provider export, an unclear payload, and a request to run it again. That is risky when the destination may already have processed part of the event.',
        'I built Automation Debugger to separate diagnosis from replay. It normalizes the event, assigns a trace ID, identifies the failure class, and evaluates whether a corrected local replay is safe. Duplicate and signature failures stop before any destination operation is created.',
      ],
    },
    ownership: {
      intro:
        'I designed the diagnostic model, implemented the CLI and API surfaces, wrote the fixtures and tests, and documented the operator path.',
      items: [
        'Defined a common event contract for Zapier, Make, n8n, and generic webhook exports.',
        'Implemented deterministic classifiers for malformed dates, destination mismatches, invalid signatures, duplicate events, and retry loops.',
        'Added idempotency checks and explicit replay refusal records.',
        'Generated diagnosis JSON, replay records, dead-letter traces, and a readable handover report.',
        'Published a reproducible local walkthrough and quality checks in the GitHub repository.',
      ],
    },
    systemFlow: [
      'provider export or webhook fixture',
      'normalization',
      'failure classification',
      'safety decision',
      'local replay or refusal',
      'handover report',
    ],
    decisions: [
      {
        title: 'Diagnosis is deterministic',
        body: 'The same input and configuration produce the same failure class and recommended action. The tool does not use an opaque model to decide whether a replay is safe.',
      },
      {
        title: 'A refusal is a successful outcome',
        body: 'When an event is duplicated, unsigned, or already applied, the safest output is a structured refusal with zero destination operations.',
      },
      {
        title: 'Reports are written for the next operator',
        body: 'Machine-readable records sit beside a concise handover that explains the symptom, cause, action taken, and remaining decision.',
      },
    ],
    turningPoint: {
      title: 'The duplicate case changed replay from a command into a policy decision.',
      body: 'A technically valid payload can still be unsafe to repeat. I added destination-operation accounting and an idempotency check so the debugger can distinguish a correctable format error from an event that must not run again. The duplicate fixture now exits with a refusal record and no simulated destination work.',
    },
    gallery: [
      {
        src: '/automation-debugger/safe-local-replay.png',
        alt: 'Malformed date correction followed by a safe local replay.',
        caption:
          'A malformed date can be corrected and replayed locally after the normalized contract passes the safety checks.',
        width: 1280,
        height: 760,
      },
      {
        src: '/automation-debugger/duplicate-protection.png',
        alt: 'Duplicate event refusal with zero destination operations.',
        caption:
          'The duplicate path stops cleanly and records why no destination operation was produced.',
        width: 1280,
        height: 760,
      },
      {
        src: '/automation-debugger/handover-report.png',
        alt: 'Readable automation failure handover report.',
        caption:
          'The final report gives an engineer or operator the cause, action, files, and next decision without requiring them to reconstruct the run.',
        width: 1280,
        height: 760,
      },
    ],
    validation: {
      intro:
        'The repository is public and the full local fixture path can be reproduced without provider credentials.',
      items: [
        '44 passing pytest tests across normalization, classification, replay, refusal, reporting, and API behavior.',
        'Ruff and mypy checks over the Python implementation.',
        'Nine representative failure classes with committed input and expected-output fixtures.',
        'CLI and FastAPI routes exercise the same contracts and safety rules.',
      ],
    },
    result: {
      title: 'A diagnostic workflow that makes retry risk visible.',
      paragraphs: [
        'Automation Debugger gives engineers a structured way to move from a vague failed run to a specific failure class, a safe next action, and a reusable handover.',
        'All examples run locally with synthetic fixtures. The project does not sign in to provider accounts, modify production workflows, or replay live customer events.',
      ],
    },
    links: [
      {
        label: 'View the GitHub repository',
        href: 'https://github.com/stefan-mcf/automation-debugger',
        style: 'primary',
      },
      { label: 'Discuss automation reliability', href: '/#contact', style: 'secondary' },
    ],
  },
  {
    slug: 'conversion-measurement-inbound-lead-system',
    title: 'Conversion Measurement and Inbound Lead System',
    shortTitle: 'Conversion and Lead System',
    category: 'Lead operations',
    cardDescription:
      'A live enquiry path connecting the SM Systems website, GTM, GA4, HubSpot, Airtable, Make, and deterministic browser checks.',
    summary:
      'I connected measurement and lead operations around one stable submission ID, then built a browser check that caught and prevented double counting.',
    status: 'Live SM Systems system',
    role: 'System design, implementation, CRM, automation, measurement QA',
    timeframe: '2026',
    stack: ['Next.js', 'Playwright', 'GTM', 'GA4', 'HubSpot', 'Airtable', 'Make'],
    featured: true,
    heroImage: {
      src: '/conversion-measurement/event-qa-repair.png',
      alt: 'A failing duplicate conversion event check beside the repaired exactly-once result.',
      caption:
        'The browser check exposed two generate_lead events for one successful form, then confirmed the repaired exactly-once path.',
      width: 1280,
      height: 960,
    },
    facts: [
      { value: '1', label: 'stable submission ID' },
      { value: '7', label: 'non-personal analytics events' },
      { value: '1', label: 'human qualification gate' },
      { value: '0', label: 'personal fields in analytics' },
    ],
    context: {
      title: 'A form can appear to work while the systems behind it disagree.',
      paragraphs: [
        'A website confirmation is only one part of an enquiry path. Analytics can count the same submission twice, the CRM and operating base can create unrelated records, and automation can promote an unreviewed lead into a deal.',
        'I rebuilt the SM Systems path around a stable submission ID. The same identifier connects the successful website event, HubSpot contact, Airtable record, Make route, and qualification decision without putting names, email addresses, or message content into analytics.',
      ],
    },
    ownership: {
      intro:
        'I designed and implemented the full route across the website, analytics, CRM, operating base, automation, and browser QA.',
      items: [
        'Defined the versioned event contract and the personal-data boundary for GTM and GA4.',
        'Connected successful form submission to HubSpot and the main Airtable operating base.',
        'Built Make routes for confirmed, duplicated, malformed, and review-required records.',
        'Held HubSpot deal creation behind an explicit human qualification state.',
        'Wrote the Playwright event check and retained QA results in Airtable.',
      ],
    },
    systemFlow: [
      'successful website enquiry',
      'stable submission ID',
      'GA4 event and HubSpot contact',
      'Airtable operating record',
      'Make routing',
      'human qualification',
      'HubSpot deal',
    ],
    decisions: [
      {
        title: 'Success is defined by the form callback',
        body: 'The conversion event fires only after HubSpot reports a successful form submission. Button clicks and attempted sends are not counted as leads.',
      },
      {
        title: 'One key joins measurement and operations',
        body: 'A stable submission ID makes it possible to compare the website event with the CRM and Airtable records without sending personal information to analytics.',
      },
      {
        title: 'Qualification remains human',
        body: 'Make can validate and route the record, but it cannot create or associate a deal until the qualification state is approved.',
      },
    ],
    turningPoint: {
      title: 'The first end-to-end check counted one enquiry twice.',
      body: 'The browser harness found two generate_lead events after a single successful form submission. The issue was not visible in the customer experience. I traced the duplicate listeners, removed the second emission path, and reran the same scenario until the event appeared exactly once with no personal fields.',
    },
    gallery: [
      {
        src: '/conversion-measurement/live-enquiry-path.png',
        alt: 'SM Systems website enquiry path through HubSpot and Airtable.',
        caption:
          'A successful public enquiry creates connected HubSpot and Airtable records while deal creation waits for review.',
        width: 1280,
        height: 960,
      },
      {
        src: '/conversion-measurement/versioned-events.png',
        alt: 'Versioned GTM and GA4 event design.',
        caption:
          'The event plan covers meaningful page, case-study, call-to-action, form-start, and confirmed-lead actions without personal data.',
        width: 1280,
        height: 960,
      },
      {
        src: '/conversion-measurement/human-gated-routing.png',
        alt: 'Make routes for valid, duplicate, malformed, review, and qualification states.',
        caption:
          'The active Make scenario gives expected, duplicate, malformed, and review-required records an explicit destination.',
        width: 1280,
        height: 960,
      },
      {
        src: '/conversion-measurement/main-airtable-qa-routes.png',
        alt: 'Measurement QA records in the main SM Systems Airtable base.',
        caption:
          'Website, delivery, review, and qualification checks remain visible in the same operating base used for the lead path.',
        width: 1280,
        height: 960,
      },
    ],
    validation: {
      intro:
        'The implementation is checked at the browser, analytics, CRM, Airtable, and automation layers.',
      items: [
        'Playwright confirms one generate_lead event after one successful form submission.',
        'The event scan confirms zero names, email addresses, messages, or other personal fields in the analytics payload.',
        'HubSpot and Airtable readback confirms the shared identifier and connected lead records.',
        'Make route checks cover valid, duplicate, malformed, review-required, and qualification states.',
      ],
    },
    result: {
      title: 'One observable path from enquiry to qualified deal.',
      paragraphs: [
        'The live system now connects customer submission, measurement, CRM, Airtable operations, and deal qualification without treating any one platform as the whole source of truth.',
        'The current data includes commissioning traffic and normal site activity. It does not support claims about conversion-rate improvement, advertising attribution, revenue, or production-volume performance.',
      ],
    },
    links: [
      { label: 'Start a similar project', href: '/#contact', style: 'primary' },
      {
        label: 'View the website source',
        href: 'https://github.com/stefan-mcf/smsystems.au',
        style: 'secondary',
      },
    ],
  },
  {
    slug: 'precision-residential-construction',
    title: 'Precision Residential Construction Website',
    shortTitle: 'Precision Residential Construction',
    category: 'Client website',
    cardDescription:
      'A complete customer-facing website that turns a residential builder’s services, project photography, and quote requirements into a clear enquiry path.',
    summary:
      'I designed and delivered a live website that gives a residential construction client a credible project presentation and a structured route from interest to quote request.',
    status: 'Delivered client project',
    role: 'Client discovery, UX, visual design, frontend build, deployment',
    timeframe: '2026',
    stack: ['HTML', 'CSS', 'JavaScript', 'responsive design', 'form integration'],
    featured: true,
    heroImage: {
      src: '/precision/website-homepage.png',
      alt: 'Live Precision Residential Construction website homepage.',
      caption:
        'The published homepage leads with the builder’s work, service area, and a direct path to request a quote.',
      width: 1280,
      height: 720,
    },
    facts: [
      { value: '1', label: 'live client website' },
      { value: '4', label: 'core customer journeys' },
      { value: '3', label: 'direct contact routes' },
      { value: '100%', label: 'client-owned project media' },
    ],
    context: {
      title: 'The business needed its real work to carry the sales conversation.',
      paragraphs: [
        'Precision Residential Construction had the services, trade experience, and project photography, but not a public experience that brought them together. Prospective customers needed to understand the type of work offered, see relevant builds, and know what information to provide for a useful quote.',
        'I shaped the site around that decision path rather than a generic brochure. Services explain fit, project pages show the work, before-and-after presentation adds context, and the quote form gathers enough detail for a productive first response.',
      ],
    },
    ownership: {
      intro:
        'I worked directly from the client brief and supplied media, then owned the information structure, design, implementation, and deployment.',
      items: [
        'Turned the service list and project photography into a clear site structure.',
        'Designed the visual system and responsive layouts around the client’s brand.',
        'Built service, project, before-and-after, contact, and quote-request paths.',
        'Structured the enquiry form to capture project type, location, timing, budget context, and customer notes.',
        'Prepared the delivered site and direct phone, email, and form contact routes.',
      ],
    },
    systemFlow: [
      'local customer search or referral',
      'service fit',
      'project examples',
      'before-and-after context',
      'structured quote request',
      'direct client follow-up',
    ],
    decisions: [
      {
        title: 'Project imagery leads the experience',
        body: 'The site gives finished work and construction details room to breathe instead of surrounding them with generic stock photography or heavy marketing copy.',
      },
      {
        title: 'Service pages answer fit questions early',
        body: 'Customers can distinguish renovations, extensions, outdoor work, and other residential services before starting an enquiry.',
      },
      {
        title: 'The quote form gathers useful context',
        body: 'The form asks for the information the builder needs to qualify and prepare for the first conversation, while phone and email remain available for direct contact.',
      },
    ],
    turningPoint: {
      title: 'The content became clearer when the site stopped trying to say everything at once.',
      body: 'The early material mixed services, company background, and project images without a strong reading order. I separated the customer questions into distinct routes and used the homepage as a concise index. That gave the photography more impact and made the next action clear on both desktop and mobile.',
    },
    gallery: [
      {
        src: '/precision/website-services.png',
        alt: 'Precision Residential Construction services page.',
        caption:
          'Service content is grouped around the residential work customers are trying to plan, with a quote route kept close to each decision.',
        width: 1280,
        height: 720,
      },
      {
        src: '/precision/website-projects.png',
        alt: 'Precision Residential Construction projects page.',
        caption:
          'Client-supplied photography presents completed work without stock imagery or invented project outcomes.',
        width: 1280,
        height: 720,
      },
      {
        src: '/precision/website-before-after.png',
        alt: 'Before and after construction project presentation.',
        caption:
          'Before-and-after presentation helps a prospective customer understand the scale and character of the transformation.',
        width: 1280,
        height: 720,
      },
      {
        src: '/precision/website-quote-crm.png',
        alt: 'Structured quote request form on the client website.',
        caption:
          'The quote route collects practical project context while keeping phone and email available for customers who want direct contact.',
        width: 1280,
        height: 720,
      },
    ],
    validation: {
      intro:
        'The result is evaluated against the delivered customer experience rather than invented marketing metrics.',
      items: [
        'The live domain serves the final website across desktop and mobile layouts.',
        'Services, projects, before-and-after content, quote request, phone, and email routes are publicly accessible.',
        'The enquiry form captures structured project details for client follow-up.',
        'Published visual content uses the client’s brand and supplied project photography.',
      ],
    },
    result: {
      title: 'A finished website the client can use in real sales conversations.',
      paragraphs: [
        'The delivered site gives Precision Residential Construction a professional public home, a clear way to present completed work, and a structured route for prospective customers to request a quote.',
        'No traffic, search ranking, lead volume, conversion, or revenue outcome is claimed without corresponding analytics. The result presented here is the live website and customer enquiry experience.',
      ],
    },
    links: [
      {
        label: 'Visit the live client website',
        href: 'https://prconstruction.au',
        style: 'primary',
      },
      { label: 'Discuss a business website', href: '/#contact', style: 'secondary' },
    ],
  },
  {
    slug: 'zendesk-jira-support-escalation',
    title: 'Zendesk to Jira Support Escalation',
    shortTitle: 'Zendesk to Jira Escalation',
    category: 'Integration engineering',
    cardDescription:
      'A guarded webhook route that validates support escalation fields, creates a linked Jira task, and writes the result back to Zendesk.',
    summary:
      'I built and commissioned a narrow Zendesk to Jira route with explicit field mapping, idempotent provider writes, and a verified return update.',
    status: 'Completed integration note',
    role: 'Integration design, implementation, debugging, provider checks',
    timeframe: '2026',
    stack: ['Zendesk', 'Jira', 'webhooks', 'JSON contracts'],
    featured: false,
    heroImage: {
      src: '/zendesk-jira-escalation/overview.png',
      alt: 'Zendesk to Jira support escalation route overview.',
      caption:
        'The route moves six approved fields into Jira and retains the identifiers needed to update the originating Zendesk ticket.',
      width: 1280,
      height: 960,
    },
    facts: [
      { value: '6', label: 'mapped escalation fields' },
      { value: '1', label: 'controlled provider run' },
      { value: '0', label: 'duplicate Jira tasks' },
      { value: '2', label: 'integration defects repaired' },
    ],
    context: {
      title: 'Support escalation needed a defined contract, not a copy-and-paste handoff.',
      paragraphs: [
        'The engineering team needed the issue summary, severity, customer impact, reproduction steps, ticket reference, and support context in a consistent Jira task. Support also needed confirmation on the original ticket.',
        'I kept the route deliberately narrow. Only approved fields leave Zendesk, provider responses are checked, and the Zendesk ticket is updated only after Jira returns a valid task identifier.',
      ],
    },
    ownership: {
      intro:
        'I defined the field contract, configured both providers, ran the controlled commissioning case, and repaired the failures found in the first attempt.',
      items: [
        'Mapped six Zendesk escalation fields into the Jira create-task request.',
        'Added validation and stop conditions before either provider write.',
        'Retained Zendesk and Jira identifiers for the return update.',
        'Checked the created Jira task and resulting private Zendesk note.',
        'Disabled the commissioning automation after the completed run.',
      ],
    },
    systemFlow: [
      'approved Zendesk escalation',
      'six-field JSON contract',
      'validation',
      'Jira task creation',
      'provider response check',
      'private Zendesk update',
    ],
    decisions: [
      {
        title: 'The field contract is explicit',
        body: 'Only the six fields needed by engineering are mapped. Free-form ticket content is not forwarded by default.',
      },
      {
        title: 'Writes happen in sequence',
        body: 'The Zendesk update waits for a valid Jira response, preventing a ticket from claiming an engineering task exists when creation failed.',
      },
      {
        title: 'Commissioning stays contained',
        body: 'The live provider run used one controlled ticket and the automation was disabled after both sides were checked.',
      },
    ],
    turningPoint: {
      title: 'A project selector mismatch and empty request body stopped the first run.',
      body: 'The route did not continue with partial data. I corrected the project mapping and webhook construction, then repeated the same controlled escalation. Jira created KAN-2 and Zendesk accepted the private return update without a duplicate task or note.',
    },
    gallery: [
      {
        src: '/zendesk-jira-escalation/guarded-route.png',
        alt: 'Guarded Zendesk escalation route with validation stops.',
        caption:
          'Validation and ordered provider writes keep an incomplete escalation from becoming an inaccurate engineering handoff.',
        width: 1280,
        height: 960,
      },
      {
        src: '/zendesk-jira-escalation/jira-field-mapping.png',
        alt: 'Jira field mapping for the support escalation.',
        caption:
          'The Jira request is built from a small, reviewable contract instead of forwarding the entire support ticket.',
        width: 1280,
        height: 960,
      },
      {
        src: '/zendesk-jira-escalation/webhook-execution.png',
        alt: 'Completed Zendesk webhook execution and Jira response.',
        caption:
          'The completed run records provider status and the identifier used for the return path.',
        width: 1280,
        height: 960,
      },
      {
        src: '/zendesk-jira-escalation/debugging-and-handoff.png',
        alt: 'Debugging record and completed Zendesk to Jira handoff.',
        caption:
          'The repair record keeps the original failures beside the successful handoff instead of hiding the commissioning work.',
        width: 1280,
        height: 960,
      },
    ],
    validation: {
      intro: 'The one-ticket commissioning path was checked on both provider sides.',
      items: [
        'Zendesk returned an accepted webhook status for the repaired request.',
        'Jira created KAN-2 with the expected mapped fields.',
        'The originating Zendesk ticket received the linked private update.',
        'No duplicate Jira task or Zendesk note was created during repair.',
      ],
    },
    result: {
      title: 'A small integration with a dependable failure boundary.',
      paragraphs: [
        'The route demonstrates a complete provider handoff, including the failure that stopped the first run and the readback used to confirm the repair.',
        'It was commissioned with one controlled ticket. It is not presented as a high-volume production history or a measured support-efficiency outcome.',
      ],
    },
    links: [
      {
        label: 'Read the AI support copilot case study',
        href: '/work/zendesk-ai-support-copilot/',
        style: 'primary',
      },
      { label: 'Discuss an integration', href: '/#contact', style: 'secondary' },
    ],
  },
  {
    slug: 'airtable-coaching-program-delivery-hub',
    title: 'Airtable Coaching Program Delivery Hub',
    shortTitle: 'Airtable Program Delivery Hub',
    category: 'Airtable implementation',
    cardDescription:
      'A relational Airtable system and four published Interfaces for managing participants, coaching sessions, action items, and programme delivery.',
    summary:
      'I designed a linked Airtable operating system that gives coaches a focused daily workflow while retaining programme-wide reporting and ownership.',
    status: 'Completed Airtable implementation',
    role: 'Data model, interface design, workflow logic, commissioning',
    timeframe: '2026',
    stack: ['Airtable', 'Interfaces', 'linked records', 'filtered views'],
    featured: false,
    heroImage: {
      src: '/airtable-coaching/program-delivery-hub.png',
      alt: 'Airtable Program Delivery Hub interface.',
      caption:
        'The main interface brings participant status, upcoming sessions, open actions, and programme delivery into one operating view.',
      width: 1280,
      height: 960,
    },
    facts: [
      { value: '4', label: 'linked tables' },
      { value: '4', label: 'published Interfaces' },
      { value: '66', label: 'commissioning records' },
      { value: '108', label: 'verified relationships' },
    ],
    context: {
      title: 'Coaching delivery becomes difficult when the work is split across lists.',
      paragraphs: [
        'Participants, sessions, goals, and follow-up actions have different timelines but belong to the same programme. Flat spreadsheets make ownership and context hard to maintain as the programme grows.',
        'I designed a relational Airtable base and published Interfaces around the coach’s actual decisions: who needs attention, what session is next, which action is overdue, and how the programme is progressing.',
      ],
    },
    ownership: {
      intro:
        'I owned the information model, linked-record structure, interface hierarchy, filters, and commissioning dataset.',
      items: [
        'Defined participants, programmes, sessions, and actions as separate linked tables.',
        'Created calculated status and ownership fields for operational views.',
        'Published four Interfaces for programme overview, participant workflow, calendar planning, and administration.',
        'Applied Current user filters where individual coach views require record ownership.',
        'Checked all table relationships and interface data against the commissioning records.',
      ],
    },
    systemFlow: [
      'programme and participant setup',
      'coach ownership',
      'scheduled session',
      'session notes',
      'assigned actions',
      'delivery overview',
    ],
    decisions: [
      {
        title: 'The model separates entities before designing screens',
        body: 'Participants, sessions, actions, and programmes each have their own lifecycle. Linking them avoids duplicated text and makes programme-level reporting possible.',
      },
      {
        title: 'Interfaces follow daily decisions',
        body: 'The system opens on work that needs attention rather than exposing the raw base as the primary experience.',
      },
      {
        title: 'Ownership filters are explicit',
        body: 'Current user filters are applied only where the interface should narrow records to the signed-in coach.',
      },
    ],
    turningPoint: {
      title: 'The useful interface emerged after the data model stopped mirroring the old spreadsheet.',
      body: 'The first shape treated sessions and follow-up actions as repeated participant fields. Moving them into linked tables made scheduling, overdue work, ownership, and cross-programme reporting much clearer. The Interfaces could then be designed around real tasks instead of table maintenance.',
    },
    gallery: [
      {
        src: '/airtable-coaching/participant-workflow.png',
        alt: 'Airtable participant workflow interface.',
        caption:
          'The participant view combines current programme context, session history, goals, and open actions without duplicating records.',
        width: 1280,
        height: 960,
      },
      {
        src: '/airtable-coaching/session-calendar.png',
        alt: 'Airtable coaching session calendar.',
        caption:
          'The calendar gives coaches a planning view while each session remains linked to its participant and programme.',
        width: 1280,
        height: 960,
      },
      {
        src: '/airtable-coaching/data-model-and-filters.png',
        alt: 'Airtable linked data model and ownership filters.',
        caption:
          'The underlying model and ownership filters make the interface views predictable and maintainable.',
        width: 1280,
        height: 960,
      },
    ],
    validation: {
      intro:
        'The implementation was checked against the published Interfaces and the underlying relationship graph.',
      items: [
        'Four published Interfaces load against the intended tables and views.',
        '66 commissioning records exercise programme, participant, session, and action states.',
        '108 linked relationships were checked across the four-table model.',
        'Three Current user filters narrow owner-specific views where designed.',
      ],
    },
    result: {
      title: 'Airtable becomes an operating system rather than a collection of tables.',
      paragraphs: [
        'The completed hub gives a coaching team a clear participant workflow, session calendar, action queue, and programme overview on one relational model.',
        'The implementation uses structured commissioning data. It does not claim a live client deployment, guest portal behavior, multi-tenant isolation, or programme outcome metrics.',
      ],
    },
    links: [
      { label: 'Discuss an Airtable system', href: '/#contact', style: 'primary' },
      {
        label: 'See the Airtable and Make operations project',
        href: '/work/airtable-make-opportunity-pipeline/',
        style: 'secondary',
      },
    ],
  },
  {
    slug: 'airtable-make-opportunity-pipeline',
    title: 'Airtable and Make Opportunity Pipeline',
    shortTitle: 'Airtable and Make Pipeline',
    category: 'Internal operations',
    cardDescription:
      'An internal operating system for approved opportunities, routing decisions, exceptions, reporting, and project handoff.',
    summary:
      'I connected Airtable and Make around an owner-controlled opportunity process so intake, decisions, exceptions, and delivery context remain visible.',
    status: 'Live internal operations system',
    role: 'Process design, Airtable architecture, Make automation, reporting',
    timeframe: '2026',
    stack: ['Airtable', 'Make', 'Gmail', 'structured ledgers'],
    featured: false,
    heroImage: {
      src: '/airtable-make/pipeline-overview.png',
      alt: 'SM Systems opportunity pipeline overview in Airtable.',
      caption:
        'The operating view brings approved opportunities, activities, source coverage, and delivered work into one pipeline.',
      width: 1504,
      height: 705,
    },
    facts: [
      { value: '4', label: 'bounded routing outcomes' },
      { value: '1', label: 'main operating base' },
      { value: '1', label: 'owner decision gate' },
      { value: '0', label: 'automatic applications' },
    ],
    context: {
      title: 'Opportunity tracking needed to preserve decisions, not just records.',
      paragraphs: [
        'Sources, outreach, replies, qualified opportunities, exceptions, and delivered work were easy to separate into different tools but hard to reconcile later.',
        'I built the pipeline around an owner-approved intake step. Airtable retains the operating record and Make performs bounded routing, while external applications and messages stay outside unattended automation.',
      ],
    },
    ownership: {
      intro:
        'I designed the data model and operating states, built the Make routes, and connected the delivery handoff back to the accepted opportunity.',
      items: [
        'Structured sources, opportunities, activities, exceptions, and projects in one Airtable base.',
        'Implemented valid, duplicate, invalid, and review-required Make routes.',
        'Kept owner approval ahead of external communication or application steps.',
        'Retained accepted scope, criteria, and the next milestone when work moves into delivery.',
        'Built coverage and operating views from the same ledger used by the workflow.',
      ],
    },
    systemFlow: [
      'source or owner intake',
      'record validation',
      'duplicate and exception checks',
      'owner decision',
      'opportunity state',
      'project handoff',
    ],
    decisions: [
      {
        title: 'Airtable remains the operating record',
        body: 'The workflow does not hide business state inside Make. Records, decisions, and exceptions remain readable in the base.',
      },
      {
        title: 'Automation stops at judgment',
        body: 'Routing and data checks can run automatically, but applications, messages, and final opportunity decisions require owner action.',
      },
      {
        title: 'Delivery begins from accepted context',
        body: 'A won opportunity becomes a project only after handoff approval, carrying the scope and acceptance criteria that shaped the decision.',
      },
    ],
    turningPoint: {
      title: 'Duplicate handling moved from cleanup work into the intake contract.',
      body: 'The early flow could create parallel records when the same opportunity arrived from more than one source. I moved the source reference and duplicate decision ahead of routing so repeated intake now resolves to an existing record or a visible review state.',
    },
    gallery: [
      {
        src: '/airtable-make/airtable-opportunities.png',
        alt: 'Airtable opportunities routed into decision and review states.',
        caption:
          'Owner-approved records remain visible with their routing decision, review state, and source context.',
        width: 1504,
        height: 705,
      },
      {
        src: '/airtable-make/make-router.png',
        alt: 'Make scenario with valid, duplicate, invalid, and review routes.',
        caption:
          'The Make scenario handles expected, duplicate, invalid, and review-required outcomes as separate paths.',
        width: 1504,
        height: 705,
      },
      {
        src: '/airtable-make/delivery-handoff.png',
        alt: 'Delivered client website beside its Airtable project handoff.',
        caption:
          'A delivered client project remains linked to the accepted opportunity, scope, and handoff record.',
        width: 1504,
        height: 771,
      },
    ],
    validation: {
      intro:
        'The operating system is checked through its Airtable records, Make route behavior, and delivery handoff.',
      items: [
        'Valid, duplicate, invalid, and review-required routes produce distinct Airtable states.',
        'Owner approval remains required ahead of external communication and application activity.',
        'Delivery records retain accepted scope, criteria, and next milestone.',
        'Operating views are generated from the same source records used by the workflow.',
      ],
    },
    result: {
      title: 'A private operating system with visible decisions and exceptions.',
      paragraphs: [
        'The pipeline gives SM Systems one place to review opportunity intake, routing outcomes, source coverage, active decisions, and delivery handoffs.',
        'It is an internal business system. The page does not present client revenue, automated applications, automated outreach, or conversion-rate outcomes.',
      ],
    },
    links: [
      { label: 'Discuss an operations system', href: '/#contact', style: 'primary' },
      {
        label: 'See the conversion and lead system',
        href: '/work/conversion-measurement-inbound-lead-system/',
        style: 'secondary',
      },
    ],
  },
  {
    slug: 'n8n-service-lead-routing',
    title: 'n8n Service Lead Routing Workflow',
    shortTitle: 'n8n Lead Routing',
    category: 'Workflow engineering',
    cardDescription:
      'A 16-node n8n implementation that validates service leads, separates duplicates and exceptions, and makes each routing decision visible.',
    summary:
      'I built a credential-free n8n workflow that demonstrates how lead validation, duplicate handling, routing, and review states fit together.',
    status: 'Completed technical implementation',
    role: 'Workflow design, data contracts, route testing, documentation',
    timeframe: '2026',
    stack: ['n8n', 'JavaScript', 'webhooks', 'workflow fixtures'],
    featured: false,
    heroImage: {
      src: '/n8n-service-lead/workflow-overview.png',
      alt: 'Complete n8n service lead routing workflow.',
      caption:
        'Sixteen visible nodes take a lead from intake through validation, duplicate checks, assignment, review, or rejection.',
      width: 1496,
      height: 758,
    },
    facts: [
      { value: '16', label: 'workflow nodes' },
      { value: '5', label: 'explicit route outcomes' },
      { value: '0', label: 'provider credentials required' },
      { value: '0', label: 'external sends' },
    ],
    context: {
      title: 'Lead routing is easier to trust when every decision has a named path.',
      paragraphs: [
        'Service enquiries commonly fail at the edges: missing contact details, unknown service areas, duplicate submissions, or records that need a person to decide.',
        'I built the n8n workflow as a readable implementation of those states. It makes the intake contract, normalization, routing rules, rejection reasons, and final output visible in the canvas.',
      ],
    },
    ownership: {
      intro:
        'I designed the workflow contract, built all 16 nodes, prepared the input cases, and checked each terminal path.',
      items: [
        'Defined required lead fields and normalization behavior.',
        'Separated validation, duplicate detection, routing, and review logic into readable nodes.',
        'Added explicit invalid and review-required outputs.',
        'Prepared credential-free inputs for repeatable workflow execution.',
        'Recorded the completed run and terminal outputs for handoff.',
      ],
    },
    systemFlow: [
      'webhook intake',
      'normalization',
      'required-field validation',
      'duplicate check',
      'service and region routing',
      'assigned, rejected, or review state',
    ],
    decisions: [
      {
        title: 'Problem records get their own output',
        body: 'Invalid and ambiguous records are not mixed into the assigned queue. Each one carries a reason that can be reviewed or corrected.',
      },
      {
        title: 'The workflow remains inspectable',
        body: 'Business rules are kept in small named nodes so a maintainer can follow the route without unpacking one large code block.',
      },
      {
        title: 'The build is credential free',
        body: 'Committed inputs and outputs let the workflow be inspected and rerun without access to a CRM, inbox, or customer account.',
      },
    ],
    turningPoint: {
      title: 'The invalid-lead route exposed an assumption hidden in the happy path.',
      body: 'The first complete run handled assigned leads but gave an incomplete record too little context. I changed the validation output to retain the original reference and a specific rejection reason, making the exception useful to an operator instead of merely stopping it.',
    },
    gallery: [
      {
        src: '/n8n-service-lead/validation-logic.png',
        alt: 'n8n validation and routing logic.',
        caption:
          'Validation, duplicate checks, and route selection stay separate so each decision can be inspected.',
        width: 1496,
        height: 722,
      },
      {
        src: '/n8n-service-lead/invalid-lead-output.png',
        alt: 'Structured invalid lead output from the n8n workflow.',
        caption:
          'An incomplete lead stops with its original reference and a specific reason for correction or review.',
        width: 1242,
        height: 699,
      },
    ],
    validation: {
      intro:
        'The workflow was imported, executed, and checked without provider credentials or external sends.',
      items: [
        'All 16 nodes load in the intended workflow structure.',
        'Valid, duplicate, invalid, unassigned, and review-required input cases reach their expected terminal states.',
        'Invalid outputs retain the source reference and a readable failure reason.',
        'The completed run performs no email, CRM, or other external provider write.',
      ],
    },
    result: {
      title: 'A clear reference implementation for service lead routing.',
      paragraphs: [
        'The project shows how an n8n workflow can make data quality, duplicate handling, business routing, and human review visible in one canvas.',
        'It is a credential-free technical implementation, not a claim of live downstream CRM volume or production operating history.',
      ],
    },
    links: [
      { label: 'Discuss an n8n workflow', href: '/#contact', style: 'primary' },
      {
        label: 'See the live conversion and lead system',
        href: '/work/conversion-measurement-inbound-lead-system/',
        style: 'secondary',
      },
    ],
  },
  {
    slug: 'rfid-subscription-access-system',
    title: 'RFID Subscription Access System',
    shortTitle: 'RFID Access System',
    category: 'Cloud and edge systems',
    cardDescription:
      'An in-progress client system connecting subscription records, RFID tag management, operator controls, and an edge path for physical access decisions.',
    summary:
      'I am building the software and operator path that connects customer plans, RFID identities, access decisions, and wash operations.',
    status: 'Client system in progress',
    role: 'System architecture, cloud services, operator UI, edge integration',
    timeframe: '2026, ongoing',
    stack: ['ASP.NET Core', 'PostgreSQL', 'RFID', 'edge services', 'operator dashboard'],
    featured: false,
    heroImage: {
      src: '/rfid/operator-dashboard.png',
      alt: 'RFID car wash operator dashboard.',
      caption:
        'The operator dashboard brings access state, reader status, tag activity, and wash controls into one working view.',
      width: 2048,
      height: 1060,
    },
    facts: [
      { value: '3', label: 'connected operating layers' },
      { value: '1', label: 'operator control surface' },
      { value: '1', label: 'edge access path' },
      { value: 'Active', label: 'client delivery status' },
    ],
    context: {
      title: 'A subscription record only matters if the physical site can act on it safely.',
      paragraphs: [
        'The client system has to connect customer plan state, RFID identity, the reader at the site, and the wash controller. Operators also need a way to set up tags, inspect access outcomes, and test the wash path without editing backend records directly.',
        'I am building the system as distinct cloud, edge, and operator layers so a provider or device failure can be isolated. The public page shows the implemented software and current operating UI while keeping the unfinished physical closeout explicit.',
      ],
    },
    ownership: {
      intro:
        'I own the system architecture and software delivery across subscription state, RFID records, the operator experience, and the edge service boundary.',
      items: [
        'Designed the subscription, vehicle, tag, access, and wash-state contracts.',
        'Built the operator dashboard and controlled tag setup workflow.',
        'Implemented local service health and edge access-decision paths.',
        'Added operator-visible readback for reader and wash-test state.',
        'Separated software completion from site device, provider, and physical commissioning tasks.',
      ],
    },
    systemFlow: [
      'customer plan state',
      'vehicle and RFID tag',
      'site reader',
      'edge access decision',
      'wash controller request',
      'operator readback',
    ],
    decisions: [
      {
        title: 'Cloud and site operation remain separable',
        body: 'The edge path is designed to expose reachability and access state without making every operator action depend on an opaque remote process.',
      },
      {
        title: 'Tag changes are controlled operations',
        body: 'Setup and activation happen through explicit operator actions with readback, rather than direct database edits.',
      },
      {
        title: 'Delivery status is split by layer',
        body: 'Implemented application behavior is reported separately from physical reader, tag, beam, wash, and payment-provider commissioning.',
      },
    ],
    turningPoint: {
      title: 'The project became clearer when software readiness and site readiness were tracked separately.',
      body: 'A healthy application cannot establish that a physical tag was read or a wash controller acted. I separated the closeout paths so operator UI, local services, edge reachability, physical devices, and payment-provider steps each have their own acceptance state.',
    },
    gallery: [
      {
        src: '/rfid/subscription-website.png',
        alt: 'Customer subscription website for the RFID access system.',
        caption:
          'The customer path presents plan and vehicle information that can be associated with an RFID access identity.',
        width: 2048,
        height: 1060,
      },
      {
        src: '/rfid/operator-tag-setup.png',
        alt: 'Operator RFID tag setup workflow.',
        caption:
          'Operators can assign and inspect a tag through a controlled setup route instead of changing backend data directly.',
        width: 2048,
        height: 1060,
      },
      {
        src: '/rfid/operator-wash-test.png',
        alt: 'Operator wash test and system state view.',
        caption:
          'The wash-test view keeps access inputs, system state, and the operator action visible during commissioning.',
        width: 2048,
        height: 1060,
      },
    ],
    validation: {
      intro:
        'Current checks cover the application and operator layers. Physical and provider closeout remains a separate delivery track.',
      items: [
        'Operator dashboard, tag setup, access state, and wash-test interfaces are implemented.',
        'Local service health and edge package startup have repeatable checks.',
        'Reader reachability and operator-visible state are recorded separately from physical action.',
        'Physical tag read, beam, wash actuation, and final payment-provider acceptance remain open until site completion.',
      ],
    },
    result: {
      title: 'A substantial client system with the final site path still in progress.',
      paragraphs: [
        'The current build provides the cloud data model, operator tooling, local service boundary, and edge access path needed for subscription-based RFID operation.',
        'The project is not presented as fully commissioned. Live payment acceptance and the complete physical reader, tag, beam, and wash sequence remain pending or require an explicit client closeout decision.',
      ],
    },
    links: [
      { label: 'Discuss a connected system', href: '/#contact', style: 'primary' },
      {
        label: 'View the automation work',
        href: '/#work',
        style: 'secondary',
      },
    ],
  },
];

export const flagshipProjects = projects.filter((project) => project.featured);
export const supportingProjects = projects.filter((project) => !project.featured);

export const technicalTools = [
  {
    name: 'API Webhook Bridge',
    description:
      'FastAPI integration bridge with schema validation, field mapping, idempotency, audit records, and dead-letter handling.',
    href: 'https://github.com/stefan-mcf/api-webhook-bridge',
    stack: 'Python · FastAPI · Pydantic',
  },
  {
    name: 'Sheets Airtable Sync',
    description:
      'Reconciliation workflow with row validation, duplicate detection, exception routing, and Airtable and Sheets-ready outputs.',
    href: 'https://github.com/stefan-mcf/sheets-airtable-sync',
    stack: 'Python · reconciliation · data quality',
  },
  {
    name: 'Invoice Router',
    description:
      'Invoice extraction and validation pipeline with review routing and accounting-ready export previews.',
    href: 'https://github.com/stefan-mcf/invoice-router',
    stack: 'Python · document workflows · review',
  },
  {
    name: 'Review Router',
    description:
      'Typed workflow contracts and human review checkpoints exposed through both CLI and FastAPI interfaces.',
    href: 'https://github.com/stefan-mcf/review-router',
    stack: 'Python · FastAPI · workflow policy',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
