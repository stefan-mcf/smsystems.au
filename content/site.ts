export const contactLinks = {
  email: 'stefan@smsystems.au',
  linkedin: 'https://www.linkedin.com/in/stefan-mcfeeters/',
  github: 'https://github.com/stefan-mcf',
  upwork: 'https://www.upwork.com/freelancers/~015484e7f9add4d6de?mp_source=share',
};

const workflowDiagnosisSubject = 'Workflow project request';
const workflowDiagnosisBody = [
  'Hi Stefan,',
  '',
  'I have a workflow I would like built, integrated, or scoped.',
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
  title: 'SM Systems | Workflow Automation Builds & Integrations',
  description:
    'SM Systems builds workflow automation, API integrations, dashboards, data syncs, CRM/intake routing, review-gated AI workflows, and operator tools.',
  nav: [
    { href: '/#top', label: 'Home' },
    { href: '/#work', label: 'Work' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Independent systems builder',
    kicker: 'Practical systems work for teams that need steadier operations and less brittle automation.',
    headline: 'BUILD THE SYSTEM. KEEP IT RUNNING.',
    subhead:
      'I build reliable automation systems that connect websites, payments, dashboards, CRMs, and real-world operations into clear, repeatable workflows.',
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
    title: 'I build automation for real operations.',
    body: [
      'I build automation tools for businesses, teams, and operators where reliability, visibility, and clear operating evidence matter.',
      'Most of my work sits between websites, APIs, CRMs, spreadsheets, dashboards, and internal tools. I focus on the parts that usually break: missing records, weak lead paths, review steps, fragile system boundaries, unclear ownership, and poor visibility.',
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
    title: 'Bring the rough workflow.\nI’ll build the tool around it.',
    primary: { label: 'Start project', href: '/#project-enquiry' },
    secondary: { label: 'Email Stefan', href: workflowDiagnosisMailto },
  },
  contact: {
    intro:
      'If you need a workflow built, scoped, or hardened, send the problem shape, the systems involved, and the outcome you need.',
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
