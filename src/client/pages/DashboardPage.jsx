import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHeader from '../components/dashboard/header/DashboardHeader';
import GetStartedSteps from '../components/dashboard/GetStartedSteps';
import StatsGrid from '../components/dashboard/stats/StatsGrid';
import ChartGrid from '../components/dashboard/charts/ChartGrid';
import UpsellGrid from '../components/dashboard/upsell/UpsellGrid';
import { useDashboardData } from '../hooks/useDashboardData';
import LoadingSpinner from '../components/common/LoadingSpinner';

function DashboardPage() {
  const { 
    salesOverview, 
    revenueMetrics, 
    isLoading 
  } = useDashboardData();

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <GetStartedSteps />
        <StatsGrid salesOverview={salesOverview} />
        <ChartGrid revenueMetrics={revenueMetrics} />
        <UpsellGrid salesOverview={salesOverview} />
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;