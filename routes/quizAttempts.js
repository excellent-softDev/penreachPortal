// routes/quizAttempts.js
const express = require("express");
const router = express.Router();
const QuizAttempt = require("../models/QuizAttempt");

// POST /api/quizAttempts
router.post("/", async (req, res) => {
  const { studentId, quizId, score, total } = req.body;

  // Check if already attempted
  const existing = await QuizAttempt.findOne({ studentId, quizId });
  if(existing) return res.status(400).json({ message: "Quiz already attempted" });

  const attempt = new QuizAttempt({ studentId, quizId, score, total });
  await attempt.save();
  res.json({ success: true, attempt });
});

module.exports = router;
