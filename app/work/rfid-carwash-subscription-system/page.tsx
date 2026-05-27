import type { Metadata } from 'next';
import { CtaSection } from '@/components/ui/cta-section';
import { ScreenshotCarousel } from '@/components/proof/screenshot-carousel';
import { proofItems } from '@/content/proof';
import { workflowDiagnosisMailto } from '@/content/site';

export const metadata: Metadata = {
  title: 'RFID Carwash Subscription System | Case Study',
  description:
    'A cloud-connected RFID carwash subscription access system connecting customer plan selection, Stripe subscriptions, RFID tag reads, backend access decisions, and an operator dashboard.',
};

export default function RfidCarwashSubscriptionSystemPage() {
  const rfidItem = proofItems.find((item) => item.slug === 'rfid-subscription-access-system');
  const screenshots = rfidItem?.caseStudy?.screenshots ?? [];
  const proofStrip = rfidItem?.caseStudy?.proofStrip ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'RFID carwash subscription access system',
    creator: { '@type': 'Person', name: 'Stefan McFeeters' },
    about: [
      'RFID access control',
      'Stripe subscriptions',
      'operator dashboard',
      'AWS backend',
      'Postgres event tracking',
      'edge-to-cloud workflow integration',
    ],
    description:
      'A cloud-connected carwash subscription access system connecting customer plan selection, Stripe subscriptions, RFID tag reads, backend access decisions, and an operator dashboard.',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-section split-section">
        <div className="section-intro">
          <p className="eyebrow">Case study</p>
          <h1>RFID carwash subscription access system</h1>
          <p className="section-body">
            A deployed operator workflow across customer plan selection, Stripe subscriptions, RFID tag reads, backend access decisions, and an operator dashboard.
          </p>
        </div>
        <div className="panel">
          <p className="eyebrow">Problem</p>
          <p>
            Carwash subscription access needs to connect customer plans, payments, vehicle/tag identity, onsite reads, and operator decisions without creating a brittle manual bypass path.
          </p>
        </div>
      </section>

      <section className="page-section split-section" data-reveal>
        <div className="panel">
          <p className="eyebrow">Built</p>
          <ul>
            <li>subscription website</li>
            <li>Stripe checkout + subscriptions</li>
            <li>customer signup/account state</li>
            <li>RFID tag assignment</li>
            <li>ASP.NET Core API</li>
            <li>AWS runtime</li>
            <li>Postgres persistence</li>
            <li>operator dashboard</li>
          </ul>
        </div>
        <div className="panel">
          <p className="eyebrow">Operational flow</p>
          <ol>
            <li>Customer chooses plan → subscription created</li>
            <li>Operator assigns RFID tag to the account</li>
            <li>Reader detects tag at the bay</li>
            <li>Backend checks subscription/package</li>
            <li>Dashboard shows approved/denied and tier</li>
          </ol>
        </div>
      </section>

      {screenshots.length ? (
        <section className="page-section" data-reveal>
          <div className="panel">
            <p className="eyebrow">Proof</p>
            <ScreenshotCarousel screenshots={screenshots} />
          </div>
        </section>
      ) : null}

      <section className="page-section split-section" data-reveal>
        <div className="panel">
          <p className="eyebrow">Proof strip</p>
          {proofStrip.length ? (
            <div className="proof-proof-strip">
              {proofStrip.map((proof) => (
                <article key={proof.label}>
                  <span>{proof.label}</span>
                  <strong>{proof.title}</strong>
                  <p>{proof.body}</p>
                </article>
              ))}
            </div>
          ) : (
            <p>See the work index for screenshots and system shape.</p>
          )}
        </div>
        <div className="panel">
          <p className="eyebrow">Boundary</p>
          <p>This is a deployed client system, not a generic packaged SaaS product.</p>
          {rfidItem ? <p>{rfidItem.boundary}</p> : null}
        </div>
      </section>

      <CtaSection
        eyebrow="Contact"
        title="Need an edge-to-cloud workflow like this?"
        body="Send the systems involved, the current failure mode, and the smallest useful milestone you want proved first."
        primary={{ href: workflowDiagnosisMailto, label: 'Start project' }}
        secondary={{ href: '/work', label: 'Back to work' }}
      />
    </>
  );
}
