const ATTRIBUTION_KEY = 'sm_enquiry_source_v1';

type EnquiryAttribution = {
  landingPage: string;
  source: string;
  medium: string;
  campaign: string;
  marker: string;
};

export function getEnquiryAttribution(): EnquiryAttribution {
  const params = new URLSearchParams(window.location.search);
  const current: EnquiryAttribution = {
    landingPage: `${window.location.origin}${window.location.pathname}`,
    source: (params.get('utm_source') || '').slice(0, 200),
    medium: (params.get('utm_medium') || '').slice(0, 200),
    campaign: (params.get('utm_campaign') || '').slice(0, 200),
    marker: params.get('sm_test') === '1' ? 'synthetic-commissioning' : 'production',
  };

  try {
    const saved = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (
        parsed && typeof parsed === 'object' &&
        Object.keys(current).every((key) => typeof (parsed as Record<string, unknown>)[key] === 'string')
      ) {
        return parsed as EnquiryAttribution;
      }
    }
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(current));
  } catch {
    // The form remains usable when browser storage is unavailable.
  }

  return current;
}
