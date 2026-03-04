 const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  subCategory: { type: String, default: "" }, // optional
  grade: { type: Number, required: true },
  file: { type: String }, // optional if link provided
  link: { type: String, default: "" }, // optional YouTube link
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Video", VideoSchema);
