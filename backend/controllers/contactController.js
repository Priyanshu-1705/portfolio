const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// reused across requests instead of recreating per-call
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // save to DB first so we never lose a message even if email fails
    const contact = await Contact.create({
      name,
      email,
      message,
      ip: req.ip,
    });

    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `New portfolio message from ${name}`,
        text: message,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });
    } catch (emailErr) {
      // message is safely stored even if email delivery fails
      console.error('Email send failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message received. Thanks for reaching out!',
      data: { id: contact._id },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit message',
      error: err.message,
    });
  }
};

module.exports = { submitContact };
