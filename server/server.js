const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const request = require('request');
const db = require('./firebase-wrapper.js');

/* Allows our POST requests to show their body property, I guess */
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/* Make it so we can use our CSS and JS files in 'public' */
app.use(express.static('public'));

/* When the BASE URL for the site is retrieved */
app.get('/', (req, res) => {
	/* Sends the user to the main page for the site */
	res.sendFile(path.resolve('.', 'views/home.html'));
});

app.get('/journal', (req, res) => {
	/* Sends the user to the main page for the site */
	res.sendFile(path.resolve('.', 'views/journal.html'));
});

/* Retrieve our ideas on server startup */
var ideas = [];
https.get('https://date-idea.firebaseio.com/ideas.json', (response) => {
		response.on('data', (d) => {
			ideaObject = JSON.parse(d);
			if (ideaObject) {
				Object.keys(ideaObject)
					.forEach(key => {
						ideas.push(ideaObject[key]);
					});
			}
		});
	})
	.on('error', (e) => {
		console.error(e);
	});

/* Get a single random idea */
app.get('/get-idea', (req, res) => {
	db.getRandom(idea => {
		res.send(idea);
	});
});

/* Retrieves the Submit an Idea page */
app.get('/submit', (req, res) => {
	/* Sends them to the page */
	res.sendFile(path.resolve('.', 'views/submitIdea.html'));
});

/* Submits a new idea */
app.post('/submit-idea', (req, res) => {
	/* Get the information from the "req" (request) object */
	var idea = req.body;
	/* If the cost is empty, set it to 0 */
	if (!idea.cost) idea.cost = 0;
	/* Set the likes and dislikes to 0 by default */
	idea.likes = 0;
	idea.dislikes = 0;
	/* Set the approved property to "false" by default */
	idea.approved = false;
	/* This uses the function stored in 'firebase-wrapper.js'
	   that saves the idea to the database */
	db.newIdea(idea.title, idea);
	/* Sends the user back to the same page they were on, otherwise
	   it would send them to an error page */
	res.sendFile(path.resolve('.', 'views/submitIdea.html'));
});

/* Likes (increment or decrement) an idea */
app.put('/like', (req, res) => {
	db.like(req.body.title, 1);
	db.dislike(req.body.title, -1);
	res.send('Complete');
});

/* Dislikes (increment or decrement) an idea */
app.put('/dislike', (req, res) => {
	db.dislike(req.body.title, 1);
	db.like(req.body.title, -1);
	res.send('Complete');
});

/* Launch the server and start listening for incoming requests */
app.listen(3100, () => console.log('App listening on port 3100!'));
