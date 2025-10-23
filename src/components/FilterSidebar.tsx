import React from 'react';
import { FilterOptions } from '../types';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const handleJobTypeToggle = (type: string) => {
    const newTypes = filters.jobTypes.includes(type)
      ? filters.jobTypes.filter(t => t !== type)
      : [...filters.jobTypes, type];
    onFiltersChange({ ...filters, jobTypes: newTypes });
  };

  const handleReset = () => {
    onFiltersChange({
      jobTypes: [],
      salaryRange: [0, 200000],
      distance: 50,
      searchQuery: filters.searchQuery
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900 dark:text-white">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleReset} className="dark:text-gray-300">
          Reset
        </Button>
      </div>

      {/* Job Type */}
      <div className="space-y-3">
        <Label className="dark:text-gray-200">Job Type</Label>
        {JOB_TYPES.map(type => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={type}
              checked={filters.jobTypes.includes(type)}
              onCheckedChange={() => handleJobTypeToggle(type)}
            />
            <label
              htmlFor={type}
              className="text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              {type}
            </label>
          </div>
        ))}
      </div>

      {/* Salary Range */}
      <div className="space-y-3">
        <Label className="dark:text-gray-200">Salary Range</Label>
        <div className="pt-2">
          <Slider
            min={0}
            max={200000}
            step={10000}
            value={filters.salaryRange}
            onValueChange={(value) => onFiltersChange({ ...filters, salaryRange: value as [number, number] })}
          />
        </div>
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
          <span>${(filters.salaryRange[0] / 1000).toFixed(0)}k</span>
          <span>${(filters.salaryRange[1] / 1000).toFixed(0)}k</span>
        </div>
      </div>

      {/* Distance */}
      <div className="space-y-3">
        <Label className="dark:text-gray-200">Distance: {filters.distance} miles</Label>
        <Slider
          min={5}
          max={100}
          step={5}
          value={[filters.distance]}
          onValueChange={(value) => onFiltersChange({ ...filters, distance: value[0] })}
        />
      </div>
    </div>
  );
}
