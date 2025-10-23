import React, { useState } from 'react';
import { Job } from '../types';
import { ArrowLeft, MapPin, DollarSign, Clock, Calendar, Bookmark, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ApplyModal } from './ApplyModal';

interface JobDetailsPageProps {
  job: Job;
  onBack: () => void;
  isSaved: boolean;
  onSaveJob: (jobId: string) => void;
}

export function JobDetailsPage({ job, onBack, isSaved, onSaveJob }: JobDetailsPageProps) {
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 dark:text-gray-300">
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Button>

        {/* Header Card */}
        <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <img 
                src={job.companyLogo} 
                alt={job.company}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h1 className="text-gray-900 dark:text-white mb-1">{job.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{job.company}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                    {job.type}
                  </Badge>
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-400">
                    Posted {job.postedDate}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onSaveJob(job.id)}
                className={isSaved ? 'text-yellow-500 border-yellow-500' : 'dark:border-gray-600 dark:text-gray-300'}
              >
                <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
              </Button>
              <Button onClick={() => setShowApplyModal(true)} size="lg" className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Apply Now
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-gray-900 dark:text-white">{job.location.name}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Salary</p>
                <p className="text-gray-900 dark:text-white">{job.salary}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Hours</p>
                <p className="text-gray-900 dark:text-white">{job.workingHours}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Days</p>
                <p className="text-gray-900 dark:text-white">{job.workingDays}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-gray-900 dark:text-white mb-4">Job Description</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {job.description}
              </p>
            </Card>

            {/* Requirements */}
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-gray-900 dark:text-white mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Benefits */}
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-gray-900 dark:text-white mb-4">Benefits</h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mini Map */}
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-white mb-4">Location</h3>
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 dark:opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="mini-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mini-grid)" />
                  </svg>
                </div>
                <MapPin className="w-12 h-12 text-red-500 relative z-10" fill="currentColor" />
              </div>
              <p className="text-gray-700 dark:text-gray-300">{job.location.name}</p>
            </Card>

            {/* Apply CTA */}
            <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h3 className="text-gray-900 dark:text-white mb-2">Ready to Apply?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Submit your application and our team will review it shortly.
              </p>
              <Button onClick={() => setShowApplyModal(true)} className="w-full">
                Apply for this Position
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        job={job}
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
      />
    </div>
  );
}
