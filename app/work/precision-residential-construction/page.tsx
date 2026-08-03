import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { WorkStructuredData } from '@/components/seo/work-structured-data';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';

const precisionWebsite = proofItems.find(
  (item) => item.slug === 'precision-residential-construction-website',
);

export const metadata: Metadata = createPageMetadata({
  title: 'Precision Residential Construction website | SM Systems',
  description:
    'A paid-client responsive website launched through Cloudflare Pages with a production n8n quote-intake and owner-notification path.',
  path: '/work/precision-residential-construction/',
  image: {
    url: '/precision/01-live-paid-client-website.png',
    width: 1280,
    height: 960,
    alt: 'Responsive Precision Residential Construction website on desktop and mobile',
  },
});

export default function PrecisionResidentialConstructionPage() {
  if (!precisionWebsite?.caseStudy) {
    throw new Error('Precision Residential Construction case study is missing.');
  }

  const proofStrip = precisionWebsite.caseStudy.proofStrip ?? [];
  const screenshots = precisionWebsite.caseStudy.screenshots ?? [];

  return (
    <article className="case-study-page" data-reveal>
      <WorkStructuredData
        title="Precision Residential Construction website"
        description="A paid-client responsive website launched through Cloudflare Pages with a production n8n quote-intake and owner-notification path."
        path="/work/precision-residential-construction/"
        image="/precision/01-live-paid-client-website.png"
      />
      <header className="case-study-hero">
        <p className="eyebrow">Client project</p>
        <h1 className="case-study-title-wide">
          Precision Residential Construction website
        </h1>
        <p className="case-study-lede">
          A paid-client responsive website with a production n8n quote-intake
          path, launched on Cloudflare Pages at prconstruction.au.
        </p>
        <div className="case-study-actions">
          <Link
            className="button button-primary"
            href={precisionWebsite.primaryLink ?? 'https://prconstruction.au/'}
          >
            Visit live website
          </Link>
          <ProjectEnquiryTrigger className="button button-secondary">
            Discuss a project
          </ProjectEnquiryTrigger>
          <Link
            className="button button-secondary"
            href="https://github.com/stefan-mcf/precision-residential-construction"
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
        aria-labelledby="precision-production"
      >
        <div className="case-study-section-heading">
          <h2 id="precision-production">
            A live website built around customer decisions.
          </h2>
          <p>
            Responsive presentation, service clarity, finished-work examples,
            and structured quote intake are shown across five production views.
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

      <section className="case-study-overview" aria-labelledby="project-overview">
        <div className="case-study-section-heading">
          <h2 id="project-overview">
            Production delivery from page load to owner notification.
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

      <section className="case-study-content-grid" aria-label="What the website includes">
        <article>
          <h2>Services and finished work stay easy to inspect.</h2>
          <p>
            Visitors move from core services into completed project photography
            and a direct before-and-after comparison before requesting a quote.
          </p>
        </article>
        <article>
          <h2>The live site runs on a custom production domain.</h2>
          <p>
            The site was deployed through Cloudflare Pages with custom-domain
            connection, DNS, SSL, canonical routing, Zoho Mail DNS and email
            authentication, and responsive checks across desktop and mobile
            layouts.
          </p>
        </article>
        <article>
          <h2>Enquiries enter a recorded n8n workflow.</h2>
          <p>
            The form posts structured project details to a production n8n
            webhook. A labelled commissioning enquiry was recorded, reached
            the business owner, and received a direct reply. No automated
            follow-up or multi-stage CRM pipeline is claimed.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <h2>See the website in production.</h2>
          <p>
            Open the live Precision Residential Construction website, or get in
            touch to discuss a similar website and enquiry flow for your business.
          </p>
        </div>
        <div className="case-study-actions">
          <Link
            className="button button-primary"
            href={precisionWebsite.primaryLink ?? 'https://prconstruction.au/'}
          >
            Visit live website
          </Link>
          <ProjectEnquiryTrigger className="button button-secondary">
            Discuss a project
          </ProjectEnquiryTrigger>
        </div>
      </section>
    </article>
  );
}
