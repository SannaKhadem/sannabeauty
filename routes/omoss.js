const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('omoss');
});

module.exports = router;
