'use client';

import { Search, MapPin, Briefcase, DollarSign, Clock, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Company Inc.",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120k - $150k",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Part-time",
      salary: "$80k - $100k",
      posted: "1 week ago"
    },
    // Add more jobs as needed
  ]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !jobType || job.type.toLowerCase() === jobType.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Next Dream Job
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Discover thousands of job opportunities with all the information you need
            </p>
            <div className="bg-white/95 backdrop-blur rounded-xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-black"
                  />
                </div>
                <div className="flex-1 relative">
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-black"
                  >
                    <option value="">All Job Types</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="bg-gray-50/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Jobs</h2>
            <Link href="/jobs" className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-all">
              View All Jobs
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      
                    </div>
                    <span className="bg-purple-50 text-purple-600 px-4 py-1 rounded-full text-sm font-medium border border-purple-100">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mb-4 font-medium">{job.company}</p>
                  <div className="space-y-3 text-gray-500 text-sm mb-6">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-emerald-500" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-pink-500" />
                      {job.posted}
                    </div>
                  </div>
                  <Link 
                    href={`/jobs/${job.id}`}
                    className="block w-full bg-gray-50 text-center py-3 rounded-lg text-purple-600 font-medium hover:bg-purple-600 hover:text-white transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>


          {/* Job Categories */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Development', 'Design', 'Marketing', 'Sales', 'Customer Service', 'Finance', 'HR', 'Engineering'].map((category) => (
                <div key={category} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer">
                  <Briefcase className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{category}</h3>
                  <p className="text-sm text-gray-500 mt-1">124 jobs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}