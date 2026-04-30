'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/news', label: 'News', icon: '📡' },
  { href: '/jobs', label: 'Jobs', icon: '💼' },
  { href: '/timelines', label: 'Timelines', icon: '🕰️' },
  { href: '/resources', label: 'Resources', icon: '📚' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10, 14, 26, 0.92)'
          : 'rgba(10, 14, 26, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.1)'
          : '1px solid rgba(255,255,255,0.05)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="relative w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)',
              }}
            >
              <span className="text-white font-black text-sm">H</span>
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #9f5ff7, #22d3ee)' }}
              />
            </div>
            <span
              className="text-xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              HiData
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                  style={{
                    color: active ? '#a78bfa' : '#94a3b8',
                    background: active ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
                    border: active
                      ? '1px solid rgba(124, 58, 237, 0.3)'
                      : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = '#f8fafc';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#7c3aed', boxShadow: '0 0 6px #7c3aed' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{
              background: isOpen ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            aria-label="Toggle menu"
          >
            <div className="w-4 flex flex-col gap-[5px]">
              <span
                className="block h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: '#f8fafc',
                  transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                }}
              />
              <span
                className="block h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: '#f8fafc',
                  opacity: isOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: '#f8fafc',
                  transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav
            className="md:hidden py-4 space-y-1 border-t animate-fadeIn"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
                  style={{
                    color: active ? '#a78bfa' : '#94a3b8',
                    background: active ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
                  }}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                  {active && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: '#7c3aed' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
