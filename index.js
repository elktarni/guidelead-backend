// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Import routes
const trackRoute = require("./routes/track");
const adminRoutes = require("./routes/admin");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Routes
app.get('/', (req, res) => res.send('🟢 GuideLead API is live!'));
app.use('/projects', require('./routes/projectRoutes'));
app.use('/leads', require('./routes/leadRoutes'));
app.use(trackRoute); // This should be after app initialization
app.use(adminRoutes); // This should be after app initialization

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
