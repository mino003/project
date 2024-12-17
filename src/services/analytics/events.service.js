import { db } from '../../config/database.js';

class EventsService {
  async trackEvent(eventData) {
    const { funnelId, visitorId, stepNumber, action, revenue = 0 } = eventData;
    
    await db.query(`
      INSERT INTO funnel_events 
        (funnel_id, visitor_id, step_number, action, revenue) 
      VALUES ($1, $2, $3, $4, $5)
    `, [funnelId, visitorId, stepNumber, action, revenue]);

    return true;
  }

  async getEventsByFunnel(funnelId, limit = 100) {
    const result = await db.query(`
      SELECT * FROM funnel_events
      WHERE funnel_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `, [funnelId, limit]);

    return result.rows;
  }
}

export default new EventsService();