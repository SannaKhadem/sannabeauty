require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Parse JSON data
app.use(express.json());

// Import route modules
const indexRoute = require('./routes/index');
const behandlingarRoute = require('./routes/behandlingar');
const kontaktRoute = require('./routes/kontakt');
const omossRoute = require('./routes/omoss');
const adminRoutes = require('./routes/admin');

// Register routes
app.use('/', indexRoute);
app.use('/behandlingar', behandlingarRoute);
app.use('/kontakt', kontaktRoute);
app.use('/omoss', omossRoute);
app.use('/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
