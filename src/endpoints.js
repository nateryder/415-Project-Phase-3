const express = require('express');
const mongoose= require('mongoose');
const Ticket = require('./models/ticket')
const fs = require('fs');


const app =  express();
mongoose.set('strictQuery',false);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const PORT =process.env.PORT ||3000;

const CONNECTION = process.env.CONNECTION;







app.get('/', (req,res) => {
	res.send("Getting Your Ticket!");
});

app.get('/rest/list/', async (req,res) => {
	try{
	const result = await Ticket.find();
  	res.send({"tickets": result});
}catch(e){
	res.status(500).json({error:e.message});
}
});

app.get('/rest/list/:id', async(req,res) => {
	try {
		const id = req.params.id;
		const ticket = await Ticket.findOne({ id: id });
		if (!ticket) {
		  return res.status(404).send({ error: 'Ticket not found' });
		}
		res.send(ticket);
	  } catch (e) {
		res.status(500).json({ error: e.message });
	  }
  
});


 app.post('/rest/ticket/', async (req,res) => {
	try {
		const ticket = new Ticket(req.body);
		await ticket.save();
		const tickets = await Ticket.find();
		const data = JSON.stringify({ tickets: tickets });
		fs.writeFile('tickets.json' , '\n' + data + '\n',  (err) => {
		  if (err) throw err;
		  console.log('Tickets written to file');
		});
		res.status(201).send(ticket);
	  } catch (e) {
		res.status(500).json({ error: e.message });
	  }
  
});


const start = async() =>{
  try {
    await mongoose.connect('mongodb+srv://nate:u4zJago40axAK8TJ@cluster0.0duifq0.mongodb.net/tickets?retryWrites=true&w=majority');
    
   app.listen(PORT,() =>{
     console.log('App listening on port ' + PORT)
   });
 } catch (e){
   console.log(e.message)

  }
 };

 start();


