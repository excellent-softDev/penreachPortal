 const express = require("express");
const router = express.Router();
const multer = require("multer");
const Game = require("../models/Game");

// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ---------- UPLOAD GAME ----------
router.post("/", upload.single("gameFile"), async (req, res) => {
  try {
    let { title, subject, grade, link } = req.body;

// 🔥 if title not sent from form, create one automatically
if (!title || title.trim() === "") {
  title = `${subject || "Game"} - Grade ${grade || ""}`;
}

const newGame = new Game({
  title,
  subject,
  grade,
  link: link || "",
  gameFile: req.file ? req.file.filename : ""
});


    await newGame.save();

    res.json({ success: true, message: "Game uploaded" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------- GET GAMES ----------
router.get("/", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// ---------- DELETE ----------
router.delete("/:id", async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
