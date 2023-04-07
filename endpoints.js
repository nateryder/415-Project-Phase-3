const express = require('express');
const mongoose= require('mongoose')
 const app =  express();
 mongoose.set('strictQuery',false);

 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
 const PORT = 3000;

 const json = {
  "id": 1,
	"created_at": "hi",
	"updated_at": "hi",
	"type": "hi",
	"subject": "hi",
	"description": "hi",
	"priority": "hi",
	"status": "hi",
	"recipient": "hi",
	"submitter": "hi",
	"assignee_id": 1,
	"follower_id": 2,
	"tags": [1, 2, 3]
 };

 app.get('/rest/list/', (req,res) => {
    res.send({"data": json});
 });

 app.post('/rest/ticket/', (req,res) => {
  console.log(req.body);
  res.send(req.body); 
});


 

// const mongoose = require("mongoose");
// mongoose.set('strictQuery', false);
// app.use(express.json());

// app.use(express.urlencoded({extended: true}));


 
// //Schema
// const sch= {
//   id: Number,
//   created_at: String,
//   updated_at: String,
//   type: String,
//   subject:String,
//   description: String,
//   priority: String,
//   status: String,
//   recipient: String,
//   submitter: String,
//   assignee_id: Number,
//   follower_ids: Number,
//   tags: String,
  
// }
// const monmodel=mongoose.model("Parts",sch);

// app.post("/post/rest/ticket/", async(req,res)=>{
//   console.log("inside post function");
  
//   const data = new monmodel({
//   id: req.body.id,
//   created_at: req.body.created_at,
//   updated_at: req.body.updated_at,
//   type: req.body.type,
//   subject:req.body.subject,
//   description: req.body.description,
//   priority: req.body.priority,
//   status: req.body.status,
//   recipient: req.body.recipient,
//   submitter: req.body.submitter,
//   assignee_id: req.body.assignee_id,
//   follower_ids: req.body.follower_ids,
//   tags: req.body.tags

//   });

//   const val = await data.save();
//   res.json(val);
// });









 const start = async() =>{
  try {
    await mongoose.connect('mongodb+srv://nate:u4zJago40axAK8TJ@cluster0.0duifq0.mongodb.net/?retryWrites=true&w=majority');
    
   app.listen(PORT,() =>{
     console.log('App listening on port ' + PORT)
   });
 } catch (e){
   console.log(e.message)

  }
 };

 start();


