import type {
  Availability,
  AvailabilityQuery,
  BookingMaster,
  BookingProvider,
  BookingService,
  CreateBookingInput,
  CreateBookingResult,
} from './types';

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export class HttpBookingProvider implements BookingProvider {
  getServices(): Promise<BookingService[]> {
    return request('/api/booking/services');
  }

  getMasters(): Promise<BookingMaster[]> {
    return request('/api/booking/masters');
  }

  getAvailability(query?: AvailabilityQuery): Promise<Availability> {
    const params = new URLSearchParams();
    if (query?.date) params.set('date', query.date);
    if (query?.masterId) params.set('master_id', query.masterId);
    const qs = params.toString();
    return request(`/api/booking/availability${qs ? `?${qs}` : ''}`);
  }

  createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
    return request('/api/booking/request', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }
}

let provider: BookingProvider | null = null;

export function getBookingProvider(): BookingProvider {
  if (!provider) provider = new HttpBookingProvider();
  return provider;
}

/** Для тестов: подменить реализацию без смены UI. */
export function setBookingProvider(next: BookingProvider): void {
  provider = next;
}
