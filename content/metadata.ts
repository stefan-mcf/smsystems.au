import type { Metadata } from 'next';

const siteName = 'SM Systems';

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

const defaultImage = {
  url: '/sm-systems-social-card.png',
  width: 1200,
  height: 630,
  alt: 'SM Systems workflow automation and connected systems',
};

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultImage,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: 'en_AU',
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: image.url,
          alt: image.alt,
        },
      ],
    },
  };
}
