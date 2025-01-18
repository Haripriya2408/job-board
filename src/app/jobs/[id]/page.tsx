// Remove 'use client' as this is a server component
import JobDetailsClient from './JobDetailsClient';

// Sample job data - in a real app, this would come from an API/database
const jobsData = {
  '1': {
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    location: "New York",
    type: "Full-time",
    salary: "$120k - $150k",
    experience: "3-5 years",
    team: "Product Development",
    posted: "2 days ago",
    description: "We are seeking a talented Senior Frontend Developer to join our dynamic team...",
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with designers and backend developers",
      "Optimize applications for maximum performance",
      "Implement and maintain quality assurance processes"
    ],
    requirements: [
      "3+ years of experience with React",
      "Strong understanding of JavaScript/TypeScript",
      "Experience with responsive design",
      "Knowledge of modern frontend build pipelines",
      "Excellent problem-solving skills"
    ],
    benefits: [
      "Competitive salary package",
      "Remote work options",
      "Health insurance",
      "401(k) matching",
      "Professional development budget"
    ]
  },
};

// This function is required for static site generation
export function generateStaticParams() {
  // Convert jobsData keys to params array
  return Object.keys(jobsData).map((id) => ({
    id,
  }));
}

// Mark the page component as static
export const dynamic = 'force-static';

// Add generateMetadata for static metadata
export function generateMetadata({ params }: { params: { id: string } }) {
  const job = jobsData[params.id as keyof typeof jobsData];
  
  return {
    title: job ? `${job.title} at ${job.company}` : 'Job Not Found',
    description: job?.description || 'Job listing not found',
  };
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = jobsData[params.id as keyof typeof jobsData];
  return <JobDetailsClient job={job} jobId={params.id} />;
}