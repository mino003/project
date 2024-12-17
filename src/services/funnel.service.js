import { db } from '../config/database.js';
import { NotFoundError } from '../utils/errors.js';
import { emitWebSocketEvent } from '../websocket.js';

class FunnelService {
  async createFunnel(userId, funnelData) {
    const { name, steps } = funnelData;
    
    const result = await db.query(
      'INSERT INTO funnels (user_id, name) VALUES ($1, $2) RETURNING id',
      [userId, name]
    );
    
    const funnelId = result.rows[0].id;
    
    // Insert funnel steps
    await Promise.all(steps.map(async (step, index) => {
      await db.query(
        'INSERT INTO funnel_steps (funnel_id, step_number, name, type, content) VALUES ($1, $2, $3, $4, $5)',
        [funnelId, index + 1, step.name, step.type, step.content]
      );
    }));

    const funnel = await this.getFunnelById(funnelId, userId);
    emitWebSocketEvent('FUNNEL_CREATED', { userId, funnel });

    return funnel;
  }

  async getFunnelById(funnelId, userId) {
    const funnelResult = await db.query(
      'SELECT * FROM funnels WHERE id = $1 AND user_id = $2',
      [funnelId, userId]
    );

    if (funnelResult.rows.length === 0) {
      throw new NotFoundError('Funnel not found');
    }

    const funnel = funnelResult.rows[0];

    const stepsResult = await db.query(
      'SELECT * FROM funnel_steps WHERE funnel_id = $1 ORDER BY step_number',
      [funnelId]
    );

    funnel.steps = stepsResult.rows;
    return funnel;
  }

  async updateFunnel(funnelId, userId, updates) {
    const { name, steps } = updates;

    await db.query(
      'UPDATE funnels SET name = $1 WHERE id = $2 AND user_id = $3',
      [name, funnelId, userId]
    );

    // Update steps
    await db.query('DELETE FROM funnel_steps WHERE funnel_id = $1', [funnelId]);
    
    await Promise.all(steps.map(async (step, index) => {
      await db.query(
        'INSERT INTO funnel_steps (funnel_id, step_number, name, type, content) VALUES ($1, $2, $3, $4, $5)',
        [funnelId, index + 1, step.name, step.type, step.content]
      );
    }));

    const funnel = await this.getFunnelById(funnelId, userId);
    emitWebSocketEvent('FUNNEL_UPDATED', { userId, funnel });

    return funnel;
  }

  async deleteFunnel(funnelId, userId) {
    const result = await db.query(
      'DELETE FROM funnels WHERE id = $1 AND user_id = $2 RETURNING *',
      [funnelId, userId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Funnel not found');
    }

    emitWebSocketEvent('FUNNEL_DELETED', { userId, funnelId });

    return result.rows[0];
  }

  async getFunnelAnalytics(funnelId, userId, dateRange) {
    const { startDate, endDate } = dateRange;

    const result = await db.query(`
      SELECT 
        fs.step_number,
        fs.name as step_name,
        COUNT(DISTINCT fe.visitor_id) as visitors,
        COUNT(DISTINCT CASE WHEN fe.completed = true THEN fe.visitor_id END) as completions,
        COUNT(DISTINCT CASE WHEN fe.completed = true THEN fe.visitor_id END)::float / 
          NULLIF(COUNT(DISTINCT fe.visitor_id), 0) * 100 as conversion_rate
      FROM funnel_steps fs
      LEFT JOIN funnel_events fe ON fs.id = fe.step_id
      WHERE fs.funnel_id = $1
      AND fe.created_at BETWEEN $2 AND $3
      GROUP BY fs.step_number, fs.name
      ORDER BY fs.step_number
    `, [funnelId, startDate, endDate]);

    return result.rows;
  }
}

export default new FunnelService();