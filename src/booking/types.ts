export type BookingStatus = 'DEMO' | 'NEW' | 'CONTACTED' | 'BOOKED' | 'DONE' | 'LOST';

export type PreferredTime = 'morning' | 'afternoon' | 'evening';

export type BookingService = {
  id: string;
  categoryId: string;
  name: string;
  short: string;
  priceLabel: string;
};

export type BookingMaster = {
  id: string;
  displayName: string;
  role: string;
  specialties: string;
  isPlaceholder: boolean;
};

export type AvailabilityDay = {
  date: string;
  label: string;
};

export type Availability = {
  days: AvailabilityDay[];
  times: Array<{ id: PreferredTime; label: string }>;
  disclaimer: string;
};

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export type CreateBookingInput = {
  service_category: string;
  service_id: string;
  master_id: string;
  preferred_date: string;
  preferred_time: PreferredTime;
  name: string;
  phone: string;
  comment?: string;
  page_path?: string;
} & UtmParams;

export type BookingRequest = {
  id: string;
  created_at: string;
  service_category: string;
  service_id: string;
  master_id: string;
  preferred_date: string;
  preferred_time: string;
  name: string;
  phone: string;
  comment: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  page_path: string | null;
  status: BookingStatus;
};

export type CreateBookingResult = {
  ok: true;
  demo: boolean;
  request: BookingRequest;
};

export interface BookingProvider {
  getServices(): Promise<BookingService[]>;
  getMasters(): Promise<BookingMaster[]>;
  getAvailability(): Promise<Availability>;
  createBooking(input: CreateBookingInput): Promise<CreateBookingResult>;
}
