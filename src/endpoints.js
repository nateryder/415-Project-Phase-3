const express = require('express');
const mongoose= require('mongoose');
const Ticket = require('./models/ticket')
const bodyParser = require('body-parser');

const fs = require('fs');


const app =  express();
mongoose.set('strictQuery',false);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const PORT =process.env.PORT ||3000;

const CONNECTION = process.env.CONNECTION;







app.get('/', (req,res) => {
	res.sendFile(__dirname + "/post.html");
});

app.post('/', (req,res) => {
	let newTicket = new Ticket({
		id:req.body.id,
		created_at:req.body.created_at,
		updated_at:req.body.updated_at,
		type:req.body.type,
		subject:req.body.subject,
		description:req.body.description,
		priority:req.body.priority,
		status:req.body.status,
		recipient:req.body.recipient,
		submitter:req.body.submitter,
		assigned_id:req.body.assigned_id,
		follower_id:req.body.follower_id,
		tags:req.body.tags
	})
	newTicket.save();
	res.redirect('/')
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

app.put('/rest/list/:id', async(req,res) => {
	try {
		const id = req.params.id;
		const result = await Ticket.findOneAndUpdate({ id: id }, req.body);
		res.json({ updatedCount: result ? 1 : 0 });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

app.delete('/rest/list/:id', async(req,res) => {
	try {
		const id = req.params.id;
		const result = await Ticket.deleteOne({ id: id }, req.body);
		res.json({ deleteCount: result ? 1 : 0 });
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

const convert = require('xml-js');

class TicketAdapter {
  static async getTicketAsXml(id) {
    const ticket = await Ticket.findOne({ id: id });
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    const ticketJson = ticket.toJSON();
    const xml = convert.js2xml(ticketJson, { compact: true, ignoreComment: true, spaces: 4 });
    return xml;
  }
}

app.get('/rest/ticket/:id/xml', async (req, res) => {
	try {
	  const xml = await TicketAdapter.getTicketAsXml(req.params.id);
	  res.set('Content-Type', 'application/xml');
	  res.send(xml);
	} catch (e) {
	  res.status(404).send({ error: e.message });
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


