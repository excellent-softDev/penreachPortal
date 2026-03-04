 const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  subCategory: { type: String, default: "" }, // optional
  grade: { type: Number, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      answer: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quiz", QuizSchema);
