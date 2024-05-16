const express = require('express');
const router = express.Router();
const {createOrder,updateOrder,deleteOrder,showOrder,showOrders,monthlyIncome} = require('../controllers/orderController');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middlewares/verifyToken');


router.post('/',verifyToken,createOrder);
router.put('/:id',verifyTokenAndAuthorization,updateOrder);
router.delete('/:id',verifyTokenAndAdmin,deleteOrder);
router.get('/find/:userId',verifyTokenAndAuthorization,showOrder);
router.get('/',verifyTokenAndAdmin,showOrders);
router.get('/income/all',verifyTokenAndAdmin,monthlyIncome);


module.exports = router;