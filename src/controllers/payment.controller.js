import PaymentService from '../services/payment.service.js';

class PaymentController {
  async createPaymentIntent(req, res, next) {
    try {
      const { amount, currency } = req.body;
      const paymentIntent = await PaymentService.createPaymentIntent(amount, currency);
      res.json(paymentIntent);
    } catch (error) {
      next(error);
    }
  }

  async processPayment(req, res, next) {
    try {
      const { paymentIntentId } = req.body;
      const result = await PaymentService.processPayment(paymentIntentId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async handleWebhook(req, res, next) {
    try {
      const event = req.body;
      await PaymentService.handleWebhookEvent(event);
      res.json({ received: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentController();