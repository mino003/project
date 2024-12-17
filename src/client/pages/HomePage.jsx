import React from 'react';

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Build High-Converting</span>
          <span className="block text-primary-600">Sales Funnels</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Create, optimize, and scale your sales funnels with our powerful platform. Get started in minutes.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a href="/register" className="btn-primary block">
              Get Started
            </a>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <a href="/templates" className="btn-secondary block">
              View Templates
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;