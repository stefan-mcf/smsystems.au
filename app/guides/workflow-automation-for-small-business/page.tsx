import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';

const canonicalSiteUrl = 'https://smsystems.au';
const guidePath = '/guides/workflow-automation-for-small-business/';
const guideUrl = `${canonicalSiteUrl}${guidePath}`;

export const metadata: Metadata = createPageMetadata({
  title: 'Workflow automation for small business: what to automate first | SM Systems',
  description:
    'A practical framework for choosing the first small-business workflow to automate, defining its rules, keeping human review, and proving the result.',
  path: guidePath,
  image: {
    url: '/n8n-service-lead/routing-workflow.png',
    width: 1280,
    height: 960,
    alt: 'n8n workflow showing a controlled service enquiry routing path',
  },
});

const decisionSignals = [
  'The task repeats often enough that manual handling creates delay or inconsistency.',
  'The source, destination, required fields, and normal decision rules can be written down.',
  'A successful handoff and an exception can both be seen and checked.',
];

const workflowSteps = [
  {
    label: '01 / Outcome',
    title: 'Choose one operational result.',
    body:
      'Start with a specific result such as creating a complete CRM record, routing a quote request, updating a job state, or preparing an approved customer handoff.',
  },
  {
    label: '02 / Contract',
    title: 'Define the record before the automation.',
    body:
      'Name the source, destination, required fields, ownership, duplicate rule, and the conditions that should stop the workflow.',
  },
  {
    label: '03 / Control',
    title: 'Separate rules from judgement.',
    body:
      'Automate stable rules. Keep a visible review gate where the decision is ambiguous, high impact, or depends on context the system cannot reliably determine.',
  },
  {
    label: '04 / Evidence',
    title: 'Prove success and failure paths.',
    body:
      'Test representative inputs, duplicates, missing data, provider errors, and reruns. Keep enough evidence to show what happened without exposing private customer data.',
  },
  {
    label: '05 / Operation',
    title: 'Leave an owner and a recovery path.',
    body:
      'Document who responds to an exception, how a failed item is replayed safely, and which system owns the current state.',
  },
];

const comparisonRows = [
  {
    weak: 'Automate every step at once',
    stronger: 'Commission one complete handoff first',
  },
  {
    weak: 'Assume every input is complete',
    stronger: 'Validate required fields and hold exceptions',
  },
  {
    weak: 'Let the workflow make every decision',
    stronger: 'Keep human review for judgement calls',
  },
  {
    weak: 'Treat a successful run as proof',
    stronger: 'Check the destination record and failure path',
  },
  {
    weak: 'Leave ownership inside the tool',
    stronger: 'Name the operator, state, and next action',
  },
];

const proofExamples = [
  {
    title: 'Service enquiry intake and routing',
    body:
      'A quote form, duplicate checks, human review, exception holds, and an operator register implemented in n8n.',
    href: '/work/n8n-service-lead-routing/',
    image: {
      src: '/n8n-service-lead/routing-workflow.svg',
      alt: 'n8n service enquiry workflow from intake to controlled handoff',
      width: 1280,
      height: 960,
    },
  },
  {
    title: 'Airtable and Make opportunity pipeline',
    body:
      'A controlled opportunity path connecting intake, qualification, follow-up, delivery, and approved handoff states.',
    href: '/work/airtable-make-opportunity-pipeline/',
    image: {
      src: '/airtable-make/make-router.png',
      alt: 'Make opportunity router connected to an Airtable workflow',
      width: 1504,
      height: 705,
    },
  },
];

export default function WorkflowAutomationGuidePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${guideUrl}#article`,
      headline: 'Workflow automation for small business: what to automate first',
      description:
        'A practical framework for choosing, controlling, testing, and operating the first workflow a small business should automate.',
      datePublished: '2026-07-30',
      dateModified: '2026-07-30',
      mainEntityOfPage: {
        '@id': `${guideUrl}#webpage`,
      },
      author: {
        '@id': `${canonicalSiteUrl}/#stefan-mcfeeters`,
      },
      publisher: {
        '@id': `${canonicalSiteUrl}/#business`,
      },
      image: `${canonicalSiteUrl}/n8n-service-lead/routing-workflow.png`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${guideUrl}#webpage`,
      url: guideUrl,
      name: 'Workflow automation for small business: what to automate first',
      description:
        'A practical framework for choosing the first small-business workflow to automate.',
      isPartOf: {
        '@id': `${canonicalSiteUrl}/#website`,
      },
      about: {
        '@id': `${canonicalSiteUrl}/services/workflow-automation-integrations/#service`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${canonicalSiteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Workflow automation for small business',
          item: guideUrl,
        },
      ],
    },
  ];

  return (
    <article className="case-study-page guide-page" data-reveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="case-study-hero">
        <p className="eyebrow">Practical guide</p>
        <h1 className="case-study-title-wide">
          Workflow automation for small business: what to automate first
        </h1>
        <p className="case-study-lede">
          Start with a repeated handoff that has a clear owner, stable rules,
          and an outcome you can verify. Keep human review where judgement still
          matters.
        </p>
        <div className="case-study-actions">
          <Link
            className="button button-primary"
            href="/services/workflow-automation-integrations/"
          >
            Explore automation services
          </Link>
          <ProjectEnquiryTrigger className="button button-secondary">
            Discuss a workflow
          </ProjectEnquiryTrigger>
        </div>
        <Link className="text-link case-study-back" href="/#services">
          Back to services
        </Link>
      </header>

      <section className="case-study-overview" aria-labelledby="automation-fit">
        <div className="case-study-section-heading">
          <p className="proof-lane">What to automate first</p>
          <h2 id="automation-fit">
            Pick a repeated, rule-based handoff with a visible result.
          </h2>
          <p>
            The strongest first automation is rarely the biggest process. It is
            one useful path that can be described, tested, operated, and improved
            without hiding its failure points.
          </p>
        </div>
        <div className="service-page-signal-list">
          {decisionSignals.map((signal) => (
            <p key={signal}>{signal}</p>
          ))}
        </div>
      </section>

      <section
        className="guide-steps"
        aria-labelledby="workflow-automation-framework"
      >
        <div className="case-study-section-heading">
          <p className="proof-lane">Five-step framework</p>
          <h2 id="workflow-automation-framework">
            Define the operating path before choosing the tool.
          </h2>
          <p>
            This sequence works whether the implementation uses n8n, Make, a
            CRM workflow, direct API integration, or a purpose-built service.
          </p>
        </div>
        <ol>
          {workflowSteps.map((step) => (
            <li key={step.label}>
              <p className="proof-lane">{step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="guide-comparison"
        aria-labelledby="automation-comparison"
      >
        <div className="case-study-section-heading">
          <p className="proof-lane">Practical comparison</p>
          <h2 id="automation-comparison">
            Replace broad automation goals with testable controls.
          </h2>
        </div>
        <div className="guide-comparison-table" role="table">
          <div className="guide-comparison-header" role="row">
            <span role="columnheader">Weak starting point</span>
            <span role="columnheader">Stronger operating choice</span>
          </div>
          {comparisonRows.map((row) => (
            <div className="guide-comparison-row" role="row" key={row.weak}>
              <span role="cell">{row.weak}</span>
              <span role="cell">{row.stronger}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        className="case-study-gallery service-page-proof"
        aria-labelledby="automation-examples"
      >
        <div className="case-study-section-heading">
          <p className="proof-lane">Implementation examples</p>
          <h2 id="automation-examples">See the framework in working systems.</h2>
          <p>
            These case studies show intake rules, review gates, operator states,
            exception paths, and evidence in completed builds.
          </p>
        </div>
        <div className="case-study-shot-list service-proof-list">
          {proofExamples.map((proof) => (
            <article
              className="case-study-shot service-proof-card"
              key={proof.href}
            >
              <span className="case-study-shot-media">
                <ZoomableImage
                  src={proof.image.src}
                  alt={proof.image.alt}
                  width={proof.image.width}
                  height={proof.image.height}
                  loading="lazy"
                />
              </span>
              <Link className="service-proof-caption" href={proof.href}>
                <strong>{proof.title}</strong>
                <span>{proof.body}</span>
                <span className="text-link">View case study</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study-final">
        <div>
          <p className="proof-lane">Next step</p>
          <h2>Bring one repeated handoff that needs to become reliable.</h2>
          <p>
            SM Systems can map the record, rules, review points, failure paths,
            proof, and operating handoff before the build expands.
          </p>
        </div>
        <div className="case-study-actions">
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your workflow
          </ProjectEnquiryTrigger>
        </div>
      </section>
    </article>
  );
}
