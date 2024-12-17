import express from 'express';
import authRoutes from './auth.routes.js';
import funnelRoutes from './funnel.routes.js';
import analyticsRoutes from './analytics.routes.js';
import paymentRoutes from './payment.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/funnels', funnelRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/payments', paymentRoutes);

export default router;