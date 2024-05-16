const express=require('express');
const app=express();
const morgan=require('morgan');
const session = require('express-session');
const passport = require('passport');
const passportGithub = require('./middlewares/passportStrategy');
require('dotenv').config();

// import routes
const dbConnection = require('./config/dbConnection');
const limiter = require('./middlewares/rateLimiter');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const stripeRoute = require('./routes/stripeRoute');


// use middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('common'));
app.use(session({
     secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
}));

// REQUESTS =====================================
app.get('/',(req,res)=>{
    res.send('ecommerce application');
})
app.use('/api/auth',limiter,authRoute);
app.use('/api/user',userRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);
app.use("/api/checkOut",stripeRoute);
passport.use(passportGithub);
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/cb', 
  passport.authenticate('github', { failureRedirect: '/api/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
// ==============================================


// listen server
PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    dbConnection();
})