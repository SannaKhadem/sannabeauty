// routes/admin.js

const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const Image = require("../models/Image");
const fs = require("fs");
const path = require("path");

// GET: Show upload form
router.get("/upload", (req, res) => {
  res.render("admin/upload");
});

// POST: Handle image upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      description: req.body.description || "",
    });
    await newImage.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).send("Something went wrong while uploading the image.");
  }
});

// GET: Display all uploaded images
router.get("/dashboard", async (req, res) => {
  const images = await Image.find().sort({ uploadedAt: -1 });
  res.render("admin/dashboard", { images });
});

// POST: Delete image by ID
router.post("/delete/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image) {
      // Remove file from filesystem
      const filePath = path.join(__dirname, "..", "public", image.path);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("File deletion failed:", err);
      });

      // Remove from database
      await Image.findByIdAndDelete(req.params.id);
    }
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Delete failed:", error);
    res.status(500).send("Failed to delete image.");
  }
});

module.exports = router;
