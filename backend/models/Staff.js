const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    reference: { type: String },
    Date:{type:Date,default:new Date()},
    category:{type:String,required:true}
});

const StaffSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    dept: { type: String,required:true },
    password: { type: String, required: true},
    posts: [PostSchema]
});

module.exports = mongoose.model('Staff', StaffSchema);
