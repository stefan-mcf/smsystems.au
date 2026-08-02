import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { WorkStructuredData } from '@/components/seo/work-structured-data';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';

const conversionMeasurement = proofItems.find(
  (item) => item.slug === 'conversion-measurement-inbound-lead-system',
);

export const metadata: Metadata = createPageMetadata({
  title: 'Conversion measurement and inbound lead system | SM Systems',
  description:
    'A live conversion-measurement and inbound-lead path across GTM, GA4, HubSpot, the main Airtable base, Make, deterministic event QA, and reporting.',
  path: '/work/conversion-measurement-inbound-lead-system/',
  image: {
    url: '/conversion-measurement/live-enquiry-path.png',
    width: 1280,
    height: 960,
    alt: 'SM Systems conversion measurement and inbound lead path',
  },
});

export default function ConversionMeasurementInboundLeadPage() {
  if (!conversionMeasurement?.caseStudy) {
    throw new Error('Conversion measurement case study is missing.');
  }

  const proofStrip = conversionMeasurement.caseStudy.proofStrip ?? [];
  const screenshots = conversionMeasurement.caseStudy.screenshots ?? [];

  return (
    <article className="case-study-page" data-reveal>
      <WorkStructuredData
        title="Conversion measurement and inbound lead system"
        description="A live conversion-measurement and inbound-lead path across GTM, GA4, HubSpot, the main Airtable base, Make, deterministic event QA, and reporting."
        path="/work/conversion-measurement-inbound-lead-system/"
        image="/conversion-measurement/live-enquiry-path.png"
      />
      <header className="case-study-hero">
        <p className="eyebrow">Live SM Systems implementation</p>
        <h1 className="case-study-title-wide">
          Conversion measurement and inbound lead system
        </h1>
        <p className="case-study-lede">
          A live path from website enquiry to CRM, the main Airtable base,
          human qualification, deal creation, analytics QA, and reporting.
        </p>
        <div className="case-study-actions">
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your tracking path
          </ProjectEnquiryTrigger>
          <Link
            className="button button-secondary"
            href={
              conversionMeasurement.primaryLink ??
              'https://github.com/stefan-mcf/conversion-measurement-inbound-lead-system'
            }
          >
            View GitHub repository
          </Link>
        </div>
        <Link className="text-link case-study-back" href="/#work">
          Back to selected work
        </Link>
      </header>

      <section
        className="case-study-gallery"
        aria-labelledby="conversion-walkthrough"
      >
        <div className="case-study-section-heading">
          <p className="proof-lane">Operating sequence</p>
          <h2 id="conversion-walkthrough">
            One traceable path from enquiry to qualified deal.
          </h2>
          <p>
            The live public form feeds an active lead-routing path into the
            main Airtable base, with a defined event plan, deterministic QA
            checks, and a measurement ledger tracking each stage.
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

      <section
        className="case-study-overview"
        aria-labelledby="conversion-overview"
      >
        <div className="case-study-section-heading">
          <p className="proof-lane">Project overview</p>
          <h2 id="conversion-overview">
            Measurement and lead operations share one stable key.
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
        aria-label="What the conversion measurement implementation includes"
      >
        <article>
          <p className="proof-lane">Confirmed success</p>
          <h2>generate_lead fires only after form success.</h2>
          <p>
            The website emits a stable submission ID after the HubSpot success
            callback. The event route excludes names, email addresses, message
            contents, and other personal fields.
          </p>
        </article>
        <article>
          <p className="proof-lane">Qualification control</p>
          <h2>Unreviewed enquiries do not become deals.</h2>
          <p>
            Make writes the inbound record to the existing main Airtable base.
            A separate active scenario creates or associates a HubSpot deal
            only after the qualification state is approved.
          </p>
        </article>
        <article>
          <p className="proof-lane">Honest reporting</p>
          <h2>Realtime proves the event, not business outcomes.</h2>
          <p>
            GA4 Realtime recorded one commissioning generate_lead. Looker
            Studio is connected, while tiny test volume remains separate from
            future real traffic and does not support a conversion-rate claim.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <p className="proof-lane">Similar systems</p>
          <h2>Make every conversion path observable before you trust it.</h2>
          <p>
            SM Systems implements tracking, CRM handoffs, qualification gates,
            lead ledgers, workflow automation, and deterministic event QA.
          </p>
        </div>
        <div className="case-study-actions">
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your tracking path
          </ProjectEnquiryTrigger>
        </div>
      </section>
    </article>
  );
}
