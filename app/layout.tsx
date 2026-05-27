import './globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { contactLinks, siteMeta } from '@/content/site';

const canonicalSiteUrl = 'https://smsystems.au';

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  metadataBase: new URL(canonicalSiteUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SM Systems',
      url: canonicalSiteUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Stefan McFeeters',
      url: canonicalSiteUrl,
      sameAs: [contactLinks.linkedin, contactLinks.github, contactLinks.upwork],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'SM Systems',
      url: canonicalSiteUrl,
      description:
        'SM Systems builds reliable workflow automation, lead leakage audits, API integrations, dashboards, data syncs, CRM/intake routing, review-gated AI workflows, and operator tools for businesses, operators, and technical teams.',
      areaServed: 'Australia',
      founder: {
        '@type': 'Person',
        name: 'Stefan McFeeters',
        url: canonicalSiteUrl,
      },
      serviceType: [
        'Lead leakage audit and fix sprint',
        'Automation repair',
        'API and webhook integration',
        'Dashboard development',
        'Data cleanup and sync',
        'CRM and intake routing',
        'Review-gated AI workflow setup',
        'Website and SEO fix sprint',
        'Paid traffic readiness review',
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
        <ScrollReveal />
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
      </body>
    </html>
  );
}
