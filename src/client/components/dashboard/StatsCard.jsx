import React from 'react';
import StatsCard from '@/client/components/dashboard/StatsCard';

function StatsCard({ title, value, icon: Icon, trend, color = 'primary' }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 text-${color}-600`} aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {trend && (
                  <div
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
