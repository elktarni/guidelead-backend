const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");

// Track visitors
router.get("/track", async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try {
    const newVisitor = new Visitor({ ip });
    await newVisitor.save();
    res.status(200).json({ message: "Visitor tracked" });
  } catch (error) {
    res.status(500).json({ error: "Failed to track visitor" });
  }
});

module.exports = router;
