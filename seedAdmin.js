 require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function seedAdmin() {

  const existing = await Admin.findOne({
    email: process.env.ADMIN_EMAIL
  });

  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );

  const admin = new Admin({
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword
  });

  await admin.save();

  console.log("Admin created successfully");
  process.exit();
}

seedAdmin();