'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const RESOURCES = [
  {
    category: 'Data Science',
    items: [
      { name: 'Kaggle', url: 'https://kaggle.com', description: 'Competitions and datasets for data science' },
      { name: 'Andrew Ng Courses', url: 'https://www.deeplearning.ai', description: 'Machine Learning specialization' },
      { name: 'DataCamp', url: 'https://datacamp.com', description: 'Interactive data science learning' },
    ],
  },
  {
    category: 'AI & Deep Learning',
    items: [
      { name: 'Fast.ai', url: 'https://fast.ai', description: 'Practical deep learning for coders' },
      { name: 'OpenAI', url: 'https://openai.com', description: 'Cutting-edge AI research and models' },
      { name: 'DeepMind', url: 'https://deepmind.com', description: 'Advanced AI research' },
    ],
  },
  {
    category: 'Machine Learning',
    items: [
      { name: 'Coursera ML Course', url: 'https://coursera.org', description: 'Comprehensive ML fundamentals' },
      { name: 'TensorFlow', url: 'https://tensorflow.org', description: 'Open-source machine learning framework' },
      { name: 'PyTorch', url: 'https://pytorch.org', description: 'Deep learning research framework' },
    ],
  },
  {
    category: 'Pharma & CRO Data',
    items: [
      { name: 'CDISC Standards', url: 'https://cdisc.org', description: 'Clinical data standards' },
      { name: 'SAS University', url: 'https://www.sas.com/en_us/training/university-edition.html', description: 'Free SAS learning' },
      { name: 'Medscape', url: 'https://medscape.com', description: 'Medical and pharma insights' },
    ],
  },
  {
    category: 'Books & Publications',
    items: [
      { name: '"Hands-On ML" by Aurélien Géron', url: '#', description: 'Practical ML guide' },
      { name: '"Deep Learning" by Goodfellow et al', url: '#', description: 'Comprehensive DL theory' },
      { name: '"Python for Data Analysis"', url: '#', description: 'Pandas and data wrangling' },
    ],
  },
  {
    category: 'Communities & Forums',
    items: [
      { name: 'Stack Overflow', url: 'https://stackoverflow.com', description: 'Q&A for developers' },
      { name: 'Reddit r/MachineLearning', url: 'https://reddit.com/r/MachineLearning', description: 'ML discussions' },
      { name: 'Hacker News', url: 'https://news.ycombinator.com', description: 'Tech news and discussions' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Learning Resources
            </h1>
            <p className="text-xl text-indigo-100">
              Curated resources to master Data Science, AI, ML, and build your career
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESOURCES.map((resourceCategory, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">
                      {resourceCategory.category}
                    </h3>
                  </div>

                  {/* Resources List */}
                  <div className="p-6 space-y-4">
                    {resourceCategory.items.map((resource, resIdx) => (
                      <a
                        key={resIdx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors border-l-4 border-indigo-600"
                      >
                        <h4 className="font-bold text-gray-900 mb-1 hover:text-indigo-600 transition-colors">
                          {resource.name} →
                        </h4>
                        <p className="text-sm text-gray-600">
                          {resource.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center text-gray-900">
              Top Career Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Google Cloud Professional Data Engineer',
                  duration: '3-6 months',
                  level: 'Advanced',
                  color: 'from-red-500 to-orange-500',
                },
                {
                  name: 'Microsoft Azure Data Scientist',
                  duration: '2-4 months',
                  level: 'Intermediate',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  name: 'AWS ML Specialist',
                  duration: '3-5 months',
                  level: 'Advanced',
                  color: 'from-orange-500 to-yellow-500',
                },
                {
                  name: 'IBM Data Science Professional',
                  duration: '2-3 months',
                  level: 'Beginner',
                  color: 'from-purple-500 to-pink-500',
                },
              ].map((program, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${program.color} p-8 rounded-lg text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105`}
                >
                  <h3 className="text-2xl font-bold mb-4">{program.name}</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm opacity-90">
                      Duration: <span className="font-semibold">{program.duration}</span>
                    </p>
                    <p className="text-sm opacity-90">
                      Level: <span className="font-semibold">{program.level}</span>
                    </p>
                  </div>
                  <button className="px-6 py-2 bg-white text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
