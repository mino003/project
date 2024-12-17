import React from 'react';
import UpsellCard from './UpsellCard';

function UpsellGrid({ salesOverview = {} }) {
  const upsellData = [
    {
      title: 'Bundles',
      data: salesOverview.bundles || { count: 0, revenue: 0 }
    },
    {
      title: 'Order Bumps',
      data: salesOverview.orderBumps || { count: 0, revenue: 0 }
    },
    {
      title: 'One-Click Upsells',
      data: salesOverview.upsells || { count: 0, revenue: 0 }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {upsellData.map((item) => (
        <UpsellCard
          key={item.title}
          title={item.title}
          count={item.data.count}
          revenue={item.data.revenue}
        />
      ))}
    </div>
  );
}

export default UpsellGrid;