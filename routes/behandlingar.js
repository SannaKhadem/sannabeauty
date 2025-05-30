const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

// List of supported treatments
const treatments = ['filler', 'botox', 'skinbooster', 'ansiktsbehandling'];

// Route: index page for all treatments
router.get('/', (req, res) => {
  res.render('behandlingar');
});

// Generate one route per treatment
treatments.forEach(treatment => {
  router.get(`/${treatment}`, async (req, res) => {
    try {
      // Find all images where description contains the treatment name
      const images = await Image.find({ description: new RegExp(treatment, 'i') });

      // Render the corresponding view with the images
      res.render(`behandlingar/${treatment}`, { images });
    } catch (error) {
      console.error(`Failed to load ${treatment} images:`, error);
      res.status(500).send('Error loading images');
    }
  });
});

module.exports = router;
