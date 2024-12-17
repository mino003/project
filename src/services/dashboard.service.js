import { db } from '../config/database.js';
import { redis } from '../config/redis.js';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

class DashboardService {
  async getSalesOverview(userId, timeframe = 'daily') {
    const cacheKey = `sales_overview:${userId}:${timeframe}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    let startDate, endDate;
    const now = new Date();

    switch (timeframe) {
      case 'daily':
        startDate = startOfDay(now);
        endDate = endOfDay(now);
        break;
      case 'weekly':
        startDate = startOfWeek(now);
        endDate = endOfWeek(now);
        break;
      case 'monthly':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      default:
        throw new Error('Invalid timeframe');
    }

    const result = await db.query(`
      SELECT 
        COUNT(*) as total_orders,
        SUM(amount) as total_sales,
        COUNT(DISTINCT product_id) as products_sold
      FROM orders
      WHERE user_id = $1 
      AND created_at BETWEEN $2 AND $3
    `, [userId, startDate, endDate]);

    const overview = result.rows[0];
    await redis.setex(cacheKey, 300, JSON.stringify(overview)); // Cache for 5 minutes

    return overview;
  }

  async getRevenueMetrics(userId, timeframe = 'daily') {
    const result = await db.query(`
      SELECT 
        SUM(amount) as gross_revenue,
        SUM(amount - fees) as net_revenue,
        DATE_TRUNC($1, created_at) as period
      FROM orders
      WHERE user_id = $2
      GROUP BY period
      ORDER BY period DESC
      LIMIT 30
    `, [timeframe, userId]);

    return result.rows;
  }

  async getConversionMetrics(userId, funnelId) {
    const result = await db.query(`
      SELECT 
        funnel_steps.step_number,
        funnel_steps.name as step_name,
        COUNT(DISTINCT visitor_id) as visitors,
        COUNT(DISTINCT CASE WHEN completed = true THEN visitor_id END) as completions
      FROM funnel_steps
      LEFT JOIN funnel_events ON funnel_steps.id = funnel_events.step_id
      WHERE funnel_steps.funnel_id = $1
      GROUP BY funnel_steps.step_number, funnel_steps.name
      ORDER BY funnel_steps.step_number
    `, [funnelId]);

    return result.rows;
  }

  async getUpsellMetrics(userId) {
    const result = await db.query(`
      SELECT 
        upsells.id,
        upsells.name,
        COUNT(orders.id) as total_sales,
        SUM(orders.amount) as revenue,
        COUNT(orders.id)::float / NULLIF(COUNT(DISTINCT funnel_events.visitor_id), 0) as conversion_rate
      FROM upsells
      LEFT JOIN orders ON upsells.id = orders.upsell_id
      LEFT JOIN funnel_events ON upsells.funnel_id = funnel_events.funnel_id
      WHERE upsells.user_id = $1
      GROUP BY upsells.id, upsells.name
      ORDER BY revenue DESC
    `, [userId]);

    return result.rows;
  }
}

export default new DashboardService();