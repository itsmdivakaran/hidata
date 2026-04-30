'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const TIMELINES = [
  {
    title: 'History of Data',
    items: [
      { year: '1960s', event: 'Birth of Data Science', description: 'Early concepts of data collection and analysis emerge' },
      { year: '1974', event: 'SQL Invented', description: 'Structured Query Language revolutionizes data management' },
      { year: '1990s', event: 'Data Warehousing Boom', description: 'Organizations begin storing massive amounts of data' },
      { year: '2000s', event: 'Big Data Era', description: 'Hadoop and distributed computing change data processing' },
      { year: '2010s', event: 'Cloud Data Solutions', description: 'AWS, Azure, GCP democratize data storage and analytics' },
      { year: '2020s', event: 'Real-time Data Processing', description: 'Streaming analytics and edge computing become mainstream' },
    ],
  },
  {
    title: 'History of Data Science',
    items: [
      { year: '1962', event: 'Statistics Meets Computing', description: 'Early foundations of data science laid' },
      { year: '1996', event: 'Term "Data Mining" Coined', description: 'Extracting patterns from large datasets becomes formal' },
      { year: '2001', event: 'Data Science Framework', description: 'William S. Cleveland proposes data science as a discipline' },
      { year: '2012', event: 'Big Data Goes Mainstream', description: 'Kaggle competitions popularize data science' },
      { year: '2015', event: 'Deep Learning Revolution', description: 'Neural networks solve previously impossible problems' },
      { year: '2023', event: 'AI-Driven Data Science', description: 'AutoML and GenAI transform data science workflows' },
    ],
  },
  {
    title: 'History of AI',
    items: [
      { year: '1956', event: 'Dartmouth Summer', description: 'Birth of AI as an academic discipline' },
      { year: '1966', event: 'ELIZA Chatbot', description: 'First conversational AI created' },
      { year: '1974-1980', event: 'First AI Winter', description: 'Disappointment with early AI limitations' },
      { year: '1997', event: 'Deep Blue Defeats Kasparov', description: 'AI beats world chess champion' },
      { year: '2011', event: 'IBM Watson Wins Jeopardy!', description: 'Natural language understanding advances significantly' },
      { year: '2016', event: 'AlphaGo Defeats Lee Sedol', description: 'Deep learning conquers Go, a game thought impossible for AI' },
      { year: '2022', event: 'ChatGPT Released', description: 'Generative AI goes mainstream, transforming the world' },
      { year: '2023-2024', event: 'AGI Race Begins', description: 'Companies race toward Artificial General Intelligence' },
    ],
  },
];

export default function TimelinesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Journey Through Time
            </h1>
            <p className="text-xl text-orange-100">
              Explore the fascinating history and evolution of Data, Data Science, and AI
            </p>
          </div>
        </section>

        {/* Timelines */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {TIMELINES.map((timeline, timelineIdx) => (
              <div key={timelineIdx} className="mb-16">
                <h2 className="text-3xl md:text-4xl font-black mb-12 text-center text-gray-900">
                  {timeline.title}
                </h2>

                {/* Timeline */}
                <div className="relative">
                  {/* Center line */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-red-600"></div>

                  {/* Timeline items */}
                  <div className="space-y-12">
                    {timeline.items.map((item, idx) => (
                      <div key={idx} className={`flex gap-6 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        {/* Left/Right content */}
                        <div className="md:w-1/2 flex flex-col justify-center">
                          <div className={`bg-white p-6 rounded-lg shadow-lg ${
                            idx % 2 === 0 ? 'md:text-right' : ''
                          }`}>
                            <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full mb-2">
                              {item.year}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {item.event}
                            </h3>
                            <p className="text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Center dot */}
                        <div className="hidden md:flex md:w-auto justify-center">
                          <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full border-4 border-white shadow-lg"></div>
                        </div>

                        {/* Right/Left (empty for alignment) */}
                        <div className="md:w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Future Timeline */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center text-gray-900">
              What's Next? The Future of AI & Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'AGI & Beyond',
                  description:
                    'Artificial General Intelligence expected to emerge, matching human cognitive abilities across all domains.',
                  icon: '🧠',
                },
                {
                  title: 'Quantum Computing',
                  description:
                    'Quantum computers will revolutionize data processing and solve previously intractable problems.',
                  icon: '⚛️',
                },
                {
                  title: 'Decentralized AI',
                  description:
                    'AI models running on edge devices with privacy and without central servers.',
                  icon: '🌐',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
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
