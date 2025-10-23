import React, { useState } from 'react';
import { Job } from '../types';
import { X, Upload, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyModal({ job, isOpen, onClose }: ApplyModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the application to the backend
    console.log('Application submitted:', {
      ...formData,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company
    });
    setSubmitted(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null
      });
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="dark:text-white">Apply for {job.title}</DialogTitle>
              <p className="text-gray-600 dark:text-gray-400">at {job.company}</p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="dark:text-gray-200">Full Name *</Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-200">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-gray-200">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter" className="dark:text-gray-200">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Tell us why you're a great fit for this role..."
                  rows={4}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume" className="dark:text-gray-200">Resume / CV *</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                  <input
                    id="resume"
                    type="file"
                    required
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {formData.resume ? formData.resume.name : 'Click to upload your resume'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 mt-1">PDF, DOC, or DOCX (max 10MB)</p>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose} className="dark:border-gray-600 dark:text-gray-300">
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Application
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your application has been sent to {job.company}. They will contact you at {formData.email}.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
