import { db } from '../../config/database.js';
import { redis } from '../../config/redis.js';

class MetricsService {
  async getFunnelMetrics(funnelId, dateRange) {
    const cacheKey = `funnel_metrics:${funnelId}:${dateRange}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const metrics = await db.query(`
      SELECT 
        COUNT(DISTINCT visitor_id) as total_visitors,
        COUNT(DISTINCT CASE WHEN completed = true THEN visitor_id END) as conversions,
        SUM(revenue) as total_revenue
      FROM funnel_events 
      WHERE funnel_id = $1 
      AND created_at BETWEEN $2 AND $3
    `, [funnelId, dateRange.startDate, dateRange.endDate]);

    const result = metrics.rows[0];
    await redis.setex(cacheKey, 300, JSON.stringify(result));
    
    return result;
  }

  async getConversionRates(funnelId) {
    const result = await db.query(`
      SELECT 
        step_number,
        COUNT(DISTINCT visitor_id) as visitors,
        COUNT(DISTINCT CASE WHEN completed = true THEN visitor_id END) as completions,
        COUNT(DISTINCT CASE WHEN completed = true THEN visitor_id END)::float / 
          NULLIF(COUNT(DISTINCT visitor_id), 0) * 100 as conversion_rate
      FROM funnel_events
      WHERE funnel_id = $1
      GROUP BY step_number
      ORDER BY step_number
    `, [funnelId]);

    return result.rows;
  }
}

export default new MetricsService();