import { describe, expect, it } from 'vitest';
import { captureUtm, parseUtmFromSearch, readStoredUtm } from './utm';

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key) => map.get(key) ?? null,
    key: (index) => [...map.keys()][index] ?? null,
    removeItem: (key) => {
      map.delete(key);
    },
    setItem: (key, value) => {
      map.set(key, value);
    },
  };
}

describe('UTM capture', () => {
  it('parses utm keys from search', () => {
    const utm = parseUtmFromSearch('?utm_source=yandex&utm_medium=maps&utm_campaign=mitino&foo=1');
    expect(utm).toEqual({
      utm_source: 'yandex',
      utm_medium: 'maps',
      utm_campaign: 'mitino',
    });
  });

  it('stores first-touch UTM and reuses it later', () => {
    const storage = memoryStorage();
    captureUtm('?utm_source=direct&utm_content=hero', storage);
    expect(readStoredUtm(storage).utm_source).toBe('direct');
    captureUtm('', storage);
    expect(readStoredUtm(storage)).toEqual({
      utm_source: 'direct',
      utm_content: 'hero',
    });
  });
});
