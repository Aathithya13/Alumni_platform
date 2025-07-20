const express = require('express');
const router = express();
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');



const SECRET_KEY = 'STUDENT@123';

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/profile');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({
    storage:storage
}).single('profileImage');


router.post('/studentRegister',upload,async(req,res)=>{
    console.log('Received file:', req.file);  // Log file details for debugging
    console.log('Received body:', req.body);
    const {username,email,department,password} = req.body;
    const hash = await bcrypt.hash(password,10);
    const profileImage = req.file ? req.file.filename : null; 
    if (!username || !email || !department || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try{
        const existUser = await Student.findOne({username});
        if(existUser){
            return res.status(400).json({error:"User already exist change the Username"});
        }
        const existEmail = await Student.findOne({email});
        if(existEmail){
            return res.status(400).json({error:"User already exist change the Email"});
        }
        const newUser = new Student({username,email,department,password:hash,profileImage});
        const user = await newUser.save();
        res.status(200).json({message:"User Registered Successfully",user});
    }
    catch(err){
        console.log("Error:"+err.message);
        res.status(500).json({error:"Error in Registeration"});
    }
});

router.post('/studentLogin',async(req,res)=>{
    const {username,password} = req.body;
    try{
        const existUser = await Student.findOne({username});
        if(!existUser){
           return res.status(400).json({error:"Please Enter valid Credentials1"});
        }
        const isMatch = await bcrypt.compare(password,existUser.password);
        if(!isMatch){
            return res.status(400).json({error:"Please Enter Valid Credentials"});
        }
        const token = jwt.sign({userId:existUser._id},SECRET_KEY,{expiresIn:'1h'})
        res.status(200).json({message:'Login Successfull',token});
     }
     catch(err){
        res.status(500).json({error:"Error in Login"});
        console.log("Error:"+err.message);
     }
});


router.get('/alumniPortal',async(req,res)=>{
    try{
        const user = await User.find().select('-password');
        res.status(200).json({message:"Data Fetched Successfully",user});
    }
    catch(err){
        res.status(500).json({error:"Error in Fetching"});
        console.log("Error:"+err.message);
    }
});


router.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;  // Extract the user ID from the URL parameters
    try {
      const user = await User.findById(userId);  // Use the user ID to find the user
      res.status(200).json({ message: "Data Fetched Successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Error in Fetching User" });
      console.log("Error: " + err.message);
    }
  });

router.get('/batches', async (req, res) => {
    try {
        const batches = await User.distinct('batch'); // Get distinct categories
        res.json(batches);
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

router.get('/batch', async (req, res) => {
    const { batch } = req.query;
    try {
      let users;
      if (batch && batch !== 'all') {
        users = await User.find({ batch }).select('-password');
      } 
      else {
        users = await User.find({});
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch items' });
    }
});



router.get('/category', async (req, res) => {
    try {
        const { category } = req.query;

        // Find all posts that match the specified category
        const users = await User.find({ 'posts.category': category });

        if (!users.length) {
            return res.status(404).json({ message: "No posts found in this category" });
        }

        // Combine all posts from the found users
        const filteredPosts = users.flatMap(user => user.posts.filter(post => post.category === category));

        res.json(filteredPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});


  
module.exports = router;