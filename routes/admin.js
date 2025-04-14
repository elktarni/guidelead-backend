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
    // Fetch all leads and include the phone field
    const allLeads = await Lead.find().sort({ createdAt: -1 });

    // Map through the leads to ensure they include the phone field
    const leadsWithPhone = allLeads.map((lead) => ({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "N/A",  // Ensure phone field is included, with a fallback value if not present
      message: lead.message || "N/A",  // Ensure message field is included, with a fallback value if not present
      createdAt: lead.createdAt,
    }));

    res.json({ leads: leadsWithPhone });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all leads." });
  }
});

module.exports = router;
