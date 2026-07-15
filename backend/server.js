require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// required behind Render/Railway's reverse proxy so req.ip reflects the real client,
// not the proxy — otherwise rate limiting and Contact.ip both break
app.set('trust proxy', 1);

// --- DB ---
connectDB();

// --- Core middleware ---
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
  })
);

// serve uploaded project screenshots at /uploads/filename.png
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- Health check (useful for Render/Railway uptime pings) ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy' });
});

// --- Routes ---
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
