import type { Metadata } from 'next';
import { SectionIntro } from '@/components/ui/section-intro';
import { siteMeta, workflowDiagnosisMailto } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact | Start an Automation or Workflow Project',
  description:
    'Contact SM Systems with the systems involved, current failure mode, desired outcome, and constraints for an automation, integration, dashboard, or workflow project.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-section split-section">
        <SectionIntro
          eyebrow="Contact"
          title="Bring a concrete problem shape."
          body={siteMeta.contact.intro}
        />
        <div className="panel contact-note">
          <p className="eyebrow">Best first message</p>
          <p>Short problem description, systems involved, desired outcome, and constraints beats a long generic inquiry.</p>
        </div>
      </section>

      <section className="contact-layout page-section">
        <div className="panel contact-panel">
          <p className="eyebrow">Message shape</p>
          <h2>What to include</h2>
          <ul>
            {siteMeta.contact.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="button button-primary contact-primary-link" href={workflowDiagnosisMailto}>
            Start project
          </a>
        </div>

        <div className="panel contact-panel">
          <p className="eyebrow">Routes</p>
          <h2>Preferred contact routes</h2>
          <div className="contact-route-list">
            {siteMeta.contact.routes.map((route) => (
              <a className="contact-route" href={route.href} key={route.label}>
                <span>{route.label}</span>
                <strong>{route.value}</strong>
              </a>
            ))}
          </div>

          <h2>Good first message shape</h2>
          <p>
            “We have System A and System B, the current workflow is failing in this way, and we need
            this outcome under these constraints.”
          </p>
        </div>
      </section>
    </>
  );
}
