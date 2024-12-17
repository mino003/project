import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import AnalyticsController from '../controllers/analytics.controller.js';

const router = express.Router();
const analyticsController = new AnalyticsController();

router.use(authMiddleware);

router.get('/overview', analyticsController.getOverview);
router.get('/details/:id', analyticsController.getDetails);

export default router;
