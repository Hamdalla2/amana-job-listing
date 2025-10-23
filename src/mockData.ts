import { Job } from './types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    location: {
      name: 'San Francisco, CA',
      lat: 37.7749,
      lng: -122.4194
    },
    salary: '$120,000 - $160,000',
    type: 'Full-time',
    workingHours: '9:00 AM - 5:00 PM',
    workingDays: 'Monday - Friday',
    description: 'We are looking for an experienced Frontend Developer to join our growing team. You will work on cutting-edge web applications using React, TypeScript, and modern web technologies.',
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong understanding of web performance optimization',
      'Experience with state management libraries (Redux, Zustand)',
      'Excellent problem-solving skills',
      'Bachelor\'s degree in Computer Science or related field'
    ],
    benefits: [
      'Health, dental, and vision insurance',
      'Flexible work schedule',
      'Remote work options',
      '401(k) matching',
      'Professional development budget'
    ],
    postedDate: '2 days ago',
    companyEmail: 'careers@techcorp.com'
  },
  {
    id: '2',
    title: 'UX Designer',
    company: 'Creative Studios',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: {
      name: 'New York, NY',
      lat: 40.7128,
      lng: -74.0060
    },
    salary: '$90,000 - $120,000',
    type: 'Full-time',
    workingHours: '10:00 AM - 6:00 PM',
    workingDays: 'Monday - Friday',
    description: 'Join our creative team to design intuitive and beautiful user experiences for our clients\' digital products.',
    requirements: [
      '3+ years of UX design experience',
      'Proficiency in Figma and Adobe Creative Suite',
      'Strong portfolio demonstrating user-centered design',
      'Experience conducting user research',
      'Excellent communication skills'
    ],
    benefits: [
      'Comprehensive health insurance',
      'Unlimited PTO',
      'Creative workspace in SoHo',
      'Latest design tools and software',
      'Team retreats'
    ],
    postedDate: '1 week ago',
    companyEmail: 'jobs@creativestudios.com'
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'StartupXYZ',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop',
    location: {
      name: 'Austin, TX',
      lat: 30.2672,
      lng: -97.7431
    },
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    workingHours: 'Flexible',
    workingDays: 'Monday - Friday',
    description: 'Lead product development for our innovative SaaS platform. Work closely with engineering, design, and business teams to deliver exceptional products.',
    requirements: [
      '4+ years of product management experience',
      'Experience with agile methodologies',
      'Strong analytical and data-driven mindset',
      'Excellent stakeholder management',
      'Technical background preferred'
    ],
    benefits: [
      'Equity in a growing startup',
      'Health and wellness stipend',
      'Hybrid work model',
      'Learning and development budget',
      'Catered lunches'
    ],
    postedDate: '3 days ago',
    companyEmail: 'pm-jobs@startupxyz.com'
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
    location: {
      name: 'Seattle, WA',
      lat: 47.6062,
      lng: -122.3321
    },
    salary: '$130,000 - $170,000',
    type: 'Full-time',
    workingHours: '9:00 AM - 5:00 PM',
    workingDays: 'Monday - Friday',
    description: 'Use advanced analytics and machine learning to solve complex business problems and drive data-driven decision making.',
    requirements: [
      'PhD or Master\'s in Computer Science, Statistics, or related field',
      'Strong Python and SQL skills',
      'Experience with ML frameworks (TensorFlow, PyTorch)',
      'Excellent communication skills',
      'Experience deploying ML models to production'
    ],
    benefits: [
      'Competitive salary and bonuses',
      'Full health coverage',
      'Remote-first culture',
      'Conference attendance',
      'Stock options'
    ],
    postedDate: '5 days ago',
    companyEmail: 'data-jobs@analyticspro.com'
  },
  {
    id: '5',
    title: 'Marketing Manager',
    company: 'BrandBuilders',
    companyLogo: 'https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?w=100&h=100&fit=crop',
    location: {
      name: 'Los Angeles, CA',
      lat: 34.0522,
      lng: -118.2437
    },
    salary: '$85,000 - $115,000',
    type: 'Full-time',
    workingHours: '9:00 AM - 6:00 PM',
    workingDays: 'Monday - Friday',
    description: 'Lead marketing campaigns and strategies for our diverse portfolio of clients. Build and manage a high-performing marketing team.',
    requirements: [
      '5+ years of marketing experience',
      'Proven track record in digital marketing',
      'Experience with marketing automation tools',
      'Strong leadership skills',
      'Creative and strategic thinking'
    ],
    benefits: [
      'Health and dental insurance',
      'Performance bonuses',
      'Work from home Fridays',
      'Professional development',
      'Company events'
    ],
    postedDate: '1 day ago',
    companyEmail: 'careers@brandbuilders.com'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&h=100&fit=crop',
    location: {
      name: 'Denver, CO',
      lat: 39.7392,
      lng: -104.9903
    },
    salary: '$115,000 - $150,000',
    type: 'Full-time',
    workingHours: 'Flexible',
    workingDays: 'Monday - Friday',
    description: 'Build and maintain our cloud infrastructure. Work with cutting-edge DevOps tools and practices to ensure reliable and scalable systems.',
    requirements: [
      '4+ years of DevOps experience',
      'Strong knowledge of AWS/Azure/GCP',
      'Experience with Kubernetes and Docker',
      'Infrastructure as Code (Terraform, CloudFormation)',
      'CI/CD pipeline experience'
    ],
    benefits: [
      'Fully remote position',
      'Generous PTO policy',
      'Health and wellness benefits',
      'Home office stipend',
      '401(k) with matching'
    ],
    postedDate: '4 days ago',
    companyEmail: 'devops@cloudtech.com'
  },
  {
    id: '7',
    title: 'Mobile Developer (iOS)',
    company: 'AppMasters',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=100&h=100&fit=crop',
    location: {
      name: 'Boston, MA',
      lat: 42.3601,
      lng: -71.0589
    },
    salary: '$105,000 - $140,000',
    type: 'Full-time',
    workingHours: '10:00 AM - 6:00 PM',
    workingDays: 'Monday - Friday',
    description: 'Develop beautiful and performant iOS applications for our clients. Work with the latest Swift and iOS technologies.',
    requirements: [
      '3+ years of iOS development experience',
      'Strong Swift and SwiftUI skills',
      'Published apps in the App Store',
      'Understanding of iOS design principles',
      'Experience with RESTful APIs'
    ],
    benefits: [
      'MacBook Pro and iPhone provided',
      'Health insurance',
      'Flexible schedule',
      'Remote work options',
      'Annual team offsites'
    ],
    postedDate: '1 week ago',
    companyEmail: 'ios-jobs@appmasters.com'
  },
  {
    id: '8',
    title: 'Content Writer',
    company: 'ContentCraft',
    companyLogo: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop',
    location: {
      name: 'Portland, OR',
      lat: 45.5152,
      lng: -122.6784
    },
    salary: '$60,000 - $80,000',
    type: 'Full-time',
    workingHours: 'Flexible',
    workingDays: 'Monday - Friday',
    description: 'Create engaging content for various digital platforms. Write blog posts, articles, social media content, and marketing copy.',
    requirements: [
      '2+ years of professional writing experience',
      'Excellent grammar and communication skills',
      'SEO knowledge',
      'Ability to adapt writing style',
      'Portfolio of published work'
    ],
    benefits: [
      'Remote-friendly',
      'Health benefits',
      'Flexible hours',
      'Professional development',
      'Collaborative team environment'
    ],
    postedDate: '2 days ago',
    companyEmail: 'writers@contentcraft.com'
  }
];
