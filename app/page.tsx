'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import Link from 'next/link';

const FEATURES = [
  {
    icon: '📡',
    title: 'Live AI & Data News',
    description: 'Real-time news from The Guardian, covering AI breakthroughs, ML research, data engineering, AGI developments, and more.',
    accent: '#7c3aed',
    link: '/news',
    label: 'Browse News',
  },
  {
    icon: '🕰️',
    title: 'Dual Interactive Timelines',
    description: 'Explore 5,000 years of Data & Computation history alongside the complete AI/ML timeline — from 3000 BC to AGI.',
    accent: '#06b6d4',
    link: '/timelines',
    label: 'Explore Timelines',
  },
  {
    icon: '💼',
    title: 'Data & AI Job Portal',
    description: 'Curated job listings for Data Scientists, ML Engineers, AI Researchers, and Data Analysts across India.',
    accent: '#10b981',
    link: '/jobs',
    label: 'Find Jobs',
  },
  {
    icon: '📚',
    title: 'Learning Resources',
    description: 'Hand-picked courses, books, and tools to master Data Science, Deep Learning, and ML engineering.',
    accent: '#f59e0b',
    link: '/resources',
    label: 'Start Learning',
  },
];

const TIMELINE_PREVIEW = [
  { year: '3000 BC', event: 'Babylonian Cuneiform', color: '#f59e0b' },
  { year: '1956', event: 'Birth of AI', color: '#7c3aed' },
  { year: '2012', event: 'AlexNet Revolution', color: '#06b6d4' },
  { year: '2017', event: 'Transformers', color: '#10b981' },
  { year: '2022', event: 'ChatGPT', color: '#ec4899' },
  { year: '2025', event: 'AGI Race', color: '#ef4444' },
];

const TOPIC_PILLS = [
  { label: 'Artificial Intelligence', icon: '🤖', color: '#7c3aed' },
  { label: 'Machine Learning', icon: '🧠', color: '#06b6d4' },
  { label: 'Data Science', icon: '📊', color: '#10b981' },
  { label: 'Deep Learning', icon: '🔬', color: '#2563eb' },
  { label: 'Large Language Models', icon: '💬', color: '#ec4899' },
  { label: 'AGI', icon: '⚡', color: '#ef4444' },
  { label: 'Data Engineering', icon: '🔧', color: '#f59e0b' },
  { label: 'Computer Vision', icon: '👁️', color: '#8b5cf6' },
];

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ background: '#0a0e1a' }}>
        <HeroSection />

        {/* Features Section */}
        <section className="py-20 md:py-28" style={{ background: '#0a0e1a' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style={{
                  background: 'rgba(124, 58, 237, 0.12)',
                  border: '1px solid rgba(124, 58, 237, 0.25)',
                  color: '#a78bfa',
                }}
              >
                Platform Features
              </span>
              <h2
                className="text-4xl md:text-5xl font-black mb-4"
                style={{ color: '#f8fafc' }}
              >
                Everything Data &amp; AI
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
                One platform to track the past, understand the present, and prepare for the future of AI and Data Science
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl transition-all duration-300 group"
                  style={{
                    background: '#111827',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${f.accent}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${f.accent}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${f.accent}18`, border: `1px solid ${f.accent}30` }}
                    >
                      {f.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#f1f5f9' }}>
                        {f.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>
                        {f.description}
                      </p>
                      <Link
                        href={f.link}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                        style={{ color: f.accent }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.8'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                      >
                        {f.label}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Teaser */}
        <section
          className="py-20 md:py-28"
          style={{
            background: 'linear-gradient(180deg, #0a0e1a 0%, #0d0b1e 50%, #0a0e1a 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
                  style={{
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.25)',
                    color: '#06b6d4',
                  }}
                >
                  Interactive Timelines
                </span>
                <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#f8fafc' }}>
                  5,000 Years of
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Data &amp; AI History
                  </span>
                </h2>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: '#94a3b8' }}>
                  Two epic interactive timelines starting from{' '}
                  <span style={{ color: '#f59e0b' }}>3000 BC Babylonian tablets</span> to{' '}
                  <span style={{ color: '#ef4444' }}>modern AGI</span>. Explore the complete
                  parallel histories of Data &amp; Computation and AI &amp; Machine Learning.
                </p>
                <Link
                  href="/timelines"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(6,182,212,0.5)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(6,182,212,0.3)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <span>🕰️</span>
                  Explore Full Timelines
                </Link>
              </div>

              {/* Mini timeline preview */}
              <div className="relative">
                <div className="relative pl-8">
                  <div
                    className="absolute left-3 top-2 bottom-2 w-px"
                    style={{ background: 'linear-gradient(to bottom, #f59e0b, #7c3aed, #06b6d4, #10b981, #ec4899, #ef4444)' }}
                  />
                  {TIMELINE_PREVIEW.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 mb-6 last:mb-0 group cursor-default"
                    >
                      <div
                        className="absolute left-1 w-5 h-5 rounded-full border-2 border-gray-900 transition-transform group-hover:scale-125"
                        style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }}
                      />
                      <div
                        className="ml-6 p-3 rounded-lg flex-grow transition-all duration-200"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${item.color}10`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${item.color}30`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold" style={{ color: item.color }}>
                            {item.year}
                          </span>
                          <span className="text-xs" style={{ color: '#64748b' }}>→</span>
                        </div>
                        <p className="text-sm font-medium mt-0.5" style={{ color: '#94a3b8' }}>
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="text-center mt-6 text-sm"
                  style={{ color: '#475569' }}
                >
                  + 194 more events across both timelines
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-16" style={{ background: '#0a0e1a' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black" style={{ color: '#f8fafc' }}>
                Topics We Cover
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {TOPIC_PILLS.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full cursor-default transition-all duration-200"
                  style={{
                    background: `${topic.color}10`,
                    border: `1px solid ${topic.color}30`,
                    color: topic.color,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${topic.color}20`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${topic.color}60`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${topic.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${topic.color}10`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${topic.color}30`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <span>{topic.icon}</span>
                  <span className="text-sm font-semibold">{topic.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 md:py-28 relative overflow-hidden"
          style={{ background: '#0a0e1a' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#10b981',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10b981' }} />
              Join 50K+ data professionals
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#f8fafc' }}>
              Ready to Explore the
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Future of Data &amp; AI?
              </span>
            </h2>
            <p className="text-lg mb-10" style={{ color: '#64748b' }}>
              From ancient data tablets to modern AGI — track every milestone, read the latest research, and build your career in Data Science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/news"
                className="px-8 py-4 rounded-xl font-bold transition-all duration-300 text-white"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(124,58,237,0.6)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(124,58,237,0.4)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                📡 Read Today's AI News
              </Link>
              <Link
                href="/timelines"
                className="px-8 py-4 rounded-xl font-bold transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.color = '#f8fafc';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                🕰️ Journey Through History
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
