 const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  score:Number,
  total:Number,
  grade:Number,
  subject:String,
  date:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
