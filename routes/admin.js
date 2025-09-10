// routes/admin.js

const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const Image = require("../models/Image");
const fs = require("fs");
const path = require("path");

// GET: Show upload form (single + paired)
router.get("/upload", (req, res) => {
  res.render("admin/upload");
});

// POST: Handle image upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { description, treatment, phase, group } = req.body;
    const doc = new Image({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      description: description || "",
      treatment: treatment || undefined,
      phase: phase || undefined,
      group: group ? parseInt(group, 10) : undefined,
    });
    await doc.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).send("Something went wrong while uploading the image.");
  }
});

// POST: Paired before/after upload (two files)
router.post("/upload/pair", upload.fields([
  { name: 'före', maxCount: 1 },
  { name: 'efter', maxCount: 1 },
]), async (req, res) => {
  try {
    const { treatment, group } = req.body;
    if (!treatment) return res.status(400).send('Missing treatment');
    const groupNum = group ? parseInt(group, 10) : Math.floor(Date.now() / 1000);
    const beforeFile = req.files['före']?.[0];
    const afterFile = req.files['efter']?.[0];
    if (!beforeFile || !afterFile) return res.status(400).send('Both före and efter images required');

    const docs = [
      new Image({ filename: beforeFile.filename, path: `/uploads/${beforeFile.filename}`, treatment, phase: 'före', group: groupNum }),
      new Image({ filename: afterFile.filename, path: `/uploads/${afterFile.filename}`, treatment, phase: 'efter', group: groupNum }),
    ];
    await Image.insertMany(docs);
    res.redirect('/admin/dashboard');
  } catch (e) {
    console.error('Paired upload failed:', e);
    res.status(500).send('Failed paired upload');
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
