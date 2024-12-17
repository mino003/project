import StripeService from './stripe.service.js';
import logger from '../../utils/logger.js';

class WebhookService {
  async processWebhook(event) {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await StripeService.handleSuccessfulPayment(event.data.object);
          break;
        case 'payment_intent.failed':
          await StripeService.handleFailedPayment(event.data.object);
          break;
        default:
          logger.info(`Unhandled webhook event type: ${event.type}`);
      }
    } catch (error) {
      logger.error('Webhook processing error:', error);
      throw error;
    }
  }
}

export default new WebhookService();