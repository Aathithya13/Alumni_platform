const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const User = require('../models/User');
const { error } = require('console');
const fs = require('fs'); 

const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = file.fieldname === 'postImage' ? 'public/posts' : 'public/images';
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).fields([
    { name: 'postImage', maxCount: 1 }
]);


router.post('/add-post', auth, upload, async (req, res) => {
    const { description, reference,category} = req.body;
    console.log({description,reference,category});
    const postImage = req.files['postImage'] ? req.files['postImage'][0].filename : null;

    if (!postImage || !description || !category) {
        return res.status(400).json({ error: 'Image and description are required' });
    }

    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.posts.push({ image: postImage, description, reference,category});
        await user.save();

        res.json({ message: 'Post added successfully', posts: user.posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add post' });
    }
});


router.get('/my-posts', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ posts: user.posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

router.get('/details',upload,auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user.userId);
        if(!user){
            res.status(400).json({error:'User not Found'});
        }
        res.status(200).json({message:"Details fetched Successfully",user})
    }
    catch(err){
        console.log("Error:"+err.message);
        res.status(500).json({error:"Error in fetching"});        
    }
});


router.get('/post/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const user = await User.findOne({ "posts._id": postId });
        if (!user) {
            return res.status(404).json({ error: "Post not found" });
        }

        const post = user.posts.id(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({
            message: "Post details fetched successfully",
            post: post
        });
    } catch (err) {
        console.error("Error fetching post:", err.message);
        res.status(500).json({ error: "Error in fetching post" });
    }
});




router.post('/edit/:id', auth,upload, async (req, res) => {
    const { id } = req.params;
    const { description, reference } = req.body;
    const postImage = req.files['postImage'] ? req.files['postImage'][0].filename : null;

    try {
        // Fetch the user and the post
        const user = await User.findOne({ "posts._id": id });
        if (!user) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Get the existing post to retain the current image if no new image is provided
        const post = user.posts.id(id);
        const existingImage = post.image;

        // Update post details
        post.description = description;
        post.reference = reference;
        post.image = postImage || existingImage;  // Use new image if provided, otherwise keep the existing one

        await user.save();  // Save the updated user data

        res.json({ success: true, post });
    } catch (error) {
        console.error("Error updating post:", error.message);
        res.status(500).json({ error: "Error updating post" });
    }
});






router.delete('/delete/:postId', auth, async (req, res) => {
    const { postId } = req.params;

    try {
        
        const user = await User.findOne({ "posts._id": postId });
        if (!user) {
            return res.status(404).json({ error: "User or post not found" });
        }

        
        const post = user.posts.find(post => post._id.toString() === postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        
        if (post.image) {
            const imagePath = `public/posts/${post.image}`;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image file: ${err.message}`);
                } else {
                    console.log(`Deleted image file: ${imagePath}`);
                }
            });
        }

        
        user.posts = user.posts.filter(post => post._id.toString() !== postId);

        
        await user.save();

        res.json({ message: "Post deleted successfully", posts: user.posts });
    } catch (error) {
        console.error("Error deleting post:", error.message);
        res.status(500).json({ error: "Error deleting post" });
    }
});


router.get('/posts', async (req, res) => {
    try {
        
        const users = await User.find({}, 'posts'); 

        
        const allPosts = users.flatMap(user => user.posts);

        res.json(allPosts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
