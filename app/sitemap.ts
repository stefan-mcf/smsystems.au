import type { MetadataRoute } from 'next';

const canonicalSiteUrl = 'https://smsystems.au';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${canonicalSiteUrl}/`, lastModified },
    { url: `${canonicalSiteUrl}/about`, lastModified },
    { url: `${canonicalSiteUrl}/services`, lastModified },
    { url: `${canonicalSiteUrl}/work`, lastModified },
    { url: `${canonicalSiteUrl}/work/rfid-carwash-subscription-system`, lastModified },
    { url: `${canonicalSiteUrl}/contact`, lastModified },
  ];
}
