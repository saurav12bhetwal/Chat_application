const User=require("../models/userModel")
const jwt=require("jsonwebtoken")
const expressAsyncHandler=require("express-async-handler")
const auth=expressAsyncHandler(async(req,res,next)=>{
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
       let token=req.headers.authorization.split(" ")[1]; 
       const decode=await jwt.verify(token,"process.env.JWT_TOKEN")
      req.user=await User.findById(decode.id).select("-password")
      next()
    } catch (error) {
        res.sendStatus(401)
        throw new Error("Not authorizer token failed")
    }
}

})
module.exports=auth