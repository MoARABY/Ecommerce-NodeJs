const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    products:[
        {
            productId:{type:String,required:true},
            Quantity:{type:Number,default:1}
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('Cart', cartSchema);