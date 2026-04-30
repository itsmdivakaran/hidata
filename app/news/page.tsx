'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NewsCard from '@/app/components/NewsCard';
import { useEffect, useState, useMemo } from 'react';

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: string;
  publishedAt: string;
  category: string;
};

const CATEGORIES = [
  { id: 'all', label: 'All Topics', icon: '🌐' },
  { id: 'AI', label: 'AI', icon: '🤖' },
  { id: 'ML', label: 'Machine Learning', icon: '🧠' },
  { id: 'Data Science', label: 'Data Science', icon: '📊' },
  { id: 'LLM', label: 'LLM / GenAI', icon: '💬' },
  { id: 'AGI', label: 'AGI', icon: '⚡' },
  { id: 'Research', label: 'Research', icon: '🔬' },
  { id: 'Big Data', label: 'Big Data', icon: '🗄️' },
  { id: 'Cloud', label: 'Cloud / Infra', icon: '☁️' },
];

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
];

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#1a2236', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="h-44 animate-shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 rounded animate-shimmer" />
        <div className="h-4 rounded animate-shimmer" />
        <div className="h-4 w-4/5 rounded animate-shimmer" />
        <div className="h-3 w-3/4 rounded animate-shimmer" />
        <div className="h-3 w-2/3 rounded animate-shimmer" />
        <div className="pt-2 flex justify-between">
          <div className="h-3 w-16 rounded animate-shimmer" />
          <div className="h-3 w-16 rounded animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch {
        setError('Unable to load news. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = [...articles];
    if (activeCategory !== 'all') {
      result = result.filter(a => a.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        (a.description || '').toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q)
      );
    }
    if (sort === 'oldest') {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    return result;
  }, [articles, activeCategory, search, sort]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    articles.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const featuredArticle = filtered[0];
  const restArticles = filtered.slice(1);

  return (
    <>
      <Header />
      <main style={{ background: '#0a0e1a', minHeight: '100vh' }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden py-16 md:py-20"
          style={{
            background: 'linear-gradient(135deg, #0a0e1a 0%, #0d0b1e 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
                  style={{
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(124,58,237,0.25)',
                    color: '#a78bfa',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10b981' }} />
                  Live News Feed · Updated Daily
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-3">
                  <span style={{ color: '#f8fafc' }}>AI &amp; Data</span>
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Intelligence Feed
                  </span>
                </h1>
                <p style={{ color: '#64748b' }}>
                  Latest news on AI, ML, Data Science, LLMs, AGI, and more — curated from top sources
                </p>
              </div>
              {!loading && articles.length > 0 && (
                <div className="flex gap-4 flex-shrink-0">
                  {[
                    { v: articles.length, l: 'Articles Today', c: '#7c3aed' },
                    { v: new Set(articles.map(a => a.source)).size, l: 'Sources', c: '#06b6d4' },
                    { v: new Set(articles.map(a => a.category)).size, l: 'Topics', c: '#10b981' },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-black" style={{ color: s.c }}>{s.v}</div>
                      <div className="text-xs" style={{ color: '#475569' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Filters bar */}
        <div
          className="sticky top-16 z-40"
          style={{
            background: 'rgba(10,14,26,0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {/* Category tabs scroll */}
              <div className="flex gap-2 overflow-x-auto flex-1 pb-1 sm:pb-0">
                {CATEGORIES.map(cat => {
                  const count = categoryCounts[cat.id] || 0;
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0"
                      style={{
                        background: active ? '#7c3aed' : 'rgba(255,255,255,0.05)',
                        color: active ? 'white' : '#94a3b8',
                        border: `1px solid ${active ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                      {count > 0 && (
                        <span
                          className="px-1.5 py-0.5 rounded-full text-xs"
                          style={{
                            background: active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                            color: active ? 'white' : '#64748b',
                          }}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Search + sort */}
              <div className="flex gap-2 flex-shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none w-40"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#f8fafc',
                    }}
                    onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.5)'; }}
                    onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                  <svg className="absolute left-2.5 top-2 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#64748b' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-xs outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#94a3b8',
                  }}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.id} value={o.id} style={{ background: '#1a2236' }}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* News content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#f1f5f9' }}>Failed to load news</h3>
              <p className="mb-6" style={{ color: '#64748b' }}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
              >
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#f1f5f9' }}>No articles found</h3>
              <p style={{ color: '#64748b' }}>Try a different category or search term</p>
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featuredArticle && activeCategory === 'all' && !search && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}
                    >
                      ⭐ Top Story
                    </span>
                  </div>
                  <div
                    className="rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer"
                    style={{ background: '#1a2236', border: '1px solid rgba(255,255,255,0.08)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.4)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {featuredArticle.urlToImage && (
                        <div className="md:w-2/5 h-56 md:h-auto overflow-hidden relative flex-shrink-0">
                          <img
                            src={featuredArticle.urlToImage}
                            alt={featuredArticle.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={e => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 60%, #1a2236)' }} />
                        </div>
                      )}
                      <div className="flex flex-col justify-between p-8 flex-grow">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span
                              className="text-xs font-bold px-3 py-1 rounded-full"
                              style={{
                                background: 'rgba(124,58,237,0.15)',
                                color: '#a78bfa',
                                border: '1px solid rgba(124,58,237,0.3)',
                              }}
                            >
                              {featuredArticle.category}
                            </span>
                            <span className="text-xs" style={{ color: '#64748b' }}>{featuredArticle.source}</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug" style={{ color: '#f8fafc' }}>
                            <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer">
                              {featuredArticle.title}
                            </a>
                          </h2>
                          <p className="leading-relaxed" style={{ color: '#94a3b8' }}>
                            {featuredArticle.description}
                          </p>
                        </div>
                        <div
                          className="flex items-center justify-between mt-6 pt-4"
                          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <span className="text-sm" style={{ color: '#64748b' }}>
                            {formatDate(featuredArticle.publishedAt)}
                          </span>
                          <a
                            href={featuredArticle.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-semibold text-sm transition-colors"
                            style={{ color: '#a78bfa' }}
                          >
                            Read full story
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm" style={{ color: '#64748b' }}>
                  {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                  {activeCategory !== 'all' && ` in ${activeCategory}`}
                  {search && ` matching "${search}"`}
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory !== 'all' || search ? filtered : restArticles).map((article, idx) => (
                  <NewsCard
                    key={idx}
                    title={article.title}
                    description={article.description || 'No description available'}
                    image={article.urlToImage}
                    link={article.url}
                    source={article.source}
                    date={formatDate(article.publishedAt)}
                    category={article.category || 'AI/Data'}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
