import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export function useDashboardData() {
  const { data: salesOverview, isLoading: isLoadingSales } = useQuery(
    ['salesOverview'],
    () => api.get('/dashboard/overview').then((res) => res.data)
  );

  const { data: revenueMetrics, isLoading: isLoadingRevenue } = useQuery(
    ['revenueMetrics'],
    () => api.get('/dashboard/revenue').then((res) => res.data)
  );

  return {
    salesOverview,
    revenueMetrics,
    isLoading: isLoadingSales || isLoadingRevenue
  };
}