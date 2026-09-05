'use client';

import { useEffect, useRef, useState } from 'react';
import { pushMeasurementEvent } from '@/components/analytics/measurement';
import { workflowDiagnosisMailto } from '@/content/site';
import { measurementConfig } from '@/lib/measurement-config';
import { getEnquiryAttribution } from '@/lib/enquiry-attribution';

type HubSpotFormEvent = CustomEvent<{
  formId: string;
  instanceId: string;
}>;

type HubSpotFieldValue = {
  name: string;
  value: string | string[];
};

type HubSpotFormInstance = {
  getConversionId: () => string;
  getFormFieldValues: () => Promise<HubSpotFieldValue[]>;
  setFieldValue: (name: string, value: string | string[]) => void;
};

declare global {
  interface Window {
    HubSpotFormsV4?: {
      getFormFromEvent: (event: Event) => HubSpotFormInstance;
    };
  }
}

const visibleFields = new Set([
  'firstname',
  'email',
  'company',
  'sm_timeframe',
  'sm_current_problem',
]);

function newSubmissionId() {
  const uuid =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `sm-inbound-${uuid}`;
}

function setHiddenFields(form: HubSpotFormInstance, submissionId: string) {
  const attribution = getEnquiryAttribution();

  const hiddenValues: Record<string, string> = {
    '0-1/sm_inbound_lead_key': submissionId,
    '0-1/sm_landing_page': attribution.landingPage,
    '0-1/sm_utm_source': attribution.source,
    '0-1/sm_utm_medium': attribution.medium,
    '0-1/sm_utm_campaign': attribution.campaign,
    '0-1/sm_commissioning_marker': attribution.marker,
  };

  Object.entries(hiddenValues).forEach(([name, value]) => {
    form.setFieldValue(name, [value]);
  });
}

export function ProjectEnquiryForm() {
  const submissionIdRef = useRef(newSubmissionId());
  const interactionTimerRef = useRef<number | null>(null);
  const formStartedRef = useRef(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'success' | 'failed' | 'load-failed'>('loading');

  useEffect(() => {
    const onLoadFailure = () => {
      setStatus((current) => current === 'loading' ? 'load-failed' : current);
    };
    const loadingTimeout = window.setTimeout(onLoadFailure, 15000);
    const matchesThisForm = (event: HubSpotFormEvent) =>
      event.detail?.formId === measurementConfig.hubSpot.formId;

    const onReady = (event: Event) => {
      const formEvent = event as HubSpotFormEvent;
      if (!matchesThisForm(formEvent) || !window.HubSpotFormsV4) {
        return;
      }

      const form = window.HubSpotFormsV4.getFormFromEvent(event);
      window.clearTimeout(loadingTimeout);
      setHiddenFields(form, submissionIdRef.current);
      setStatus('ready');

      if (interactionTimerRef.current !== null) {
        window.clearInterval(interactionTimerRef.current);
      }
      interactionTimerRef.current = window.setInterval(async () => {
        if (formStartedRef.current) {
          return;
        }

        try {
          const fields = await form.getFormFieldValues();
          const hasInteraction = fields.some(
            ({ name, value }) => {
              const normalizedName = name.includes('/') ? name.slice(name.lastIndexOf('/') + 1) : name;
              return (
                visibleFields.has(normalizedName) &&
                (Array.isArray(value)
                  ? value.some((entry) => entry.trim().length > 0)
                  : value.trim().length > 0)
              );
            },
          );
          if (hasInteraction) {
            formStartedRef.current = true;
            if (interactionTimerRef.current !== null) {
              window.clearInterval(interactionTimerRef.current);
            }
            pushMeasurementEvent('form_start', {
              form_name: 'sm_project_enquiry_v1',
              submission_id: submissionIdRef.current,
            });
          }
        } catch {
          // HubSpot can briefly replace the form instance while rendering.
        }
      }, 750);
    };

    const onSuccess = (event: Event) => {
      const formEvent = event as HubSpotFormEvent;
      if (!matchesThisForm(formEvent) || !window.HubSpotFormsV4) {
        return;
      }

      if (interactionTimerRef.current !== null) {
        window.clearInterval(interactionTimerRef.current);
      }

      const submissionId = submissionIdRef.current;
      window.__smMeasuredSubmissionIds = window.__smMeasuredSubmissionIds || new Set<string>();
      if (!window.__smMeasuredSubmissionIds.has(submissionId)) {
        window.__smMeasuredSubmissionIds.add(submissionId);
        pushMeasurementEvent('generate_lead', {
          form_name: 'sm_project_enquiry_v1',
          submission_id: submissionId,
        });
      }
      setStatus('success');
    };

    const onFailure = (event: Event) => {
      const formEvent = event as HubSpotFormEvent;
      if (matchesThisForm(formEvent)) {
        setStatus('failed');
      }
    };

    window.addEventListener('hs-form-event:on-ready', onReady);
    window.addEventListener('hs-form-event:on-submission:success', onSuccess);
    window.addEventListener('hs-form-event:on-submission:failed', onFailure);

    const scriptId = 'sm-hubspot-form-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://js-${measurementConfig.hubSpot.region}.hsforms.net/forms/embed/${measurementConfig.hubSpot.portalId}.js`;
    }
    script.addEventListener('error', onLoadFailure);
    if (!script.isConnected) {
      document.head.appendChild(script);
    }

    return () => {
      window.clearTimeout(loadingTimeout);
      script.removeEventListener('error', onLoadFailure);
      window.removeEventListener('hs-form-event:on-ready', onReady);
      window.removeEventListener('hs-form-event:on-submission:success', onSuccess);
      window.removeEventListener('hs-form-event:on-submission:failed', onFailure);
      if (interactionTimerRef.current !== null) {
        window.clearInterval(interactionTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="project-enquiry" aria-labelledby="project-enquiry-title">
      <div className="project-enquiry-copy">
        <p className="eyebrow">Project enquiry</p>
        <h2 id="project-enquiry-title">What would you like to build?</h2>
        <p>
          Tell me what you’d like built or improved, what already exists, and any timing
          constraints. I’ll review your enquiry and reply about the next step.
        </p>
        <div className="project-enquiry-email-route">
          <p>Prefer email?</p>
          <a className="button button-secondary" href={workflowDiagnosisMailto}>
            Email Stefan
          </a>
        </div>
      </div>
      <div className="panel project-enquiry-form" data-status={status}>
        {status === 'load-failed' ? (
          <p className="form-status form-status-error" role="alert">
            The enquiry form couldn’t load. Please <a href={workflowDiagnosisMailto}>email Stefan</a>
            {' '}with your project details.
          </p>
        ) : null}
        <div
          className="hs-form-frame"
          data-region={measurementConfig.hubSpot.region}
          data-form-id={measurementConfig.hubSpot.formId}
          data-portal-id={measurementConfig.hubSpot.portalId}
        />
        {status === 'loading' ? <p className="form-status">Loading enquiry form…</p> : null}
        {status === 'failed' ? (
          <p className="form-status form-status-error" role="alert">
            The form could not be submitted. Please check the highlighted fields or email Stefan.
          </p>
        ) : null}
        <p className="form-status">
          Your details are used to respond to your enquiry and manage any agreed work.
          {' '}<a href="/privacy/">Read how your information is handled.</a>
        </p>
        <span className="sr-only" aria-live="polite">
          {status === 'success' ? 'Enquiry submitted successfully.' : ''}
        </span>
      </div>
    </section>
  );
}
