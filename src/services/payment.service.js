import Stripe from 'stripe';
import logger from '../utils/logger.js';
import { PaymentError } from '../utils/errors.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  async createPaymentIntent(amount, currency = 'usd') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      return paymentIntent;
    } catch (error) {
      logger.error('Payment intent creation failed:', error);
      throw new PaymentError('Failed to create payment intent');
    }
  }

  async processPayment(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        return {
          success: true,
          paymentId: paymentIntent.id,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
        };
      }

      throw new PaymentError('Payment not successful');
    } catch (error) {
      logger.error('Payment processing failed:', error);
      throw new PaymentError('Failed to process payment');
    }
  }

  async handleWebhookEvent(event) {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          // Handle successful payment
          break;
        case 'payment_intent.failed':
          // Handle failed payment
          break;
        default:
          logger.info(`Unhandled webhook event type: ${event.type}`);
      }
    } catch (error) {
      logger.error('Webhook processing failed:', error);
      throw new PaymentError('Failed to process webhook event');
    }
  }
}

export default new PaymentService();