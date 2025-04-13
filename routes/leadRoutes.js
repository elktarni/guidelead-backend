const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// POST lead
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  const newLead = new Lead({ name, email, message });
  await newLead.save();
  res.json({ success: true });
});

// GET all leads (admin only)
router.get('/', async (req, res) => {
  const { password } = req.query;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

module.exports = router;
