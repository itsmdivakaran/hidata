'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-4">
              HiData
            </h3>
            <p className="text-gray-400">
              Your gateway to data, AI, ML, and career opportunities in India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/news" className="hover:text-blue-400 transition-colors">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-blue-400 transition-colors">
                  Job Listings
                </Link>
              </li>
              <li>
                <Link href="/timelines" className="hover:text-blue-400 transition-colors">
                  History & Timelines
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-blue-400 transition-colors">
                  Learning Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white mb-4">Topics</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Data Science</li>
              <li>Artificial Intelligence</li>
              <li>Machine Learning</li>
              <li>AGI & Future Tech</li>
              <li>Pharma & CRO Data</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get weekly updates on top news and job opportunities.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-pink-600 text-white rounded font-semibold hover:shadow-lg transition-shadow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2026 HiData. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
