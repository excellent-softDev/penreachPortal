 const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

require("dotenv").config();

/*
========================================
ADMIN LOGIN
========================================
*/
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    // Only allow configured admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login successful",
      token,
      admin: {
        name: admin.name,
        email: admin.email
      }
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;