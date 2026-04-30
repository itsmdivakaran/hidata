'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const RESOURCES = [
  {
    category: 'Data Science',
    icon: '📊',
    color: '#10b981',
    items: [
      { name: 'Kaggle', url: 'https://kaggle.com', description: 'Competitions, datasets, and free courses in data science and ML', tags: ['Free', 'Competitions', 'Datasets'] },
      { name: 'DeepLearning.AI', url: 'https://www.deeplearning.ai', description: 'Andrew Ng\'s platform with specializations in ML, DL, and AI', tags: ['Paid', 'Certificates'] },
      { name: 'DataCamp', url: 'https://datacamp.com', description: 'Interactive data science and Python learning platform', tags: ['Paid', 'Interactive'] },
      { name: 'Towards Data Science', url: 'https://towardsdatascience.com', description: 'Premier Medium publication for data science articles and tutorials', tags: ['Free', 'Articles'] },
    ],
  },
  {
    category: 'AI & Deep Learning',
    icon: '🤖',
    color: '#7c3aed',
    items: [
      { name: 'Fast.ai', url: 'https://fast.ai', description: 'Practical deep learning for coders — top-down teaching approach', tags: ['Free', 'Practical'] },
      { name: 'Papers With Code', url: 'https://paperswithcode.com', description: 'ML papers with linked open-source implementations', tags: ['Free', 'Research'] },
      { name: 'Hugging Face', url: 'https://huggingface.co', description: 'Models, datasets, and spaces for ML — the GitHub of AI', tags: ['Free', 'Models'] },
      { name: 'Anthropic Claude API', url: 'https://anthropic.com', description: 'State-of-the-art AI API for building intelligent applications', tags: ['API', 'Paid'] },
    ],
  },
  {
    category: 'Machine Learning',
    icon: '🧠',
    color: '#06b6d4',
    items: [
      { name: 'Scikit-learn Docs', url: 'https://scikit-learn.org', description: 'Comprehensive documentation for Python\'s premier ML library', tags: ['Free', 'Docs'] },
      { name: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials', description: 'Official PyTorch deep learning tutorials from Meta', tags: ['Free', 'Tutorials'] },
      { name: 'CS229 (Stanford)', url: 'https://cs229.stanford.edu', description: 'Andrew Ng\'s Stanford ML course — free lecture notes and materials', tags: ['Free', 'University'] },
      { name: 'ML Mastery', url: 'https://machinelearningmastery.com', description: 'Practical ML with Python — beginner to advanced', tags: ['Free', 'Blog'] },
    ],
  },
  {
    category: 'Data Engineering',
    icon: '🔧',
    color: '#f59e0b',
    items: [
      { name: 'dbt Learn', url: 'https://courses.getdbt.com', description: 'Free dbt courses — the standard for analytics engineering', tags: ['Free', 'Certification'] },
      { name: 'DataEngineering.wiki', url: 'https://dataengineering.wiki', description: 'Comprehensive knowledge base for data engineering concepts', tags: ['Free', 'Reference'] },
      { name: 'Databricks Academy', url: 'https://academy.databricks.com', description: 'Spark, Delta Lake, and ML platform training', tags: ['Free tier', 'Certification'] },
      { name: 'Apache Kafka Docs', url: 'https://kafka.apache.org/documentation', description: 'Official docs for the industry-standard streaming platform', tags: ['Free', 'Docs'] },
    ],
  },
  {
    category: 'LLMs & GenAI',
    icon: '💬',
    color: '#ec4899',
    items: [
      { name: 'OpenAI Docs', url: 'https://platform.openai.com/docs', description: 'Complete guide to GPT-4, DALL-E, Whisper and the OpenAI API', tags: ['API', 'Docs'] },
      { name: 'LangChain Docs', url: 'https://docs.langchain.com', description: 'Framework for building LLM-powered applications and agents', tags: ['Free', 'Framework'] },
      { name: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai', description: 'Comprehensive guide to prompt engineering for LLMs', tags: ['Free', 'Guide'] },
      { name: 'LLM Visualization', url: 'https://bbycroft.net/llm', description: 'Beautiful 3D visualization of how transformers work internally', tags: ['Free', 'Interactive'] },
    ],
  },
  {
    category: 'Pharma & CRO Data',
    icon: '💊',
    color: '#34d399',
    items: [
      { name: 'CDISC Standards', url: 'https://cdisc.org', description: 'Clinical Data Interchange Standards Consortium — SDTM, ADaM', tags: ['Standard', 'Clinical'] },
      { name: 'FDA Electronic Submissions', url: 'https://www.fda.gov/industry/electronic-submissions-gateway', description: 'FDA guidelines for electronic data submissions', tags: ['Regulatory', 'Free'] },
      { name: 'SAS Free Training', url: 'https://www.sas.com/en_us/training/university-edition.html', description: 'Free SAS University Edition for clinical data analysis', tags: ['Free', 'SAS'] },
      { name: 'R for Clinical Trials', url: 'https://www.r-consortium.org', description: 'R Consortium initiatives for R in regulatory submissions', tags: ['Free', 'R'] },
    ],
  },
  {
    category: 'Research & Papers',
    icon: '🔬',
    color: '#818cf8',
    items: [
      { name: 'arXiv cs.LG', url: 'https://arxiv.org/list/cs.LG/recent', description: 'Latest ML research papers — free preprints from top researchers', tags: ['Free', 'Research'] },
      { name: 'Google Scholar', url: 'https://scholar.google.com', description: 'Search academic papers, citations, and patents in AI/ML', tags: ['Free', 'Search'] },
      { name: 'Semantic Scholar', url: 'https://www.semanticscholar.org', description: 'AI-powered academic paper search with citation graphs', tags: ['Free', 'AI-Powered'] },
      { name: 'Connected Papers', url: 'https://www.connectedpapers.com', description: 'Visualize connections between research papers', tags: ['Free', 'Visualization'] },
    ],
  },
  {
    category: 'Communities',
    icon: '🌐',
    color: '#fb923c',
    items: [
      { name: 'Reddit r/MachineLearning', url: 'https://reddit.com/r/MachineLearning', description: 'Largest ML discussion community — research papers and news', tags: ['Free', 'Community'] },
      { name: 'Hacker News', url: 'https://news.ycombinator.com', description: 'Tech news and deep discussions — great AI and data science threads', tags: ['Free', 'News'] },
      { name: 'Discord: EleutherAI', url: 'https://discord.gg/zBGx3azzUn', description: 'Open-source AI research community building GPT-style models', tags: ['Free', 'Research'] },
      { name: 'Stack Overflow + AI', url: 'https://stackoverflow.com/questions/tagged/machine-learning', description: 'Technical Q&A for ML, data science, and AI coding questions', tags: ['Free', 'Q&A'] },
    ],
  },
];

const CERTIFICATIONS = [
  { name: 'Google Professional ML Engineer', provider: 'Google Cloud', duration: '3-6 mo', level: 'Advanced', color: '#ef4444', icon: '🔴' },
  { name: 'AWS Machine Learning Specialty', provider: 'Amazon Web Services', duration: '3-5 mo', level: 'Advanced', color: '#f59e0b', icon: '🟡' },
  { name: 'Microsoft Azure Data Scientist', provider: 'Microsoft Azure', duration: '2-4 mo', level: 'Intermediate', color: '#06b6d4', icon: '🔵' },
  { name: 'IBM Data Science Professional', provider: 'IBM / Coursera', duration: '2-3 mo', level: 'Beginner', color: '#7c3aed', icon: '🟣' },
  { name: 'Databricks Lakehouse Fundamentals', provider: 'Databricks', duration: '1-2 mo', level: 'Beginner', color: '#f97316', icon: '🟠' },
  { name: 'Snowflake SnowPro Core', provider: 'Snowflake', duration: '2-3 mo', level: 'Intermediate', color: '#38bdf8', icon: '🔷' },
];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  'Free': { bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
  'Paid': { bg: 'rgba(239,68,68,0.12)', color: '#f87171' },
  'Free tier': { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24' },
  'API': { bg: 'rgba(99,102,241,0.12)', color: '#818cf8' },
  'Research': { bg: 'rgba(124,58,237,0.12)', color: '#a78bfa' },
  'Certification': { bg: 'rgba(6,182,212,0.12)', color: '#06b6d4' },
};

const CATEGORY_FILTERS = ['All', ...RESOURCES.map(r => r.category)];

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const displayed = activeFilter === 'All'
    ? RESOURCES
    : RESOURCES.filter(r => r.category === activeFilter);

  return (
    <>
      <Header />
      <main style={{ background: '#0a0e1a', minHeight: '100vh' }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden py-16 md:py-24"
          style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0d0b1e 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 60%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
                color: '#10b981',
              }}
            >
              📚 Curated Resources · Updated 2025
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span style={{ color: '#f8fafc' }}>Master</span>{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Data &amp; AI
              </span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
              Hand-picked courses, tools, and communities to accelerate your journey in Data Science, ML, AI, and Data Engineering
            </p>
            <div className="flex justify-center gap-8 mt-10">
              {[
                { v: `${RESOURCES.reduce((s, r) => s + r.items.length, 0)}+`, l: 'Resources', c: '#10b981' },
                { v: `${RESOURCES.length}`, l: 'Categories', c: '#06b6d4' },
                { v: `${CERTIFICATIONS.length}`, l: 'Certifications', c: '#7c3aed' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-xs mt-1" style={{ color: '#475569' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category filter */}
        <div
          className="sticky top-16 z-40"
          style={{
            background: 'rgba(10,14,26,0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CATEGORY_FILTERS.map(cat => {
                const resource = RESOURCES.find(r => r.category === cat);
                const active = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0"
                    style={{
                      background: active ? (resource?.color || '#10b981') : 'rgba(255,255,255,0.05)',
                      color: active ? 'white' : '#94a3b8',
                      border: `1px solid ${active ? (resource?.color || '#10b981') : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    {resource?.icon && <span>{resource.icon}</span>}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resources grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {displayed.map((resourceCat) => (
              <div
                key={resourceCat.category}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: '#111827',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Category header */}
                <div
                  className="px-6 py-4 flex items-center gap-3"
                  style={{
                    background: `${resourceCat.color}10`,
                    borderBottom: `1px solid ${resourceCat.color}20`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                    style={{ background: `${resourceCat.color}20`, border: `1px solid ${resourceCat.color}30` }}
                  >
                    {resourceCat.icon}
                  </div>
                  <h3 className="font-bold" style={{ color: resourceCat.color }}>
                    {resourceCat.category}
                  </h3>
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${resourceCat.color}15`, color: resourceCat.color }}
                  >
                    {resourceCat.items.length}
                  </span>
                </div>

                {/* Items */}
                <div className="p-4 space-y-3">
                  {resourceCat.items.map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderLeft: `3px solid ${resourceCat.color}`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = `${resourceCat.color}08`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${resourceCat.color}30`;
                        (e.currentTarget as HTMLElement).style.transform = 'translateX(3px)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)';
                        (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                      }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-sm" style={{ color: '#e2e8f0' }}>
                          {item.name}
                        </span>
                        <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#475569' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-xs mb-2 leading-relaxed" style={{ color: '#64748b' }}>
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => {
                          const tc = TAG_COLORS[tag] || { bg: 'rgba(255,255,255,0.06)', color: '#64748b' };
                          return (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: tc.bg, color: tc.color }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
              >
                🏆
              </div>
              <div>
                <h2 className="text-2xl font-black" style={{ color: '#f8fafc' }}>Top Certifications</h2>
                <p className="text-sm" style={{ color: '#64748b' }}>Industry-recognized credentials to boost your career</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl transition-all duration-200"
                  style={{
                    background: `${cert.color}08`,
                    border: `1px solid ${cert.color}25`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = `${cert.color}12`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}45`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = `${cert.color}08`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}25`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{cert.icon}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: cert.level === 'Beginner' ? 'rgba(16,185,129,0.15)' : cert.level === 'Intermediate' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                        color: cert.level === 'Beginner' ? '#10b981' : cert.level === 'Intermediate' ? '#fbbf24' : '#f87171',
                      }}
                    >
                      {cert.level}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm mb-1" style={{ color: '#f1f5f9' }}>{cert.name}</h4>
                  <p className="text-xs mb-3" style={{ color: '#64748b' }}>{cert.provider}</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#475569' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs" style={{ color: '#64748b' }}>{cert.duration} prep</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
