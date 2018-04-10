var admin = require("firebase-admin");

var serviceAccount = require("./date-ideas-firebase-adminsdk-gxxxi-792dcc2b0e.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://date-ideas.firebaseio.com"
});

var db = admin.firestore();

/* Get a reference to the list of ideas */
var ideas = db.collection('ideas');

/* Get just the approved ideas, and how many there are */
var approvedIdeas = ideas.where('approved', '==', true);
var listLength = 0;
approvedIdeas.get()
	.then(querySnapshot => {
		listLength = querySnapshot.size;
	})
	.catch(err1 => {
		console.error('GET | RANDOM', err1)
	});

/* Function to add a new idea to the collection */
function newIdea(title, contents) {
	ideas.doc(title)
		.set(contents)
		.catch(err => {
			console.error('ADD', err)
		});
};

/* Function to approve an idea */
function approve(title, approved) {
	ideas.doc(title)
		.update({
			approved: approved
		})
		.catch(err => {
			console.error('APPROVE', err)
		});
}

/* Function to remove an idea */
function remove(title) {
	ideas.doc(title)
		.delete()
		.catch(err => {
			console.error('REMOVE', err)
		});
}

function getRandom(callback) {
	/* Get a random integer */
	var randomNum = Math.floor(Math.random() * listLength);
	/* Get the single idea item */
	approvedIdeas.limit(1)
		.offset(randomNum)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(documentSnapshot => {
				/* Send the data back as an object */
				callback(documentSnapshot.data());
			});
		})
		.catch(err2 => {
			console.error('LIMIT | RANDOM', err2)
		});
}

/* Export of all functions */
module.exports = {
	newIdea: newIdea,
	approve: approve,
	remove: remove,
	getRandom: getRandom
}
