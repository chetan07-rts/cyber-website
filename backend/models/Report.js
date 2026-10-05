const mongoose = require('mongoose');

const reportSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    crimeType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    evidencePath: {
      type: String, // Path to the uploaded file relative to server
    },
    status: {
      type: String,
      required: true,
      default: 'Pending', // Pending, Investigating, Resolved
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
