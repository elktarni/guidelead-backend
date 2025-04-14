const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor"); // assuming you have a Visitor model
const Lead = require("../models/Lead");       // assuming you have a Lead model
const adminRoutes = require('./routes/admin');
app.use('/', adminRoutes); // This is the key line!


// GET /dashboard/visitors
router.get("/dashboard/visitors", async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    res.json({ totalVisitors });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch visitor stats." });
  }
});

// GET /dashboard/leads
router.get("/dashboard/leads", async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const latestLeads = await Lead.find().sort({ createdAt: -1 }).limit(10);
    res.json({ totalLeads, latestLeads });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lead stats." });
  }
});

// GET /dashboard/leads/all
router.get("/dashboard/leads/all", async (req, res) => {
  try {
    const allLeads = await Lead.find().sort({ createdAt: -1 });
    res.json({ leads: allLeads });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all leads." });
  }
});


module.exports = router;
