import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  res.json({
    ok: true,
    demo: process.env.DEMO_MODE !== 'false',
    crm: process.env.CRM_PROVIDER ?? 'demo',
  });
});
