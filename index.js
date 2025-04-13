const trackRoute = require("./routes/track");
app.use(trackRoute);

const adminRoutes = require("./routes/admin");
app.use(adminRoutes);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

// Connect DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Routes
app.get('/', (req, res) => res.send('🟢 GuideLead API is live!'));
app.use('/projects', require('./routes/projectRoutes'));
app.use('/leads', require('./routes/leadRoutes'));

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
