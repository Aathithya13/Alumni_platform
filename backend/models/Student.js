const mongoose = require('mongoose');



const PostSchema = new mongoose.Schema({
    query:{ type: String },
    Date:{type:Date,default:new Date()},

});


const studentSchema = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    department:{type:String,required:true},
    profileImage:{type:String},
    posts: [PostSchema]
})

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;