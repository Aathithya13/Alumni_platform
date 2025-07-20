const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    reference: { type: String },
    Date:{type:Date,default:new Date()},
    category:{type:String,required:true}
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    batch: { type: String },
    dob: { type: Date },
    password: { type: String, required: true},
    profileImage: { type: String },
    posts: [PostSchema]
});

module.exports = mongoose.model('User', UserSchema);
