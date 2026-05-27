import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaSection } from '@/components/ui/cta-section';
import { workflowDiagnosisMailto } from '@/content/site';

export const metadata: Metadata = {
  title: 'About | Stefan McFeeters & SM Systems',
  description:
    'Stefan McFeeters builds workflow automation, API integrations, dashboards, data syncs, CRM/intake routing, review-gated AI workflows, and operator tools through SM Systems.',
};

export default function AboutPage() {
  return (
    <>
      <section className="page-section split-section">
        <div className="section-intro">
          <p className="eyebrow">About Stefan</p>
          <h1>I build automation for real operations.</h1>
          <p className="section-body">
            I’m Stefan McFeeters. SM Systems is my workflow automation and integrations practice. I build reliable systems that connect
            websites, payments, dashboards, CRMs, spreadsheets, APIs, and operator tools into repeatable workflows.
          </p>
        </div>
        <div className="panel">
          <p className="eyebrow">What I build</p>
          <ul>
            <li>automation repair and hardening</li>
            <li>API and webhook integrations</li>
            <li>CRM and intake routing</li>
            <li>data cleanup, sync, and reporting flows</li>
            <li>review-gated AI workflow checkpoints</li>
            <li>operator-facing dashboards and tools</li>
          </ul>
          <p>
            <Link className="text-link" href="/work">
              View selected work
            </Link>
          </p>
        </div>
      </section>

      <CtaSection
        eyebrow="Start"
        title="Bring one workflow that matters."
        body="Send the systems involved, where the handoff breaks, and the smallest outcome that would make the work easier to trust."
        primary={{ href: workflowDiagnosisMailto, label: 'Start project' }}
        secondary={{ href: '/contact', label: 'Contact' }}
      />
    </>
  );
}
