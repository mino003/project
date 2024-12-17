import React from 'react';
import { format } from 'date-fns';

function DashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-500">
          {format(new Date(), 'dd MMM yyyy')}
        </span>
        <button className="btn-secondary">
          Refresh
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;