import { db } from '../config/database.js';
import { NotFoundError } from '../utils/errors.js';

class TemplateService {
  async createTemplate(userId, templateData) {
    const { name, description, funnelId } = templateData;

    // Get funnel data
    const funnel = await db.query(
      'SELECT * FROM funnels WHERE id = $1 AND user_id = $2',
      [funnelId, userId]
    );

    if (funnel.rows.length === 0) {
      throw new NotFoundError('Funnel not found');
    }

    // Get funnel steps
    const steps = await db.query(
      'SELECT * FROM funnel_steps WHERE funnel_id = $1 ORDER BY step_number',
      [funnelId]
    );

    // Create template
    const templateResult = await db.query(
      'INSERT INTO templates (user_id, name, description) VALUES ($1, $2, $3) RETURNING id',
      [userId, name, description]
    );

    const templateId = templateResult.rows[0].id;

    // Create template steps
    await Promise.all(steps.rows.map(async (step) => {
      await db.query(
        'INSERT INTO template_steps (template_id, step_number, name, type, content) VALUES ($1, $2, $3, $4, $5)',
        [templateId, step.step_number, step.name, step.type, step.content]
      );
    }));

    return this.getTemplateById(templateId, userId);
  }

  async getTemplateById(templateId, userId) {
    const templateResult = await db.query(
      'SELECT * FROM templates WHERE id = $1 AND (user_id = $2 OR is_public = true)',
      [templateId, userId]
    );

    if (templateResult.rows.length === 0) {
      throw new NotFoundError('Template not found');
    }

    const template = templateResult.rows[0];

    const stepsResult = await db.query(
      'SELECT * FROM template_steps WHERE template_id = $1 ORDER BY step_number',
      [templateId]
    );

    template.steps = stepsResult.rows;
    return template;
  }

  async getAllTemplates(userId) {
    const result = await db.query(
      'SELECT * FROM templates WHERE user_id = $1 OR is_public = true ORDER BY created_at DESC',
      [userId]
    );

    return result.rows;
  }

  async createFunnelFromTemplate(userId, templateId) {
    const template = await this.getTemplateById(templateId, userId);

    // Create new funnel
    const funnelResult = await db.query(
      'INSERT INTO funnels (user_id, name) VALUES ($1, $2) RETURNING id',
      [userId, `${template.name} Copy`]
    );

    const funnelId = funnelResult.rows[0].id;

    // Copy template steps to funnel steps
    await Promise.all(template.steps.map(async (step) => {
      await db.query(
        'INSERT INTO funnel_steps (funnel_id, step_number, name, type, content) VALUES ($1, $2, $3, $4, $5)',
        [funnelId, step.step_number, step.name, step.type, step.content]
      );
    }));

    return this.getFunnelById(funnelId, userId);
  }
}

export default new TemplateService();