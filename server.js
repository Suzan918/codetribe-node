const express = require('express');
const app = express();
const mediaRoutes = require('./routes/mediaRoutes.js');
const dataManager = require('./data/dataManager');
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize data file when server starts
dataManager.initializeDataFile()
  .then(() => {
    console.log('Data file initialized successfully');
  })
  .catch(error => {
    console.error('Error initializing data file:', error);
    process.exit(1);
  });

// Routes
app.use('/', mediaRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: 'Please check the API documentation at http://localhost:3000 for available endpoints'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: 'Something went wrong! Please try again later.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('View API documentation at http://localhost:${PORT}');
});
