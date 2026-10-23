// GA4 e Meta Pixel: carregados somente após consentimento (banner de cookies).
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
export const CONSENT_KEY = 'estima-cookie-consent';

let loaded = false;

export function getConsent(): 'all' | 'essential' | null {
  try {
    return (localStorage.getItem(CONSENT_KEY) as 'all' | 'essential' | null) ?? null;
  } catch {
    return null;
  }
}

export function setConsent(value: 'all' | 'essential') {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* armazenamento indisponível */
  }
  if (value === 'all') loadTrackers();
}

export function loadTrackers() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;

  if (GA4_ID) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { anonymize_ip: true });
  }

  if (PIXEL_ID) {
    /* eslint-disable */
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true; t.src = v;
      b.head.appendChild(t);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq!('init', PIXEL_ID);
    window.fbq!('track', 'PageView');
  }
}

export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path });
  window.fbq?.('track', 'PageView');
}

export function trackEvent(name: 'whatsapp_click' | 'phone_click' | 'generate_lead', params: Record<string, unknown> = {}) {
  window.gtag?.('event', name, params);
  if (name === 'generate_lead') window.fbq?.('track', 'Lead', params);
  if (name === 'whatsapp_click') window.fbq?.('track', 'Contact', { method: 'whatsapp' });
}
