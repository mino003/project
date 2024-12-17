import MetricsService from '../services/analytics/metrics.service.js';
import EventsService from '../services/analytics/events.service.js';

class AnalyticsController {
  async getFunnelMetrics(req, res, next) {
    try {
      const metrics = await MetricsService.getFunnelMetrics(
        req.params.funnelId,
        req.query.dateRange
      );
      res.json(metrics);
    } catch (error) {
      next(error);
    }
  }

  async getConversionRates(req, res, next) {
    try {
      const rates = await MetricsService.getConversionRates(req.params.funnelId);
      res.json(rates);
    } catch (error) {
      next(error);
    }
  }

  async trackEvent(req, res, next) {
    try {
      await EventsService.trackEvent(req.body);
      res.status(201).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new AnalyticsController();