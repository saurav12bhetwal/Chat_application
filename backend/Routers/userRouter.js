const express=require("express")
const router=express.Router()
const auth=require("../middleware/auth")
const {loginController,signupController,fetch}=require("../controllers/userController")
router.post("/login",loginController)
router.post("/signup",signupController)
router.get("/fetchdata",auth,fetch)
module.exports=router