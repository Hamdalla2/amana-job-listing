import React, { useState, useCallback, useMemo } from "react";
import axios from "axios";
import {
  Upload,
  BrainCircuit,
  AlertCircle,
  Loader2,
  CheckCircle2,
  XCircle,
  Star,
  MapPin,
  Clock,
  FileText,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  Zap,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { mockJobs } from "../mockData";
import { Job } from "../types";

interface JobMatch extends Job {
  suitabilityPercentage: number;
}

interface CVAnalysis {
  strengths: string[];
  weaknesses: string[];
  extractedSkills: string[];
  suggestedSkillsToLearn: string[];
}

interface AnalysisResult {
  jobMatches: JobMatch[];
  cvAnalysis: CVAnalysis;
}

export function CVAnalyzerPage() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [filters, setFilters] = useState({
    type: "All",
  });
  const [isDragging, setIsDragging] = useState(false);

  // Get unique job types for the filter dropdown
  const jobTypes = useMemo(() => {
    const types = new Set(mockJobs.map((job) => job.type));
    return ["All", ...Array.from(types)];
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file.");
        setCvFile(null);
        return;
      }
      setCvFile(file);
      setError(null);
      setAnalysisResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setCvFile(file);
        setError(null);
        setAnalysisResult(null);
      } else {
        setError("Please upload a PDF file.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleAnalyze = useCallback(async () => {
    if (!cvFile) {
      setError("Please select a resume file to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    // Limit jobs sent to API - send only a sample of jobs for faster processing
    const MAX_JOBS_TO_SEND = 200;
    const jobsToSend =
      mockJobs.length > MAX_JOBS_TO_SEND
        ? mockJobs.slice(0, MAX_JOBS_TO_SEND)
        : mockJobs;

    console.log(
      `Sending ${jobsToSend.length} jobs to API (out of ${mockJobs.length} total)`,
    );

    const formData = new FormData();
    formData.append("resume", cvFile);
    formData.append("jobs", JSON.stringify(jobsToSend));
    formData.append("filters", JSON.stringify(filters));

    try {
      const response = await axios.post<AnalysisResult>(
        `${import.meta.env.VITE_WEBSITE_URI}:5000/cv-analyzer/analyze-cv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 180000, // 3 minutes timeout
        },
      );
      setAnalysisResult(response.data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "An unexpected error occurred.";
      setError(errorMessage);
      console.error("Analysis failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, [cvFile, filters]);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <header className="text-center space-y-4 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-800/50 mb-4">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI-Powered Analysis
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            CV Analyzer Pro
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get instant insights into your resume and discover job opportunities
            that match your skills perfectly
          </p>
        </header>

        {/* Enhanced Controls Section */}
        <Card className="dark:bg-gray-800/95 backdrop-blur-sm border-2 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="dark:text-white text-2xl">
                  Start Your Analysis
                </CardTitle>
                <CardDescription className="dark:text-gray-400 mt-1">
                  Upload your CV and let AI match you with the perfect
                  opportunities
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Enhanced File Upload */}
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="cv-upload"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3"
                >
                  <span className="inline-flex items-center gap-2">
                    <FileCheck className="w-4 h-4" />
                    Upload Your CV
                  </span>
                </label>
                <input
                  id="cv-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
                      relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
                      ${
                        isDragging
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105"
                          : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                      }
                      ${
                        cvFile
                          ? "border-green-500 bg-green-50/50 dark:bg-green-900/10"
                          : ""
                      }
                    `}
                  >
                    {cvFile ? (
                      <div className="space-y-3">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
                          <FileCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {cvFile.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {(cvFile.size / 1024).toFixed(1)} KB • Ready to
                            analyze
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                          <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {isDragging
                              ? "Drop your CV here"
                              : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            PDF format only • Max 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              {/* Enhanced Filters */}
              <div className="col-span-1 space-y-4">
                <div>
                  <label
                    htmlFor="job-type"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Filter Jobs
                    </span>
                  </label>
                  <Select
                    value={filters.type}
                    onValueChange={(value: string) => handleFilterChange("type", value)}
                  >
                    <SelectTrigger className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Analyze Button */}
                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading || !cvFile}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Analyze CV
                    </>
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="border-2">
                <AlertCircle className="h-5 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Loading State */}
        {isLoading && (
          <Card className="dark:bg-gray-800/95 backdrop-blur-sm border-2 shadow-xl">
            <CardContent className="flex flex-col items-center justify-center min-h-[500px] p-12">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <Loader2 className="w-16 h-16 animate-spin text-blue-600 dark:text-blue-400 relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Analyzing Your CV
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                Our AI is matching your skills with job opportunities and
                preparing your personalized analysis...
              </p>
              <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Processing</span>
                  <span>Please wait</span>
                </div>
                <Progress value={undefined} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Empty State */}
        {!isLoading && !error && !analysisResult && (
          <Card className="dark:bg-gray-800/95 backdrop-blur-sm border-2 shadow-xl">
            <CardContent className="flex flex-col items-center justify-center min-h-[500px] p-12 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-8 rounded-2xl">
                  <BrainCircuit className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Ready to Discover Your Career Path?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-6">
                Upload your CV above to get instant insights, job matches, and
                personalized recommendations powered by AI
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Smart Matching
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Career Insights
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800">
                  <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    AI-Powered
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Results */}
        {!isLoading && !error && analysisResult && (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Your Analysis Results
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {analysisResult.jobMatches.length} job matches found • Ready
                  to explore
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced Job Matches */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="dark:bg-gray-800/95 backdrop-blur-sm border-2 shadow-xl">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="dark:text-white text-xl">
                            Top Job Matches
                          </CardTitle>
                          <CardDescription className="dark:text-gray-400">
                            Sorted by suitability score
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {analysisResult.jobMatches.length === 0 ? (
                      <div className="text-center py-12">
                        <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          No jobs found matching your criteria. Try adjusting
                          your filters.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[1200px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-500">
                        {analysisResult.jobMatches.map((job, index) => (
                          <JobCard key={job.id} job={job} rank={index + 1} />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced CV Analysis */}
              <div className="lg:col-span-1">
                <Card className="dark:bg-gray-800/95 backdrop-blur-sm border-2 shadow-xl lg:sticky lg:top-8 max-h-[calc(100vh-100px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-500">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                        <BrainCircuit className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="dark:text-white text-xl">
                          CV Analysis
                        </CardTitle>
                        <CardDescription className="dark:text-gray-400">
                          Personalized insights
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <AnalysisSection
                      title="Strengths"
                      items={analysisResult.cvAnalysis.strengths}
                      icon="check"
                      color="green"
                    />
                    <AnalysisSection
                      title="Areas for Improvement"
                      items={analysisResult.cvAnalysis.weaknesses}
                      icon="x"
                      color="red"
                    />
                    <AnalysisSection
                      title="Your Skills"
                      items={analysisResult.cvAnalysis.extractedSkills}
                      pills
                    />
                    <AnalysisSection
                      title="Recommended Skills"
                      items={analysisResult.cvAnalysis.suggestedSkillsToLearn}
                      icon="star"
                      color="yellow"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Job Card Component
function JobCard({ job, rank }: { job: JobMatch; rank: number }) {
  const percentage = job.suitabilityPercentage;
  let barColor = "bg-blue-600";
  let textColor = "text-blue-400";
  let bgGradient = "from-blue-500/10 to-blue-500/5";

  if (percentage >= 85) {
    barColor = "bg-green-600";
    textColor = "text-green-400";
    bgGradient = "from-green-500/10 to-green-500/5";
  } else if (percentage >= 60) {
    barColor = "bg-yellow-500";
    textColor = "text-yellow-400";
    bgGradient = "from-yellow-500/10 to-yellow-500/5";
  } else if (percentage < 40) {
    barColor = "bg-red-600";
    textColor = "text-red-400";
    bgGradient = "from-red-500/10 to-red-500/5";
  }

  return (
    <Card
      className={`dark:bg-gray-900/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-blue-400 dark:hover:border-blue-500 bg-gradient-to-r ${bgGradient}`}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {rank <= 3 && (
                <Badge
                  variant="default"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                >
                  #{rank}
                </Badge>
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {job.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                {job.company}
              </p>
              <span className="text-gray-400">•</span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {job.salary}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{job.location.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur opacity-50"></div>
              <img
                className="relative w-16 h-16 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                src={
                  job.companyLogo ||
                  `https://placehold.co/100x100/374151/E5E7EB?text=${job.company[0]}`
                }
                alt={`${job.company} logo`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/100x100/374151/E5E7EB?text=${job.company[0]}`;
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Match Score
            </span>
            <span className={`text-2xl font-bold ${textColor}`}>
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out shadow-lg`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-end mt-2">
            <Button variant="ghost" size="sm" className="text-xs">
              View Details
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Analysis Section Component
function AnalysisSection({
  title,
  items,
  icon,
  color,
  pills,
}: {
  title: string;
  items: string[];
  icon?: "check" | "x" | "star";
  color?: "green" | "red" | "yellow";
  pills?: boolean;
}) {
  const icons = {
    check: <CheckCircle2 className="h-5 w-5" />,
    x: <XCircle className="h-5 w-5" />,
    star: <Star className="h-5 w-5" />,
  };

  const colors = {
    green: "text-green-600 dark:text-green-400",
    red: "text-red-600 dark:text-red-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
  };

  const bgColors = {
    green:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    yellow:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon && (
          <div className={`p-1.5 rounded-lg ${bgColors[color || "green"]}`}>
            <span className={colors[color || "green"]}>{icons[icon]}</span>
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      {pills ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
            >
              {item}
            </Badge>
          ))}
        </div>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, index) => (
            <li
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                bgColors[color || "green"]
              } border`}
            >
              <span
                className={`flex-shrink-0 mt-0.5 ${colors[color || "green"]}`}
              >
                {icon && icons[icon]}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
