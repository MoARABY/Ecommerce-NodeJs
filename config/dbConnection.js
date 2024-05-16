const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    const connection =await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>{
        console.log("connected to database");
    })
    .catch((err)=>{
        console.log(err);
    });
}

module.exports = dbConnection;