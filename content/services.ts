import { workflowDiagnosisMailto } from './site';

export type ServiceItem = {
  slug: string;
  name: string;
  eyebrow: string;
  symptomHeadline: string;
  whoItsFor: string;
  bestFirstStep?: string;
  problemShape: string[];
  firstMilestone: {
    timeframe: string;
    outcome: string;
  };
  deliverables: string[];
  proofAnchor: string;
  proofHref: string;
  proofNote: string;
  cta: {
    label: string;
    href: string;
    note: string;
  };
};

export const serviceItems: ServiceItem[] = [
  {
    slug: 'automation-repair-debug-sprint',
    name: 'Automation repair diagnostic',
    eyebrow: 'Repair / hardening',
    symptomHeadline: 'A workflow runs until it does not, and no one trusts it anymore.',
    whoItsFor: 'Teams with a brittle automation, broken Zap/Make/n8n flow, script, or internal handoff that needs to be traced and made dependable.',
    bestFirstStep: 'Best first step: isolate the failing path, prove the repair, then decide what deserves a larger rebuild.',
    problemShape: [
      'Failures are silent, intermittent, or only noticed by a customer.',
      'Duplicate actions, missing records, or manual clean-up have become normal.',
      'No one can explain which system owns the next step.',
    ],
    firstMilestone: {
      timeframe: 'First milestone',
      outcome: 'Reproduce the failure, map the narrow path, and land either the repair or a fix plan with evidence of what broke.',
    },
    deliverables: [
      'failure-path trace and reproduction notes',
      'targeted repair or bounded implementation plan',
      'logging / alerting recommendations where failures should be visible',
      'handoff notes someone else can maintain',
    ],
    proofAnchor: 'automation-debugger',
    proofHref: '/work#automation-debugger',
    proofNote: 'Matches the public automation-debugger work: inspect the failure first, then leave a narrower and more maintainable path behind.',
    cta: {
      label: 'Send the broken workflow',
      href: workflowDiagnosisMailto,
      note: 'Send the systems involved, what failed, and what “working” should look like.',
    },
  },
  {
    slug: 'lead-leakage-audit-fix-sprint',
    name: 'Lead leakage audit and fix sprint',
    eyebrow: 'Audit / conversion',
    symptomHeadline: 'The website gets visitors, but too many enquiries leak before they become useful conversations.',
    whoItsFor: 'Local businesses and agencies that need evidence-backed website, local SEO, tracking, and lead-path fixes without turning the work into an open-ended marketing retainer.',
    bestFirstStep: 'Best first step: audit the public lead path, rank the highest-impact leaks, then fix the smallest set of issues that can be verified.',
    problemShape: [
      'Calls, forms, booking links, or trust signals are hard to find or inconsistent across pages.',
      'SEO basics, metadata, schema, sitemap, or local relevance signals are weak enough to cost qualified traffic.',
      'Paid traffic readiness is unclear because tracking, landing-page fit, or conversion paths are not trustworthy yet.',
    ],
    firstMilestone: {
      timeframe: 'First milestone',
      outcome: 'Produce an evidence-backed lead leakage audit with prioritized fixes, then implement or scope the first website/SEO/conversion repair sprint.',
    },
    deliverables: [
      'lead-path audit with screenshots and issue evidence',
      'SEO and local relevance findings ranked by impact',
      'tracking / paid traffic readiness notes where relevant',
      'fix sprint plan or implemented website updates with handoff notes',
    ],
    proofAnchor: 'local-lead-recovery-pipeline',
    proofHref: '/work#local-lead-recovery-pipeline',
    proofNote: 'Related work packages the private locator and auditor tools into a buyer-readable workflow: find qualified local businesses, audit leakage, and turn findings into fix recommendations.',
    cta: {
      label: 'Request an audit',
      href: workflowDiagnosisMailto,
      note: 'Send the website, niche, location, and whether the work is for your business or an agency client.',
    },
  },
  {
    slug: 'api-webhook-integration-sprint',
    name: 'API and webhook integration',
    eyebrow: 'Integration / handoff',
    symptomHeadline: 'Two tools need to exchange data without copy-paste or guesswork.',
    whoItsFor: 'Teams that have API access, webhook events, form submissions, or SaaS tools that should talk to each other but currently need manual handling.',
    bestFirstStep: 'Best first step: name the source, destination, required fields, and the one record that needs to move cleanly.',
    problemShape: [
      'Records arrive late, incomplete, duplicated, or in the wrong format.',
      'A webhook or callback exists, but there is no trustworthy receiver or retry path.',
      'Field mapping, auth, or payload shape is where the no-code setup stops working.',
    ],
    firstMilestone: {
      timeframe: 'First milestone',
      outcome: 'Prove one source-to-destination path with real or fixture payloads, field mapping, and visible success/failure evidence.',
    },
    deliverables: [
      'field and payload contract map',
      'working bridge, webhook receiver, or implementation-ready plan',
      'test payloads / callback evidence for the handoff',
      'operator notes for credentials, retries, and expected failure modes',
    ],
    proofAnchor: 'api-webhook-bridge',
    proofHref: '/work#api-webhook-bridge',
    proofNote: 'Related work shows the bridge pattern: prove the callback surface, read back provider configuration, and document what future operators need.',
    cta: {
      label: 'Triage an integration',
      href: workflowDiagnosisMailto,
      note: 'Best starting point: name the two tools and the record that needs to move.',
    },
  },
  {
    slug: 'data-cleanup-sync-reporting-sprint',
    name: 'Data cleanup and sync',
    eyebrow: 'Data / reporting',
    symptomHeadline: 'The spreadsheet, Airtable base, or report has stopped being a source of truth.',
    whoItsFor: 'Operations teams relying on Sheets, Airtable, exports, or lightweight reporting where inconsistent records are slowing decisions down.',
    bestFirstStep: 'Best first step: clean and reconcile the operational data rules before choosing a larger reporting or warehouse path.',
    problemShape: [
      'There are multiple “master” sheets and none of them match.',
      'Imports, exports, or formulas need manual clean-up every week.',
      'Reports are technically generated but not trusted by the people using them.',
    ],
    firstMilestone: {
      timeframe: 'First milestone',
      outcome: 'Identify the source-of-truth rules, run a bounded cleanup/sync pass, and show before-and-after output.',
    },
    deliverables: [
      'data-shape review and cleanup rules',
      'sync/reporting pass with visible before-and-after evidence',
      'exceptions list for records that need a human decision',
      'repeatable notes for reruns, ownership, and limitations',
    ],
    proofAnchor: 'sheets-airtable-sync',
    proofHref: '/work#sheets-airtable-sync',
    proofNote: 'Related work focuses on fixture-safe syncs, clear output evidence, and avoiding black-box “it should be fixed” claims.',
    cta: {
      label: 'Send the messy data path',
      href: workflowDiagnosisMailto,
      note: 'Send the source, destination, and the report or table people no longer trust.',
    },
  },
  {
    slug: 'review-gated-ai-workflow-setup',
    name: 'AI review-gate setup',
    eyebrow: 'AI / approval',
    symptomHeadline: 'AI could help, but a human still needs to approve what happens next.',
    whoItsFor: 'Teams that want AI-assisted drafting, routing, summaries, or classification without letting unreviewed model output directly touch customers or production systems.',
    bestFirstStep: 'Best first step: keep judgment, review, audit, and compliance visible while the AI-assisted path proves itself.',
    problemShape: [
      'AI output is useful, but the approval boundary is informal or missing.',
      'People need to edit, approve, reject, or reroute before anything is sent onward.',
      'There is no readable trail of what the model suggested and what a human decided.',
    ],
    firstMilestone: {
      timeframe: 'First milestone',
      outcome: 'Define the review boundary and build or scope one approval path where AI output is easy to inspect before action.',
    },
    deliverables: [
      'review-boundary map and operator decision states',
      'draft/review/approve flow or implementation-ready design',
      'visible audit trail for model output and human decision',
      'controls and handoff notes for safe operation',
    ],
    proofAnchor: 'review-router',
    proofHref: '/work#review-router',
    proofNote: 'Related work emphasizes review gates, deterministic routing, and making automation decisions auditable rather than magical.',
    cta: {
      label: 'Scope a review gate',
      href: workflowDiagnosisMailto,
      note: 'Useful first details: what AI drafts, who approves, and where approved work goes.',
    },
  },
  {
    slug: 'crm-intake-routing-setup',
    name: 'CRM and intake routing setup',
    eyebrow: 'CRM / intake',
    symptomHeadline: 'Inbound work is landing in the wrong place, with the wrong owner, or nowhere at all.',
    whoItsFor: 'Teams whose forms, CRM fields, lead routing, onboarding intake, or internal request queues need cleaner paths and fewer manual saves.',
    bestFirstStep: 'Best first step: clarify the intake path, required context, and ownership rules before broad CRM migration work.',
    problemShape: [
      'Leads or requests need manual reassignment after they arrive.',
      'Required context is missing, duplicated, or buried in notes fields.',
      'Sales, ops, or support teams are working from different versions of the same request.',
    ],
    firstMilestone: {
      timeframe: 'First milestone',
      outcome: 'Map the intake fields, routing rules, and first handoff so one request type reaches the right place with the right context.',
    },
    deliverables: [
      'routing map for source, fields, owner, and destination',
      'cleaned field requirements and validation notes',
      'working route or implementation-ready setup plan',
      'handoff notes for future rule changes and edge cases',
    ],
    proofAnchor: 'api-webhook-bridge + sheets-airtable-sync',
    proofHref: '/work',
    proofNote: 'Combines the integration and data-sync work lanes: move the right record, preserve context, and leave enough evidence to maintain it.',
    cta: {
      label: 'Send the intake path',
      href: workflowDiagnosisMailto,
      note: 'Send the form/source, current destination, and the routing rule that keeps breaking.',
    },
  },
];
