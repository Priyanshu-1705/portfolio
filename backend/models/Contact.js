const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    ip: {
      type: String, // stored for basic abuse tracking
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
