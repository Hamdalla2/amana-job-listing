import React, { useState, useMemo, useEffect } from "react";
import { MapComponent } from "./MapComponent";
import { SearchBar } from "./SearchBar";
import { FilterSidebar } from "./FilterSidebar";
import { JobList } from "./JobList";
import { mockJobs } from "../mockData";
import { Job, FilterOptions } from "../types";
import { SlidersHorizontal, List, Map } from "lucide-react";
import { Button } from "./ui/button";

interface JobMapPageProps {
  onJobSelect: (job: Job) => void;
  savedJobs: string[];
  onSaveJob: (jobId: string) => void;
}

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function JobMapPage({
  onJobSelect,
  savedJobs,
  onSaveJob,
}: JobMapPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"map" | "list" | "both">("both");
  const [filters, setFilters] = useState<FilterOptions>({
    jobTypes: [],
    salaryRange: [0, 200000],
    distance: 50,
    searchQuery: "",
  });

  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => setUserLocation([31.77, 35.21]), // fallback Palestine
      { enableHighAccuracy: true }
    );
  }, []);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.name.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Salary filter
      console.log(`Job Location: ${job.location.name}`);
      console.log(job.salary);
      const salaryMatch = job.salary
        .replace(/[$,]/g, "")
        .match(/\$?(\d[\d,]*)/g);
      if (salaryMatch && salaryMatch.length >= 2) {
        const [min, max] = salaryMatch.map((s) =>
          parseInt(s.replace(/[$,]/g, ""), 10)
        );
        if (min < filters.salaryRange[0] || max > filters.salaryRange[1])
          return false;
      }

      // Job type filter
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.type)) {
        return false;
      }

      // Distance filter
      if (userLocation && filters.distance > 0) {
        const distance = getDistanceFromLatLonInKm(
          userLocation[0],
          userLocation[1],
          job.location.lat,
          job.location.lng
        );
        if (distance > filters.distance) {
          return false;
        }
      }

      return true;
    });
  }, [filters, userLocation]);

  return (
    <div className="h-[calc(100vh-73px)] flex flex-col">
      {/* Search and Controls */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <SearchBar
                value={filters.searchQuery}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, searchQuery: value }))
                }
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>

            <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-600 rounded-lg p-1">
              <Button
                variant={viewMode === "map" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="dark:text-gray-300"
              >
                <Map className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "both" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("both")}
                className="dark:text-gray-300"
              >
                Both
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="dark:text-gray-300"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-2 text-gray-600 dark:text-gray-400">
            {filteredJobs.length} jobs found
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {showFilters && (
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-white dark:bg-gray-800 transition-colors">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>
        )}

        <div className="flex-1 flex">
          {(viewMode === "map" || viewMode === "both") && (
            <div className={viewMode === "both" ? "flex-1" : "w-full"}>
              <MapComponent
                jobs={filteredJobs}
                onJobSelect={onJobSelect}
                savedJobs={savedJobs}
                onSaveJob={onSaveJob}
              />
            </div>
          )}

          {(viewMode === "list" || viewMode === "both") && (
            <div
              className={
                viewMode === "both"
                  ? "w-96 border-l border-gray-200 dark:border-gray-700"
                  : "w-full"
              }
            >
              <JobList
                jobs={filteredJobs}
                onJobSelect={onJobSelect}
                savedJobs={savedJobs}
                onSaveJob={onSaveJob}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
