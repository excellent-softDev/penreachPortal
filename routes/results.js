const express = require("express");
const router = express.Router();
const Result = require("../models/QuizResult");

// SAVE RESULT
router.post("/", async (req,res)=>{
  try{
    const result = new Result(req.body);
    await result.save();
    res.json({message:"Saved"});
  }catch(err){
    console.error(err);
    res.status(500).send("error");
  }
});

// GET ALL RESULTS
router.get("/", async (req,res)=>{
  const data = await Result.find().sort({score:-1});
  res.json(data);
});

module.exports = router;
