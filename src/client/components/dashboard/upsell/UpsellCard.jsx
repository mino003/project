import React from 'react';

function UpsellCard({ title, count, revenue }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Count</span>
          <span className="font-medium">{count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Revenue</span>
          <span className="font-medium">${revenue}</span>
        </div>
      </div>
    </div>
  );
}

export default UpsellCard;