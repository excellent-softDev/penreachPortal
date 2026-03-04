 const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// GET all documents
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST new document
 router.post("/", upload.single("file"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ msg: "File upload failed" });
    }

    const newDoc = new Document({
      title: req.body.title,
      subject: req.body.subject,
      subCategory: req.body.subCategory,
      grade: req.body.grade,
      file: req.file.filename,
    });

    await newDoc.save();

    res.json(newDoc);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }

});

// DELETE document
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ msg: "Document not found" });

    // Delete file from server
    const filePath = path.join(__dirname, "..", "uploads", doc.file);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await doc.deleteOne();
    res.json({ msg: "Document deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;