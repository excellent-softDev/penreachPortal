 const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: String,
  subject: String,
  grade: Number,
  gameFile: String,   // uploaded file name
  link: String,       // optional if game is a URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Game", gameSchema);
