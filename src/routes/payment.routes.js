import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import PaymentController from '../controllers/payment.controller.js';

const router = express.Router();
const paymentController = new PaymentController();

router.use(authMiddleware);

router.post('/create-intent', paymentController.createPaymentIntent);
router.post('/process', paymentController.processPayment);
router.post('/webhook', paymentController.handleWebhook);

export default router;