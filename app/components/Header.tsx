'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-white rounded-lg p-2 group-hover:scale-110 transition-transform">
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                HiData
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/news"
              className="text-white hover:text-yellow-200 transition-colors font-semibold"
            >
              News
            </Link>
            <Link
              href="/jobs"
              className="text-white hover:text-yellow-200 transition-colors font-semibold"
            >
              Jobs
            </Link>
            <Link
              href="/timelines"
              className="text-white hover:text-yellow-200 transition-colors font-semibold"
            >
              Timelines
            </Link>
            <Link
              href="/resources"
              className="text-white hover:text-yellow-200 transition-colors font-semibold"
            >
              Resources
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-yellow-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/news"
              className="block text-white hover:text-yellow-200 transition-colors font-semibold py-2"
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
            <Link
              href="/jobs"
              className="block text-white hover:text-yellow-200 transition-colors font-semibold py-2"
              onClick={() => setIsOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/timelines"
              className="block text-white hover:text-yellow-200 transition-colors font-semibold py-2"
              onClick={() => setIsOpen(false)}
            >
              Timelines
            </Link>
            <Link
              href="/resources"
              className="block text-white hover:text-yellow-200 transition-colors font-semibold py-2"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
