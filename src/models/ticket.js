const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
  id:{
    type : Number,
    required : true
  },
  created_at:{
    type : String,
    required : true
  },
  updated_at:{
    type : String,
    required : true
  },
  type:{
    type : String,
    required : true
  },
  subject:{
    type : String,
    required : true
  },
  description:{
    type : String,
    required : true
  },
  priority:{
    type : String,
    required : true
  },
  status:{
    type : String,
    required : true
  },
  recipient: {
    type : String,
    required : true
  },
  submitter:{
    type : String,
    required : true
  },
  assigned_id:{
    type : Number,
    required : true
  },
  follower_id:{
    type : Number,
    required : true
  },
  tags:{
    type : String,
    required : true
  }
});



module.exports = mongoose.model('Tickets',ticketSchema)