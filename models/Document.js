 const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  subCategory: { type: String, default: "" }, // optional
  grade: { type: Number, required: true },
  file: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", DocumentSchema);
