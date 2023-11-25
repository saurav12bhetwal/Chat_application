const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const app=express()
require("../db/db")
app.use(express.json())
const router=require("../Routers/userRouter")
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept") 
    next()
 })

const port=process.env.PORT || 5000
app.use("/user",router)
app.listen(port,()=>{
    console.log(`port start at ${port}...`)
})