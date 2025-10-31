const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeResume(resumeText) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a professional career advisor. Your task is to analyze the provided resume content and suggest up to three distinct career paths that would be a good fit.

For each suggested career path, provide a brief description of the relevant technologies, tools, or skills commonly used in that field. Structure your response clearly in Markdown format.

The response should follow this format:

### 1. **Career Path Name**
- **Description:** A brief summary of why this path is a good fit.
- **Key Technologies & Skills:** A list of technologies, software, and skills relevant to this career (e.g., Python, React, Financial Modeling, Project Management).

### 2. **Career Path Name**
- **Description:** A brief summary of why this path is a good fit.
- **Key Technologies & Skills:** A list of technologies, software, and skills.

### 3. **Career Path Name**
- **Description:** A brief summary of why this path is a good fit.
- **Key Technologies & Skills:** A list of technologies, software, and skills.

---
RESUME CONTENT:
${resumeText}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error calling Gemini AI:', error);
    throw new Error('Failed to get career recommendations from Gemini AI.');
  }
}

module.exports = { analyzeResume };

