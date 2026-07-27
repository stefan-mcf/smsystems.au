import type { Metadata } from 'next';
import Link from 'next/link';
import { proofItems } from '@/content/proof';

const n8nServiceLeadRouting = proofItems.find(
  (item) => item.slug === 'n8n-service-lead-routing',
);

const screenshotLayout = [
  {
    src: '/n8n-service-lead/workflow-overview.png',
    title: 'Service lead routing workflow',
    width: 1600,
    height: 900,
  },
  {
    src: '/n8n-service-lead/validation-logic.png',
    title: 'Checks applied before handoff',
    width: 1600,
    height: 900,
  },
  {
    src: '/n8n-service-lead/invalid-lead-output.png',
    title: 'Incomplete enquiry held safely',
    width: 1600,
    height: 900,
  },
];

export const metadata: Metadata = {
  title: 'n8n lead routing workflow | SM Systems',
  description:
    'A controlled n8n workflow for checking service enquiries, separating exceptions, and preparing clean downstream handoffs.',
  alternates: {
    canonical: '/work/n8n-service-lead-routing/',
  },
};

export default function N8nServiceLeadRoutingPage() {
  if (!n8nServiceLeadRouting?.caseStudy) {
    throw new Error('n8n service lead routing case study is missing.');
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
      <header className="case-study-hero">
        <Link className="text-link case-study-back" href="/#work">
          Back to selected work
        </Link>
        <p className="eyebrow">Featured build</p>
        <h1 className="case-study-title-wide">n8n lead routing workflow</h1>
        <p className="case-study-lede">
          A controlled n8n workflow for checking service enquiries, separating
          exceptions, and preparing clean downstream handoffs.
        </p>
        <div className="case-study-actions">
          <Link className="button button-primary" href="/#contact">
            Discuss your workflow
          </Link>
        </div>
      </header>

      <section
        className="case-study-gallery"
        aria-labelledby="n8n-workflow-walkthrough"
      >
        <div className="case-study-section-heading">
          <p className="proof-lane">Workflow walkthrough</p>
          <h2 id="n8n-workflow-walkthrough">
            From enquiry intake to prepared handoff.
          </h2>
          <p>
            The n8n views show the complete workflow, its validation controls,
            and the matching output for a record stopped during the completed
            run.
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
                <span className="case-study-shot-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
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
          <p className="proof-lane">Project overview</p>
          <h2 id="n8n-overview">
            One controlled path from enquiry to handoff.
          </h2>
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
        className="case-study-content-grid"
        aria-label="What the n8n workflow includes"
      >
        <article>
          <p className="proof-lane">Workflow structure</p>
          <h2>Sixteen nodes keep each decision visible.</h2>
          <p>
            Enquiries are normalised, checked, and routed through named paths
            before any CRM, booking, or acknowledgement payload is prepared.
          </p>
        </article>
        <article>
          <p className="proof-lane">Routing controls</p>
          <h2>Problem records stop cleanly.</h2>
          <p>
            Invalid, duplicate, uncertain, and failed records move to dedicated
            review or exception paths instead of being treated as successful.
          </p>
        </article>
        <article>
          <p className="proof-lane">Test boundary</p>
          <h2>The completed run stayed isolated.</h2>
          <p>
            Five controlled scenarios were run manually in n8n 2.31.6. The
            workflow referenced no credentials and performed no external
            actions.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <p className="proof-lane">Similar workflows</p>
          <h2>Bring service enquiries into one controlled path.</h2>
          <p>
            SM Systems builds n8n validation, routing, review, and handoff
            workflows around the systems a business already uses.
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
