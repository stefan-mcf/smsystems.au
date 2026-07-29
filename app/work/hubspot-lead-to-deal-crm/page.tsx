import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'HubSpot CRM Implementation | Stefan McFeeters',
  description:
    'The HubSpot CRM implementation is now documented within the complete conversion measurement and inbound lead system.',
  alternates: {
    canonical: '/work/conversion-measurement-inbound-lead-system/',
  },
  robots: { index: false, follow: true },
};

export default function HubSpotLeadToDealCrmPage() {
  return (
    <article className="project-redirect-page" data-reveal>
      <p className="project-kicker">Project update</p>
      <h1>The HubSpot implementation is part of a larger lead system.</h1>
      <p>
        The pipeline, connected contact and deal records, deduplication key, and
        qualification gate now sit inside the full conversion measurement and
        inbound lead case study.
      </p>
      <Link
        className="button button-primary"
        href="/work/conversion-measurement-inbound-lead-system/"
      >
        Read the complete project
      </Link>
    </article>
  );
}
