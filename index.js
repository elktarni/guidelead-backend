const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Import routes
const trackRoute = require('./routes/track');
const projectRoutes = require('./routes/projectRoutes');
const leadRoutes = require('./routes/leadRoutes');
const adminRoutes = require('./routes/admin'); // ← This must be after app is defined

// Use routes
app.use('/', trackRoute);
app.use('/projects', projectRoutes);
app.use('/leads', leadRoutes);
app.use('/', adminRoutes); // ← Register admin routes

// Default route
app.get('/', (req, res) => {
  res.send('🟢 GuideLead API is live!');
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
