//Backend server for facereco App 
//Created by Osama Namur

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const Clarifai = require('Clarifai');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const appClarifai = new Clarifai.App({
  apiKey: 'd3d287bfeb274f8db3375e27344a7ce4'
 });


const databasepost = knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'eethar',
		database:'smart-brain'
	}
});

const saltRounds = 10;

app.post('/imageurl',(req,res) => {
	appClarifai.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
})


app.get('/',(req,res)=>{
	res.send(dataBase.users);
})

app.post('/signin',(req,res)=>{
	if(!req.body.email || !req.body.password){
		return res.status(400).json('incorrect form submission')
	}
	
   databasepost.select('email','hash').from('login')
   .where('email','=',req.body.email)
   .then(data => {

   	const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
   	if(isValid){
   		return databasepost.select('*').from('users')
   		.where('email','=',req.body.email)
   		.then(user => {
   			res.json(user[0])
   		})
   		.catch(err => res.status(400).json('unable to get to user'))
   	}else{
   		res.status(400).json('wrong wrong wrong')
   	}
   })
   .catch(err => res.status(400).json("wrong info"))
})

app.post('/register',(req,res)=>{
	const {name,email,password} = req.body;

	if(name.length == 0 || email.length == 0 || password.length == 0){
		return res.status(400).json('incorrect form submission')
	}

	var hash = bcrypt.hashSync(password, saltRounds);


	databasepost.transaction(trx => {
		trx.insert({
			hash: hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				name: name,
				email: loginEmail[0],
				joined: new Date()
			}).then(user =>{res.json(user[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
})	
	.catch(err => res.status(400).json('error registring'))	
});

app.get('/profile/:id',(req,res) => {
	const {id} = req.params;

	databasepost.select('*').from('users').where({id:id})
	.then(user => {
		if (user.length){
			res.json(user[0])
		}else{
			res.status(400).json('not found')
		}
		
	})

});

app.put('/image',(req,res) => {
	const {id} = req.body;
	databasepost('users').where('id','=',req.body.id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	}).catch(err => res.status(400).json('unable to get count'))
})

app.listen(process.env || 3001,()=>{
	console.log('app is running');
})
