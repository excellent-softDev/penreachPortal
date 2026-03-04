const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }
});

module.exports = mongoose.model("Category", categorySchema);