import React from 'react';
import RevenueChart from './RevenueChart';

function ChartGrid({ revenueMetrics = {} }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RevenueChart data={revenueMetrics.revenueOverTime || []} />
      {/* Add more charts here */}
    </div>
  );
}

export default ChartGrid;