const  jwt=require('jsonwebtoken');
require('dotenv').config();


const verifyToken=(req,res,next)=>{
    const authToken= req.headers.token;
    if(!authToken){return res.status(401).json({message:'Access denied'})}
    const token = authToken.split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
        return res.status(401).json({err})
    }
        req.user=user;
    next();
})
}
/*
- Create a middleware named verifyToken in the middlewares folder.
- Import the jsonwebtoken module.
- Export a function named verifyToken.
- The function should accept three parameters: req, res, and next.
- In the function, create a constant named authToken and assign it the value of req.headers.Token.
- If authToken is falsy, return res.status(401).json({message: 'Access denied'}).
- Else create a constant named verifiedUser and assign it the value of jwt.verify(authToken, process.env.JWT_SECRET).
- Call the next() function. 
- Export the verifyToken function.
- Import the verifyToken middleware in the userRoute.js file.
*/

const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        } else {
            return res.status(403).send("You are not authorized to perform this action")
        }
    })
}

const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        } else {
            return res.status(403).send("You are not authorized to perform this action")
        }
    })
}
module.exports={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};

