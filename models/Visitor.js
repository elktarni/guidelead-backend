const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visitor', visitorSchema);
