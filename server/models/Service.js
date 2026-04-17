const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  duration: Number // in minutes
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);