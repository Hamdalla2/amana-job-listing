import React from 'react';
import { Job } from '../types';
import { JobCard } from './JobCard';
import { ScrollArea } from './ui/scroll-area';

interface JobListProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  savedJobs: string[];
  onSaveJob: (jobId: string) => void;
}

export function JobList({ jobs, onJobSelect, savedJobs, onSaveJob }: JobListProps) {
  return (
    <ScrollArea className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="p-4 space-y-3">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onJobSelect(job)}
            isSaved={savedJobs.includes(job.id)}
            onSave={() => onSaveJob(job.id)}
          />
        ))}
        {jobs.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No jobs found matching your criteria
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
