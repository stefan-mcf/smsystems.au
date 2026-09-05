import { Hero } from '@/components/home/hero';
import { AboutSection } from '@/components/home/about-section';
import { ProofGrid } from '@/components/proof/proof-grid';
import { ServiceCard } from '@/components/services/service-card';
import { SectionIntro } from '@/components/ui/section-intro';
import { CtaSection } from '@/components/ui/cta-section';
import { createPageMetadata } from '@/content/metadata';
import { proofItems } from '@/content/proof';
import { serviceItems } from '@/content/services';
import { siteMeta } from '@/content/site';
import Link from 'next/link';

const canonicalSiteUrl = 'https://smsystems.au';

export const metadata = createPageMetadata({
  title: siteMeta.title,
  description: siteMeta.description,
  path: '/',
});

export default function HomePage() {
  const technicalTools = proofItems.filter((item) => item.technicalTool);
  const clientProof = proofItems.filter((item) => item.anchorClient);
  const featuredBuild = proofItems.filter((item) => item.featuredBuild);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${canonicalSiteUrl}/#webpage`,
            url: `${canonicalSiteUrl}/`,
            name: siteMeta.title,
            description: siteMeta.description,
            isPartOf: {
              '@id': `${canonicalSiteUrl}/#website`,
            },
            about: {
              '@id': `${canonicalSiteUrl}/#business`,
            },
          }),
        }}
      />

      <Hero />

      <section className="page-section service-section" id="services" data-reveal>
        <SectionIntro
          eyebrow="Services"
          title="Services for websites, workflows, and operations."
        />
        <div className="service-grid service-grid-featured">
          {serviceItems.map((service) => (
            <ServiceCard item={service} key={service.slug} />
          ))}
        </div>
        <div className="service-guide-link">
          <div className="service-guide-copy">
            <h3>Not sure where to begin?</h3>
            <p>Use the five-step framework to choose the first workflow worth automating.</p>
          </div>
          <Link
            className="text-link"
            href="/guides/workflow-automation-for-small-business/"
          >
            See what to automate first
          </Link>
        </div>
      </section>

      <section className="page-section home-proof-section" id="work" data-reveal>
        <div className="home-proof-shell">
          <SectionIntro
            eyebrow="Selected work"
            title="Systems and tools I’ve built."
          />
        </div>
        {clientProof.length ? (
          <div className="home-anchor-work" data-reveal>
            <p className="work-group-heading">Client projects</p>
            <ProofGrid items={clientProof} />
          </div>
        ) : null}
        {featuredBuild.length ? (
          <div className="home-anchor-work" data-reveal>
            <p className="work-group-heading">Featured builds</p>
            <ProofGrid items={featuredBuild} />
          </div>
        ) : null}
        <div
          aria-labelledby="technical-tools-heading"
          className="home-tool-work"
          data-reveal
        >
          <h3 className="work-group-heading" id="technical-tools-heading">
            Technical tools
          </h3>
          <ProofGrid items={technicalTools} />
        </div>
        <div className="workflow-line workflow-line-section" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <AboutSection />

      <div className="page-divider" aria-hidden="true" />

      <div className="final-contact-section" id="contact" data-reveal>
        <CtaSection
          eyebrow="Contact"
          title={siteMeta.finalCta.title}
          body={siteMeta.finalCta.body}
          primary={siteMeta.finalCta.primary}
          secondary={siteMeta.finalCta.secondary}
        />
      </div>
    </>
  );
}
