const axios = require('axios');

async function analyzeResume(resumeText) {
  const prompt = `Analyze this resume and suggest up to three career paths. For each career path, provide a brief description of relevant technologies, tools, or skills commonly used in that field. The response should follow this format:

1. **Career Field:** Description of technologies, tools, or skills.
2. **Career Field:** Description of technologies, tools, or skills.
3. **Career Field:** Description of technologies, tools, or skills.

Here is the resume: ${resumeText}`;

  try {
    const response = await axios.post('https://api.together.xyz/v1/chat/completions', {
      model: 'meta-llama/Llama-3-8b-chat-hf',
      max_tokens: 512,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful and experienced career advisor.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Together AI:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get career recommendations from AI model.');
  }
}

module.exports = { analyzeResume };