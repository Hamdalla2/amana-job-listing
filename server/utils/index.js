require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cvAnalyzerRoutes = require('./routes/cvAnalyzer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allow requests from your React frontend
app.use(express.json());

// Routes
app.use('/api', cvAnalyzerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});