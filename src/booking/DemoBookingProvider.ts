import {
  formatPrice,
  getServicesByCategory,
  otherBookingServices,
  services,
  type ServiceCategoryId,
} from '../data/services';
import { masters } from '../data/masters';
import type {
  Availability,
  BookingMaster,
  BookingProvider,
  BookingService,
  CreateBookingInput,
  CreateBookingResult,
} from './types';

const TIME_LABELS = [
  { id: 'morning' as const, label: 'Утро' },
  { id: 'afternoon' as const, label: 'День' },
  { id: 'evening' as const, label: 'Вечер' },
];

export const AVAILABILITY_DISCLAIMER =
  'Показаны предпочтительные промежутки, а не реальные свободные окна. Реальная доступность будет получаться из системы записи салона.';

export function buildAvailabilityDays(from = new Date(), count = 14): Availability['days'] {
  const days: Availability['days'] = [];
  for (let i = 0; i < count; i += 1) {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const label = new Intl.DateTimeFormat('ru-RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(d);
    days.push({ date: iso, label });
  }
  return days;
}

export function mapToBookingService(item: {
  id: string;
  categoryId: string;
  name: string;
  short: string;
  price: Parameters<typeof formatPrice>[0];
}): BookingService {
  return {
    id: item.id,
    categoryId: item.categoryId,
    name: item.name,
    short: item.short,
    priceLabel: formatPrice(item.price),
  };
}

export function getCatalogServices(): BookingService[] {
  return [...services, ...otherBookingServices].map(mapToBookingService);
}

export function getCatalogMasters(): BookingMaster[] {
  return masters.map((m) => ({
    id: m.id,
    displayName: m.displayName,
    role: m.role,
    specialties: m.specialties,
    isPlaceholder: true,
  }));
}

export function filterServicesByCategory(categoryId: string): BookingService[] {
  return getServicesByCategory(categoryId as ServiceCategoryId).map(mapToBookingService);
}

/**
 * Локальная реализация для тестов и документации контракта.
 * UI записи использует HttpBookingProvider, а не этот класс напрямую.
 */
export class DemoBookingProvider implements BookingProvider {
  async getServices(): Promise<BookingService[]> {
    return getCatalogServices();
  }

  async getMasters(): Promise<BookingMaster[]> {
    return getCatalogMasters();
  }

  async getAvailability(): Promise<Availability> {
    return {
      days: buildAvailabilityDays(),
      times: TIME_LABELS,
      disclaimer: AVAILABILITY_DISCLAIMER,
    };
  }

  async createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
    const request = {
      id: `demo-${Date.now()}`,
      created_at: new Date().toISOString(),
      service_category: input.service_category,
      service_id: input.service_id,
      master_id: input.master_id,
      preferred_date: input.preferred_date,
      preferred_time: input.preferred_time,
      name: input.name,
      phone: input.phone,
      comment: input.comment ?? '',
      utm_source: input.utm_source ?? null,
      utm_medium: input.utm_medium ?? null,
      utm_campaign: input.utm_campaign ?? null,
      utm_content: input.utm_content ?? null,
      page_path: input.page_path ?? null,
      status: 'DEMO' as const,
    };
    return { ok: true, demo: true, request };
  }
}
