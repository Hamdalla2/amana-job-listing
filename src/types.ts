export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  salary: string;
  type: string;
  workingHours: string;
  workingDays: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  companyEmail: string;
}

export interface FilterOptions {
  jobTypes: string[];
  salaryRange: [number, number];
  distance: number;
  searchQuery: string;
}
