import Stripe from 'stripe';
import { PaymentError } from '../../utils/errors.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class StripeService {
  async createPaymentIntent(amount, currency = 'usd') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });
      return paymentIntent;
    } catch (error) {
      throw new PaymentError('Failed to create payment intent');
    }
  }

  async handleSuccessfulPayment(paymentIntent) {
    // Implementation for successful payment handling
    return paymentIntent;
  }

  async handleFailedPayment(paymentIntent) {
    // Implementation for failed payment handling
    return paymentIntent;
  }

  async processRefund(paymentIntentId, amount) {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount,
      });
      return refund;
    } catch (error) {
      throw new PaymentError('Failed to process refund');
    }
  }
}

export default new StripeService();