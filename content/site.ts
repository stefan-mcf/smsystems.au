export const contactLinks = {
  email: 'stefan@smsystems.au',
  linkedin: 'https://www.linkedin.com/in/stefan-mcfeeters/',
  github: 'https://github.com/stefan-mcf',
  upwork: 'https://www.upwork.com/freelancers/~015484e7f9add4d6de?mp_source=share',
};

const workflowDiagnosisSubject = 'Project request';
const workflowDiagnosisBody = [
  'Hi Stefan,',
  '',
  'I have a project I would like built, integrated, or scoped.',
  '',
  'Project or service needed:',
  'What exists now:',
  'Desired outcome:',
  'Timeline / constraints:',
].join('\n');

export const workflowDiagnosisMailto = `mailto:${contactLinks.email}?subject=${encodeURIComponent(
  workflowDiagnosisSubject,
)}&body=${encodeURIComponent(workflowDiagnosisBody)}`;

export const siteMeta = {
  title: 'SM Systems | Workflow Automation Builds & Integrations',
  description:
    'SM Systems finds where enquiries and work get lost, then builds websites, integrations and reviewed workflows that make the process reliable and visible.',
  nav: [
    { href: '/#top', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/#work', label: 'Work' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Independent systems builder',
    kicker: 'Workflow automation / systems integration / operational software',
    headline: 'BUILD THE SYSTEM. KEEP IT RUNNING.',
    subhead:
      'I find where enquiries and work get lost, then build websites, integrations and review workflows to make the process reliable.',
    primaryCta: { label: 'Start project', href: '/#project-enquiry' },
    secondaryCta: { label: 'View work', href: '/#work' },
    operatingNotes: [
      'Show the failure clearly',
      'Build the narrow path first',
      'Leave notes someone can use',
    ],
    signaturePanel: [],
  },
  about: {
    eyebrow: 'About',
    title: 'I build connected systems for real operations.',
    body: [
      'Through SM Systems, I find where enquiries, customer information, or operational work get lost, then build the websites, integrations, and human-review workflows needed to make those processes reliable and visible.',
      'Most of my work sits between websites, payments, APIs, CRMs, spreadsheets, dashboards, and internal tools. I focus on the parts that usually break: weak enquiry paths, missing records, unreliable handoffs, unclear ownership, and poor visibility.',
      'I also bring experience with PLC-style and edge-to-cloud environments, where software connects back to physical operations.',
    ],
    imageSrc: '/stefan-profile.jpg',
    imageAlt: 'Portrait of Stefan McFeeters',
    facts: [
      'Automation systems developer',
      'API + workflow integrations',
      'CRM / intake routing',
      'Review-gated AI workflows',
      'Dashboards + operator tools',
      'PLC / edge systems',
    ],
  },
  finalCta: {
    title: 'Bring the rough idea.\nI’ll turn it into a working build.',
    body:
      'Through SM Systems, I take on scoped systems development, agency subcontracting, and ongoing software improvements. Share what exists, what needs to work better, and your timeframe. We’ll agree the scope, testing, and handover before work begins.',
    primary: { label: 'Start project', href: '/#project-enquiry' },
    secondary: { label: 'Email Stefan', href: workflowDiagnosisMailto },
  },
  contact: {
    intro:
      'Send the process that is losing enquiries, customer information, or operational work, along with what exists now and the outcome you need.',
    includes: [
      'project or service needed',
      'what exists now',
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
