import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import NewsCard from '@/app/components/NewsCard';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '📰',
                  title: 'Latest News',
                  description:
                    'Stay updated with top news in Data Science, AI, ML, and AGI',
                },
                {
                  icon: '💼',
                  title: 'Job Portal',
                  description:
                    'Find best career opportunities across India in tech and pharma',
                },
                {
                  icon: '🕐',
                  title: 'Interactive Timelines',
                  description:
                    'Explore the fascinating history of Data, Data Science, and AI',
                },
                {
                  icon: '📚',
                  title: 'Learning Resources',
                  description:
                    'Curated courses, books, and platforms to master your skills',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg border-2 border-gray-200 hover:border-purple-600 hover:shadow-lg transition-all text-center"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { number: '1000+', label: 'Active Jobs' },
                { number: '500+', label: 'News Articles' },
                { number: '50K+', label: 'Community Members' },
                { number: '100+', label: 'Learning Resources' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    {stat.number}
                  </div>
                  <p className="text-gray-600 font-semibold mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
              Why Choose HiData?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: 'India-Focused',
                  description:
                    'Job listings and news specifically tailored for Indian professionals and companies',
                  color: 'from-orange-400 to-red-500',
                },
                {
                  title: 'Weekly Updates',
                  description:
                    'Top news curated and delivered weekly to keep you ahead of the curve',
                  color: 'from-green-400 to-emerald-500',
                },
                {
                  title: 'Comprehensive Coverage',
                  description:
                    'From Data roles to Pharma/CRO data specialists, we cover all areas',
                  color: 'from-blue-400 to-purple-500',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${item.color} p-8 rounded-lg text-white shadow-lg`}
                >
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="opacity-90">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Explore?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your journey with the latest news, job opportunities, and learning resources
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/news"
                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-block"
              >
                View Latest News
              </Link>
              <Link
                href="/jobs"
                className="px-8 py-4 bg-yellow-300 text-purple-600 font-bold rounded-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-block"
              >
                Browse Jobs
              </Link>
              <Link
                href="/timelines"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition-all"
              >
                Explore History
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
