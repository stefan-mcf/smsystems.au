import type { Metadata } from 'next';
import Link from 'next/link';
import { proofItems } from '@/content/proof';

const airtableMakePipeline = proofItems.find(
  (item) => item.slug === 'airtable-make-opportunity-pipeline',
);

const screenshotLayout = [
  {
    src: '/airtable-make/pipeline-overview.png',
    title: 'Implemented outreach and opportunity pipeline',
    width: 1504,
    height: 705,
  },
  {
    src: '/airtable-make/outreach-analytics.png',
    title: 'Outreach ledger and follow-up controls',
    width: 1504,
    height: 705,
  },
  {
    src: '/airtable-make/airtable-opportunities.png',
    title: 'Airtable opportunity routing',
    width: 1504,
    height: 705,
  },
  {
    src: '/airtable-make/delivery-handoff.png',
    title: 'Delivered project handoff',
    width: 1504,
    height: 771,
  },
  {
    src: '/airtable-make/make-router.png',
    title: 'Make opportunity intake router',
    width: 1504,
    height: 705,
  },
];

export const metadata: Metadata = {
  title: 'Airtable & Make opportunity pipeline | SM Systems',
  description:
    'A private Airtable and Make opportunity pipeline connecting approved intake, review decisions, exception routing, and project handoff.',
  alternates: {
    canonical: '/work/airtable-make-opportunity-pipeline/',
  },
};

export default function AirtableMakeOpportunityPipelinePage() {
  if (!airtableMakePipeline?.caseStudy) {
    throw new Error('Airtable and Make opportunity pipeline case study is missing.');
  }

  const proofStrip = airtableMakePipeline.caseStudy.proofStrip ?? [];
  const screenshotBySource = new Map(
    (airtableMakePipeline.caseStudy.screenshots ?? []).map((screenshot) => [
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
        <p className="eyebrow">Featured build</p>
        <h1 className="case-study-title-wide">
          Airtable &amp; Make opportunity pipeline
        </h1>
        <p className="case-study-lede">
          A private operating system connecting approved opportunity intake,
          qualification, review decisions, and project handoff.
        </p>
        <div className="case-study-actions">
          <Link className="button button-primary" href="/#contact">
            Discuss your workflow
          </Link>
        </div>
        <Link className="text-link case-study-back" href="/#work">
          Back to selected work
        </Link>
      </header>

      <section className="case-study-gallery" aria-labelledby="pipeline-walkthrough">
        <div className="case-study-section-heading">
          <p className="proof-lane">System walkthrough</p>
          <h2 id="pipeline-walkthrough">From opportunity to project handoff.</h2>
          <p>
            The Airtable and Make views show how approved records are routed,
            reviewed, and carried into delivery.
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

      <section className="case-study-overview" aria-labelledby="pipeline-overview">
        <div className="case-study-section-heading">
          <p className="proof-lane">Project overview</p>
          <h2 id="pipeline-overview">
            One controlled path from intake to delivery.
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
        aria-label="What the opportunity pipeline includes"
      >
        <article>
          <p className="proof-lane">Opportunity intake</p>
          <h2>Approved records enter one operating view.</h2>
          <p>
            New opportunities are validated and given stable keys before they
            move into qualification, decision, or exception states.
          </p>
        </article>
        <article>
          <p className="proof-lane">Routing controls</p>
          <h2>Duplicates and exceptions stop cleanly.</h2>
          <p>
            The connected Make router separates valid, duplicate, invalid, and
            owner-review outcomes instead of treating every record as a success.
          </p>
        </article>
        <article>
          <p className="proof-lane">Human approval</p>
          <h2>External actions remain deliberate.</h2>
          <p>
            Applications, messages, and spending stay manual. A project handoff
            is created only after the opportunity is won and explicitly approved.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <p className="proof-lane">Similar systems</p>
          <h2>Bring your operating workflow into one clear path.</h2>
          <p>
            SM Systems builds Airtable operating views, Make routing workflows,
            review queues, and controlled handoffs around the way a business
            already works.
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
