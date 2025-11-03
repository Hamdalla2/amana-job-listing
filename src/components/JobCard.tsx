import React from 'react';
import { Job } from '../types';
import { MapPin, DollarSign, Clock, Bookmark } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface JobCardProps {
  job: Job;
  onClick: () => void;
  isSaved: boolean;
  onSave: () => void;
}

export function JobCard({ job, onClick, isSaved, onSave }: JobCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-750" onClick={onClick}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <img 
              src={job.companyLogo} 
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white">{job.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className={`${isSaved ? 'text-yellow-500' : 'text-gray-400'} dark:hover:bg-gray-700`}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
            {job.type}
          </Badge>
          <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-400">
            {job.postedDate}
          </Badge>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{job.location.name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{job.workingHours}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
