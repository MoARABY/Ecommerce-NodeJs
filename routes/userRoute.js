const express = require('express');
const router = express.Router();
const {showUser,showUsers,updateUser,deleteUser,userStats} = require('../controllers/userController');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middlewares/verifyToken');


router.get('/',verifyTokenAndAdmin,showUsers)
router.get('/:id',verifyTokenAndAdmin,showUser)
router.put('/:id',verifyTokenAndAuthorization,updateUser);
router.delete('/:id',verifyTokenAndAuthorization,deleteUser)
router.get('/stats/all',verifyTokenAndAdmin,userStats)


module.exports = router;