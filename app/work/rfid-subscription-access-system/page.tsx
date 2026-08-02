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

const screenshotLayout = [
  {
    src: '/rfid/subscription-website.png',
    title: 'Customer plan selection',
    width: 2048,
    height: 1060,
  },
  {
    src: '/rfid/operator-dashboard.png',
    title: 'Access decision overview',
    width: 2048,
    height: 1060,
  },
  {
    src: '/rfid/operator-tag-setup.png',
    title: 'Tag setup and activation',
    width: 2048,
    height: 1060,
  },
  {
    src: '/rfid/operator-wash-test.png',
    title: 'Wash automation controls',
    width: 2048,
    height: 1060,
  },
];

export const metadata: Metadata = createPageMetadata({
  title: 'RFID carwash subscription access system | SM Systems',
  description:
    'An RFID carwash subscription and access system connecting customer wash plans, tag activation, access decisions, operator controls, and event visibility.',
  path: '/work/rfid-subscription-access-system/',
  image: {
    url: '/rfid/subscription-website.png',
    width: 2048,
    height: 1060,
    alt: 'RFID carwash subscription website and access system',
  },
});

export default function RfidSubscriptionAccessSystemPage() {
  if (!rfidSystem?.caseStudy) {
    throw new Error('RFID subscription access system case study is missing.');
  }

  const proofStrip = rfidSystem.caseStudy.proofStrip ?? [];
  const screenshotBySource = new Map(
    (rfidSystem.caseStudy.screenshots ?? []).map((screenshot) => [
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
        title="RFID carwash subscription access system"
        description="An RFID carwash subscription and access system connecting customer wash plans, tag activation, access decisions, operator controls, and event visibility."
        path="/work/rfid-subscription-access-system/"
        image="/rfid/subscription-website.png"
      />
      <header className="case-study-hero">
        <p className="eyebrow">Client project</p>
        <h1 className="case-study-title-wide">
          RFID carwash subscription access system
        </h1>
        <p className="case-study-lede">
          A connected system for customer wash plans, RFID tag activation,
          access decisions, operator controls, and event visibility.
        </p>
        <div className="case-study-actions">
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your system
          </ProjectEnquiryTrigger>
        </div>
        <Link className="text-link case-study-back" href="/#work">
          Back to selected work
        </Link>
      </header>

      <section className="case-study-gallery" aria-labelledby="rfid-walkthrough">
        <div className="case-study-section-heading">
          <p className="proof-lane">Operating sequence</p>
          <h2 id="rfid-walkthrough">From plan selection to wash control.</h2>
          <p>
            Subscriptions, registered tags, access decisions, and wash controls
            remain connected across the customer and operator workflow.
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
                  <strong>{screenshot.title}</strong>
                  <span>{screenshot.caption}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-study-overview" aria-labelledby="rfid-overview">
        <div className="case-study-section-heading">
          <p className="proof-lane">Project overview</p>
          <h2 id="rfid-overview">
            One system across the customer and operator journey.
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
        aria-label="What the RFID system includes"
      >
        <article>
          <p className="proof-lane">Subscription path</p>
          <h2>Plan records support access decisions.</h2>
          <p>
            Plan selection and account records provide the entitlement data
            used when a registered RFID tag is evaluated.
          </p>
        </article>
        <article>
          <p className="proof-lane">Operator tools</p>
          <h2>Controlled tag setup and activation.</h2>
          <p>
            Operators can select a scanned tag, use a customer setup code, or
            perform a controlled manual activation.
          </p>
        </article>
        <article>
          <p className="proof-lane">Operational visibility</p>
          <h2>Access results and wash state in one view.</h2>
          <p>
            Access results, subscription tier, wash mode, runtime signals, and
            recent events are available from the operator interface.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <p className="proof-lane">Similar systems</p>
          <h2>Connect the customer journey to operations.</h2>
          <p>
            SM Systems builds customer portals, backend integrations, operator
            tools, and connected automation workflows.
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
