import { describe, expect, it } from 'vitest';
import { DemoBookingProvider } from '../booking/DemoBookingProvider';

describe('DemoBookingProvider', () => {
  const provider = new DemoBookingProvider();

  it('returns catalog services and masters', async () => {
    const services = await provider.getServices();
    const masters = await provider.getMasters();
    expect(services.length).toBeGreaterThan(0);
    expect(masters.every((m) => m.isPlaceholder)).toBe(true);
  });

  it('returns preferred time windows, not claimed real slots', async () => {
    const availability = await provider.getAvailability();
    expect(availability.days.length).toBe(14);
    expect(availability.times.map((t) => t.id)).toEqual(['morning', 'afternoon', 'evening']);
    expect(availability.disclaimer).toMatch(/не реальные свободные окна/);
  });

  it('creates a DEMO booking without CRM side effects', async () => {
    const result = await provider.createBooking({
      service_category: 'hair',
      service_id: 'hair-cut-women',
      master_id: 'any',
      preferred_date: '2026-08-30',
      preferred_time: 'morning',
      name: 'Анна',
      phone: '+79268101900',
      utm_source: 'yandex',
    });
    expect(result.ok).toBe(true);
    expect(result.demo).toBe(true);
    expect(result.request.status).toBe('DEMO');
    expect(result.request.utm_source).toBe('yandex');
  });
});
