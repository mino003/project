import FunnelBuilderService from '../services/funnel/builder.service.js';
import FunnelTemplateService from '../services/funnel/template.service.js';
import { validateFunnelStep } from '../utils/funnel.js';

class FunnelController {
  async createFunnel(req, res, next) {
    try {
      const { steps } = req.body;
      steps.forEach(validateFunnelStep);
      
      const funnel = await FunnelBuilderService.createFunnel(req.user.id, req.body);
      res.status(201).json(funnel);
    } catch (error) {
      next(error);
    }
  }

  async getFunnels(req, res, next) {
    try {
      const funnels = await FunnelBuilderService.getFunnelsByUserId(req.user.id);
      res.json(funnels);
    } catch (error) {
      next(error);
    }
  }

  async getFunnelById(req, res, next) {
    try {
      const funnel = await FunnelBuilderService.getFunnelById(req.params.id, req.user.id);
      res.json(funnel);
    } catch (error) {
      next(error);
    }
  }

  async updateFunnel(req, res, next) {
    try {
      const { steps } = req.body;
      steps.forEach(validateFunnelStep);
      
      const funnel = await FunnelBuilderService.updateFunnel(
        req.params.id,
        req.user.id,
        req.body
      );
      res.json(funnel);
    } catch (error) {
      next(error);
    }
  }

  async createTemplate(req, res, next) {
    try {
      const template = await FunnelTemplateService.createTemplate(
        req.user.id,
        req.body
      );
      res.status(201).json(template);
    } catch (error) {
      next(error);
    }
  }

  async getTemplates(req, res, next) {
    try {
      const templates = await FunnelTemplateService.getAllTemplates(req.user.id);
      res.json(templates);
    } catch (error) {
      next(error);
    }
  }
}

export default new FunnelController();