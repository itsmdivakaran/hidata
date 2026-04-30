'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import JobCard from '@/app/components/JobCard';
import { useState } from 'react';

// Sample job data - replace with real data or API call
const SAMPLE_JOBS = [
  {
    id: 1,
    title: 'Machine Learning Engineer',
    company: 'TCS',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹15-25 LPA',
    description:
      'Build ML models for data analysis and prediction. Work with Python, TensorFlow, and cloud platforms.',
    skills: ['Python', 'TensorFlow', 'AWS', 'SQL'],
    category: 'ML/AI',
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'Pharma XYZ',
    location: 'Mumbai, India',
    type: 'Full-time',
    salary: '₹12-20 LPA',
    description:
      'Analyze clinical trial data and develop statistical models for pharmaceutical research.',
    skills: ['Python', 'R', 'Statistics', 'SQL', 'Tableau'],
    category: 'Pharma/CRO',
  },
  {
    id: 3,
    title: 'AI Research Scientist',
    company: 'Google India',
    location: 'Hyderabad, India',
    type: 'Full-time',
    salary: '₹25-40 LPA',
    description:
      'Research and develop advanced AI algorithms. Publish papers and contribute to AI community.',
    skills: ['Python', 'Deep Learning', 'Research', 'PyTorch'],
    category: 'AI',
  },
  {
    id: 4,
    title: 'Data Analyst',
    company: 'Gartner',
    location: 'Pune, India',
    type: 'Full-time',
    salary: '₹8-15 LPA',
    description: 'Analyze business data and create dashboards for stakeholders.',
    skills: ['Excel', 'Power BI', 'SQL', 'Python'],
    category: 'Data',
  },
  {
    id: 5,
    title: 'CRO Data Manager',
    company: 'ICON plc',
    location: 'Gurgaon, India',
    type: 'Full-time',
    salary: '₹10-18 LPA',
    description: 'Manage and analyze clinical trial data with precision and compliance.',
    skills: ['SAS', 'SQL', 'Clinical Data', 'CDISC'],
    category: 'Pharma/CRO',
  },
  {
    id: 6,
    title: 'Data Engineering Lead',
    company: 'Microsoft',
    location: 'Delhi, India',
    type: 'Full-time',
    salary: '₹20-30 LPA',
    description:
      'Design and build scalable data pipelines. Lead data infrastructure projects.',
    skills: ['Spark', 'Scala', 'Azure', 'Kafka'],
    category: 'Data',
  },
];

export default function JobsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(SAMPLE_JOBS.map((job) => job.category)));
  const filteredJobs = selectedCategory
    ? SAMPLE_JOBS.filter((job) => job.category === selectedCategory)
    : SAMPLE_JOBS;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Job Opportunities
            </h1>
            <p className="text-xl text-green-100">
              Find the best careers in Data Science, AI, ML, and related fields across India
            </p>
          </div>
        </section>

        {/* Filter & Jobs Grid */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                }`}
              >
                All Jobs
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  type={job.type}
                  salary={job.salary}
                  description={job.description}
                  skills={job.skills}
                  category={job.category}
                />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Post Your Job Listing</h2>
              <p className="mb-6 text-green-100">
                Are you hiring? Share your job openings with our community.
              </p>
              <button className="px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:shadow-lg transition-all">
                Submit Job Listing
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
