const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Grade 10
  academicYear: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear" },
  status: { type: String, default: "active" }
}, { timestamps: true });

module.exports = mongoose.model("Grade", gradeSchema);