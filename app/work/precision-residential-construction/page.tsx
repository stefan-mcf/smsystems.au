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

const detailScreenshotSources = [
  { src: '/precision/website-homepage.png', width: 1280, height: 720 },
  { src: '/precision/website-services-full.png', width: 1280, height: 864 },
  { src: '/precision/website-before-after-full.png', width: 1280, height: 753 },
  { src: '/precision/website-projects-full.png', width: 1280, height: 1219 },
  { src: '/precision/website-quote-crm-full.png', width: 1280, height: 867 },
];

export const metadata: Metadata = createPageMetadata({
  title: 'Precision Residential Construction website | SM Systems',
  description:
    'The Precision Residential Construction website project: services, project photography, direct contact options, and a structured quote enquiry flow.',
  path: '/work/precision-residential-construction/',
  image: {
    url: '/precision/website-homepage.png',
    width: 1280,
    height: 720,
    alt: 'Precision Residential Construction website homepage',
  },
});

export default function PrecisionResidentialConstructionPage() {
  if (!precisionWebsite?.caseStudy) {
    throw new Error('Precision Residential Construction case study is missing.');
  }

  const proofStrip = precisionWebsite.caseStudy.proofStrip ?? [];
  const screenshots = (precisionWebsite.caseStudy.screenshots ?? []).map(
    (screenshot, index) => ({
      ...screenshot,
      ...detailScreenshotSources[index],
    }),
  );
  const screenshotTitles = [
    'Homepage and contact actions',
    'Services at a glance',
    'Before-and-after projects',
    'Recent project gallery',
    'Structured quote enquiry',
  ];

  return (
    <article className="case-study-page" data-reveal>
      <WorkStructuredData
        title="Precision Residential Construction website"
        description="The Precision Residential Construction website project: services, project photography, direct contact options, and a structured quote enquiry flow."
        path="/work/precision-residential-construction/"
        image="/precision/website-homepage.png"
      />
      <header className="case-study-hero">
        <p className="eyebrow">Client project</p>
        <h1>Precision Residential Construction website</h1>
        <p className="case-study-lede">
          A customer-facing website built around the work a prospective client
          needs to see: services, finished projects, before-and-after comparisons,
          direct contact options, and a structured quote enquiry.
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
        </div>
        <Link className="text-link case-study-back" href="/#work">
          Back to selected work
        </Link>
      </header>

      <section className="case-study-gallery" aria-labelledby="website-walkthrough">
        <div className="case-study-section-heading">
          <p className="proof-lane">Customer experience</p>
          <h2 id="website-walkthrough">The published customer experience.</h2>
          <p>
            The published experience moves from first impression and service
            detail through to completed work and quote enquiry.
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
                  <strong>{screenshotTitles[index] ?? 'Website view'}</strong>
                  <span>{screenshot.caption}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-study-overview" aria-labelledby="project-overview">
        <div className="case-study-section-heading">
          <p className="proof-lane">Project overview</p>
          <h2 id="project-overview">
            Built to turn completed project work into enquiries.
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
          <p className="proof-lane">Customer path</p>
          <h2>From first impression to quote request.</h2>
          <p>
            Visitors can move from the company’s core services into completed
            project photography and before-and-after work, then use a clear
            quote action when they are ready to talk.
          </p>
        </article>
        <article>
          <p className="proof-lane">Enquiry detail</p>
          <h2>Useful project information captured upfront.</h2>
          <p>
            The quote form collects contact details, suburb, service type,
            timeframe, preferred contact method, and project notes so the first
            follow-up starts with useful context.
          </p>
        </article>
        <article>
          <p className="proof-lane">Contact options</p>
          <h2>Direct routes for customers who are ready now.</h2>
          <p>
            Phone, email, and quote actions remain visible across the site so a
            customer can choose the contact path that suits them.
          </p>
        </article>
      </section>

      <section className="case-study-final">
        <div>
          <p className="proof-lane">Live project</p>
          <h2>See the website in use.</h2>
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
            Contact SM Systems
          </ProjectEnquiryTrigger>
        </div>
      </section>
    </article>
  );
}
