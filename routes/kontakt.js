const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const messagesFile = path.join(__dirname, '../messages.json');

// GET /kontakt - show the contact form
router.get('/', (req, res) => {
  res.render('kontakt');
});

// POST /kontakt - handle form submission
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send('Alla fält är obligatoriska');
  }

  const newMessage = {
    name,
    email,
    subject,
    message,
    date: new Date().toISOString()
  };

  let messages = [];
  if (fs.existsSync(messagesFile)) {
    try {
      messages = JSON.parse(fs.readFileSync(messagesFile));
    } catch (e) {
      messages = [];
    }
  }

  messages.push(newMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

  res.redirect('/kontakt/tack');
});

router.get('/tack', (req, res) => {
  res.render('kontakt/tack');
});

module.exports = router;
