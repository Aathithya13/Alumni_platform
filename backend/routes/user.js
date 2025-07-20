const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'supersecretkey123';  // Hardcoded secret key

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');  // Directory for saving images
    },
    filename: (req, file, cb) => {
        cb(null, 'profile_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('profileImage');

// User Registration with Image Upload
router.post('/register', upload, async (req, res) => {
    const { username, email, batch, dob, password } = req.body;
    const profileImage = req.file ? req.file.filename : null; 
    
    console.log({ username, email, batch, dob, password,file:req.file.filename })

    if (!username || !email || !batch || !dob || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            batch,
            dob,
            password: hashedPassword,
            profileImage  
        });

        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log({username,password});

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
