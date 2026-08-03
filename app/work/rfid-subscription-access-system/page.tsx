import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { WorkStructuredData } from '@/components/seo/work-structured-data';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';

const rfidSystem = proofItems.find(
  (item) => item.slug === 'rfid-subscription-access-system',
);

export const metadata: Metadata = createPageMetadata({
  title: 'RFID subscription and access platform | SM Systems',
  description:
    'A client system connecting vehicle subscriptions, Stripe sandbox billing, RFID entitlement decisions, operator controls, and an Aurora Serverless data layer.',
  path: '/work/rfid-subscription-access-system/',
  image: {
    url: '/rfid/01-subscription-to-access-decision.png',
    width: 1280,
    height: 960,
    alt: 'RFID subscription and access platform architecture',
  },
});

export default function RfidSubscriptionAccessSystemPage() {
  if (!rfidSystem?.caseStudy) {
    throw new Error('RFID subscription access system case study is missing.');
  }

  const summaryStrip = rfidSystem.caseStudy.proofStrip ?? [];
  const screenshots = rfidSystem.caseStudy.screenshots ?? [];

  return (
    <article className="case-study-page" data-reveal>
      <WorkStructuredData
        title="RFID subscription and access platform"
        description="A client system connecting vehicle subscriptions, Stripe sandbox billing, RFID entitlement decisions, operator controls, and an Aurora Serverless data layer."
        path="/work/rfid-subscription-access-system/"
        image="/rfid/01-subscription-to-access-decision.png"
      />
      <header className="case-study-hero">
        <p className="eyebrow">Client system</p>
        <h1 className="case-study-title-wide">
          RFID subscription and access platform
        </h1>
        <p className="case-study-lede">
          A connected customer, billing, access-decision, and operator system
          backed by durable PostgreSQL state and a request-driven AWS data
          layer.
        </p>
        <div className="case-study-actions">
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your system
          </ProjectEnquiryTrigger>
          <Link
            className="button button-secondary"
            href="https://github.com/stefan-mcf/rfid-subscription-access-system"
          >
            View GitHub repository
          </Link>
        </div>
        <Link className="text-link case-study-back" href="/#work">
          Back to selected work
        </Link>
      </header>

      <section className="case-study-gallery" aria-labelledby="rfid-system">
        <div className="case-study-section-heading">
          <h2 id="rfid-system">
            One controlled path from subscription to access decision.
          </h2>
          <p>
            Six views connect the customer, Stripe, operator, and AWS layers
            while keeping live billing and physical equipment activation
            outside the claimed scope.
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

      <section className="case-study-overview" aria-labelledby="rfid-overview">
        <div className="case-study-section-heading">
          <h2 id="rfid-overview">
            Commercial state, access logic, and field control stay distinct.
          </h2>
        </div>
        <div className="proof-proof-strip">
          {summaryStrip.map((item) => (
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
        aria-label="What the RFID subscription and access platform includes"
      >
        <article>
          <h2>Customer and vehicle records remain explicit.</h2>
          <p>
            Verified accounts keep each vehicle, subscription, billing action,
            and tag status visible without collapsing them into one opaque
            customer state.
          </p>
        </article>
        <article>
          <h2>Billing events update durable operational state.</h2>
          <p>
            Stripe sandbox Checkout and signed lifecycle events pass through an
            ordered AWS broker before current subscription state is reconciled
            into PostgreSQL.
          </p>
        </article>
        <article>
          <h2>Physical actuation remains a separate acceptance step.</h2>
          <p>
            The operator interface exposes tag assignment, access results,
            modes, and output indicators. Reader input, PLC acknowledgement,
            and equipment movement remain separate field checks.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <h2>Connect customer state to controlled operations.</h2>
          <p>
            SM Systems builds subscription portals, integration brokers,
            access-decision services, operator tools, and cloud data layers
            around explicit operating boundaries.
          </p>
        </div>
        <div className="case-study-actions">
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your system
          </ProjectEnquiryTrigger>
        </div>
      </section>
    </article>
  );
}
