const userModel = require('../models/userModel');
const bcrypt=require('bcrypt');

const showUser = async (req, res) => {
    try {
        const user=await userModel.findById(req.params.id);
        const {password,...others}=user._doc;
        !user?res.status(400).json({message:'User not found'}):res.status(200).json({...others})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const showUsers=async(req,res)=>{
    try {
        // const users=await userModel.find();  == return all users
        const query=req.query.new
        const users=query?await userModel.find().sort({_id:-1}).limit(5):await userModel.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const updateUser = async (req, res) => {
    try {
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }
        const newUser=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        const {password,...others}=newUser._doc;
        !newUser?res.status(400).json({message:'User not found'}):res.status(200).json({...others})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteUser = async (req, res) => {
    try {
        const user=await userModel.findByIdAndDelete(req.params.id);
        !user?res.status(400).json({message:'User not found'}):res.status(200).json({message:'User deleted successfully'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// user stats
// get users stats per month
// return number of users per each month
const userStats = async (req, res) => {
    try {
        const date=new Date();
        const lastYear=new Date(date.setFullYear(date.getFullYear()-1)); // get last year date
        const data=await userModel.aggregate([
            {
                $match:{createdAt:{$gte:lastYear}} // get all users created in last year
            },
            {
                $project:{
                    month:{$month:'$createdAt'} // get month of each user created
                }
            },
            {
                $group:{
                    _id:'$month', // group by month
                    total:{$sum:1} // count number of users in each month
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



module.exports = {showUser,showUsers,updateUser,deleteUser,userStats};