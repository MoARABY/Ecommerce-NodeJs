const userModel=require('../models/userModel');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
require('dotenv').config();

const Strategy= new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/cb"
},async(accessToken, refreshToken, profile, cb) => {
    const findUser= await userModel.findOne({ githubId: profile.id })
    if(findUser){return cb(null, findUser);}
    const randomPassword = Math.random().toString(36).slice(-8); // Generates an 8-character random password
    const newUser = await userModel.create({
        username:profile.username,
        email:profile.email || `${profile.id}@github.com`,
        password:randomPassword,
        githubId:profile.id
    });
    return cb(null, newUser);
})
passport.serializeUser((user,done)=>{
    return done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
const findUser = userModel.findById({id})
    if(!findUser){
        return done(err)
    } else {
        return done(null, findUser);
    }
})
module.exports=Strategy;
