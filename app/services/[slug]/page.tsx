import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectEnquiryTrigger } from '@/components/contact/project-enquiry-dialog';
import { ZoomableImage } from '@/components/ui/image-lightbox';
import { createPageMetadata } from '@/content/metadata';
import { getService, serviceItems } from '@/content/services';

const canonicalSiteUrl = 'https://smsystems.au';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceItems.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  const primaryProof = service.proof[0];

  return createPageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
    image: {
      url: primaryProof.image.src,
      width: primaryProof.image.width,
      height: primaryProof.image.height,
      alt: primaryProof.image.alt,
    },
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const serviceUrl = `${canonicalSiteUrl}/services/${service.slug}/`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${serviceUrl}#webpage`,
      url: serviceUrl,
      name: service.metaTitle,
      description: service.metaDescription,
      isPartOf: {
        '@id': `${canonicalSiteUrl}/#website`,
      },
      about: {
        '@id': `${serviceUrl}#service`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${serviceUrl}#service`,
      url: serviceUrl,
      name: service.name,
      description: service.description,
      serviceType: service.name,
      areaServed: {
        '@type': 'Country',
        name: 'Australia',
      },
      provider: {
        '@id': `${canonicalSiteUrl}/#business`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${canonicalSiteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${canonicalSiteUrl}/#services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.name,
          item: serviceUrl,
        },
      ],
    },
  ];

  return (
    <article className="case-study-page service-page" data-reveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="case-study-hero service-page-hero">
        <p className="eyebrow">Service</p>
        <h1 className="case-study-title-wide">{service.name}</h1>
        <p className="case-study-lede">{service.description}</p>
        <div className="case-study-actions">
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your project
          </ProjectEnquiryTrigger>
          <Link className="button button-secondary" href="/#work">
            View related work
          </Link>
        </div>
        <Link className="text-link case-study-back" href="/#services">
          Back to services
        </Link>
      </header>

      <section className="case-study-overview" aria-labelledby="service-fit">
        <div className="case-study-section-heading">
          <p className="proof-lane">Good fit</p>
          <h2 id="service-fit">{service.fitTitle}</h2>
          <p>{service.fit}</p>
        </div>
        <div className="service-page-signal-list">
          {service.signals.map((signal) => (
            <p key={signal}>{signal}</p>
          ))}
        </div>
      </section>

      <section
        className="case-study-content-grid"
        aria-label={`What ${service.name.toLowerCase()} can include`}
      >
        {service.capabilities.map((capability) => (
          <article key={capability.title}>
            <p className="proof-lane">{capability.label}</p>
            <h2>{capability.title}</h2>
            <p>{capability.body}</p>
          </article>
        ))}
      </section>

      <section className="service-page-process" aria-labelledby="service-process">
        <div className="case-study-section-heading">
          <p className="proof-lane">Working approach</p>
          <h2 id="service-process">Start with one path that matters.</h2>
          <p>
            Scope stays tied to a concrete outcome, a visible test, and a handoff
            that can be operated after the build.
          </p>
        </div>
        <ol>
          {service.process.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="case-study-gallery service-page-proof"
        aria-labelledby="related-proof"
      >
        <div className="case-study-section-heading">
          <p className="proof-lane">Related work</p>
          <h2 id="related-proof">See the service through completed builds.</h2>
          <p>
            These project pages show the implementation, operating decisions,
            and evidence behind related work.
          </p>
        </div>
        <div className="case-study-shot-list service-proof-list">
          {service.proof.map((proof) => (
            <article
              className="case-study-shot service-proof-card"
              key={proof.href}
            >
              <span className="case-study-shot-media">
                <ZoomableImage
                  src={proof.image.src}
                  alt={proof.image.alt}
                  width={proof.image.width}
                  height={proof.image.height}
                  loading="lazy"
                />
              </span>
              <Link className="service-proof-caption" href={proof.href}>
                <strong>{proof.title}</strong>
                <span>{proof.description}</span>
                <span className="text-link">View case study</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {service.slug === 'workflow-automation-integrations' ||
      service.slug === 'crm-lead-routing-operational-systems' ? (
        <section className="case-study-final service-guide-callout">
          <div>
            <p className="proof-lane">Practical guide</p>
            <h2>What should a small business automate first?</h2>
            <p>
              Use a five-step framework to choose a useful first workflow,
              define its controls, keep human review, and verify the handoff.
            </p>
          </div>
          <div className="case-study-actions">
            <Link
              className="button button-secondary"
              href="/guides/workflow-automation-for-small-business/"
            >
              Read the guide
            </Link>
          </div>
        </section>
      ) : null}

      <section className="case-study-final">
        <div>
          <p className="proof-lane">Start a project</p>
          <h2>Bring the current system and the outcome you need.</h2>
          <p>
            Send what exists now, where the path is breaking or unclear, and the
            result the business needs.
          </p>
        </div>
        <div className="case-study-actions">
          <ProjectEnquiryTrigger className="button button-primary">
            Discuss your project
          </ProjectEnquiryTrigger>
        </div>
      </section>
    </article>
  );
}
