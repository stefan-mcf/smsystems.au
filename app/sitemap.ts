import type { MetadataRoute } from 'next';

const canonicalSiteUrl = 'https://smsystems.au';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = '2026-09-05';

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
      url: `${canonicalSiteUrl}/guides/workflow-automation-for-small-business/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${canonicalSiteUrl}/work/zendesk-ai-support-copilot/`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${canonicalSiteUrl}/work/precision-residential-construction/`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/rfid-subscription-access-system/`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/airtable-make-opportunity-pipeline/`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/n8n-service-lead-routing/`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/hubspot-lead-to-deal-crm/`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/work/conversion-measurement-inbound-lead-system/`,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${canonicalSiteUrl}/privacy/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
