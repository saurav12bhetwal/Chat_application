const mongoose=require("mongoose");
const messageModel=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" 
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" 
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat" 
    }
},{timestamps:true})
const Message=new mongoose.model("message",messageModel)
module.exports=Message;