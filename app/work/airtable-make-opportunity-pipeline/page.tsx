import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { WorkStructuredData } from '@/components/seo/work-structured-data';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';

const airtableMakePipeline = proofItems.find(
  (item) => item.slug === 'airtable-make-opportunity-pipeline',
);

const screenshotLayout = [
  {
    src: '/airtable-make/pipeline-overview.png',
    width: 1280,
    height: 960,
  },
  {
    src: '/airtable-make/outreach-analytics.png',
    width: 1280,
    height: 960,
  },
  {
    src: '/airtable-make/airtable-opportunities.png',
    width: 1280,
    height: 960,
  },
  {
    src: '/airtable-make/delivery-handoff.png',
    width: 1280,
    height: 960,
  },
  {
    src: '/airtable-make/make-router.png',
    width: 1280,
    height: 960,
  },
];

export const metadata: Metadata = createPageMetadata({
  title: 'Airtable & Make opportunity pipeline | SM Systems',
  description:
    'A private Airtable and Make opportunity pipeline connecting approved intake, review decisions, exception routing, and project handoff.',
  path: '/work/airtable-make-opportunity-pipeline/',
  image: {
    url: '/airtable-make/pipeline-overview.png',
    width: 1280,
    height: 960,
    alt: 'Airtable and Make opportunity pipeline overview',
  },
});

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
      <WorkStructuredData
        title="Airtable & Make opportunity pipeline"
        description="A private Airtable and Make opportunity pipeline connecting approved intake, review decisions, exception routing, and project handoff."
        path="/work/airtable-make-opportunity-pipeline/"
        image="/airtable-make/pipeline-overview.png"
      />
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
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your workflow
          </ProjectEnquiryTrigger>
          <Link
            className="button button-secondary"
            href={
              airtableMakePipeline.primaryLink ??
              'https://github.com/stefan-mcf/airtable-make-opportunity-pipeline'
            }
          >
            View GitHub repository
          </Link>
        </div>
        <Link className="text-link case-study-back" href="/#work">
          Back to selected work
        </Link>
      </header>

      <section className="case-study-gallery" aria-labelledby="pipeline-sequence">
        <div className="case-study-section-heading">
          <h2 id="pipeline-sequence">
            A controlled path from opportunity to delivery.
          </h2>
          <p>
            Approved records enter Airtable, move through bounded Make routing,
            and retain their review and delivery states in one operating system.
          </p>
        </div>

        <div className="case-study-shot-list">
          {screenshots.map((screenshot, index) => (
            <figure className="case-study-shot" key={screenshot.src}>
              <div className="case-study-shot-media">
                <ZoomableImage
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
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

      <section className="case-study-overview" aria-labelledby="pipeline-overview">
        <div className="case-study-section-heading">
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
          <h2>Approved records enter one operating view.</h2>
          <p>
            New opportunities are validated and given stable keys before they
            move into qualification, decision, or exception states.
          </p>
        </article>
        <article>
          <h2>Duplicates and exceptions stop cleanly.</h2>
          <p>
            The connected Make router separates valid, duplicate, invalid, and
            owner-review outcomes instead of treating every record as a success.
          </p>
        </article>
        <article>
          <h2>External actions remain deliberate.</h2>
          <p>
            Applications, messages, and spending stay manual. A project handoff
            is created only after the opportunity is won and explicitly approved.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <h2>Bring your operating workflow into one clear path.</h2>
          <p>
            SM Systems builds Airtable operating views, Make routing workflows,
            review queues, and controlled handoffs around the way a business
            already works.
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
