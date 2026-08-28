import { DEMO_MODE } from '../config/env';
import { readStoredUtm } from './utm';

export type AnalyticsEventName =
  | 'page_view'
  | 'service_view'
  | 'price_view'
  | 'booking_open'
  | 'booking_step'
  | 'booking_submit_demo'
  | 'phone_click'
  | 'messenger_click'
  | 'route_click'
  | 'reviews_click';

export type AnalyticsPayload = {
  page_path?: string;
  service_category?: string;
  service_name?: string;
  master_id?: string;
  booking_step?: string | number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  demo?: boolean;
};

export type AnalyticsAdapter = {
  track: (name: AnalyticsEventName, payload: AnalyticsPayload) => void;
};

const consoleAdapter: AnalyticsAdapter = {
  track(name, payload) {
    if (import.meta.env.DEV) {
      console.info('[analytics]', name, payload);
    }
  },
};

let adapter: AnalyticsAdapter = consoleAdapter;

export function setAnalyticsAdapter(next: AnalyticsAdapter): void {
  adapter = next;
}

export function track(name: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
  const utm = typeof window !== 'undefined' ? readStoredUtm() : {};
  adapter.track(name, {
    page_path: typeof window !== 'undefined' ? window.location.pathname : payload.page_path,
    ...utm,
    ...payload,
    ...(DEMO_MODE ? { demo: true } : {}),
  } as AnalyticsPayload);
}

/** Заготовка под Яндекс Метрику: подключить адаптер, когда будет счётчик. */
export function createMetrikaAdapter(_counterId: string): AnalyticsAdapter {
  return {
    track(name, payload) {
      const w = window as unknown as { ym?: (id: number, t: string, n: string, p: unknown) => void };
      if (typeof w.ym === 'function') {
        w.ym(Number(_counterId), 'reachGoal', name, payload);
      }
    },
  };
}
