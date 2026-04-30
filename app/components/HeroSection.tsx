'use client';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 md:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-lg">
            Hi<span className="text-yellow-300">Data</span>
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90 mb-8 drop-shadow-lg">
            Your Complete Gateway to Data Science, AI & Career Opportunities in India
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a
            href="/news"
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Latest News
          </a>
          <a
            href="/jobs"
            className="px-8 py-4 bg-yellow-300 text-purple-600 font-bold rounded-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Find Jobs Now
          </a>
          <a
            href="/timelines"
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition-all"
          >
            Explore History
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 md:gap-12">
          <div className="text-white">
            <div className="text-3xl md:text-4xl font-bold">1000+</div>
            <div className="text-sm md:text-base opacity-90">Job Listings</div>
          </div>
          <div className="text-white">
            <div className="text-3xl md:text-4xl font-bold">500+</div>
            <div className="text-sm md:text-base opacity-90">Daily News</div>
          </div>
          <div className="text-white">
            <div className="text-3xl md:text-4xl font-bold">50K+</div>
            <div className="text-sm md:text-base opacity-90">Community</div>
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <svg
        className="absolute bottom-0 w-full h-32 text-white"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="currentColor"
        ></path>
      </svg>
    </section>
  );
}
