export type BookingStatus = 'DEMO' | 'NEW' | 'CONTACTED' | 'BOOKED' | 'DONE' | 'LOST';

/** Clock time `HH:mm` (demo or CRM slot). */
export type PreferredTime = string;

export type AvailabilityQuery = {
  date?: string;
  masterId?: string;
};

export type AvailabilitySlot = {
  id: PreferredTime;
  label: string;
  available: boolean;
};

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
  categoryId: string;
};

export type AvailabilityDay = {
  date: string;
  label: string;
};

export type Availability = {
  days: AvailabilityDay[];
  times: AvailabilitySlot[];
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
  /** Days plus slots. Pass date+master so a CRM can return real openings later. */
  getAvailability(query?: AvailabilityQuery): Promise<Availability>;
  createBooking(input: CreateBookingInput): Promise<CreateBookingResult>;
}
