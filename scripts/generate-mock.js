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
const types = ["Full-time", "Part-time", "Contract", "Internship"];
const locations = [
  { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
  { name: "New York, NY", lat: 40.7128, lng: -74.006 },
  { name: "Austin, TX", lat: 30.2672, lng: -97.7431 },
  { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
  { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
  { name: "Denver, CO", lat: 39.7392, lng: -104.9903 },
  { name: "Boston, MA", lat: 42.3601, lng: -71.0589 },
  { name: "Portland, OR", lat: 45.5152, lng: -122.6784 },
  { name: "Ramallah, Palestine", lat: 31.9074, lng: 35.2048 },
  { name: "Gaza, Palestine", lat: 31.5, lng: 34.4667 },
  { name: "Nablus, Palestine", lat: 32.2211, lng: 35.2544 },
  { name: "Hebron, Palestine", lat: 31.5326, lng: 35.0998 },
  { name: "Jenin, Palestine", lat: 32.4599, lng: 35.295 },

  // *** Capitals from your initial list ***
  { name: "Kabul, Afghanistan", lat: 34.5289, lng: 69.1725 },
  { name: "Tirana, Albania", lat: 41.3275, lng: 19.8189 },
  { name: "Algiers, Algeria", lat: 36.7538, lng: 3.0588 },
  { name: "Andorra la Vella, Andorra", lat: 42.5063, lng: 1.5218 },
  { name: "Luanda, Angola", lat: -8.8383, lng: 13.2344 },
  { name: "Buenos Aires, Argentina", lat: -34.6037, lng: -58.3816 },
  { name: "Yerevan, Armenia", lat: 40.1792, lng: 44.4991 },
  { name: "Canberra, Australia", lat: -35.282, lng: 149.1286 },
  { name: "Vienna, Austria", lat: 48.2082, lng: 16.3738 },
  { name: "Baku, Azerbaijan", lat: 40.4093, lng: 49.8671 },

  // *** Remaining World Capitals and Territories (Capitals) ***

  // B
  { name: "Nassau, Bahamas", lat: 25.0485, lng: -77.3712 },
  { name: "Manama, Bahrain", lat: 26.2285, lng: 50.586 },
  { name: "Dhaka, Bangladesh", lat: 23.8103, lng: 90.4125 },
  { name: "Bridgetown, Barbados", lat: 13.1132, lng: -59.5983 },
  { name: "Minsk, Belarus", lat: 53.9045, lng: 27.5615 },
  { name: "Brussels, Belgium", lat: 50.8503, lng: 4.3517 },
  { name: "Belmopan, Belize", lat: 17.2504, lng: -88.7712 },
  { name: "Porto-Novo, Benin", lat: 6.4975, lng: 2.6074 },
  { name: "Thimphu, Bhutan", lat: 27.4712, lng: 89.6334 },
  { name: "Sucre, Bolivia", lat: -19.0333, lng: -65.2627 }, // Constitutional capital
  { name: "Sarajevo, Bosnia and Herzegovina", lat: 43.8563, lng: 18.4131 },
  { name: "Gaborone, Botswana", lat: -24.6599, lng: 25.9088 },
  { name: "Brasília, Brazil", lat: -15.7801, lng: -47.9292 },
  { name: "Bandar Seri Begawan, Brunei", lat: 4.9031, lng: 114.942 },
  { name: "Sofia, Bulgaria", lat: 42.6977, lng: 23.3219 },
  { name: "Ouagadougou, Burkina Faso", lat: 12.3714, lng: -1.5195 },
  { name: "Bujumbura, Burundi", lat: -3.3768, lng: 29.366 }, // Economic capital
  // C
  { name: "Praia, Cabo Verde", lat: 14.9215, lng: -23.5087 },
  { name: "Phnom Penh, Cambodia", lat: 11.5564, lng: 104.9282 },
  { name: "Yaoundé, Cameroon", lat: 3.848, lng: 11.5021 },
  { name: "Ottawa, Canada", lat: 45.4215, lng: -75.6972 },
  { name: "Bangui, Central African Republic", lat: 4.3946, lng: 18.5582 },
  { name: "N'Djamena, Chad", lat: 12.1062, lng: 15.0483 },
  { name: "Santiago, Chile", lat: -33.4489, lng: -70.6693 },
  { name: "Beijing, China", lat: 39.9042, lng: 116.4074 },
  { name: "Bogotá, Colombia", lat: 4.711, lng: -74.0721 },
  { name: "Moroni, Comoros", lat: -11.7022, lng: 43.2736 },
  {
    name: "Kinshasa, Democratic Republic of the Congo",
    lat: -4.442,
    lng: 15.2663,
  },
  { name: "Brazzaville, Republic of the Congo", lat: -4.2644, lng: 15.2829 },
  { name: "San José, Costa Rica", lat: 9.9281, lng: -84.0907 },
  { name: "Yamoussoukro, Côte d'Ivoire", lat: 6.8177, lng: -5.286 }, // Official capital
  { name: "Zagreb, Croatia", lat: 45.815, lng: 15.9819 },
  { name: "Havana, Cuba", lat: 23.054, lng: -82.3458 },
  { name: "Nicosia, Cyprus", lat: 35.1856, lng: 33.3823 },
  { name: "Prague, Czechia", lat: 50.0755, lng: 14.4378 },
  // D
  { name: "Copenhagen, Denmark", lat: 55.6761, lng: 12.5683 },
  { name: "Djibouti, Djibouti", lat: 11.8251, lng: 42.5903 },
  { name: "Roseau, Dominica", lat: 15.3052, lng: -61.3789 },
  { name: "Santo Domingo, Dominican Republic", lat: 18.4861, lng: -69.9312 },
  // E
  { name: "Quito, Ecuador", lat: -0.2252, lng: -78.5249 },
  { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357 },
  { name: "San Salvador, El Salvador", lat: 13.6929, lng: -89.2182 },
  { name: "Malabo, Equatorial Guinea", lat: 3.75, lng: 8.7833 },
  { name: "Asmara, Eritrea", lat: 15.3228, lng: 38.925 },
  { name: "Tallinn, Estonia", lat: 59.437, lng: 24.7535 },
  { name: "Mbabane, Eswatini", lat: -26.3167, lng: 31.1333 }, // Administrative capital
  { name: "Addis Ababa, Ethiopia", lat: 9.0056, lng: 38.7636 },
  // F
  { name: "Suva, Fiji", lat: -18.1252, lng: 178.4419 },
  { name: "Helsinki, Finland", lat: 60.1695, lng: 24.9355 },
  { name: "Paris, France", lat: 48.8566, lng: 2.3522 },
  // G
  { name: "Libreville, Gabon", lat: 0.4162, lng: 9.4673 },
  { name: "Banjul, Gambia", lat: 13.4549, lng: -16.5775 },
  { name: "Tbilisi, Georgia", lat: 41.7151, lng: 44.8271 },
  { name: "Berlin, Germany", lat: 52.52, lng: 13.405 },
  { name: "Accra, Ghana", lat: 5.6037, lng: -0.187 },
  { name: "Athens, Greece", lat: 37.9838, lng: 23.7275 },
  { name: "St. George's, Grenada", lat: 12.056, lng: -61.7423 },
  { name: "Guatemala City, Guatemala", lat: 14.6243, lng: -90.5328 },
  { name: "Conakry, Guinea", lat: 9.5379, lng: -13.6773 },
  { name: "Bissau, Guinea-Bissau", lat: 11.868, lng: -15.5562 },
  { name: "Georgetown, Guyana", lat: 6.8013, lng: -58.1551 },
  // H
  { name: "Port-au-Prince, Haiti", lat: 18.59, lng: -72.3074 },
  { name: "Tegucigalpa, Honduras", lat: 14.0723, lng: -87.1921 },
  { name: "Budapest, Hungary", lat: 47.4979, lng: 19.0402 },
  // I
  { name: "Reykjavik, Iceland", lat: 64.1265, lng: -21.8174 },
  { name: "New Delhi, India", lat: 28.6139, lng: 77.209 },
  { name: "Jakarta, Indonesia", lat: -6.1754, lng: 106.8272 },
  { name: "Tehran, Iran", lat: 35.6892, lng: 51.389 },
  { name: "Baghdad, Iraq", lat: 33.3152, lng: 44.3661 },
  { name: "Dublin, Ireland", lat: 53.3498, lng: -6.2603 },
  { name: "Jerusalem, Israel", lat: 31.7683, lng: 35.2137 }, // De facto seat of government
  { name: "Rome, Italy", lat: 41.9028, lng: 12.4964 },
  // J
  { name: "Kingston, Jamaica", lat: 17.9918, lng: -76.7919 },
  { name: "Tokyo, Japan", lat: 35.6895, lng: 139.6917 },
  { name: "Amman, Jordan", lat: 31.9454, lng: 35.9284 },
  // K
  { name: "Nur-Sultan, Kazakhstan", lat: 51.1694, lng: 71.4491 }, // Formerly Astana
  { name: "Nairobi, Kenya", lat: -1.2921, lng: 36.8219 },
  { name: "Tarawa, Kiribati", lat: 1.3283, lng: 172.978 },
  { name: "Pyongyang, North Korea", lat: 39.0333, lng: 125.75 },
  { name: "Seoul, South Korea", lat: 37.5665, lng: 126.978 },
  { name: "Pristina, Kosovo", lat: 42.6629, lng: 21.1655 },
  { name: "Kuwait City, Kuwait", lat: 29.3759, lng: 47.9774 },
  { name: "Bishkek, Kyrgyzstan", lat: 42.8746, lng: 74.5698 },
  // L
  { name: "Vientiane, Laos", lat: 17.9749, lng: 102.6308 },
  { name: "Beirut, Lebanon", lat: 33.8938, lng: 35.5018 },
  { name: "Maseru, Lesotho", lat: -29.3102, lng: 27.4851 },
  { name: "Monrovia, Liberia", lat: 6.3005, lng: -10.7963 },
  { name: "Tripoli, Libya", lat: 32.8872, lng: 13.5887 },
  { name: "Vaduz, Liechtenstein", lat: 47.141, lng: 9.5215 },
  { name: "Vilnius, Lithuania", lat: 54.6872, lng: 25.2797 },
  { name: "Luxembourg City, Luxembourg", lat: 49.8153, lng: 6.1296 },
  // M
  { name: "Antananarivo, Madagascar", lat: -18.8792, lng: 47.5079 },
  { name: "Lilongwe, Malawi", lat: -13.9669, lng: 33.7747 },
  { name: "Kuala Lumpur, Malaysia", lat: 3.139, lng: 101.6869 },
  { name: "Malé, Maldives", lat: 4.1755, lng: 73.5093 },
  { name: "Bamako, Mali", lat: 12.6392, lng: -8.0029 },
  { name: "Valletta, Malta", lat: 35.8989, lng: 14.5146 },
  { name: "Majuro, Marshall Islands", lat: 7.1315, lng: 171.1845 },
  { name: "Nouakchott, Mauritania", lat: 18.0735, lng: -15.9582 },
  { name: "Port Louis, Mauritius", lat: -20.1654, lng: 57.4896 },
  { name: "Mexico City, Mexico", lat: 19.4326, lng: -99.1332 },
  { name: "Palikir, Micronesia", lat: 6.9167, lng: 158.15 },
  { name: "Chișinău, Moldova", lat: 47.0167, lng: 28.8333 },
  { name: "Monaco, Monaco", lat: 43.7384, lng: 7.4246 },
  { name: "Ulaanbaatar, Mongolia", lat: 47.8864, lng: 106.9057 },
  { name: "Podgorica, Montenegro", lat: 42.4411, lng: 19.2636 },
  { name: "Rabat, Morocco", lat: 34.0208, lng: -6.8416 },
  { name: "Maputo, Mozambique", lat: -25.9653, lng: 32.5892 },
  { name: "Naypyidaw, Myanmar", lat: 19.742, lng: 96.096 },
  // N
  { name: "Windhoek, Namibia", lat: -22.5594, lng: 17.0832 },
  { name: "Yaren, Nauru", lat: -0.5478, lng: 166.9208 }, // De facto administrative center
  { name: "Kathmandu, Nepal", lat: 27.7172, lng: 85.324 },
  { name: "Amsterdam, Netherlands", lat: 52.3676, lng: 4.9041 }, // Official capital
  { name: "Wellington, New Zealand", lat: -41.2865, lng: 174.7762 },
  { name: "Managua, Nicaragua", lat: 12.1364, lng: -86.2514 },
  { name: "Niamey, Niger", lat: 13.5167, lng: 2.1167 },
  { name: "Abuja, Nigeria", lat: 9.0765, lng: 7.3986 },
  { name: "Oslo, Norway", lat: 59.9139, lng: 10.7522 },
  // O
  { name: "Muscat, Oman", lat: 23.5859, lng: 58.6009 },
  // P
  { name: "Islamabad, Pakistan", lat: 33.7215, lng: 73.0433 },
  { name: "Melekeok, Palau", lat: 7.4912, lng: 134.641 },
  { name: "Panama City, Panama", lat: 8.9824, lng: -79.5199 },
  { name: "Port Moresby, Papua New Guinea", lat: -9.4438, lng: 147.1802 },
  { name: "Asunción, Paraguay", lat: -25.2637, lng: -57.5759 },
  { name: "Lima, Peru", lat: -12.0464, lng: -77.0428 },
  { name: "Manila, Philippines", lat: 14.5995, lng: 120.9842 },
  { name: "Warsaw, Poland", lat: 52.2297, lng: 21.0122 },
  { name: "Lisbon, Portugal", lat: 38.7223, lng: -9.1393 },
  // Q
  { name: "Doha, Qatar", lat: 25.2854, lng: 51.531 },
  // R
  { name: "Bucharest, Romania", lat: 44.4268, lng: 26.1025 },
  { name: "Moscow, Russia", lat: 55.7558, lng: 37.6173 },
  { name: "Kigali, Rwanda", lat: -1.9403, lng: 30.0594 },
  // S
  { name: "Basseterre, Saint Kitts and Nevis", lat: 17.2974, lng: -62.7366 },
  { name: "Castries, Saint Lucia", lat: 14.0102, lng: -60.9843 },
  {
    name: "Kingstown, Saint Vincent and the Grenadines",
    lat: 13.1566,
    lng: -61.2215,
  },
  { name: "Apia, Samoa", lat: -13.8333, lng: -171.7667 },
  { name: "San Marino, San Marino", lat: 43.9424, lng: 12.4578 },
  { name: "São Tomé, São Tomé and Príncipe", lat: 0.342, lng: 6.7335 },
  { name: "Riyadh, Saudi Arabia", lat: 24.7136, lng: 46.6753 },
  { name: "Dakar, Senegal", lat: 14.6937, lng: -17.4441 },
  { name: "Belgrade, Serbia", lat: 44.7872, lng: 20.4573 },
  { name: "Victoria, Seychelles", lat: -4.62, lng: 55.451 },
  { name: "Freetown, Sierra Leone", lat: 8.484, lng: -13.213 },
  { name: "Singapore, Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Bratislava, Slovakia", lat: 48.1486, lng: 17.1077 },
  { name: "Ljubljana, Slovenia", lat: 46.0569, lng: 14.5058 },
  { name: "Honiara, Solomon Islands", lat: -9.4333, lng: 159.95 },
  { name: "Mogadishu, Somalia", lat: 2.0407, lng: 45.3182 },
  { name: "Pretoria, South Africa", lat: -25.7479, lng: 28.2293 }, // Administrative capital
  { name: "Juba, South Sudan", lat: 4.8517, lng: 31.6033 },
  { name: "Madrid, Spain", lat: 40.4168, lng: -3.7038 },
  { name: "Sri Jayawardenepura Kotte, Sri Lanka", lat: 6.885, lng: 79.918 }, // Official capital
  { name: "Khartoum, Sudan", lat: 15.5007, lng: 32.5599 },
  { name: "Paramaribo, Suriname", lat: 5.852, lng: -55.2038 },
  { name: "Stockholm, Sweden", lat: 59.3293, lng: 18.0686 },
  { name: "Bern, Switzerland", lat: 46.948, lng: 7.4474 },
  { name: "Damascus, Syria", lat: 33.5132, lng: 36.2913 },
  // T
  { name: "Taipei, Taiwan", lat: 25.033, lng: 121.5654 },
  { name: "Dushanbe, Tajikistan", lat: 38.5732, lng: 68.7779 },
  { name: "Dodoma, Tanzania", lat: -6.1631, lng: 35.7519 }, // Official capital
  { name: "Bangkok, Thailand", lat: 13.7563, lng: 100.5018 },
  { name: "Dili, Timor-Leste", lat: -8.5586, lng: 125.5651 },
  { name: "Lomé, Togo", lat: 6.137, lng: 1.2227 },
  { name: "Nukuʻalofa, Tonga", lat: -21.1377, lng: -175.2023 },
  { name: "Port of Spain, Trinidad and Tobago", lat: 10.6667, lng: -61.5167 },
  { name: "Tunis, Tunisia", lat: 36.8065, lng: 10.1815 },
  { name: "Ankara, Turkey", lat: 39.9334, lng: 32.8597 },
  { name: "Ashgabat, Turkmenistan", lat: 37.9601, lng: 58.326 },
  { name: "Funafuti, Tuvalu", lat: -8.5239, lng: 179.1991 },
  // U
  { name: "Kampala, Uganda", lat: 0.3476, lng: 32.5825 },
  { name: "Kyiv, Ukraine", lat: 50.4501, lng: 30.5234 },
  { name: "Abu Dhabi, United Arab Emirates", lat: 24.4539, lng: 54.3773 },
  { name: "London, United Kingdom", lat: 51.5074, lng: -0.1278 },
  { name: "Washington, D.C., United States", lat: 38.9072, lng: -77.0369 },
  { name: "Montevideo, Uruguay", lat: -34.9011, lng: -56.1645 },
  { name: "Tashkent, Uzbekistan", lat: 41.2995, lng: 69.2401 },
  // V
  { name: "Port Vila, Vanuatu", lat: -17.7333, lng: 168.327 },
  { name: "Vatican City, Vatican City", lat: 41.9029, lng: 12.4534 },
  { name: "Caracas, Venezuela", lat: 10.4806, lng: -66.9036 },
  { name: "Hanoi, Vietnam", lat: 21.0285, lng: 105.8542 },
  // Y
  { name: "Sanaa, Yemen", lat: 15.352, lng: 44.2075 },
  // Z
  { name: "Lusaka, Zambia", lat: -15.4167, lng: 28.2833 },
  { name: "Harare, Zimbabwe", lat: -17.8252, lng: 31.0335 },
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSalary() {
  const min = 20000 + Math.floor(Math.random() * 200000);
  const max = min + 20000 + Math.floor(Math.random() * 40000);
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
}

function randomPostedDate() {
  const days = Math.floor(Math.random() * 14);
  return `${days || 1} day${days === 1 ? "" : "s"} ago`;
}

const mockJobs = Array.from({ length: 1000 }, (_, i) => {
  const company = random(companies);
  const title = random(titles);
  const location = random(locations);
  const type = random(types);
  return {
    id: (i + 1).toString(),
    title,
    company,
    companyLogo: `https://picsum.photos/seed/${i}/100`,
    location,
    salary: randomSalary(),
    type,
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
