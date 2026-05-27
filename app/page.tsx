import { Hero } from '@/components/home/hero';
import { AboutSection } from '@/components/home/about-section';
import { ProcessSection } from '@/components/home/process-section';
import { FitSection } from '@/components/home/fit-section';
import { ProofGrid } from '@/components/proof/proof-grid';
import { ServiceCard } from '@/components/services/service-card';
import { SectionIntro } from '@/components/ui/section-intro';
import { CtaSection } from '@/components/ui/cta-section';
import { proofItems } from '@/content/proof';
import { serviceItems } from '@/content/services';
import { siteMeta } from '@/content/site';

export default function HomePage() {
  const featuredProof = proofItems.filter((item) => item.featured && !item.anchorClient);
  const rfidProof = proofItems.find((item) => item.anchorClient);
  const featuredServices = serviceItems.slice(0, 4);
  const featuredServiceColumns = [0, 1].map((column) => featuredServices.filter((_, index) => index % 2 === column));

  return (
    <>
      <Hero />

      <section className="page-section home-proof-section" id="portfolio" data-reveal>
        <div className="home-proof-shell">
          <SectionIntro
            eyebrow="Selected work"
            title="Real systems I’ve built and repaired."
            body="Public examples of automation repair, lead leakage audits, workflow integration, and operator tools showing the problem, the fix, and the handoff."
          />
        </div>
        {rfidProof ? (
          <div className="home-anchor-work" data-reveal>
            <ProofGrid items={[rfidProof]} />
          </div>
        ) : null}
        <div data-reveal>
          <ProofGrid items={featuredProof} />
        </div>
        <div className="workflow-line workflow-line-section" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <AboutSection />

      <section className="page-section service-section" id="services" data-reveal>
        <SectionIntro
          eyebrow="Service lanes"
          title="Start with one workflow that matters."
          body="Most useful projects start with a narrow path: audit where work or leads leak, make the first path reliable, then decide what deserves a larger build."
        />
        <div className="service-grid service-grid-featured">
          {featuredServiceColumns.map((columnItems, columnIndex) => (
            <div className="service-column" key={columnIndex}>
              {columnItems.map((item) => (
                <ServiceCard key={item.slug} item={item} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <FitSection />

      <ProcessSection />

      <div className="page-divider" aria-hidden="true" />

      <div id="contact" data-reveal>
        <CtaSection
          eyebrow="Contact"
          title={siteMeta.finalCta.title}
          primary={siteMeta.finalCta.primary}
          secondary={siteMeta.finalCta.secondary}
        />
      </div>
    </>
  );
}
