const express = require("express");
const app =  express();
const mongoose = require("mongoose");
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://nate:u4zJago40axAK8TJ@cluster0.0duifq0.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParseL:true,
  useUnifiedTopology:true
},(err)=>{
  if(!err){
    console.log("connected to db")
  }else{
    console.log("error")
  }
})


app.listen(3000,()=>{
  console.log("on port 3000")
})


// //Schema
// const sch= {

// }

// app.post("/post/rest/ticket/", async(req,res)=>{
//   console.log("inside post function");
  
//   const data = 
// })