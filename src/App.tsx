import React, { useState, useEffect } from 'react';
import { JobMapPage } from './components/JobMapPage';
import { JobDetailsPage } from './components/JobDetailsPage';
import { SavedJobsPage } from './components/SavedJobsPage';
import { Header } from './components/Header';
import { Job } from './types';
import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { CVAnalyzerPage } from './components/CVAnalyzerPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'map' | 'details' | 'saved' | 'signin' | 'signup' | 'analyzer'>('map');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setCurrentPage('details');
  };

  const handleBackToMap = () => {
    setCurrentPage('map');
    setSelectedJob(null);
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          savedJobsCount={savedJobs.length}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />
        
        {currentPage === 'map' && (
          <JobMapPage 
            onJobSelect={handleJobSelect}
            savedJobs={savedJobs}
            onSaveJob={handleSaveJob}
          />
        )}
        
        {currentPage === 'details' && selectedJob && (
          <JobDetailsPage 
            job={selectedJob}
            onBack={handleBackToMap}
            isSaved={savedJobs.includes(selectedJob.id)}
            onSaveJob={handleSaveJob}
          />
        )}
        
        {currentPage === 'saved' && (
          <SavedJobsPage 
            savedJobIds={savedJobs}
            onJobSelect={handleJobSelect}
            onUnsaveJob={handleSaveJob}
          />
        )}

        {currentPage === 'signin' && (
          <SignInPage onNavigate={setCurrentPage} />
        )}

        {currentPage === 'signup' && (
          <SignUpPage onNavigate={setCurrentPage} />
        )}

        {currentPage === 'analyzer' && (
          <CVAnalyzerPage />
        )}
      </div>
    </div>
  );
}
