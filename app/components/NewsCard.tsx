'use client';

interface NewsCardProps {
  title: string;
  description: string;
  image?: string;
  link: string;
  source: string;
  date: string;
  category: string;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'AI': { bg: 'rgba(124, 58, 237, 0.15)', text: '#a78bfa', border: 'rgba(124, 58, 237, 0.3)' },
  'ML': { bg: 'rgba(6, 182, 212, 0.15)', text: '#06b6d4', border: 'rgba(6, 182, 212, 0.3)' },
  'Data Science': { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' },
  'AGI': { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)' },
  'LLM': { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
  'Research': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
  'Big Data': { bg: 'rgba(236, 72, 153, 0.15)', text: '#f472b6', border: 'rgba(236, 72, 153, 0.3)' },
  'Cloud': { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' },
  'AI/Data': { bg: 'rgba(124, 58, 237, 0.15)', text: '#a78bfa', border: 'rgba(124, 58, 237, 0.3)' },
};

function getColor(category: string) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['AI/Data'];
}

export default function NewsCard({
  title, description, image, link, source, date, category, featured = false,
}: NewsCardProps) {
  const color = getColor(category);

  if (featured) {
    return (
      <article
        className="rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer"
        style={{
          background: '#1a2236',
          border: '1px solid rgba(255,255,255,0.08)',
          gridColumn: 'span 2',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.4)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.15)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        <div className="flex flex-col md:flex-row h-full">
          {image && (
            <div className="md:w-2/5 h-56 md:h-auto overflow-hidden relative flex-shrink-0">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 60%, #1a2236)' }} />
            </div>
          )}
          <div className="flex flex-col justify-between p-6 flex-grow">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="badge"
                  style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                >
                  ⭐ Featured · {category}
                </span>
                <span className="text-xs" style={{ color: '#64748b' }}>{source}</span>
              </div>
              <h3
                className="text-xl md:text-2xl font-bold mb-3 leading-snug line-clamp-3"
                style={{ color: '#f8fafc' }}
              >
                <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
              </h3>
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: '#94a3b8' }}>
                {description}
              </p>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs" style={{ color: '#64748b' }}>{date}</span>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold flex items-center gap-1 transition-colors"
                style={{ color: '#a78bfa' }}
              >
                Read full story
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="rounded-xl overflow-hidden flex flex-col transition-all duration-300 group"
      style={{
        background: '#1a2236',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.3)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      {image && (
        <div className="relative h-44 overflow-hidden bg-gray-900 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none'; }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,34,54,0.8) 0%, transparent 60%)' }}
          />
          <div className="absolute top-3 left-3">
            <span
              className="badge"
              style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
            >
              {category}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {!image && (
          <div className="mb-3">
            <span
              className="badge"
              style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
            >
              {category}
            </span>
          </div>
        )}

        <h3
          className="text-base font-bold mb-2 line-clamp-2 leading-snug"
          style={{ color: '#f1f5f9' }}
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: 'inherit' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#a78bfa'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#f1f5f9'; }}
          >
            {title}
          </a>
        </h3>

        <p className="text-sm line-clamp-3 flex-grow mb-4 leading-relaxed" style={{ color: '#64748b' }}>
          {description}
        </p>

        <div
          className="flex justify-between items-center pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: color.text }}
            />
            <span className="text-xs font-medium" style={{ color: '#64748b' }}>{source}</span>
          </div>
          <span className="text-xs" style={{ color: '#475569' }}>{date}</span>
        </div>
      </div>
    </article>
  );
}
