// app/page.tsx
'use client';
import { useState } from 'react';
import JobList from '@/components/JobList';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobType, setJobType] = useState('');

  const handleSearch = (query: string, type: string) => {
    setSearchQuery(query);
    setJobType(type);
  };

  return (
    <div>
      
        <JobList />
      </div>

  );
}