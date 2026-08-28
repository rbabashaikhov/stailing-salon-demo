import { saveDemoRequest } from '../db/sqlite.js';
import {
  AVAILABILITY_DISCLAIMER,
  buildAvailabilityDays,
  buildDemoTimeSlots,
  masters,
  services,
} from './catalog.js';
import type { Availability, AvailabilityQuery, BookingMaster, BookingProvider, BookingService, CreateBookingInput } from './types.js';

export class DemoBookingProvider implements BookingProvider {
  async getServices(): Promise<BookingService[]> {
    return services;
  }

  async getMasters(): Promise<BookingMaster[]> {
    return masters;
  }

  async getAvailability(query?: AvailabilityQuery): Promise<Availability> {
    return {
      days: buildAvailabilityDays(),
      times: buildDemoTimeSlots(query?.date, query?.masterId),
      disclaimer: AVAILABILITY_DISCLAIMER,
    };
  }

  async createBooking(input: CreateBookingInput) {
    const request = saveDemoRequest(input);
    return { ok: true as const, demo: true, request };
  }
}

export function createBookingProvider(): BookingProvider {
  const crm = process.env.CRM_PROVIDER ?? 'demo';
  if (crm !== 'demo') {
    throw new Error(`CRM provider "${crm}" is not implemented. Use CRM_PROVIDER=demo.`);
  }
  return new DemoBookingProvider();
}
