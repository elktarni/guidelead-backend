const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");
const Lead = require("../models/Lead");

// GET /visitors
router.get("/visitors", async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    res.json({ totalVisitors });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch visitor stats." });
  }
});

// GET /leads
router.get("/leads", async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const latestLeads = await Lead.find().sort({ createdAt: -1 }).limit(10);
    res.json({ totalLeads, latestLeads });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lead stats." });
  }
});

// GET /leads/all
router.get("/leads/all", async (req, res) => {
  try {
    const allLeads = await Lead.find().sort({ createdAt: -1 });

    // Map through the leads and ensure the phone and message fields are returned
    const leadsWithPhone = allLeads.map((lead) => ({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "N/A",  // If phone is missing, return 'N/A'
      message: lead.message || "N/A",  // If message is missing, return 'N/A'
      createdAt: lead.createdAt,
    }));

    res.json({ leads: leadsWithPhone });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all leads." });
  }
});

module.exports = router;
