import { Hero } from '@/components/home/hero';
import { AboutSection } from '@/components/home/about-section';
import { ProofGrid } from '@/components/proof/proof-grid';
import { SectionIntro } from '@/components/ui/section-intro';
import { CtaSection } from '@/components/ui/cta-section';
import { proofItems } from '@/content/proof';
import { siteMeta } from '@/content/site';

export default function HomePage() {
  const featuredProof = proofItems.filter((item) => item.featured && !item.anchorClient);
  const rfidProof = proofItems.find((item) => item.anchorClient);

  return (
    <>
      <Hero />

      <section className="page-section home-proof-section" id="work" data-reveal>
        <div className="home-proof-shell">
          <SectionIntro
            eyebrow="Selected work"
            title="Systems and tools I’ve built."
            body="Examples of workflow automation, integrations, data syncs, operator tools, and review-gated systems showing the tool, the data path, and the result."
          />
        </div>
        {rfidProof ? (
          <div className="home-anchor-work" data-reveal>
            <p className="work-group-heading">Deployed Systems</p>
            <ProofGrid items={[rfidProof]} />
          </div>
        ) : null}
        <div className="home-tool-work" data-reveal>
          <p className="work-group-heading">Technical Tools</p>
          <ProofGrid items={featuredProof} />
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
          primary={siteMeta.finalCta.primary}
        />
      </div>
    </>
  );
}
