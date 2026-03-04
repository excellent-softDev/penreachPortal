const express = require("express");
const router = express.Router();
const Grade = require("../../models/Grade");
const AcademicYear = require("../../models/AcademicYear");
const adminAuth = require("../../middleware/adminAuth");

// View Grades
router.get("/", adminAuth, async (req, res) => {
  const grades = await Grade.find().populate("academicYear");
  const years = await AcademicYear.find();
  res.render("admin/grades", { grades, years });
});

// Create Grade
router.post("/create", adminAuth, async (req, res) => {
  await Grade.create({
    name: req.body.name,
    academicYear: req.body.academicYear
  });
  res.redirect("/admin/grades");
});

// Delete Grade
router.post("/delete/:id", adminAuth, async (req, res) => {
  await Grade.findByIdAndDelete(req.params.id);
  res.redirect("/admin/grades");
});

module.exports = router;