import Link from 'next/link';
import { createPageMetadata } from '@/content/metadata';

export const metadata = createPageMetadata({
  title: 'HubSpot CRM pipeline and record controls | SM Systems',
  description: 'The HubSpot to Zendesk handoff is included in the CRM pipeline case study.',
  path: '/work/hubspot-lead-to-deal-crm/',
});

export default function HubspotZendeskCustomerHandoffPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/work/hubspot-lead-to-deal-crm/" />
      <section className="case-study-page">
        <h1>This case study has moved.</h1>
        <p>
          <Link href="/work/hubspot-lead-to-deal-crm/">
            View the HubSpot CRM pipeline and customer handoff case study.
          </Link>
        </p>
      </section>
    </>
  );
}
