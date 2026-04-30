'use client';

import { useEffect, useRef } from 'react';

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const STATS = [
  { value: '5000+', label: 'BC Events Tracked', icon: '🏛️' },
  { value: '200+', label: 'Timeline Milestones', icon: '🕰️' },
  { value: '50K+', label: 'Community Members', icon: '🌐' },
  { value: 'Daily', label: 'AI/ML News Updates', icon: '📡' },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0d0b1e 40%, #080e1a 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Star field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full star"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute animate-blob"
          style={{
            top: '10%',
            left: '15%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute animate-blob animation-delay-2000"
          style={{
            top: '20%',
            right: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.10) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute animate-blob animation-delay-4000"
          style={{
            bottom: '10%',
            left: '40%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.10) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 w-full">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fadeUp">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(124, 58, 237, 0.12)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              color: '#a78bfa',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#10b981' }}
            />
            Live · Data &amp; AI Intelligence Platform
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1
            className="text-6xl md:text-8xl font-black tracking-tight mb-6 animate-fadeUp animation-delay-100"
            style={{ lineHeight: 1.05 }}
          >
            <span style={{ color: '#f8fafc' }}>Hi</span>
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Data
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto animate-fadeUp animation-delay-200"
            style={{ color: '#94a3b8', lineHeight: 1.6 }}
          >
            Your complete gateway to{' '}
            <span style={{ color: '#a78bfa' }}>Data Science</span>,{' '}
            <span style={{ color: '#06b6d4' }}>Artificial Intelligence</span>,{' '}
            <span style={{ color: '#10b981' }}>Machine Learning</span>, and career
            opportunities in India
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fadeUp animation-delay-300"
        >
          <a
            href="/news"
            className="px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 text-center"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(124, 58, 237, 0.6)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(124, 58, 237, 0.4)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            📡 Latest AI News
          </a>
          <a
            href="/timelines"
            className="px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 text-center"
            style={{
              background: 'rgba(6, 182, 212, 0.1)',
              color: '#06b6d4',
              border: '1px solid rgba(6, 182, 212, 0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(6, 182, 212, 0.2)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6, 182, 212, 0.6)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(6, 182, 212, 0.1)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6, 182, 212, 0.3)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            🕰️ Explore History (BC → Now)
          </a>
          <a
            href="/jobs"
            className="px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 text-center"
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(16, 185, 129, 0.2)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.6)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(16, 185, 129, 0.1)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16, 185, 129, 0.3)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            💼 Browse Jobs
          </a>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeUp animation-delay-400"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div
                className="text-2xl md:text-3xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: '#64748b' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 animate-float">
          <div
            className="flex flex-col items-center gap-2 opacity-40"
            style={{ color: '#94a3b8' }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
