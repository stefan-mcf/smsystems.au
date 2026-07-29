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
  title: 'Stefan McFeeters | Automation and Integration Developer',
  description:
    'Portfolio of Stefan McFeeters, an automation and integration developer building AI support systems, APIs, workflow automation, CRM operations, and connected tools.',
  nav: [
    { href: '/#top', label: 'Home' },
    { href: '/#work', label: 'Work' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Automation and integration developer',
    kicker: 'Practical systems work for teams that need steadier operations and less brittle automation.',
    headline: 'BUILD THE SYSTEM. KEEP IT RUNNING.',
    subhead:
      'I design and build AI support systems, integrations, workflow automation, and operator tools for real business operations.',
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
    title: 'I work where software meets an operating process.',
    body: [
      'I am an automation and integration developer based in Melbourne. I build the connections between customer-facing software, APIs, CRMs, data stores, workflow platforms, and the people responsible for running them.',
      'My strongest work starts with an operational problem: a support handoff nobody trusts, a conversion path that counts twice, an automation that is unsafe to retry, or a customer journey that does not explain the business clearly.',
      'I work across Python, TypeScript, FastAPI, Next.js, PostgreSQL, AWS, Airtable, Make, n8n, Zendesk, Jira, HubSpot, and connected edge systems.',
    ],
    imageSrc: '/stefan-profile.jpg',
    imageAlt: 'Portrait of Stefan McFeeters',
    facts: [
      'Automation and integration development',
      'Python, TypeScript, FastAPI, Next.js',
      'AI workflows with human review',
      'CRM and lead operations',
      'AWS and PostgreSQL systems',
      'Operator and edge integrations',
    ],
  },
  finalCta: {
    title: 'Bring the rough idea.\nI’ll turn it into a working build.',
    primary: { label: 'Start project', href: '/#project-enquiry' },
    secondary: { label: 'Email Stefan', href: workflowDiagnosisMailto },
  },
  contact: {
    intro:
      'If you need a website, CRM, automation, integration, or internal tool built or improved, send what exists now and the outcome you need.',
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
