import { Router } from 'express';
import type { AvailabilityQuery, BookingProvider } from '../booking/types.js';

const PHONE_RE = /^\+?[0-9()\s-]{10,18}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export function bookingRouter(provider: BookingProvider): Router {
  const router = Router();

  router.get('/services', async (_req, res) => {
    res.json(await provider.getServices());
  });

  router.get('/masters', async (_req, res) => {
    res.json(await provider.getMasters());
  });

  router.get('/availability', async (req, res) => {
    const query: AvailabilityQuery = {};
    if (typeof req.query.date === 'string') query.date = req.query.date;
    if (typeof req.query.master_id === 'string') query.masterId = req.query.master_id;
    res.json(await provider.getAvailability(query));
  });

  router.post('/request', async (req, res) => {
    const body = req.body as Record<string, unknown>;
    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const service_category = String(body.service_category ?? '');
    const service_id = String(body.service_id ?? '');
    const master_id = String(body.master_id ?? '');
    const preferred_date = String(body.preferred_date ?? '');
    const preferred_time = String(body.preferred_time ?? '');

    if (!name || !PHONE_RE.test(phone) || !service_category || !service_id || !master_id || !preferred_date) {
      res.status(400).json({ ok: false, error: 'Invalid booking payload' });
      return;
    }
    if (!TIME_RE.test(preferred_time)) {
      res.status(400).json({ ok: false, error: 'Invalid preferred_time' });
      return;
    }

    const result = await provider.createBooking({
      service_category,
      service_id,
      master_id,
      preferred_date,
      preferred_time,
      name,
      phone,
      comment: String(body.comment ?? ''),
      utm_source: optionalString(body.utm_source),
      utm_medium: optionalString(body.utm_medium),
      utm_campaign: optionalString(body.utm_campaign),
      utm_content: optionalString(body.utm_content),
      page_path: optionalString(body.page_path),
    });
    res.status(201).json(result);
  });

  return router;
}

function optionalString(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  return value.trim();
}
