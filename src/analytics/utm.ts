const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type CapturedUtm = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = 'stailing_utm';

export function parseUtmFromSearch(search: string): CapturedUtm {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const result: CapturedUtm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) result[key] = value;
  }
  return result;
}

export function hasUtm(utm: CapturedUtm): boolean {
  return UTM_KEYS.some((key) => Boolean(utm[key]));
}

export function captureUtm(search: string, storage: Storage = window.sessionStorage): CapturedUtm {
  const incoming = parseUtmFromSearch(search);
  if (hasUtm(incoming)) {
    storage.setItem(STORAGE_KEY, JSON.stringify(incoming));
    return incoming;
  }
  return readStoredUtm(storage);
}

export function readStoredUtm(storage: Storage = window.sessionStorage): CapturedUtm {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as CapturedUtm;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}
