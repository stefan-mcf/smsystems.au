import Link from 'next/link';
import { createPageMetadata } from '@/content/metadata';

export const metadata = createPageMetadata({
  title: 'Privacy and enquiries | SM Systems',
  description: 'How SM Systems handles website enquiries, project information and optional analytics.',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <article className="case-study-page" data-reveal>
      <header className="case-study-hero">
        <p className="eyebrow">Privacy · Updated 5 September 2026</p>
        <h1 className="case-study-title-wide">Your information and enquiries.</h1>
        <p className="case-study-lede">
          SM Systems is operated by Stefan McFeeters. This page explains how I handle
          information from this website and people enquiring about my work.
        </p>
        <Link className="text-link case-study-back" href="/">Back to home</Link>
      </header>

      <section className="case-study-content-grid" aria-label="Privacy information">
        <article>
          <h2>What an enquiry includes</h2>
          <p>
            The form asks for an email address and a description of the work you need.
            You can also provide your name, business or website, and timeframe.
            Please leave out passwords, payment details and confidential customer records.
            If a project needs sensitive material, we can agree a suitable way to share it.
          </p>
          <p>
            An enquiry also includes a unique submission reference, the page where your
            visit began and any campaign source attached to that link. This source information
            is remembered within your browser tab so it stays with your enquiry as you browse.
          </p>
        </article>
        <article>
          <h2>How I use it</h2>
          <p>
            I use your details to read and respond to your request, assess the scope,
            prepare a proposal and manage work we agree. Submitting this form does not
            subscribe you to a newsletter or an automated marketing sequence.
          </p>
          <p>
            Enquiry and project correspondence is kept while it is needed to manage the
            relationship and relevant business records. You can contact me to ask what
            information is held, request a correction or ask for information to be removed.
            Some records may need to be retained for accounting, legal or dispute purposes.
          </p>
        </article>
        <article>
          <h2>Services that handle the information</h2>
          <p>
            HubSpot receives form submissions and stores contact and enquiry details.
            The enquiry workflow uses Make and Airtable for review and follow-up tracking.
            Business email and form notifications are handled through Google Workspace.
            These providers may process information outside Australia, depending on their
            infrastructure and service arrangements.
          </p>
          <p>
            GitHub Pages hosts this website. The embedded form also uses Google reCAPTCHA
            to reduce spam. Hosting, form and security providers receive technical information,
            such as IP addresses and browser details, needed to deliver and protect their services.
          </p>
        </article>
        <article>
          <h2>Optional analytics</h2>
          <p>
            If you allow analytics, Google Tag Manager and Google Analytics help measure
            page visits, work-sample links and enquiry actions. The website measurement code
            does not send form answers, names, business names or email addresses to Analytics.
            Advertising storage and advertising personalisation are kept disabled.
          </p>
          <p>
            Your choice is remembered in this browser. Use the Analytics preferences button
            to change it. Declining analytics does not stop you browsing the site or making an enquiry.
          </p>
        </article>
        <article>
          <h2>Contact and questions</h2>
          <p>
            Email <a href="mailto:stefan@smsystems.au">stefan@smsystems.au</a> with a
            privacy question, correction request or concern. Include enough detail for me
            to identify the relevant enquiry without sending sensitive documents by default.
          </p>
        </article>
      </section>
    </article>
  );
}
