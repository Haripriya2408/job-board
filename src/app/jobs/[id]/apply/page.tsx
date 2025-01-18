import ApplyPageClient from './ApplyPageClient';

// Sample job data - in a real app, this would come from an API/database
const jobsData = {
  '1': {
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    location: "New York",
    type: "Full-time",
    salary: "$120k - $150k",
    experience: "3-5 years",
  },
};

// Required for static site generation
export function generateStaticParams() {
  return Object.keys(jobsData).map((id) => ({
    id,
  }));
}

// Mark the page as static
export const dynamic = 'force-static';

// Add static metadata
export function generateMetadata({ params }: { params: { id: string } }) {
  const job = jobsData[params.id as keyof typeof jobsData];
  
  return {
    title: job ? `Apply for ${job.title} at ${job.company}` : 'Apply for Position',
  };
}

export default function ApplyPage({ params }: { params: { id: string } }) {
  const job = jobsData[params.id as keyof typeof jobsData];
  return <ApplyPageClient jobId={params.id} job={job} />;
}