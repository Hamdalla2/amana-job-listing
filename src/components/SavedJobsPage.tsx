import React from 'react';
import { mockJobs } from '../mockData';
import { Job } from '../types';
import { JobCard } from './JobCard';
import { Bookmark } from 'lucide-react';

interface SavedJobsPageProps {
  savedJobIds: string[];
  onJobSelect: (job: Job) => void;
  onUnsaveJob: (jobId: string) => void;
}

export function SavedJobsPage({ savedJobIds, onJobSelect, onUnsaveJob }: SavedJobsPageProps) {
  const savedJobs = mockJobs.filter(job => savedJobIds.includes(job.id));

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-gray-900 dark:text-white">Saved Jobs</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
        </div>

        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {savedJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => onJobSelect(job)}
                isSaved={true}
                onSave={() => onUnsaveJob(job.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white mb-2">No saved jobs yet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start exploring jobs and save the ones you're interested in!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
