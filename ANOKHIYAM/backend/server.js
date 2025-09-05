const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'ANOKHIYAM ERP Backend Server is Running!',
    version: '1.0.0',
    developer: 'Smart India Hackathon 2025'
  });
});

// Test route for frontend connection
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Backend connected successfully!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ANOKHIYAM Backend running on port ${PORT}`);
  console.log(`📡 Server URL: http://localhost:${PORT}`);
});
