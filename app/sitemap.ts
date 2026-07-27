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
  ];
}
