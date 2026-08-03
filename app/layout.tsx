import './globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ImageLightboxProvider } from '@/components/ui/image-lightbox';
import { Measurement } from '@/components/analytics/measurement';
import { ProjectEnquiryProvider } from '@/components/contact/project-enquiry-dialog';
import { contactLinks, siteMeta } from '@/content/site';
import { RouteScrollReset } from '@/components/ui/route-scroll-reset';

const canonicalSiteUrl = 'https://smsystems.au';

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  metadataBase: new URL(canonicalSiteUrl),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '64x64', type: 'image/x-icon' },
      { url: '/brand/sm-systems-logo-mark.png', sizes: '720x720', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${canonicalSiteUrl}/#website`,
      name: 'SM Systems',
      url: canonicalSiteUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${canonicalSiteUrl}/#stefan-mcfeeters`,
      name: 'Stefan McFeeters',
      url: canonicalSiteUrl,
      sameAs: [contactLinks.linkedin, contactLinks.github, contactLinks.upwork],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${canonicalSiteUrl}/#business`,
      name: 'SM Systems',
      url: canonicalSiteUrl,
      logo: `${canonicalSiteUrl}/brand/sm-systems-logo-mark.png`,
      description:
        'SM Systems builds workflow automation, API integrations, dashboards, data syncs, CRM/intake routing, review-gated AI workflows, and operator tools for businesses, operators, and technical teams.',
      areaServed: 'Australia',
      founder: {
        '@id': `${canonicalSiteUrl}/#stefan-mcfeeters`,
      },
      serviceType: [
        'Business website development',
        'Quote and enquiry system development',
        'Workflow automation build',
        'API and webhook integration',
        'Dashboard development',
        'Data cleanup and sync',
        'CRM and intake routing',
        'Review-gated AI workflow setup',
        'Operator tools',
        'Edge-to-cloud workflow integration',
      ],
      sameAs: [contactLinks.github, contactLinks.linkedin, contactLinks.upwork],
    },
  ];

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ProjectEnquiryProvider>
          <ImageLightboxProvider>
            <Measurement />
            <ScrollReveal />
            <RouteScrollReset />
            <div className="wire-field" aria-hidden="true">
              <span className="wire-pulse wire-pulse-one" />
              <span className="wire-pulse wire-pulse-two" />
              <span className="wire-pulse wire-pulse-three" />
              <span className="wire-pulse wire-pulse-four" />
              <span className="wire-pulse wire-pulse-five" />
              <span className="wire-pulse wire-pulse-six" />
              <span className="wire-pulse wire-pulse-seven" />
              <span className="wire-pulse wire-pulse-eight" />
              <span className="wire-pulse wire-pulse-nine" />
              <span className="wire-pulse wire-pulse-ten" />
              <span className="wire-pulse wire-pulse-eleven" />
              <span className="wire-pulse wire-pulse-twelve" />
              <span className="wire-pulse wire-pulse-thirteen" />
              <span className="wire-pulse wire-pulse-fourteen" />
              <span className="wire-pulse wire-pulse-fifteen" />
              <span className="circuit-light circuit-light-one" />
              <span className="circuit-light circuit-light-two" />
              <span className="circuit-light circuit-light-three" />
              <span className="circuit-light circuit-light-four" />
              <span className="circuit-light circuit-light-five" />
            </div>
            <SiteHeader />
            <main className="container site-main">{children}</main>
            <SiteFooter />
          </ImageLightboxProvider>
        </ProjectEnquiryProvider>
      </body>
    </html>
  );
}
