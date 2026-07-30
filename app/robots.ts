import type { MetadataRoute } from 'next';

const canonicalSiteUrl = 'https://smsystems.au';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    host: canonicalSiteUrl,
    sitemap: `${canonicalSiteUrl}/sitemap.xml`,
  };
}
