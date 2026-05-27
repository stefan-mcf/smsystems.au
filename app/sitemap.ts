import type { MetadataRoute } from 'next';

const canonicalSiteUrl = 'https://smsystems.au';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${canonicalSiteUrl}/`, lastModified },
  ];
}
