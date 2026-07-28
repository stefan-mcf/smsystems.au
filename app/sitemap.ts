import type { MetadataRoute } from 'next';

const canonicalSiteUrl = 'https://smsystems.au';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${canonicalSiteUrl}/`, lastModified },
    {
      url: `${canonicalSiteUrl}/work/precision-residential-construction/`,
      lastModified,
    },
    {
      url: `${canonicalSiteUrl}/work/rfid-subscription-access-system/`,
      lastModified,
    },
    {
      url: `${canonicalSiteUrl}/work/airtable-make-opportunity-pipeline/`,
      lastModified,
    },
    {
      url: `${canonicalSiteUrl}/work/n8n-service-lead-routing/`,
      lastModified,
    },
    {
      url: `${canonicalSiteUrl}/work/hubspot-lead-to-deal-crm/`,
      lastModified,
    },
    {
      url: `${canonicalSiteUrl}/work/conversion-measurement-inbound-lead-system/`,
      lastModified,
    },
  ];
}
