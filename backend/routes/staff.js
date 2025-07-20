const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Staff = require('../models/Staff');

const router = express.Router();
const JWT_SECRET = 'supersecretkey123';  


/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');  
    },
    filename: (req, file, cb) => {
        cb(null, 'profile_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('profileImage'); */


router.post('/staffregister', async (req, res) => {
    const { username, email, dept, password } = req.body;  

    if (!username || !email || !dept || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userExists = await Staff.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = new Staff({
            username,
            email,
            dept,
            password: hashedPassword,
        });

        await newStaff.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/stafflogin', async (req, res) => {
    const { username, password } = req.body;
    console.log({username,password});

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const staff = await Staff.findOne({ username });
        console.log(staff);
        if (!staff) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password,staff.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: staff._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
