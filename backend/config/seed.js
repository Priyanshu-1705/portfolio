// Run with: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Project = require('../models/Project');

const projects = [
  {
    name: 'NexaAI',
    tag: 'AI SaaS Platform',
    description:
      'A full-stack AI SaaS product featuring an OpenAI-powered chatbot, AI image generation via ImageKit, subscription billing with Stripe (including webhook handling), and real-time messaging with Socket.IO. Deployed on Vercel with dark mode support.',
    thumbnail: '/uploads/nexaai/nexaai.png', // drop nexaai.png into public/uploads/
    screenshots: ['/uploads/nexaai/nexaai-screenshot-1.png', '/uploads/nexaai/nexaai-screenshot-2.png', '/uploads/nexaai/nexaai-screenshot-3.png', '/uploads/nexaai/nexaai-screenshot-4.png'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Stripe', 'Socket.IO', 'ImageKit'],
    githubUrl: 'https://github.com/Priyanshu-1705',
    liveUrl: '',
    featured: true,
    order: 1,
  },
  {
    name: 'Mission Academy CMS',
    tag: 'School Management System',
    description:
      'A school content management system with 55+ RESTful APIs across 11 backend modules, JWT authentication, role-based access control, and Cloudinary-based media management, built on an MVC architecture with 11 MongoDB models.',
    thumbnail: '/uploads/mission-academy/mission-academy-cms.png', // drop mission-academy-cms.png into public/uploads/
    screenshots: [],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'RBAC', 'Cloudinary', 'MVC'],
    githubUrl: 'https://github.com/Priyanshu-1705',
    liveUrl: '',
    featured: true,
    order: 2,
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('Seed data inserted successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
