const mongoose = require('mongoose');
const Project = require('../models/Project');

// @desc    Get all projects (sorted by order, featured first)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: err.message,
    });
  }
};

// @desc    Get single project by id
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project id format',
      });
    }

    const project = await Project.findById(req.params.id).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: err.message,
    });
  }
};

module.exports = { getProjects, getProjectById };
