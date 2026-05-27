import type { MetadataRoute } from 'next';

const canonicalSiteUrl = 'https://smsystems.au';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${canonicalSiteUrl}/sitemap.xml`,
  };
}
