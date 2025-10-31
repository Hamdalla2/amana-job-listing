import React, { useState } from 'react';
import { Upload, User, Mail, Phone, FileText, BrainCircuit, CheckCircle } from 'lucide-react';
import { Button } from "./button";
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card';
import { Separator } from './separator';
import { Alert, AlertDescription, AlertTitle } from './alert';

export function ProfilePage() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Mock user data
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 987-6543',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
      setAnalysisComplete(false); // Reset analysis state if a new file is chosen
    }
  };

  const handleAnalyze = () => {
    if (!cvFile) return;

    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My Profile</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Manage your information and analyze your CV for tailored job recommendations.
          </p>
        </header>

        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Personal Information</CardTitle>
            <CardDescription className="dark:text-gray-400">Your contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-200">{user.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-200">{user.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-200">{user.phone}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">CV Analysis</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Upload your CV to get an AI-powered analysis of your skills and experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cv-upload" className="dark:text-gray-200">Your Resume / CV</Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <Input
                  id="cv-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {cvFile ? cvFile.name : 'Click to upload your CV'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF, DOC, or DOCX (max 10MB)</p>
                </label>
              </div>
            </div>
            
            <Button onClick={handleAnalyze} disabled={!cvFile || isAnalyzing} className="w-full">
              {isAnalyzing ? 'Analyzing...' : 'Analyze My CV'}
              <BrainCircuit className="w-5 h-5 ml-2" />
            </Button>

            {analysisComplete && (
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-300">Analysis Complete!</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Your CV has been processed. We will now use this information to suggest relevant jobs.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}