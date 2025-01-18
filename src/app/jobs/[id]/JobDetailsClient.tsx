
'use client';

import { MapPin, DollarSign, Clock, Building, Briefcase, Users, Mail } from 'lucide-react';
import Link from 'next/link';
interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  team: string;
  posted: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export default function JobDetailsClient({ job, jobId }: { job: Job | undefined, jobId: string }) {
  // If job is not found, show an error state
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job posting you are looking for does not exist or has been removed.</p>
          <Link 
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            View All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-white p-3 rounded-lg">
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <span className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {job.company}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.posted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Job Information */}
            <div className="md:col-span-2 space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Job Type</p>
                      <p className="font-medium text-black">{job.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium text-black">{job.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Team</p>
                      <p className="font-medium text-black">{job.team}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium text-black">{job.experience}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-black">Job Description</h2>
                <p className="text-gray-600 mb-6">{job.description}</p>

                <h3 className="text-lg font-semibold mb-3 text-black">Key Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-600">{resp}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-3 text-black">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Now Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <Link 
                  href={`/jobs/${jobId}/apply`}
                  className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Apply Now
                </Link>
                <button className="mt-3 w-full border border-gray-300 text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Save Job
                </button>
              </div>

              {/* Benefits Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 text-black">
                <h3 className="text-lg font-semibold mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 text-black">
                <h3 className="text-lg font-semibold mb-4">About {job.company}</h3>
                <p className="text-gray-600">
                  Tech Corp is a leading software company specializing in innovative solutions...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}