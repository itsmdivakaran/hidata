'use client';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  skills: string[];
  category: string;
  link?: string;
}

export default function JobCard({
  title,
  company,
  location,
  type,
  salary,
  description,
  skills,
  category,
  link,
}: JobCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all p-6 border-l-4 border-gradient">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-purple-600 font-semibold">{company}</p>
        </div>
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
          {category}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 py-4 border-y border-gray-200">
        <div>
          <p className="text-gray-500 text-xs font-semibold">LOCATION</p>
          <p className="text-gray-900 font-semibold">{location}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-semibold">TYPE</p>
          <p className="text-gray-900 font-semibold">{type}</p>
        </div>
        {salary && (
          <div>
            <p className="text-gray-500 text-xs font-semibold">SALARY</p>
            <p className="text-gray-900 font-semibold">{salary}</p>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-gray-500 text-xs font-semibold mb-2">REQUIRED SKILLS</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        ) : (
          'View Details'
        )}
      </button>
    </article>
  );
}
