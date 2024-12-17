import express from 'express';
import { authMiddleware, roleCheck } from '../middleware/auth.js';
import FunnelController from '../controllers/funnel.controller.js';

const router = express.Router();
const funnelController = new FunnelController();

router.use(authMiddleware);

router.post('/', funnelController.createFunnel);
router.get('/', funnelController.getFunnels);
router.get('/:id', funnelController.getFunnelById);
router.put('/:id', funnelController.updateFunnel);
router.delete('/:id', funnelController.deleteFunnel);

export default router;
