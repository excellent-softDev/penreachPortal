 const express = require("express");
const router = express.Router();
const multer = require("multer");
const Video = require("../models/Video");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Upload video
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, subject, grade, subCategory="", link="" } = req.body;
    const file = req.file ? req.file.filename : undefined;
    const video = new Video({ title, subject, grade, subCategory, file, link });
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save video" });
  }
});

// Get all videos
router.get("/", async (req, res) => {
  try {
    const vids = await Video.find().sort({ createdAt: -1 });
    res.json(vids);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// Delete video
router.delete("/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete video" });
  }
});

module.exports = router;
