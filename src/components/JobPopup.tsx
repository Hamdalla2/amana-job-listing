import React from 'react';
import { Job } from '../types';
import { X, MapPin, DollarSign, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface JobPopupProps {
  job: Job;
  onClose: () => void;
  onViewDetails: () => void;
  isSaved: boolean;
  onSave: () => void;
}

export function JobPopup({ job, onClose, onViewDetails, isSaved, onSave }: JobPopupProps) {
  return (
    <Card className="w-80 shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={job.companyLogo} 
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-gray-900 dark:text-white">{job.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              className={isSaved ? 'text-yellow-500' : 'text-gray-400'}
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{job.location.name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
          {job.description}
        </p>

        <Button onClick={onViewDetails} className="w-full">
          More Details
        </Button>
      </div>
    </Card>
  );
}
