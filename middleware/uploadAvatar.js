// middleware/uploadAvatar.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Make sure the avatars folder exists
const dir = './uploads/avatars';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadAvatar = multer({ storage });

module.exports = uploadAvatar;
