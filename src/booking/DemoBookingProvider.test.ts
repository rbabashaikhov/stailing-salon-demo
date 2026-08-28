import { describe, expect, it } from 'vitest';
import { DemoBookingProvider } from '../booking/DemoBookingProvider';

describe('DemoBookingProvider', () => {
  const provider = new DemoBookingProvider();

  it('returns catalog services and demo masters tied to categories', async () => {
    const services = await provider.getServices();
    const masters = await provider.getMasters();
    expect(services.length).toBeGreaterThan(0);
    expect(masters.every((m) => m.isPlaceholder)).toBe(true);
    expect(masters.find((m) => m.displayName === 'Анна')?.categoryId).toBe('hair');
    expect(masters.filter((m) => m.categoryId === 'nails').map((m) => m.displayName)).toEqual([
      'Мария',
      'Екатерина',
    ]);
    expect(masters.filter((m) => m.categoryId === 'other')).toHaveLength(2);
  });

  it('returns demo clock slots for date and master, not real openings', async () => {
    const availability = await provider.getAvailability({
      date: '2026-08-30',
      masterId: 'demo-hair-1',
    });
    expect(availability.days.length).toBe(14);
    expect(availability.times.map((t) => t.id)).toEqual([
      '10:00',
      '11:30',
      '13:00',
      '14:30',
      '16:00',
      '17:30',
      '19:00',
    ]);
    expect(availability.times.some((t) => t.available)).toBe(true);
    expect(availability.times.some((t) => !t.available)).toBe(true);
    expect(availability.disclaimer).toMatch(/примерное расписание/);

    const otherMaster = await provider.getAvailability({
      date: '2026-08-30',
      masterId: 'demo-hair-2',
    });
    const otherDate = await provider.getAvailability({
      date: '2026-08-31',
      masterId: 'demo-hair-1',
    });
    expect(otherMaster.times.map((t) => t.available)).not.toEqual(availability.times.map((t) => t.available));
    expect(otherDate.times.map((t) => t.available)).not.toEqual(availability.times.map((t) => t.available));

    const anySpecialist = await provider.getAvailability({ date: '2026-08-30', masterId: 'any' });
    expect(anySpecialist.times.length).toBe(7);
    expect(anySpecialist.times.some((t) => t.available)).toBe(true);
  });

  it('creates a DEMO booking without CRM side effects', async () => {
    const result = await provider.createBooking({
      service_category: 'hair',
      service_id: 'hair-cut-women',
      master_id: 'any',
      preferred_date: '2026-08-30',
      preferred_time: '10:00',
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
