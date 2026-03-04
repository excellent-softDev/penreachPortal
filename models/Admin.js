 const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "System Admin"
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  isSuperAdmin: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Admin", AdminSchema);