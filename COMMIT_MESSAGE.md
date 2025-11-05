feat: Add AI-powered CV analyzer with job matching functionality

✨ Features:
- Implement CV analyzer with Gemini AI integration for resume analysis
- Add job matching algorithm that calculates suitability percentage
- Create professional CV analysis report with strengths, weaknesses, and skill recommendations
- Add drag-and-drop PDF upload with visual feedback
- Implement job filtering by type (Full-time, Contract, etc.)
- Limit job analysis to 200 jobs to prevent API timeouts

🎨 UI/UX Improvements:
- Redesign CV analyzer page with modern, professional interface
- Add gradient backgrounds and smooth animations
- Implement enhanced loading states with progress indicators
- Add rank badges for top job matches (#1, #2, #3)
- Improve job cards with better visual hierarchy and hover effects
- Create sticky sidebar for CV analysis report
- Add custom scrollbars and backdrop blur effects
- Enhance empty state with feature cards

🔧 Technical Improvements:
- Fix error handling in SignInPage and SignUpPage to handle connection errors gracefully
- Make MongoDB connection optional to allow server to run without database
- Update server configuration to load .env from multiple locations
- Add exponential backoff retry logic for API calls
- Increase timeout to 3 minutes for large CV analysis requests
- Fix directory structure (rename 'sever' to 'server')

🐛 Bug Fixes:
- Fix "Cannot read properties of undefined" errors in auth pages
- Add proper error handling for API failures
- Fix missing start script in server package.json
- Add missing dependencies (axios, multer, pdf.js-extract)

📝 Documentation:
- Add POSTMAN_TESTING.md with API testing instructions
- Add ALTERNATIVE_APIS.md with free API alternatives guide
- Add analyzeResume-groq.js as alternative implementation

🔐 Security:
- Add autocomplete attributes to form inputs for better security
- Keep API keys in environment variables

This commit introduces a complete CV analysis feature that helps users match their resumes with job opportunities using AI-powered analysis.

