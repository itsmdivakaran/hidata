'use client';

interface NewsCardProps {
  title: string;
  description: string;
  image?: string;
  link: string;
  source: string;
  date: string;
  category: string;
}

export default function NewsCard({
  title,
  description,
  image,
  link,
  source,
  date,
  category,
}: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 flex flex-col">
      {/* Image */}
      {image && (
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-200 to-pink-200 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
            {category}
          </span>
          <span className="text-xs text-gray-500">{source}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">{date}</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 font-semibold hover:text-pink-600 transition-colors text-sm"
          >
            Read More →
          </a>
        </div>
      </div>
    </article>
  );
}
