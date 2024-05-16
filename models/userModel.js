const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    githubId:{type:String}
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);