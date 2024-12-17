import DashboardService from '../services/dashboard.service.js';

class DashboardController {
  async getSalesOverview(req, res, next) {
    try {
      const overview = await DashboardService.getSalesOverview(
        req.user.id,
        req.query.timeframe
      );
      res.json(overview);
    } catch (error) {
      next(error);
    }
  }

  async getRevenueMetrics(req, res, next) {
    try {
      const metrics = await DashboardService.getRevenueMetrics(
        req.user.id,
        req.query.timeframe
      );
      res.json(metrics);
    } catch (error) {
      next(error);
    }
  }

  async getConversionMetrics(req, res, next) {
    try {
      const metrics = await DashboardService.getConversionMetrics(
        req.user.id,
        req.params.funnelId
      );
      res.json(metrics);
    } catch (error) {
      next(error);
    }
  }

  async getUpsellMetrics(req, res, next) {
    try {
      const metrics = await DashboardService.getUpsellMetrics(req.user.id);
      res.json(metrics);
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();