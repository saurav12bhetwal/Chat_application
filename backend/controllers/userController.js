const bcrypt=require("bcryptjs")
const User=require("../models/userModel")
const expressAsyncHandler=require("express-async-handler")
const generateToken=require("../Config/generateTokens")
// login part 
const loginController=expressAsyncHandler(async(req,res)=>{
    const {email,password}=req.body 
    const user=await User.findOne({email})
    const passwordMatch=await bcrypt.compare(password,user.password)
    
     if(passwordMatch){
        res.send({ _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)})
     }
     else{
        res.send("password is wrong")
     }
})
// signup part 
const signupController=expressAsyncHandler(async(req,res)=>{
// const {name,email,password}=req.body;
const {name,email,password}=req.body
//check if field is not empty
if(!name || !email || !password){
    res.sendStatus(400)
    throw new Error("some field is empty")
}
//to check that user not already exist

const userExist=await User.findOne({email})
// console.log(userExist)
if(userExist){
    res.sendStatus(400)
    throw new Error("user already exist")
}
//create entry for user
const hashpassword=await bcrypt.hash(password,10)
const user=await User.create({
  name,email,password:hashpassword
})
if(user){
  
 res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token:generateToken(user._id)
 })
}})
const fetch=expressAsyncHandler(async(req,res)=>{
    const keyword=req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}},
        ]
    }:{};
    const users=await User.find(keyword).find({
        _id:{$ne:req.user._id}
    })
    res.send(users)
})
module.exports={signupController,loginController,fetch}