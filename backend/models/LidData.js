const mongoose = require("mongoose");

const lidDataSchema = new mongoose.Schema({
  lidId: {
    type: String,
    required: true,
  },

  waterLevel: Number,

  gasLevel: Number,

  temperature: Number,

  lidStatus: String,

  // ✅ AI Prediction
  floodRisk: {
    type: String,
    default: "Unknown",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LidData", lidDataSchema);