'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { measurementConfig } from '@/lib/measurement-config';
import { getEnquiryAttribution } from '@/lib/enquiry-attribution';

declare global {
  interface Window {
    dataLayer?: unknown[];
    __smAnalyticsConsent?: 'granted' | 'denied';
    __smMeasuredSubmissionIds?: Set<string>;
  }
}

const CONSENT_KEY = 'sm_analytics_consent_v1';
const EVENT_PARAMETERS: Record<string, readonly string[]> = {
  page_view: ['page_title'],
  view_case_study: ['case_study_path', 'interaction'],
  click_email: ['link_location'],
  click_upwork_profile: ['link_location'],
  click_external_portfolio: ['link_domain'],
  open_project_enquiry: ['form_name'],
  form_start: ['form_name', 'submission_id'],
  generate_lead: ['form_name', 'submission_id'],
};

function gtag(
  command: 'consent',
  action: 'default' | 'update',
  parameters: Record<string, string | number>,
) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function loadGtm() {
  if (!measurementConfig.gtmId || document.querySelector('script[data-sm-gtm]')) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(pageContext());
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  });

  const script = document.createElement('script');
  script.async = true;
  script.dataset.smGtm = measurementConfig.gtmId;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(
    measurementConfig.gtmId,
  )}`;
  document.head.appendChild(script);
}

function pageContext() {
  let referrer = '';
  try {
    referrer = document.referrer ? new URL(document.referrer).origin : '';
  } catch {
    // Ignore an invalid referrer instead of copying it into analytics.
  }
  return {
    page_path: window.location.pathname || '/',
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: referrer,
    page_title: document.title,
    traffic_type: window.location.hostname === 'localhost' ||
      getEnquiryAttribution().marker === 'synthetic-commissioning' ? 'internal' : 'external',
  };
}

export function pushMeasurementEvent(
  event: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (window.__smAnalyticsConsent !== 'granted' || !Object.hasOwn(EVENT_PARAMETERS, event)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    event_version: measurementConfig.version,
    ...pageContext(),
    // Clear prior event details so GTM cannot reuse a previous submission or link.
    submission_id: null,
    form_name: null,
    case_study_path: null,
    interaction: null,
    link_location: null,
    link_domain: null,
    ...Object.fromEntries(
      Object.entries(parameters).filter(([key]) => EVENT_PARAMETERS[event].includes(key)),
    ),
  });
}

function pushPageView() {
  pushMeasurementEvent('page_view', {
    page_title: document.title,
  });
}

export function Measurement() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    getEnquiryAttribution();
    window.dataLayer = window.dataLayer || [];
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500,
    });
    let savedChoice: string | null = null;
    try {
      savedChoice = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      // Analytics stays optional when browser storage is unavailable.
    }
    if (savedChoice === 'granted' || savedChoice === 'denied') {
      window.__smAnalyticsConsent = savedChoice;
      setChoice(savedChoice);
      gtag('consent', 'update', {
        analytics_storage: savedChoice,
      });
      if (savedChoice === 'granted') {
        loadGtm();
      }
      return;
    }

    window.__smAnalyticsConsent = 'denied';
    setShowBanner(true);
  }, []);

  useEffect(() => {
    if (choice === 'granted') {
      pushPageView();
    }
  }, [pathname, choice]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest('a');
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      const href = link.href;
      if (href.startsWith('mailto:')) {
        pushMeasurementEvent('click_email', { link_location: 'site' });
        return;
      }

      if (href.includes('upwork.com/')) {
        pushMeasurementEvent('click_upwork_profile', { link_location: 'site' });
        return;
      }

      if (link.origin !== window.location.origin && href.startsWith('http')) {
        pushMeasurementEvent('click_external_portfolio', {
          link_domain: link.hostname,
        });
        return;
      }

      if (link.pathname.startsWith('/work/')) {
        pushMeasurementEvent('view_case_study', {
          case_study_path: link.pathname,
        });
      }
    };

    const handleToggle = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement) || !target.open) {
        return;
      }

      const caseStudyLink = target.querySelector('a[href^="/work/"]');
      if (caseStudyLink) {
        pushMeasurementEvent('view_case_study', {
          case_study_path: caseStudyLink.getAttribute('href') || '',
          interaction: 'expand',
        });
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('toggle', handleToggle, true);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('toggle', handleToggle, true);
    };
  }, []);

  const setConsent = (nextChoice: 'granted' | 'denied') => {
    try {
      window.localStorage.setItem(CONSENT_KEY, nextChoice);
    } catch {
      // Keep the choice for this page even if it cannot be remembered.
    }
    window.__smAnalyticsConsent = nextChoice;
    setChoice(nextChoice);
    setShowBanner(false);
    gtag('consent', 'update', {
      analytics_storage: nextChoice,
    });
    if (nextChoice === 'granted') {
      loadGtm();
    }
  };

  return (
    <>
      {showBanner ? (
        <aside id="analytics-preference" className="consent-banner" aria-label="Analytics preference">
          <div>
            <strong>Optional analytics</strong>
            <p>
              Allow analytics to help me understand which pages and enquiry actions are useful.
              The website and enquiry form work either way. You can change your choice at any time.
              {' '}<a href="/privacy/">Privacy information</a>
            </p>
          </div>
          <div className="consent-actions">
            <button type="button" onClick={() => setConsent('granted')}>
              Allow analytics
            </button>
            <button type="button" onClick={() => setConsent('denied')}>
              Decline
            </button>
          </div>
        </aside>
      ) : null}
      {choice !== null ? (
        <button
          className="consent-reopen"
          type="button"
          aria-expanded={showBanner}
          aria-controls="analytics-preference"
          onClick={() => setShowBanner((visible) => !visible)}
        >
          Analytics preferences
        </button>
      ) : null}
    </>
  );
}
