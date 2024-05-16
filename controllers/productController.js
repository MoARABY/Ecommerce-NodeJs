const productModel = require('../models/productModel');


const createProduct = async (req, res) => {
    try {
        const {title,description,price}=req.body
        if(!title || !title || !price){return res.status(400).send("all fields are mendatory")}
        const newProduct=await productModel.create({title,description,price})
        newProduct ? res.status(200).json(newProduct):res.status(400).json({msg:"Connot create product"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getProducts = async (req, res) => {
    try {
        const queryNew=req.query.new
        const queryCategory=req.query.category
        let products;
        console.log(queryNew)
        console.log(queryCategory)
        if(queryNew) { products = await productModel.find().sort({ createdAt: -1 }).limit(1);}
        if(queryCategory){ products = await productModel.find({categories : {$in : [queryCategory]}})}
        else { products = await productModel.find()}
        products.length>0 ? res.status(200).json(products) : res.status(400).json({msg:"no products founded"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getProduct = async (req, res) => {
    try {
        const product=await productModel.findById(req.params.id)
        product ? res.status(200).json(product) : res.status(400).json({msg:"cant find this product"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const updateProduct = async (req, res) => {
    try {
        const updateProduct= await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        updateProduct ? res.status(200).json(updateProduct) : res.status(400).json({msg:"cant find this product"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const deleteProduct = async (req, res) => {
    try {
        const deleteProduct= await productModel.findByIdAndDelete(req.params.id)
        deleteProduct ? res.status(200).json({deleteProduct,msg:"deleted success"}) : res.status(400).json({msg:"cant find this product"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


module.exports = {createProduct,getProducts,getProduct,updateProduct,deleteProduct}

