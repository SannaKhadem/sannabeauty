
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

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

  // Send email using nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `Kontaktformulär <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Kontaktformulär: ${subject}`,
    text: `Namn: ${name}\nE-post: ${email}\n\nMeddelande:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      // Optionally show error page or message
      return res.status(500).send('Kunde inte skicka e-post. Försök igen senare.');
    }
    res.redirect('/kontakt/tack');
  });
});

router.get('/tack', (req, res) => {
  res.render('kontakt/tack');
});

module.exports = router;
