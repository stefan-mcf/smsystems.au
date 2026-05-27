import type { Metadata } from 'next';
import { ServiceCard } from '@/components/services/service-card';
import { SectionIntro } from '@/components/ui/section-intro';
import { CtaSection } from '@/components/ui/cta-section';
import { siteMeta } from '@/content/site';
import { serviceItems } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services | Workflow Automation & Integrations',
  description:
    'Bounded service lanes for lead leakage audits, automation repair, API and webhook integrations, data syncs, CRM intake routing, and review-gated workflow tools.',
};

export default function ServicesPage() {
  const serviceColumns = [0, 1].map((column) => serviceItems.filter((_, index) => index % 2 === column));

  return (
    <>
      <section className="page-section split-section">
        <SectionIntro
          eyebrow="Services"
          title="Small, bounded service lanes for teams that need leaks found, workflows fixed, systems connected, or operations made easier to trust."
          body="Each lane starts with evidence: where leads leak, where the workflow breaks, what should be fixed first, and how to prove the handoff is better."
        />
        <div className="panel service-note">
          <p className="eyebrow">Default posture</p>
          <p>Start with failure modes, scope edges, and the smallest milestone that makes the system easier to trust.</p>
        </div>
      </section>

      <section className="service-grid page-section">
        {serviceColumns.map((columnItems, columnIndex) => (
          <div className="service-column" key={columnIndex}>
            {columnItems.map((item) => (
              <ServiceCard key={item.slug} item={item} />
            ))}
          </div>
        ))}
      </section>

      <section className="page-section services-process-brief" data-reveal>
        <div className="panel process-brief-panel">
          <p className="eyebrow">After contact</p>
          <h2>{siteMeta.process.title}</h2>
          <div className="process-brief-list">
            {siteMeta.process.steps.map((step) => (
              <article key={step.label}>
                <strong>{step.label}</strong>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Contact"
        title="Start with the workflow shape."
        body="A good first engagement begins with a concrete failure mode, a constrained milestone, and a clear evidence path."
        primary={{ href: '/contact', label: 'Start project' }}
        secondary={{ href: '/work', label: 'View work' }}
      />
    </>
  );
}
