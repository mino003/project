import Mailchimp from 'mailchimp-api-v3';
import logger from '../../utils/logger.js';

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

class MailchimpService {
  async addToMailingList(email, listId, tags = []) {
    try {
      await mailchimp.post(`/lists/${listId}/members`, {
        email_address: email,
        status: 'subscribed',
        tags,
      });
      return true;
    } catch (error) {
      logger.error('Mailchimp error:', error);
      return false;
    }
  }

  async removeFromMailingList(email, listId) {
    try {
      const subscriberHash = this.getSubscriberHash(email);
      await mailchimp.delete(`/lists/${listId}/members/${subscriberHash}`);
      return true;
    } catch (error) {
      logger.error('Mailchimp error:', error);
      return false;
    }
  }

  async updateSubscriberTags(email, listId, tags) {
    try {
      const subscriberHash = this.getSubscriberHash(email);
      await mailchimp.post(`/lists/${listId}/members/${subscriberHash}/tags`, {
        tags: tags.map(tag => ({ name: tag, status: 'active' })),
      });
      return true;
    } catch (error) {
      logger.error('Mailchimp error:', error);
      return false;
    }
  }

  getSubscriberHash(email) {
    return require('crypto')
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');
  }
}

export default new MailchimpService();