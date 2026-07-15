// Run with: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Project = require('../models/Project');

const projects = [
  {
    name: 'NexaAI',
    tag: 'AI SaaS Platform',
    shortDescription:
      'AI SaaS platform with an OpenAI-powered chatbot, image generation, and Stripe subscriptions.',
    description:
      "NexaAI is a full-stack AI SaaS product built to explore how AI features get wired into a real subscription business, not just a demo chatbot. Users sign up, get a free usage tier, and can upgrade through Stripe-powered subscription billing with full webhook handling for plan upgrades, downgrades, and payment failures. The core chatbot is powered by the OpenAI API with persisted conversation history per user, and a separate image-generation feature integrates ImageKit for on-the-fly AI image creation and delivery. Real-time features (typing indicators, live message delivery) run on Socket.IO. The app supports dark mode throughout and is deployed on Vercel. Building this meant handling real edge cases around billing state, API rate limits, and keeping chat state in sync across a real-time connection — problems that don't show up in a toy project.",
    thumbnail: '/uploads/nexaai.png',
    screenshots: [],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Stripe', 'Socket.IO', 'ImageKit'],
    githubUrl: 'https://github.com/Priyanshu-1705',
    liveUrl: '',
    featured: true,
    order: 1,
  },
  {
    name: 'QuickChat',
    tag: 'Real-Time Chat Application',
    shortDescription:
      'MERN real-time chat app with Socket.IO messaging, JWT auth, and live online status.',
    description:
      "QuickChat is a full-stack real-time chat application built to get real-time systems right end to end, not just fire messages over a socket. Users sign up and log in through JWT-based authentication, manage their profile (name, bio, and a Cloudinary-hosted profile picture), and exchange messages instantly via Socket.IO. Beyond basic message delivery, it tracks live online/offline presence per user and keeps an unseen-message counter accurate across reconnects — the kind of state-sync problem that only shows up once sockets, REST calls, and a database are all trying to agree on the same truth. Passwords are hashed with bcryptjs, protected routes guard authenticated pages on the frontend, and the whole thing runs on a MongoDB Atlas backend with a Vite-powered React frontend styled in Tailwind CSS.",
    thumbnail: '/uploads/quickchat.png',
    screenshots: [],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT', 'Cloudinary', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Priyanshu-1705/QuickChat',
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