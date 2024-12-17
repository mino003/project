import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    id: 'product',
    name: 'Add Product',
    href: '/dashboard/products/new',
    status: 'upcoming',
  },
  {
    id: 'funnel',
    name: 'Create Store/Funnel',
    href: '/dashboard/funnels/new',
    description: 'Build a store or funnel to convert visitors into buyers and increase product sales.',
    status: 'upcoming',
  },
  {
    id: 'domain',
    name: 'Add Custom Domain',
    href: '/dashboard/settings/domain',
    status: 'upcoming',
  },
  {
    id: 'payment',
    name: 'Add Payment Gateway',
    href: '/dashboard/settings/payments',
    status: 'upcoming',
  },
];

function GetStartedSteps() {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Get Started
        </h3>
        <div className="mt-5 space-y-4">
          {steps.map((step, stepIdx) => (
            <div
              key={step.id}
              className="relative flex items-start py-4 hover:bg-gray-50 rounded-lg px-4"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">
                  <a href={step.href}>
                    {step.status === 'complete' ? (
                      <CheckCircleIcon
                        className="h-5 w-5 text-green-500 absolute left-4"
                        aria-hidden="true"
                      />
                    ) : (
                      <PlusCircleIcon
                        className="h-5 w-5 text-gray-400 absolute left-4"
                        aria-hidden="true"
                      />
                    )}
                    <span className="ml-8">{step.name}</span>
                  </a>
                </div>
                {step.description && (
                  <div className="mt-1 text-sm text-gray-500 ml-8">
                    {step.description}
                  </div>
                )}
              </div>
              <div className="ml-4 flex-shrink-0">
                <a
                  href={step.href}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  {step.status === 'complete' ? 'Edit' : 'Start'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetStartedSteps;