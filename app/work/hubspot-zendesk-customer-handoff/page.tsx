import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { WorkStructuredData } from '@/components/seo/work-structured-data';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';

const project = proofItems.find(
  (item) => item.slug === 'hubspot-zendesk-customer-handoff',
);

const pageTitle = 'HubSpot to Zendesk customer handoff';
const pageDescription =
  'A controlled CRM-to-support handoff with provider readback, approval gates, stable IDs, and duplicate-safe replay.';
const caseStudyPath = '/work/hubspot-zendesk-customer-handoff/';
const heroImage =
  '/hubspot-zendesk-handoff/02-hubspot-approved-relationship.png';

export const metadata: Metadata = createPageMetadata({
  title: `${pageTitle} | SM Systems`,
  description: pageDescription,
  path: caseStudyPath,
  image: {
    url: heroImage,
    width: 1280,
    height: 960,
    alt: 'Native HubSpot customer relationship used in the controlled Zendesk handoff',
  },
});

export default function HubspotZendeskCustomerHandoffPage() {
  if (!project?.caseStudy) {
    throw new Error('HubSpot to Zendesk customer handoff case study is missing.');
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
              'https://github.com/stefan-mcf/hubspot-zendesk-customer-handoff'
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
        aria-labelledby="hubspot-zendesk-walkthrough"
      >
        <div className="case-study-section-heading">
          <h2 id="hubspot-zendesk-walkthrough">
            Provider-backed relationship and customer context.
          </h2>
          <p>
            The five-frame package combines native HubSpot and Zendesk records
            with the exact mapping, approval, replay, and exception controls.
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
        aria-labelledby="hubspot-zendesk-overview"
      >
        <div className="case-study-section-heading">
          <h2 id="hubspot-zendesk-overview">
            One controlled relationship across two providers.
          </h2>
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
        aria-label="What the HubSpot to Zendesk handoff includes"
      >
        <article>
          <h2>HubSpot remains the relationship source.</h2>
          <p>
            One company, contact, and closed-won deal are matched by stable keys
            and verified through three native associations before mapping begins.
          </p>
        </article>
        <article>
          <h2>Zendesk receives controlled customer context.</h2>
          <p>
            The organization is created or matched first. Its read-back ID then
            binds one end user while service context and the next action remain visible.
          </p>
        </article>
        <article>
          <h2>Replay and exception states fail closed.</h2>
          <p>
            The second run reuses every provider record. Unapproved, incomplete,
            duplicate, or mismatched inputs remain blocked without ticket or message actions.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <h2>Connect CRM handoff to the support workspace.</h2>
          <p>
            SM Systems can adapt the same mapping, approval, readback, and replay
            controls around an authorized HubSpot and Zendesk operating model.
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
