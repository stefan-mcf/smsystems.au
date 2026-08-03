import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { WorkStructuredData } from '@/components/seo/work-structured-data';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';

const project = proofItems.find(
  (item) => item.slug === 'zendesk-ai-support-copilot',
);

const pageTitle = 'Zendesk AI Support Copilot + Jira on AWS';
const pageDescription =
  'A human-reviewed support system combining cited AI assistance, explicit safety routing, a native Zendesk app, a verified Jira handoff, and controlled AWS commissioning.';
const caseStudyPath = '/work/zendesk-ai-support-copilot/';
const heroImage =
  '/zendesk-ai-support-copilot/01-human-reviewed-support-console.png';

const flowSteps = [
  {
    label: '01 / INTAKE',
    title: 'Controlled Zendesk case',
    body: 'Only the configured synthetic ticket can enter the commissioned provider-write path.',
  },
  {
    label: '02 / ROUTE',
    title: 'Cited AI decision',
    body: 'Retrieval, confidence, safety signals, and policy produce a private draft, escalation, or block.',
  },
  {
    label: '03 / REVIEW',
    title: 'Human authority',
    body: 'The agent sees the sources and decision state before approving a bounded private action.',
  },
  {
    label: '04 / HANDOFF',
    title: 'Verified Jira return',
    body: 'One Jira task is created and its issue key returns through a protected callback.',
  },
];

export const metadata: Metadata = createPageMetadata({
  title: `${pageTitle} | SM Systems`,
  description: pageDescription,
  path: caseStudyPath,
  image: {
    url: heroImage,
    width: 1280,
    height: 960,
    alt: 'Human-reviewed Zendesk AI routing with a verified Jira handoff',
  },
});

export default function ZendeskAiSupportCopilotPage() {
  if (!project?.caseStudy) {
    throw new Error('Zendesk AI Support Copilot case study is missing.');
  }

  const proofStrip = project.caseStudy.proofStrip ?? [];
  const screenshots = project.caseStudy.screenshots ?? [];

  return (
    <article className="case-study-page" data-reveal>
      <WorkStructuredData
        title={pageTitle}
        description={pageDescription}
        path={caseStudyPath}
        image={heroImage}
      />

      <header className="case-study-hero">
        <p className="eyebrow">Flagship build</p>
        <h1 className="case-study-title-wide">{pageTitle}</h1>
        <p className="case-study-lede">{pageDescription}</p>
        <div className="case-study-actions">
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your workflow
          </ProjectEnquiryTrigger>
          <Link
            className="button button-secondary"
            href={
              project.primaryLink ??
              'https://github.com/stefan-mcf/zendesk-ai-support-copilot'
            }
          >
            View GitHub repository
          </Link>
        </div>
        <p className="case-study-status-note">
          Controlled AWS commissioning completed. The runtime was decommissioned
          after closeout, with an encrypted recovery snapshot retained.
        </p>
        <Link className="text-link case-study-back" href="/#work">
          Back to selected work
        </Link>
      </header>

      <section
        className="case-study-gallery"
        aria-labelledby="zendesk-operating-state"
      >
        <div className="case-study-section-heading">
          <h2 id="zendesk-operating-state">
            Human control remains visible from review to callback.
          </h2>
          <p>
            The five frames follow the same controlled path across the native
            Zendesk app, Jira, the fixed evaluation, and the commissioned AWS
            runtime.
          </p>
        </div>

        <div className="case-study-shot-list">
          {screenshots.map((screenshot, index) => (
            <figure className="case-study-shot" key={screenshot.src}>
              <div className="case-study-shot-media">
                <ZoomableImage
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width ?? 1280}
                  height={screenshot.height ?? 960}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
              <figcaption>
                <span>
                  <span>{screenshot.caption}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="case-study-overview"
        aria-labelledby="zendesk-controls"
      >
        <div className="case-study-section-heading">
          <h2 id="zendesk-controls">The safety model is part of the workflow.</h2>
        </div>
        <div className="proof-proof-strip">
          {proofStrip.map((proof) => (
            <article key={proof.label}>
              <span>{proof.label}</span>
              <strong>{proof.title}</strong>
              <p>{proof.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="case-study-flow-section"
        aria-labelledby="zendesk-operating-path"
      >
        <div className="case-study-section-heading">
          <h2 id="zendesk-operating-path">One controlled operating path.</h2>
          <p>
            The system keeps AI assistance private, makes approval explicit,
            and verifies the engineering outcome back against the originating
            case.
          </p>
        </div>
        <ol className="case-study-flow-grid">
          {flowSteps.map((step) => (
            <li key={step.label}>
              <span>{step.label}</span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="case-study-content-grid"
        aria-label="Key engineering decisions"
      >
        <article>
          <h2>No autonomous public reply.</h2>
          <p>
            Every route records mandatory review. The Zendesk app can present a
            private suggestion or prepare an escalation, but cannot send a
            customer-facing message.
          </p>
        </article>
        <article>
          <h2>Retrieval and generation stay inspectable.</h2>
          <p>
            Approved sources, citations, model output, policy decisions, and
            safety signals remain separate so an operator can review why the
            route was chosen.
          </p>
        </article>
        <article>
          <h2>The Jira transition is replay-safe.</h2>
          <p>
            An atomic outbound claim and conditional callback transitions stop
            repeat approval or a fast callback from producing conflicting
            provider state.
          </p>
        </article>
      </section>

      <section
        className="case-study-detail-section"
        aria-labelledby="zendesk-repair"
      >
        <div className="case-study-section-heading">
          <h2 id="zendesk-repair">The first provider run found a real defect.</h2>
          <p>
            The controlled escalation failed closed, the provider assumptions
            were repaired, and the same path completed without a duplicate note
            or task.
          </p>
        </div>
        <div className="case-study-content-grid">
          <article>
            <h2>What failed.</h2>
            <p>
              Jira expected an existing issue in a webhook meant to create the
              first task. Zendesk tag timing also preceded exact CLI readback.
            </p>
          </article>
          <article>
            <h2>How it stayed bounded.</h2>
            <p>
              No public reply was available, no unbounded retry loop started,
              and no second Jira task was created.
            </p>
          </article>
          <article>
            <h2>How it was repaired.</h2>
            <p>
              The Jira rule accepted business data without a prior work item.
              The Zendesk fallback required the approved tag, a new private
              comment, and a changed provider timestamp.
            </p>
          </article>
        </div>
      </section>

      <section
        className="case-study-overview"
        aria-labelledby="zendesk-commissioning"
      >
        <div className="case-study-section-heading">
          <h2 id="zendesk-commissioning">Commissioned, verified, and closed out.</h2>
          <p>
            The fixed 40-case evaluation passed its defined thresholds. The
            provider path produced one approved private note, one Jira task, one
            verified callback, and zero public comments.
          </p>
        </div>
        <div className="proof-proof-strip">
          <article>
            <span>VALIDATION</span>
            <strong>69 automated checks</strong>
            <p>64 backend tests, three operator tests, and two Zendesk app tests.</p>
          </article>
          <article>
            <span>AWS AT CAPTURE</span>
            <strong>Healthy and monitored</strong>
            <p>Two services, seven alarms in OK state, and no critical or high image findings.</p>
          </article>
          <article>
            <span>CURRENT STATE</span>
            <strong>Runtime decommissioned</strong>
            <p>The former hostname is inactive. Historical logs and an encrypted recovery snapshot were retained.</p>
          </article>
        </div>
      </section>

      <section className="case-study-final">
        <div>
          <h2>Build AI support around human authority.</h2>
          <p>
            SM Systems can adapt the same retrieval, review, provider handoff,
            replay, and operating controls around an authorized Zendesk and Jira
            workflow.
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
