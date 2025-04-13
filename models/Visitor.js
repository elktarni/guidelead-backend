const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    // Define fields for Visitor model (you can adjust the schema)
    ipAddress: { type: String, required: true },
    visitedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;
