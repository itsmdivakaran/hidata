'use client';

import Link from 'next/link';

const QUICK_LINKS = [
  { href: '/news', label: 'Latest News' },
  { href: '/jobs', label: 'Job Listings' },
  { href: '/timelines', label: 'History & Timelines' },
  { href: '/resources', label: 'Learning Resources' },
];

const TOPICS = [
  'Data Science', 'Artificial Intelligence', 'Machine Learning',
  'AGI & Future Tech', 'Large Language Models', 'Data Engineering',
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#060a12',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                }}
              >
                <span className="text-white font-black text-xs">Hi</span>
              </div>
              <span
                className="text-xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                HiData
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>
              Your gateway to Data Science, AI, ML, and career opportunities. Explore 5000+ years of data history.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', '▶'].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#64748b',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.2)';
                    (e.currentTarget as HTMLElement).style.color = '#a78bfa';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    (e.currentTarget as HTMLElement).style.color = '#64748b';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: '#94a3b8' }}>
              Navigate
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors flex items-center gap-2 group"
                    style={{ color: '#64748b' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#a78bfa'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#64748b'; }}
                  >
                    <span
                      className="w-1 h-1 rounded-full transition-colors"
                      style={{ background: '#475569' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: '#94a3b8' }}>
              Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#64748b',
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: '#94a3b8' }}>
              Stay Updated
            </h4>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#64748b' }}>
              Weekly digest of top AI &amp; Data news, job opportunities, and research breakthroughs.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#f8fafc',
                }}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.5)'; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  boxShadow: '0 2px 10px rgba(124,58,237,0.3)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(124,58,237,0.5)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(124,58,237,0.3)'; }}
              >
                Subscribe →
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs" style={{ color: '#475569' }}>
          <p>© 2026 HiData · Exploring 5000 years of data history</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#475569'; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
