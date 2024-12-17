import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Templates', href: '/templates' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'App Store', href: '/app-store' },
  { name: 'About', href: '/about' },
];

function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Link to="/login" className="btn-secondary mr-3">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign up
                </Link>
              </div>
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-base font-medium text-primary-600 hover:bg-gray-50"
              >
                Sign up
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;