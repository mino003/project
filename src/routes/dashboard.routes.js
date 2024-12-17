import express from 'express';
import { authMiddleware, roleCheck } from '../middleware/auth.js';
import DashboardController from '../controllers/dashboard.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/overview', DashboardController.getSalesOverview);
router.get('/revenue', DashboardController.getRevenueMetrics);
router.get('/conversion/:funnelId', DashboardController.getConversionMetrics);
router.get('/upsells', DashboardController.getUpsellMetrics);

export default router;