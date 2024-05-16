const userModel=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const passportGithub=require('passport-github');
require('dotenv').config();






const userRegister=async(req,res)=>{
    // res.send('user register');
    try {
        const {username,email,password}=req.body;
        if(!username || !email || !password){return res.status(400).json({message:'All fields are required'})}
        if(password.length<6){return res.status(400).json({message:'Password must be atleast 6 characters long'})}
        if(!email.includes('@')){return res.status(400).json({message:'Invalid email'})}
        const findUser=await userModel.findOne({username});
        if(findUser){return res.status(400).json({message:'User already exists'})}
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const newUser = await userModel.create({
            username
            ,email
            ,password:hashPassword
        });
        newUser?res.status(201).json({message:'User registered successfully'}):res.status(400).json({message:'User registration failed'})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const userLogin=async(req,res)=>{
    // res.send('user login');
    try {
        const {username}=req.body;
        if(!username || !req.body.password){return res.status(400).send("All fields are required")}
        const findUser= await userModel.findOne({username})
        if(!findUser) {return res.status(400).json({message:'check your password or username'})}
        const validPassword=await bcrypt.compare(req.body.password,findUser.password)
        if(!validPassword) {return res.status(400).json({message:'check your password or username'})}
        const {password,...others}=findUser._doc;

        // create token
        const accessToken=jwt.sign({
            id:findUser._id,
            isAdmin:findUser.isAdmin
        },process.env.JWT_SECRET,{expiresIn:'1d'})

        res.status(200).json({...others,accessToken})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports={userRegister,userLogin}
