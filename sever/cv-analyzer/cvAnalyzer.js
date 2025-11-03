const express = require('express');
const multer = require('multer');
const { PDFExtract } = require('pdf.js-extract');
const { analyzeResume } = require('./analyzeResume');
const fs = require('fs');
const os = require('os');
const path = require('path');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze-cv', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No resume file uploaded.' });
  }

  const tempFilePath = path.join(os.tmpdir(), req.file.originalname);

  try {
    fs.writeFileSync(tempFilePath, req.file.buffer);

    const pdfExtract = new PDFExtract();
    const data = await pdfExtract.extract(tempFilePath, {});
    const resumeText = data.pages.map(page => page.content.map(item => item.str).join(' ')).join('\n');

    if (!resumeText) {
      return res.status(400).json({ error: 'Could not extract text from the PDF.' });
    }

    const recommendations = await analyzeResume(resumeText);

    res.json({ recommendations });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'An error occurred during CV analysis.' });
  } finally {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
});

module.exports = router;
