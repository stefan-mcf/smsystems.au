'use client';

import { useEffect, useRef, useState } from 'react';
import { pushMeasurementEvent } from '@/components/analytics/measurement';
import { measurementConfig } from '@/lib/measurement-config';

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
  '0-1/firstname',
  '0-1/lastname',
  '0-1/email',
  '0-1/phone',
  '0-1/message',
  '0-1/company',
  '0-1/sm_systems_involved',
  '0-1/sm_timeframe',
  '0-1/sm_current_problem',
  '0-1/sm_desired_result',
]);

function newSubmissionId() {
  const uuid =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `sm-inbound-${uuid}`;
}

function setHiddenFields(form: HubSpotFormInstance, submissionId: string) {
  const params = new URLSearchParams(window.location.search);
  const landingPage = `${window.location.origin}${window.location.pathname}`;
  const marker = params.get('sm_test') === '1' ? 'synthetic-commissioning' : 'production';

  const hiddenValues: Record<string, string> = {
    '0-1/sm_inbound_lead_key': submissionId,
    '0-1/sm_landing_page': landingPage,
    '0-1/sm_utm_source': params.get('utm_source') || '',
    '0-1/sm_utm_medium': params.get('utm_medium') || '',
    '0-1/sm_utm_campaign': params.get('utm_campaign') || '',
    '0-1/sm_commissioning_marker': marker,
  };

  Object.entries(hiddenValues).forEach(([name, value]) => {
    form.setFieldValue(name, [value]);
  });
}

export function ProjectEnquiryForm() {
  const submissionIdRef = useRef(newSubmissionId());
  const interactionTimerRef = useRef<number | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'success' | 'failed'>('loading');

  useEffect(() => {
    const matchesThisForm = (event: HubSpotFormEvent) =>
      event.detail?.formId === measurementConfig.hubSpot.formId;

    const onReady = (event: Event) => {
      const formEvent = event as HubSpotFormEvent;
      if (!matchesThisForm(formEvent) || !window.HubSpotFormsV4) {
        return;
      }

      const form = window.HubSpotFormsV4.getFormFromEvent(event);
      setHiddenFields(form, submissionIdRef.current);
      setStatus('ready');

      let formStarted = false;
      interactionTimerRef.current = window.setInterval(async () => {
        if (formStarted) {
          return;
        }

        try {
          const fields = await form.getFormFieldValues();
          const hasInteraction = fields.some(
            ({ name, value }) =>
              visibleFields.has(name) &&
              (Array.isArray(value)
                ? value.some((entry) => entry.trim().length > 0)
                : value.trim().length > 0),
          );
          if (hasInteraction) {
            formStarted = true;
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
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://js-${measurementConfig.hubSpot.region}.hsforms.net/forms/embed/${measurementConfig.hubSpot.portalId}.js`;
      document.head.appendChild(script);
    }

    return () => {
      window.removeEventListener('hs-form-event:on-ready', onReady);
      window.removeEventListener('hs-form-event:on-submission:success', onSuccess);
      window.removeEventListener('hs-form-event:on-submission:failed', onFailure);
      if (interactionTimerRef.current !== null) {
        window.clearInterval(interactionTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="project-enquiry" id="project-enquiry" aria-labelledby="project-enquiry-title">
      <div className="project-enquiry-copy">
        <p className="eyebrow">Project enquiry</p>
        <h2 id="project-enquiry-title">Tell me what the workflow needs to do.</h2>
        <p>
          Share the systems involved, what is failing now, the result you need, and your timeframe.
          Your enquiry is reviewed before any opportunity is created.
        </p>
        <p className="project-enquiry-note">
          Prefer email?{' '}
          <a href="mailto:stefan@smsystems.au?subject=Workflow%20project%20request">
            Contact stefan@smsystems.au
          </a>
          .
        </p>
      </div>
      <div className="panel project-enquiry-form">
        <div
          className="hs-form-frame"
          data-region={measurementConfig.hubSpot.region}
          data-form-id={measurementConfig.hubSpot.formId}
          data-portal-id={measurementConfig.hubSpot.portalId}
        />
        {status === 'loading' ? <p className="form-status">Loading secure enquiry form…</p> : null}
        {status === 'failed' ? (
          <p className="form-status form-status-error">
            The form could not be submitted. Please check the highlighted fields or email Stefan.
          </p>
        ) : null}
        <span className="sr-only" aria-live="polite">
          {status === 'success' ? 'Enquiry submitted successfully.' : ''}
        </span>
      </div>
    </section>
  );
}
