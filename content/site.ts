export const contactLinks = {
  email: 'mcfeeters.stefan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/stefan-mcfeeters/',
  github: 'https://github.com/stefan-mcf',
  upwork: 'https://www.upwork.com/freelancers/~015484e7f9add4d6de?mp_source=share',
};

const workflowDiagnosisSubject = 'Workflow project request';
const workflowDiagnosisBody = [
  'Hi Stefan,',
  '',
  'I have a workflow I would like built, repaired, or scoped.',
  '',
  'Systems involved:',
  'Current failure mode or gap:',
  'Desired outcome:',
  'Timeline / constraints:',
].join('\n');

export const workflowDiagnosisMailto = `mailto:${contactLinks.email}?subject=${encodeURIComponent(
  workflowDiagnosisSubject,
)}&body=${encodeURIComponent(workflowDiagnosisBody)}`;

export const siteMeta = {
  title: 'SM Systems | Workflow Automation & Integrations',
  description:
    'SM Systems builds reliable workflow automation, lead leakage audits, API integrations, dashboards, data syncs, CRM/intake routing, review-gated AI workflows, and operator tools.',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/work', label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Independent systems builder',
    kicker: 'Practical systems work for teams that need steadier operations and less brittle automation.',
    headline: 'BUILD THE SYSTEM. KEEP IT RUNNING.',
    subhead:
      'I build reliable automation systems that connect websites, payments, dashboards, CRMs, and real-world operations into clear, repeatable workflows.',
    primaryCta: { label: 'Start project', href: workflowDiagnosisMailto },
    secondaryCta: { label: 'View work', href: '/work' },
    operatingNotes: [
      'Show the failure clearly',
      'Fix the narrow path first',
      'Leave notes someone can use',
    ],
    signaturePanel: [],
  },
  capabilityStrip: [
    'lead leakage audits',
    'API and webhook integrations',
    'automation repair',
    'CRM and intake routing',
    'data cleanup and syncs',
  ],
  howIWork: ['show the work', 'keep the first pass small', 'write the handoff', 'mark the limits'],
  about: {
    eyebrow: 'About',
    title: 'I build automation for real operations.',
    body: [
      'I build automation systems for businesses, teams, and operators where reliability, visibility, and clear handoffs matter.',
      'Most of my work sits between websites, APIs, CRMs, spreadsheets, dashboards, and internal tools. I focus on the parts that usually break: missing records, weak lead paths, review steps, fragile handoffs, unclear ownership, and poor visibility.',
      'I also bring experience with PLC-style and edge-to-cloud environments, where software connects back to physical operations.',
    ],
    imageSrc: '/stefan-profile.jpg',
    imageAlt: 'Portrait of Stefan McFeeters',
    facts: [
      'Automation systems developer',
      'Lead leakage audits',
      'API + workflow integrations',
      'CRM / intake routing',
      'Review-gated AI workflows',
      'Dashboards + operator tools',
      'PLC / edge systems',
    ],
  },
  fit: {
    eyebrow: 'Project fit',
    title: 'For workflows worth building properly.',
    body:
      'Bring me one workflow, handoff, or system boundary that needs to become real or more dependable. I’ll help map it, scope it, and decide whether it needs a first build, a repair, or a larger system.',
    panels: [
      {
        title: 'Good starting points',
        items: [
      'A brittle automation already runs part of the work.',
      'A website or lead path is getting traffic but not enough clean enquiries.',
      'A spreadsheet, Airtable base, CRM, or SaaS tool is carrying operational truth.',
      'A form, webhook, API, or inbox needs a cleaner handoff.',
          'People already know what breaks, even if the cause is unclear.',
        ],
      },
      {
        title: 'Strong fit',
        items: [
          'Small teams, founders, operators, or technical leads who need a narrow path fixed.',
          'Workflows where reliability, auditability, and handoff notes matter more than flash.',
          'AI-assisted steps that need review, approval, or a readable decision trail.',
          'Physical or operational systems where software needs to connect back to real-world process.',
        ],
      },
      {
        title: 'Start safer when',
        items: [
          'The first milestone needs tightening before build work begins.',
          'Access, test data, or system ownership needs to be clarified early.',
          'The change touches production systems and needs a fixture or staged test path.',
          'Automation boundaries or data policy constraints should be checked up front.',
        ],
      },
    ],
    closePanel: {
      title: 'Best first step',
      items: [
        'If the first path can be named, it can usually be diagnosed.',
        'Send the systems involved, where the handoff breaks, and what should work first.',
      ],
    },
    cta: { label: 'Send the first path', href: workflowDiagnosisMailto },
  },
  process: {
    eyebrow: 'Process',
    title: 'What happens after you send the workflow.',
    body:
      'The first pass is deliberately narrow: understand the systems involved, find the break, agree the smallest useful milestone, then leave evidence that makes the next decision easier.',
    steps: [
      {
        label: 'Send the workflow shape',
        window: 'First message',
        body:
          'Share the systems involved, the current failure mode, the outcome you need, and any access or deadline constraints.',
      },
      {
        label: 'Trace the path',
        window: 'Diagnosis pass',
        body:
          'I map the handoff, reproduce or isolate the break where possible, and separate the narrow fix from the larger backlog.',
      },
      {
        label: 'Set the first milestone',
        window: 'Before build work',
        body:
          'We agree what should work first: a repair, integration, sync, review checkpoint, or evidence-backed plan if access is limited.',
      },
      {
        label: 'Deliver evidence and handoff',
        window: 'End of milestone',
        body:
          'You get the working path or diagnosis, plus notes, screenshots, sample outputs, logs, or tests someone else can read later.',
      },
    ],
    evidence: {
      title: 'You leave with a testable next step.',
      body:
        'The first milestone produces enough evidence to choose the clean repair, extend the path, pause cleanly, or hand off with context.',
    },
  },
  rfidCallout: {
    eyebrow: 'Featured build',
    title: 'RFID carwash subscription access system',
    body:
      'A deployed operator-facing workflow across Stripe subscriptions, RFID reader hardware, access decisions, and backend coordination.',
    note: 'Shows the kind of edge-to-cloud systems work I can take on.',
    cta: { label: 'View case study', href: '/work/rfid-carwash-subscription-system' },
  },
  finalCta: {
    title: 'Bring the rough workflow.\nI’ll build the system around it.',
    primary: { label: 'Start project', href: workflowDiagnosisMailto },
    secondary: { label: 'View services', href: '/services' },
  },
  contact: {
    intro:
      'If you need a workflow fixed, scoped, or hardened, send the problem shape, the systems involved, and the outcome you need.',
    includes: [
      'source and destination systems',
      'current failure mode or gap',
      'desired outcome',
      'any hard constraints or deadlines',
    ],
    routes: [
      { label: 'Email', value: contactLinks.email, href: workflowDiagnosisMailto },
      { label: 'LinkedIn', value: 'linkedin.com/in/stefan-mcfeeters', href: contactLinks.linkedin },
      { label: 'GitHub', value: 'github.com/stefan-mcf', href: contactLinks.github },
      { label: 'Upwork', value: 'Upwork freelancer profile', href: contactLinks.upwork },
    ],
  },
};
