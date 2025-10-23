import React, { useState } from 'react';
import { Job } from '../types';
import { MapPin } from 'lucide-react';
import { JobPopup } from './JobPopup';

interface MapComponentProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  savedJobs: string[];
  onSaveJob: (jobId: string) => void;
}

export function MapComponent({ jobs, onJobSelect, savedJobs, onSaveJob }: MapComponentProps) {
  const [selectedPin, setSelectedPin] = useState<Job | null>(null);

  // Calculate map bounds
  const centerLat = jobs.length > 0 
    ? jobs.reduce((sum, job) => sum + job.location.lat, 0) / jobs.length 
    : 37.7749;
  const centerLng = jobs.length > 0 
    ? jobs.reduce((sum, job) => sum + job.location.lng, 0) / jobs.length 
    : -122.4194;

  // Simple projection for demo purposes
  const latToY = (lat: number) => {
    const range = 20; // degrees
    return ((centerLat - lat + range/2) / range) * 100;
  };

  const lngToX = (lng: number) => {
    const range = 30; // degrees
    return ((lng - centerLng + range/2) / range) * 100;
  };

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Map Background - simplified grid */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Streets overlay */}
      <div className="absolute inset-0">
        {/* Simulated streets */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gray-300 dark:bg-gray-700"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 dark:bg-gray-600"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gray-300 dark:bg-gray-700"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-600"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"></div>
      </div>

      {/* Job Pins */}
      {jobs.map((job) => {
        const x = lngToX(job.location.lng);
        const y = latToY(job.location.lat);
        const isSelected = selectedPin?.id === job.id;

        return (
          <button
            key={job.id}
            className={`absolute transform -translate-x-1/2 -translate-y-full transition-all ${
              isSelected ? 'z-30' : 'z-10'
            }`}
            style={{
              left: `${x}%`,
              top: `${y}%`
            }}
            onClick={() => setSelectedPin(job)}
          >
            <div className={`relative ${isSelected ? 'scale-125' : 'hover:scale-110'} transition-transform`}>
              <MapPin
                className={`w-8 h-8 ${
                  isSelected 
                    ? 'text-blue-600 fill-blue-600' 
                    : 'text-red-500 fill-red-500'
                }`}
              />
              {savedJobs.includes(job.id) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full"></div>
              )}
            </div>
          </button>
        );
      })}

      {/* Job Popup */}
      {selectedPin && (
        <div className="absolute z-40" style={{
          left: `${lngToX(selectedPin.location.lng)}%`,
          top: `${latToY(selectedPin.location.lat)}%`,
          transform: 'translate(-50%, -100%)',
          marginTop: '-12px'
        }}>
          <JobPopup
            job={selectedPin}
            onClose={() => setSelectedPin(null)}
            onViewDetails={() => onJobSelect(selectedPin)}
            isSaved={savedJobs.includes(selectedPin.id)}
            onSave={() => onSaveJob(selectedPin.id)}
          />
        </div>
      )}

      {/* Map Attribution */}
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 px-3 py-1.5 rounded shadow-lg text-gray-600 dark:text-gray-400">
        Interactive Job Map
      </div>
    </div>
  );
}
