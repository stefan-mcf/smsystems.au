import type { MetadataRoute } from 'next';

const canonicalSiteUrl = 'https://smsystems.au';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = '2026-07-30';

  return [
    {
      url: `${canonicalSiteUrl}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${canonicalSiteUrl}/services/business-websites-quote-systems/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${canonicalSiteUrl}/services/workflow-automation-integrations/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${canonicalSiteUrl}/services/crm-lead-routing-operational-systems/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${canonicalSiteUrl}/work/precision-residential-construction/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/rfid-subscription-access-system/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/airtable-make-opportunity-pipeline/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/n8n-service-lead-routing/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/hubspot-lead-to-deal-crm/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/conversion-measurement-inbound-lead-system/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
}
