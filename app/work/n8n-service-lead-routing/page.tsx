import type { Metadata } from 'next';
import Link from 'next/link';
import { WorkStructuredData } from '@/components/seo/work-structured-data';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';

const n8nServiceLeadRouting = proofItems.find(
  (item) => item.slug === 'n8n-service-lead-routing',
);

const screenshotLayout = [
  {
    src: '/n8n-service-lead/customer-intake.png',
    title: 'Service enquiry intake form',
    width: 1280,
    height: 960,
  },
  {
    src: '/n8n-service-lead/routing-workflow.png',
    title: 'n8n service enquiry routing',
    width: 1280,
    height: 960,
  },
  {
    src: '/n8n-service-lead/operator-register.png',
    title: 'Service Enquiry Register',
    width: 1280,
    height: 960,
  },
  {
    src: '/n8n-service-lead/human-review.png',
    title: 'Human review gate',
    width: 1280,
    height: 960,
  },
];

const pageTitle = 'n8n service enquiry intake and routing';
const pageDescription =
  'A customer quote form connected to an inactive n8n workflow with validation, persistent duplicate checks, human review, exception holds, and a local operator register.';

export const metadata: Metadata = createPageMetadata({
  title: `${pageTitle} | SM Systems`,
  description: pageDescription,
  path: '/work/n8n-service-lead-routing/',
  image: {
    url: '/n8n-service-lead/routing-workflow.png',
    width: 1280,
    height: 960,
    alt: 'n8n service enquiry intake and routing workflow',
  },
});

export default function N8nServiceLeadRoutingPage() {
  if (!n8nServiceLeadRouting?.caseStudy) {
    throw new Error('n8n service enquiry routing case study is missing.');
  }

  const proofStrip = n8nServiceLeadRouting.caseStudy.proofStrip ?? [];
  const screenshotBySource = new Map(
    (n8nServiceLeadRouting.caseStudy.screenshots ?? []).map((screenshot) => [
      screenshot.src,
      screenshot,
    ]),
  );
  const screenshots = screenshotLayout.map((layout) => ({
    ...screenshotBySource.get(layout.src)!,
    ...layout,
  }));

  return (
    <article className="case-study-page" data-reveal>
      <WorkStructuredData
        title={pageTitle}
        description={pageDescription}
        path="/work/n8n-service-lead-routing/"
        image="/n8n-service-lead/routing-workflow.png"
      />
      <header className="case-study-hero">
        <h1 className="case-study-title-wide">{pageTitle}</h1>
        <p className="case-study-lede">{pageDescription}</p>
        <div className="case-study-actions">
          <Link className="button button-primary" href="/#contact">
            Discuss your workflow
          </Link>
        </div>
        <Link className="text-link case-study-back" href="/#work">
          Back to selected work
        </Link>
      </header>

      <section
        className="case-study-gallery"
        aria-labelledby="n8n-workflow-walkthrough"
      >
        <div className="case-study-section-heading">
          <h2 id="n8n-workflow-walkthrough">
            Service enquiry intake, routing, and review.
          </h2>
          <p>
            Quote requests enter through a structured form. Each record is
            checked and routed to one of five explicit outcomes before any
            external handoff is prepared.
          </p>
        </div>

        <div className="case-study-shot-list">
          {screenshots.map((screenshot, index) => (
            <figure className="case-study-shot" key={screenshot.src}>
              <div className="case-study-shot-media">
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
              <figcaption>
                <span>
                  <strong>{screenshot.title}</strong>
                  <span>{screenshot.caption}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-study-overview" aria-labelledby="n8n-overview">
        <div className="case-study-section-heading">
          <h2 id="n8n-overview">Routing controls and operator states.</h2>
        </div>
        <div className="proof-proof-strip">
          {proofStrip.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="case-study-content-grid"
        aria-label="What the n8n workflow includes"
      >
        <article>
          <h2>Workflow structure</h2>
          <p>
            The main inactive workflow contains the form trigger, validation,
            persistent Data Table lookups, a human-review wait state, and
            controlled preparation steps. A separate inactive QA workflow runs
            the five synthetic scenarios.
          </p>
        </article>
        <article>
          <h2>Routing outcomes</h2>
          <p>
            Accepted, duplicate, invalid, human-review, and
            integration-exception records are written to named terminal states
            in the local Service Enquiry Register.
          </p>
        </article>
        <article>
          <h2>Execution boundary</h2>
          <p>
            Both workflows remained inactive outside controlled runs in n8n
            2.31.6. No external credentials, CRM writes, booking calls,
            acknowledgements, emails, or SMS actions were attached or
            performed.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <h2>Service enquiry workflow implementation.</h2>
          <p>
            The same intake, routing, review, and operator-state structure can
            be adapted around the systems a business already uses.
          </p>
        </div>
        <div className="case-study-actions">
          <Link className="button button-primary" href="/#contact">
            Discuss your workflow
          </Link>
        </div>
      </section>
    </article>
  );
}
