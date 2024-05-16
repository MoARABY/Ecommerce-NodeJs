const express = require('express');
const router = express.Router();
const multer=require('multer');
const {createProduct,getProducts,getProduct,updateProduct,deleteProduct} = require('../controllers/productController');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middlewares/verifyToken');


// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads')
//     }, 
//     filename: (req, file, cb) => {
//         // cb(null, req.body.name)
//         cb(null, "product.jpg")
//     }
// })
// const upload = multer({ storage: storage });
// router.post("/",upload.single("file"),(req,res)=>{
//     res.status(200).json("File has been uploaded")
// })
router.get('/',verifyTokenAndAdmin,getProducts)
router.post('/',verifyTokenAndAdmin,createProduct);
router.put('/:id',verifyTokenAndAdmin,updateProduct);
router.get('/:id',verifyTokenAndAdmin,getProduct)
router.delete('/:id',verifyTokenAndAdmin,deleteProduct)

module.exports = router;