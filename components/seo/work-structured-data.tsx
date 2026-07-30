const canonicalSiteUrl = 'https://smsystems.au';

type WorkStructuredDataProps = {
  title: string;
  description: string;
  path: string;
  image: string;
};

export function WorkStructuredData({
  title,
  description,
  path,
  image,
}: WorkStructuredDataProps) {
  const url = `${canonicalSiteUrl}${path}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: {
        '@id': `${canonicalSiteUrl}/#website`,
      },
      mainEntity: {
        '@id': `${url}#project`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${url}#project`,
      url,
      name: title,
      description,
      image: `${canonicalSiteUrl}${image}`,
      creator: {
        '@id': `${canonicalSiteUrl}/#stefan-mcfeeters`,
      },
      publisher: {
        '@id': `${canonicalSiteUrl}/#business`,
      },
      mainEntityOfPage: {
        '@id': `${url}#webpage`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${canonicalSiteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Work',
          item: `${canonicalSiteUrl}/#work`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: url,
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
