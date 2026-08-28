import { describe, expect, it } from 'vitest';
import { formatPrice, getServicesByCategory } from './services';
import { getPopularServices } from './prices';

describe('data helpers', () => {
  it('formats confirmed price ranges and inquire label', () => {
    expect(formatPrice({ kind: 'range', from: 750, to: 1100, currency: 'RUB' })).toBe('750–1100 ₽');
    expect(formatPrice({ kind: 'inquire', label: 'Уточнить стоимость' })).toBe('Уточнить стоимость');
  });

  it('returns hair services including confirmed cuts', () => {
    const hair = getServicesByCategory('hair');
    expect(hair.some((s) => s.id === 'hair-cut-women')).toBe(true);
  });

  it('keeps popular list without invented extra prices', () => {
    const popular = getPopularServices();
    const invented = popular.filter((s) => s.price.kind === 'range' && !['hair-cut-women', 'hair-cut-men'].includes(s.id));
    expect(invented).toHaveLength(0);
  });
});
