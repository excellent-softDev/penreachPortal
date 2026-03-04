const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const Document = require("./models/Document");
const Quiz = require("./models/Quiz");
const { extractDocumentText } = require("./processor/documentProcessor");
const quizRoutes = require("./routes/quizzes");
const gameRoutes = require("./routes/games");
const resultRoutes = require("./routes/results")
const QuizResult = require("./models/QuizResult");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));

// 🔗 CONNECT DATABASE
mongoose.connect(
  "mongodb+srv://penreachsteam_db_user:Donovanlucky5%23@penreachsteam.xjgnjfs.mongodb.net/steam-lms?retryWrites=true&w=majority"
)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
 // Routes
app.use("/api/documents", require("./routes/documents")); // for documents
app.use("/api/videos", require("./routes/videos"));       // videos.js
app.use("/api/quizzes", require("./routes/quizzes"));     // quizzes.js
app.use("/api/games", gameRoutes);         // games.js
app.use("/api/admin", require("./routes/admin"));       // admin.js
app.use("/api/results", resultRoutes);

// -------------------------
// Serve HTML pages
// -------------------------

// Student landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Admin login page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// View all admins
app.get("/viewAdmins.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "viewAdmins.html"));
});

// View all materials
app.get("/viewMaterials.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "viewMaterials.html"));
});

// Admin dashboard page
app.get("/adminDashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "adminDashboard.html"));
});

// Optional: Signup page
app.get("/adminSignup.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "adminSignup.html"));
});

app.post("/api/quizResults", async (req,res)=>{
  const QuizResult = require("./models/QuizResult");

  try{
    const result = new QuizResult(req.body);
    await result.save();
    res.json({success:true});
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

  // ================================
// PRODUCTION AI QUIZ GENERATOR
// ================================

 app.post("/api/ai/generate-quiz", async (req,res)=>{

  try{

    const { documentId } = req.body;

    if(!documentId){
      return res.status(400).json({msg:"Document ID missing"});
    }

    const documentData = await Document.findById(documentId);

    if(!documentData){
      return res.status(404).json({msg:"Document not found"});
    }

    let documentText = "";

    try{
      if(documentData.file){
        const filePath = path.join(__dirname,"uploads",documentData.file);
        if(fs.existsSync(filePath)){
          documentText = await extractDocumentText(filePath);
        }
      }
    }catch(extractError){
      console.warn("Document extraction warning:",extractError.message);
    }

    // 🔥 FAKE AI GENERATOR (safe version)

    const questions = [];

    for(let i=1;i<=5;i++){
      questions.push({
        question:`Sample Question ${i} based on ${documentData.title}`,
        options:[
          "Option A",
          "Option B",
          "Option C",
          "Option D"
        ],
        answer:"Option A"
      });
    }

    // ✅ CREATE QUIZ PROPERLY
    const quiz = new Quiz({
      title:`Auto Quiz - ${documentData.title}`,
      subject: documentData.subject,
      subCategory: documentData.subCategory || "",
      grade: documentData.grade,
      questions
    });

    await quiz.save();

    res.json(quiz);

  }catch(err){

    console.error("AI Brain Critical Error:",err);

    res.status(500).json({
      msg:"AI Brain processing failed"
    });

  }

});
// -------------------------
// Start server
// -------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
