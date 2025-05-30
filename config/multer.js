// config/multer.js

const multer = require("multer");
const path = require("path");

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    // Unique filename: timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter - only allow image files (jpeg, jpg, png)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isExtValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isMimeValid = allowedTypes.test(file.mimetype);
  if (isExtValid && isMimeValid) {
    cb(null, true);
  } else {
    cb("Only .jpeg, .jpg, and .png image files are allowed");
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Max file size: 2MB
  fileFilter: fileFilter,
});

module.exports = upload;
