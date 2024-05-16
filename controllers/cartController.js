const cartModel = require('../models/cartModel');


const createCart= async (req, res) => {
    try {
        const newCart = await cartModel.create(req.body);
        newCart ? res.status(200).json(newCart) : res.status(400).json({msg:"Cannot create cart"})
    } catch (err) {
        res.status(500).json(err);
    }
}

  //UPDATE
const updateCart= async (req, res) => {
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        updatedCart ? res.status(200).json(updatedCart) : res.status(400).json({msg:"Cannot update cart"})
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteCart= async (req, res) => {
    try {
        const deletedCart= await cartModel.findByIdAndDelete(req.params.id);
        deletedCart ? res.status(200).json({deletedCart,msg:"Cart has been deleted"}) : res.status(400).json({msg:"Cannot delete cart"})
    } catch (err) {
        res.status(500).json(err);
    }
}


const showCart= async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.params.userId });
        cart ? res.status(200).json(cart) : res.status(400).json({msg:"Cannot find cart"})
    } catch (err) {
        res.status(500).json(err);
    }
};

const showCarts= async (req, res) => {
    try {
        const carts = await cartModel.find();
        carts ? res.status(200).json(carts) : res.status(400).json({msg:"Cannot find carts"})
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {createCart,updateCart,deleteCart,showCart,showCarts};