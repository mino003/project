import { db } from '../../config/database.js';
import { NotFoundError } from '../../utils/errors.js';
import FunnelBuilderService from './builder.service.js';

class FunnelTemplateService {
  async createTemplate(userId, templateData) {
    const { name, description, funnelId } = templateData;

    const funnel = await FunnelBuilderService.getFunnelById(funnelId, userId);
    
    const templateResult = await db.query(
      'INSERT INTO templates (user_id, name, description) VALUES ($1, $2, $3) RETURNING id',
      [userId, name, description]
    );

    const templateId = templateResult.rows[0].id;

    await Promise.all(funnel.steps.map(async (step) => {
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
}

export default new FunnelTemplateService();