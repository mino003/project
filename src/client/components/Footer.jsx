import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/features" className="text-base text-gray-500 hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-base text-gray-500 hover:text-gray-900">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-base text-gray-500 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/help" className="text-base text-gray-500 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-base text-gray-500 hover:text-gray-900">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Sales Funnel Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;