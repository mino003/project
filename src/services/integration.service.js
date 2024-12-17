import Stripe from 'stripe';
import Mailchimp from 'mailchimp-api-v3';
import { PaymentError } from '../utils/errors.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

class IntegrationService {
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

  async addToMailingList(email, listId, tags = []) {
    try {
      await mailchimp.post(`/lists/${listId}/members`, {
        email_address: email,
        status: 'subscribed',
        tags,
      });
      return true;
    } catch (error) {
      console.error('Mailchimp error:', error);
      return false;
    }
  }

  async processWebhook(event) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handleSuccessfulPayment(event.data.object);
        break;
      case 'payment_intent.failed':
        await this.handleFailedPayment(event.data.object);
        break;
    }
  }

  async handleSuccessfulPayment(paymentIntent) {
    // Implementation for successful payment handling
  }

  async handleFailedPayment(paymentIntent) {
    // Implementation for failed payment handling
  }
}

export default new IntegrationService();