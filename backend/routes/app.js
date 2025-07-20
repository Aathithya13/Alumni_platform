const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const studentRoutes = require('./routes/students');
const staffRoutes = require('./routes/staff');
const donationRoutes = require('./routes/donation');
const eventRoutes = require("./routes/events");
const mobileRoutes = require('./routes/mobile')
const path = require('path');
const cors = require('cors');

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/your_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.use(express.static('public'));

app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000'
}));



app.use('/public/images', express.static(path.join(__dirname, 'public/images')));
app.use('/public/posts', express.static(path.join(__dirname, 'public/posts')));
app.use('/public/events', express.static(path.join(__dirname, 'public/events')));


app.use(userRoutes);
app.use(postRoutes);
app.use(studentRoutes);
app.use(staffRoutes);
app.use('/api/donation',donationRoutes);
app.use(eventRoutes);
app.use(mobileRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
