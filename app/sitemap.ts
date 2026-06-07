import type { MetadataRoute } from 'next';

const canonicalSiteUrl = 'https://smsystems.au';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${canonicalSiteUrl}/`, lastModified },
  ];
}
