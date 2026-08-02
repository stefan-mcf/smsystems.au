import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { WorkStructuredData } from '@/components/seo/work-structured-data';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';

const project = proofItems.find(
  (item) => item.slug === 'hubspot-lead-to-deal-crm',
);

const pageTitle = 'HubSpot lead-to-deal and Zendesk handoff';
const pageDescription =
  'A controlled path from HubSpot pipeline and linked records into approved Zendesk customer context, with readback and duplicate-safe replay.';
const caseStudyPath = '/work/hubspot-lead-to-deal-crm/';
const heroImage = '/hubspot-zendesk-handoff/01-crm-to-support-lifecycle.png';

export const metadata: Metadata = createPageMetadata({
  title: `${pageTitle} | SM Systems`,
  description: pageDescription,
  path: caseStudyPath,
  image: {
    url: heroImage,
    width: 1280,
    height: 960,
    alt: 'Controlled customer path from HubSpot CRM to Zendesk support context',
  },
});

export default function HubspotLeadToDealCrmPage() {
  if (!project?.caseStudy) {
    throw new Error('Combined HubSpot and Zendesk case study is missing.');
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
        <p className="eyebrow">Featured build</p>
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
        aria-labelledby="hubspot-customer-path"
      >
        <div className="case-study-section-heading">
          <h2 id="hubspot-customer-path">
            From HubSpot pipeline to Zendesk context.
          </h2>
          <p>
            The seven-frame walkthrough starts with the HubSpot pipeline and
            its activity trail, then carries the approved customer relationship
            through mapping, readback, and reconciliation.
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

      <section className="case-study-overview" aria-labelledby="hubspot-overview">
        <div className="case-study-section-heading">
          <h2 id="hubspot-overview">
            Control stays visible across both systems.
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
        aria-label="What the combined HubSpot and Zendesk implementation includes"
      >
        <article>
          <h2>HubSpot remains the relationship source.</h2>
          <p>
            Company, contact, and deal records are matched by stable keys and
            verified through native associations before mapping begins.
          </p>
        </article>
        <article>
          <h2>Zendesk receives controlled customer context.</h2>
          <p>
            The organization is created or matched first, then its readback ID
            binds one end user without ticket or message actions.
          </p>
        </article>
        <article>
          <h2>Replay and exceptions fail closed.</h2>
          <p>
            The second run reuses every provider record. Unapproved, incomplete,
            duplicate, or mismatched inputs remain blocked.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <h2>Connect qualification to customer operations.</h2>
          <p>
            SM Systems can adapt the same pipeline, mapping, approval, readback,
            and replay controls around an authorized HubSpot and Zendesk workflow.
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
