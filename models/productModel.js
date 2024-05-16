const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{type:String, required:true,unique:true},
    description:{type:String, required:true,max:500},
    img:{type:String},
    categories:{type:Array, default:[]},
    size:{type:String},
    color:{type:String},
    price:{type:Number,required:true},
},{timestamps:true})

module.exports = mongoose.model('Product', productSchema);