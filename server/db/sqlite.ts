import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';
import type { BookingRequest, CreateBookingInput } from '../booking/types.js';

const sqlitePath = process.env.SQLITE_PATH ?? './data/demo-bookings.sqlite';

mkdirSync(dirname(sqlitePath) || '.', { recursive: true });

const db = new Database(sqlitePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS booking_requests (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    service_category TEXT NOT NULL,
    service_id TEXT NOT NULL,
    master_id TEXT NOT NULL,
    preferred_date TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    comment TEXT NOT NULL,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    page_path TEXT,
    status TEXT NOT NULL
  );
`);

const insert = db.prepare(`
  INSERT INTO booking_requests (
    id, created_at, service_category, service_id, master_id,
    preferred_date, preferred_time, name, phone, comment,
    utm_source, utm_medium, utm_campaign, utm_content, page_path, status
  ) VALUES (
    @id, @created_at, @service_category, @service_id, @master_id,
    @preferred_date, @preferred_time, @name, @phone, @comment,
    @utm_source, @utm_medium, @utm_campaign, @utm_content, @page_path, @status
  );
`);

export function saveDemoRequest(input: CreateBookingInput): BookingRequest {
  const request: BookingRequest = {
    id: `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
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
    status: 'DEMO',
  };
  insert.run(request);
  return request;
}
