import type { Metadata } from 'next';
import { ProofGrid } from '@/components/proof/proof-grid';
import { CtaSection } from '@/components/ui/cta-section';
import { SectionIntro } from '@/components/ui/section-intro';
import { proofItems } from '@/content/proof';
import { workflowDiagnosisMailto } from '@/content/site';

export const metadata: Metadata = {
  title: 'Work | Selected Systems and Case Studies',
  description: 'Selected lead leakage audit, workflow automation, integration, data sync, review-gated AI, and operator-facing systems work from SM Systems.',
};

export default function WorkPage() {
  const rfidItem = proofItems.find((item) => item.anchorClient);
  const generalProof = proofItems.filter((item) => !item.anchorClient);

  return (
    <>
      <section className="page-section split-section">
        <SectionIntro
          eyebrow="Work"
          title="Selected systems and case studies."
          body="Proof-backed lead leakage audits, workflow automation, integrations, data sync, review-gated AI checkpoints, and operator-facing systems."
        />
        <div className="panel proof-philosophy">
          <p className="eyebrow">Reading guide</p>
          <p>Each entry is designed to show workflow shape, implementation quality, and delivery boundary.</p>
        </div>
      </section>

      {rfidItem ? (
        <section className="page-section">
          <ProofGrid items={[rfidItem]} />
        </section>
      ) : null}

      <section className="page-section">
        <ProofGrid items={generalProof} />
      </section>

      <CtaSection
        eyebrow="Next step"
        title="Bring the rough workflow.\nI’ll help make it reliable."
        body="Send the systems involved, the current failure mode, and what “working” should look like."
        primary={{ href: workflowDiagnosisMailto, label: 'Start project' }}
        secondary={{ href: '/services', label: 'See services' }}
      />
    </>
  );
}
