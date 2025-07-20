// routes/events.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Event = require('../models/Event');

const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/events');  // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    cb(null, Date.now() + fileExt);  // Create a unique filename for each image
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Initialize Multer with the storage and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
  fileFilter: fileFilter
});

// POST route to add a new event with an image
router.post('/addEvent', upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const image = req.file ? req.file.filename : null; // Save image URL
    const newEvent = new Event({ title, description, date, location, image });
    await newEvent.save();
    res.status(200).json({ message: 'Event added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding event. Please try again.' });
  }
});

// GET route to fetch all events
router.get('/allEvent', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events. Please try again.' });
  }
});

module.exports = router;
