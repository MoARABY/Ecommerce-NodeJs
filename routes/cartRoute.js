const express = require('express');
const router = express.Router();
const {createCart,updateCart,deleteCart,showCart,showCarts} = require('../controllers/cartController');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyToken");


router.post('/',verifyToken,createCart);
router.put('/:id',verifyTokenAndAuthorization,updateCart);
router.delete('/:id',verifyTokenAndAuthorization,deleteCart);
router.get('/find/:userId',verifyTokenAndAuthorization,showCart);
router.get('/',verifyTokenAndAdmin,showCarts);

module.exports = router;