const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String, // e.g. "AI SaaS Platform", "School Management System"
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, // main Cloudinary image URL shown on the project card
      trim: true,
    },
    screenshots: {
      type: [String], // additional Cloudinary URLs, e.g. for a project detail view/lightbox
      default: [],
    },
    stack: {
      type: [String], // ["React", "Node.js", "MongoDB", ...]
      default: [],
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0, // controls display order on frontend
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
