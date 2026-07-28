'use client';

import { useEffect, useState } from 'react';
import { measurementConfig } from '@/lib/measurement-config';

declare global {
  interface Window {
    dataLayer?: unknown[];
    __smAnalyticsConsent?: 'granted' | 'denied';
    __smMeasuredSubmissionIds?: Set<string>;
  }
}

const CONSENT_KEY = 'sm_analytics_consent_v1';

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

function sanitizedPagePath() {
  return window.location.pathname || '/';
}

export function pushMeasurementEvent(
  event: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (window.__smAnalyticsConsent !== 'granted') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    event_version: measurementConfig.version,
    page_path: sanitizedPagePath(),
    ...parameters,
  });
}

function pushPageView() {
  pushMeasurementEvent('page_view', {
    page_title: document.title,
  });
}

export function Measurement() {
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
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
    loadGtm();

    const savedChoice = window.localStorage.getItem(CONSENT_KEY);
    if (savedChoice === 'granted' || savedChoice === 'denied') {
      window.__smAnalyticsConsent = savedChoice;
      setChoice(savedChoice);
      gtag('consent', 'update', {
        analytics_storage: savedChoice,
      });
      if (savedChoice === 'granted') {
        pushPageView();
      }
      return;
    }

    window.__smAnalyticsConsent = 'denied';
    setShowBanner(true);
  }, []);

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
    window.localStorage.setItem(CONSENT_KEY, nextChoice);
    window.__smAnalyticsConsent = nextChoice;
    setChoice(nextChoice);
    setShowBanner(false);
    gtag('consent', 'update', {
      analytics_storage: nextChoice,
    });
    if (nextChoice === 'granted') {
      pushPageView();
    }
  };

  return (
    <>
      {showBanner ? (
        <aside className="consent-banner" aria-label="Analytics preference">
          <div>
            <strong>Optional analytics</strong>
            <p>
              Allowing analytics helps verify whether important site actions work. Declining keeps
              analytics storage denied. This is a technical preference control, not a legal
              compliance statement.
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
      {choice ? (
        <button
          className="consent-reopen"
          type="button"
          onClick={() => setShowBanner((visible) => !visible)}
        >
          Analytics preference: {choice}
        </button>
      ) : null}
    </>
  );
}
