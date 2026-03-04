 const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

// Save quiz
router.post("/", async (req, res) => {
  try {
    const { subject, grade, subCategory="", questions } = req.body;
    const quiz = new Quiz({ subject, grade, subCategory, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save quiz" });
  }
});

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Delete quiz
router.delete("/:id", async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

module.exports = router;
