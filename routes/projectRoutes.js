const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// POST new project (admin only)
router.post('/', async (req, res) => {
  const { title, description, images, password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const newProject = new Project({ title, description, images });
  await newProject.save();
  res.json(newProject);
});

module.exports = router;
