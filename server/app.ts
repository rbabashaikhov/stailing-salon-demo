import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import { createBookingProvider } from './booking/DemoBookingProvider.js';
import { bookingRouter } from './routes/booking.js';
import { healthRouter } from './routes/health.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();
  const provider = createBookingProvider();
  const previewRobots = 'noindex, nofollow, noarchive, nosnippet';

  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    if (process.env.DEMO_MODE !== 'false') {
      res.setHeader('X-Robots-Tag', previewRobots);
    }
    next();
  });
  app.use(cors());
  app.use(express.json({ limit: '32kb' }));

  app.use('/api', healthRouter);
  app.use('/api/booking', bookingRouter(provider));

  const dist = path.resolve(__dirname, '../dist');
  app.get(['/sitemap.xml', '/sitemap.xml.gz'], (_req, res) => {
    res.status(404).type('text/plain').send('Not found');
  });
  app.use(express.static(dist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
      return;
    }
    res.sendFile(path.join(dist, 'index.html'), (err) => {
      if (err) next();
    });
  });

  return app;
}
