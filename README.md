# SannaBeauty

A modern, responsive web application for Sanna Beauty Clinic. Features before/after image sliders, treatment galleries, admin dashboard, and contact form. Built with Node.js, Express, EJS, and custom CSS/JS.

## Features

- Responsive design for all devices (iPhone, Android, desktop)
- Before/after image comparison (BeerSlider)
- Admin dashboard for uploading and managing images
- Contact form with validation
- Treatment pages with galleries
- Secure file upload (Multer)
- PNG/JPG support with automatic filename normalization

## Screenshots

![Homepage Screenshot](public/img/hero-frame.jpg)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://gitlab.lnu.se/ln223kd/sannabeauty.git
   cd sannabeauty
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   The app will run on [http://localhost:3000](http://localhost:3000) by default.

## Usage

- Visit `/` for the homepage and treatment info.
- Admin dashboard: `/admin` (authentication can be added for security).
- Upload images via the dashboard.
- Contact form at `/kontakt`.

## Project Structure

```
.
├── public/         # Static assets (css, js, images)
├── views/          # EJS templates
├── routes/         # Express route files
├── models/         # Mongoose models (if using MongoDB)
├── config/         # Multer and other configs
├── server.js       # Main server file
└── package.json
```

## Requirements

- Node.js (v16+ recommended)
- npm

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License

## Authors

- Sanna Khadem (project owner)
- Leila Nikkheslat (developer)

## Support

For questions or support, open an issue or contact the project owner.
