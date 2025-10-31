const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const { analyzeResume } = require('../utils/analyzeResume');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze-cv', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No resume file uploaded.' });
  }

  try {
    const data = await pdf(req.file.buffer);
    const resumeText = data.text;

    if (!resumeText) {
      return res.status(400).json({ error: 'Could not extract text from the PDF.' });
    }

    const recommendations = await analyzeResume(resumeText);

    res.json({ recommendations });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'An error occurred during CV analysis.' });
  }
});

module.exports = router;