import React, { useState } from 'react';
import axios from 'axios';
import { Upload, BrainCircuit, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

// Helper component to render markdown-like text from the AI
const AnalysisResultDisplay = ({ result }: { result: string }) => {
  const lines = result.split('\n').filter(line => line.trim() !== '');

  const elements = lines.map((line, index) => {
    if (line.startsWith('### ')) {
      return <h3 key={index} className="text-xl font-semibold mt-6 mb-2 text-blue-600 dark:text-blue-300">{line.substring(4)}</h3>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-primary dark:text-blue-200">{line.substring(3)}</h2>;
    }
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-primary dark:text-blue-100">{line.substring(2)}</h1>;
    }
    if (line.startsWith('- ')) {
      const content = line.substring(2);
      const parts = content.split(/(\*\*.*?\*\*)/g);
      return (
        <li key={index} className="ml-5 list-disc list-outside mb-1 text-gray-600 dark:text-gray-300">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-semibold text-gray-800 dark:text-gray-100">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </li>
      );
    }
    return (
      <p key={index} className="text-gray-700 dark:text-gray-400 leading-relaxed">
        {line}
      </p>
    );
  });

  return <div className="space-y-2">{elements}</div>;
};


export function CVAnalyzerPage() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        setCvFile(null);
        return;
      }
      setCvFile(file);
      setError(null);
      setRecommendations(null);
    }
  };

  const handleAnalyze = async () => {
    if (!cvFile) {
      setError('Please select a resume file to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    const formData = new FormData();
    formData.append('resume', cvFile);

    try {
      const response = await axios.post('http://localhost:3001/api/analyze-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRecommendations(response.data.recommendations);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'An unexpected error occurred.';
      setError(errorMessage);
      console.error('Analysis failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">CV Analyzer & Career Advisor</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Upload your resume to get personalized career path recommendations powered by AI.
          </p>
        </header>

        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Upload Your Resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <input id="cv-upload" type="file" onChange={handleFileChange} accept=".pdf" className="hidden" />
              <label htmlFor="cv-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">{cvFile ? cvFile.name : 'Click to upload your CV'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF only (max 10MB)</p>
              </label>
            </div>

            <Button onClick={handleAnalyze} disabled={!cvFile || isLoading} className="w-full">
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <BrainCircuit className="w-5 h-5 mr-2" />}
              {isLoading ? 'Analyzing...' : 'Get Career Recommendations'}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {recommendations && (
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Career Recommendations</CardTitle>
              <CardDescription className="dark:text-gray-400">Based on your resume, here are some potential career paths:</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalysisResultDisplay result={recommendations} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
    