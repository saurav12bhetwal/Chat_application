const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/chatapp").then(()=>{
    console.log("connected to database...")
}).catch(()=>{
    console.log("error while connecting to database")
})
