const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { submitContact } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validateContact');

// prevents contact form spam/abuse - max N submissions per IP per 15 min
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5,
  message: {
    success: false,
    message: 'Too many messages sent. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, validateContact, submitContact);

module.exports = router;
