const fs = require("fs");
const path = require("path");

const companies = [
  "TechCorp",
  "Creative Studios",
  "StartupXYZ",
  "Analytics Pro",
  "BrandBuilders",
  "CloudTech",
  "AppMasters",
  "ContentCraft",
];
const titles = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "UX Designer",
  "DevOps Engineer",
  "Mobile Developer",
  "Marketing Manager",
  "Product Manager",
];
const locations = [
  { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
  { name: "New York, NY", lat: 40.7128, lng: -74.006 },
  { name: "Austin, TX", lat: 30.2672, lng: -97.7431 },
  { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
  { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
  { name: "Denver, CO", lat: 39.7392, lng: -104.9903 },
  { name: "Boston, MA", lat: 42.3601, lng: -71.0589 },
  { name: "Portland, OR", lat: 45.5152, lng: -122.6784 },
  // Added several locations in Palestine
  { name: "Ramallah, Palestine", lat: 31.9074, lng: 35.2048 },
  { name: "Gaza, Palestine", lat: 31.5, lng: 34.4667 },
  { name: "Nablus, Palestine", lat: 32.2211, lng: 35.2544 },
  { name: "Hebron, Palestine", lat: 31.5326, lng: 35.0998 },
  { name: "Jenin, Palestine", lat: 32.4599, lng: 35.295 },
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSalary() {
  const min = 60000 + Math.floor(Math.random() * 100000);
  const max = min + 20000 + Math.floor(Math.random() * 40000);
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
}

function randomPostedDate() {
  const days = Math.floor(Math.random() * 14);
  return `${days || 1} day${days === 1 ? "" : "s"} ago`;
}

const mockJobs = Array.from({ length: 500 }, (_, i) => {
  const company = random(companies);
  const title = random(titles);
  const location = random(locations);
  return {
    id: (i + 1).toString(),
    title,
    company,
    companyLogo: `https://picsum.photos/seed/${i}/100`,
    location,
    salary: randomSalary(),
    type: "Full-time",
    workingHours: "9:00 AM - 5:00 PM",
    workingDays: "Monday - Friday",
    description: `We are seeking a ${title} to join ${company}. Collaborate with cross-functional teams to deliver scalable solutions.`,
    requirements: [
      "Relevant professional experience",
      "Strong communication and teamwork skills",
      "Problem-solving mindset",
      "Bachelor's degree in related field",
    ],
    benefits: [
      "Health insurance",
      "Flexible schedule",
      "Remote work options",
      "Professional development budget",
    ],
    postedDate: randomPostedDate(),
    companyEmail: `jobs@${company.toLowerCase().replace(/\s/g, "")}.com`,
  };
});

const outPath = path.resolve(__dirname, "..", "src", "mockData.ts");
const header = `import { Job } from './types';\n\n`;
const fileContent =
  header +
  `export const mockJobs: Job[] = ` +
  JSON.stringify(mockJobs, null, 2) +
  `;\n`;

fs.writeFileSync(outPath, fileContent, "utf8");
console.log("Wrote", outPath, "with", mockJobs.length, "jobs");
