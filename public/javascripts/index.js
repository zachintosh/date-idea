const host = 'http://localhost:3100';
var repeats = [];
var dateIdeaLiked = [];
var dateIdeaDisliked = [];
var localStorage = window.localStorage;
var currFavorites = JSON.parse(localStorage.getItem('favoriteIdeas')) || [];
var currentFavoriteIndex = 0;
var mode = 'getIdeas';

function getIdea() {

	var ideaRequest = new Request('/get-idea');

	fetch(ideaRequest)
		.then(res => {
			return res.json();
		})
		.then(idea => {
			// give this to the idea display deal
			var display = document.querySelector('di-idea-display');
			display.addIdea(idea);
		})
		.catch(console.error);

}

function addFavorite() {
	var currentIdea = document.querySelector('di-idea-display').currentIdea;
	// Have they generated an idea yet?
	if (currentIdea === null) {
		console.log('Empty Idea');
		return;
	}

	// Check if it has been favorited already
	if (currFavorites) {
		var itemTitles = currFavorites.map(item => item.title);
		if (!itemTitles.includes(currentIdea.title)) {
			currFavorites.push(currentIdea);
			localStorage.setItem('favoriteIdeas', JSON.stringify(currFavorites))
			document.querySelector('.button__favorite').style.backgroundImage = 'url("../images/yellowStar.svg")';
		}
	}
}

function removeFavorite() {
	var currentIdea = document.querySelector('di-idea-display').currentIdea;
	if (currFavorites) {
		currFavorites = currFavorites.filter(item => item.title !== currentIdea.title);
		localStorage.setItem('favoriteIdeas', JSON.stringify(currFavorites))
		document.querySelector('.button__favorite').style.backgroundImage = 'url("../images/grayStar.svg")';
	}
}

function toggleFavorite() {
	if (document.querySelector('.button__favorite').style.backgroundImage.includes('yellowStar')) {
		removeFavorite();
	} else {
		addFavorite();
	}
}

function toggleMode() {
	mode = mode === 'getIdeas' ? 'favorites' : 'getIdeas';

	if (mode === 'getIdeas') {
		document.querySelector('.button__favorite').style.display = '';
		document.querySelector('.button__giveIdea').style.display = '';
		document.querySelector('.button__showFavorites').innerText = 'Favorites';
		document.querySelector('.button__left').style.display = 'none';
		document.querySelector('.button__right').style.display = 'none';
		document.querySelector('.favorites__count').style.display = 'none';
		document.documentElement.style.setProperty('--c-teal1', '#2ae0b8');
	} else {
		document.querySelector('.button__favorite').style.display = 'none';
		document.querySelector('.button__giveIdea').style.display = 'none';
		document.querySelector('.button__showFavorites').innerText = 'Get Ideas';
		document.querySelector('.button__left').style.display = 'block';
		document.querySelector('.button__right').style.display = 'block';
		document.querySelector('.favorites__count').style.display = 'block';
		document.documentElement.style.setProperty('--c-teal1', '#ffef47');
		document.querySelector('di-idea-display').addIdea(currFavorites[currentFavoriteIndex]);
		buttonStates(1);
		buttonStates(-1);
	}
}

function buttonStates(count) {
	if (currentFavoriteIndex + count < 0) {
		document.querySelector('.button__left').style.color = '#888';
		document.querySelector('.button__left').setAttribute('disabled', 'disabled');
	} else if (currentFavoriteIndex + count > currFavorites.length - 1) {
		document.querySelector('.button__right').style.color = '#888';
		document.querySelector('.button__right').setAttribute('disabled', 'disabled');
	} else {
		document.querySelector('.button__right').style.color = 'var(--c-teal1)';
		document.querySelector('.button__left').style.color = 'var(--c-teal1)';
		document.querySelector('.button__right').removeAttribute('disabled');
		document.querySelector('.button__left').removeAttribute('disabled');
	}
	document.querySelector('.favorites__count').innerText = `${currentFavoriteIndex + 1} / ${currFavorites.length}`;
}

function cycleFavorites(count) {
	// If it ends up less than 0 or higher than total favorites, set it to the right count
	if (currentFavoriteIndex + count < 0) {
		return;
	} else if (currentFavoriteIndex + count > currFavorites.length - 1) {
		return;
	} else {
		currentFavoriteIndex = currentFavoriteIndex + count;
		buttonStates(count);
	}
	document.querySelector('di-idea-display').addIdea(currFavorites[currentFavoriteIndex]);
	document.querySelector('.favorites__count').innerText = `${currentFavoriteIndex + 1} / ${currFavorites.length}`;
}

// Add Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	// When the "Give Idea" button is clicked, remove the animation
	document.querySelector('.button__giveIdea').addEventListener('click', () => {
		document.querySelector('.button__giveIdea').style.animation = 'none';
	});

	document.querySelector('.button__giveIdea').addEventListener('click', getIdea);

	document.querySelector('.button__favorite').addEventListener('click', toggleFavorite);

	document.querySelector('.button__showFavorites').addEventListener('click', toggleMode);

	document.querySelector('.button__left').addEventListener('click', () => {
		cycleFavorites(-1);
	});

	document.querySelector('.button__right').addEventListener('click', () => {
		cycleFavorites(1);
	});

	buttonStates(1);
	buttonStates(-1);
});
