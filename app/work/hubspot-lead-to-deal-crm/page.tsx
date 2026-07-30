import type { Metadata } from 'next';
import Link from 'next/link';
import { WorkStructuredData } from '@/components/seo/work-structured-data';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';

const hubspotLeadToDeal = proofItems.find(
  (item) => item.slug === 'hubspot-lead-to-deal-crm',
);

const screenshotLayout = [
  {
    src: '/hubspot-lead-to-deal/lead-to-deal-pipeline.png',
    width: 1149,
    height: 648,
  },
  {
    src: '/hubspot-lead-to-deal/connected-crm-records.png',
    width: 1149,
    height: 648,
  },
];

export const metadata: Metadata = createPageMetadata({
  title: 'HubSpot CRM pipeline and record controls | SM Systems',
  description:
    'A private HubSpot CRM implementation with controlled pipeline stages, linked records, stable deduplication, provider readback, and exact cleanup.',
  path: '/work/hubspot-lead-to-deal-crm/',
  image: {
    url: '/hubspot-lead-to-deal/lead-to-deal-pipeline.png',
    width: 1149,
    height: 648,
    alt: 'HubSpot lead-to-deal CRM pipeline',
  },
});

export default function HubspotLeadToDealCrmPage() {
  if (!hubspotLeadToDeal?.caseStudy) {
    throw new Error('HubSpot lead-to-deal CRM case study is missing.');
  }

  const proofStrip = hubspotLeadToDeal.caseStudy.proofStrip ?? [];
  const screenshotBySource = new Map(
    (hubspotLeadToDeal.caseStudy.screenshots ?? []).map((screenshot) => [
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
        title="HubSpot CRM pipeline and record controls"
        description="A private HubSpot CRM implementation with controlled pipeline stages, linked records, stable deduplication, provider readback, and exact cleanup."
        path="/work/hubspot-lead-to-deal-crm/"
        image="/hubspot-lead-to-deal/lead-to-deal-pipeline.png"
      />
      <header className="case-study-hero">
        <p className="eyebrow">Featured build</p>
        <h1 className="case-study-title-wide">
          HubSpot CRM pipeline and record controls
        </h1>
        <p className="case-study-lede">
          A private HubSpot CRM implementation with controlled pipeline stages,
          linked records, deduplication, readback, and exact cleanup.
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

      <section
        className="case-study-gallery"
        aria-labelledby="hubspot-crm-walkthrough"
      >
        <div className="case-study-section-heading">
          <p className="proof-lane">CRM walkthrough</p>
          <h2 id="hubspot-crm-walkthrough">
            Provider-native pipeline and record evidence.
          </h2>
          <p>
            The HubSpot views show the configured pipeline and linked CRM records
            from the controlled commissioning run.
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

      <section className="case-study-overview" aria-labelledby="hubspot-overview">
        <div className="case-study-section-heading">
          <p className="proof-lane">Project overview</p>
          <h2 id="hubspot-overview">
            One controlled CRM path from lead to deal.
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
        aria-label="What the HubSpot CRM implementation includes"
      >
        <article>
          <p className="proof-lane">Pipeline structure</p>
          <h2>Seven stages keep deal progression visible.</h2>
          <p>
            The retained pipeline covers Active / Replied, Qualified, Audit
            Booked, Proposal Requested, Proposal Prepared, Won, and Lost.
          </p>
        </article>
        <article>
          <p className="proof-lane">Record integrity</p>
          <h2>Associations and deduplication read back cleanly.</h2>
          <p>
            Three controlled companies, contacts, and deals were linked through
            nine HubSpot associations. An idempotent rerun matched every record.
          </p>
        </article>
        <article>
          <p className="proof-lane">Commissioning boundary</p>
          <h2>Temporary proof records were removed exactly.</h2>
          <p>
            The run used no live relationship import or external action. An
            exact cleanup archived all nine records, and its rerun was a no-op.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <p className="proof-lane">Similar systems</p>
          <h2>Build a CRM around the way your business qualifies work.</h2>
          <p>
            SM Systems builds HubSpot pipelines, record models, validation
            controls, and review gates for clear lead-to-deal operations.
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
