import getStyles from './ideaDisplay-style.js';
import getTemplate from './ideaDisplay-template.js';
import IdeaItem from '../ideaItem/ideaItem.js';

var elName = 'di-idea-display';

const styleEl = document.createElement('style');
styleEl.setAttribute('component', elName);
styleEl.textContent = getStyles(elName);
document.head.appendChild(styleEl);

class IdeaDisplay extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        this.ideaItems = [];
        this.currentIdeaElement;
        this.currentIdea = null;
    }

    // Fires when the element is added to the document
    connectedCallback() {
        this.innerHTML = getTemplate(elName);
        this.ideaContainer = this.querySelector(`.${elName}__ideaContainer`);
    }

    // Add an idea to our list of ideas
    addIdea(idea) {
        if (this.ideaItems.length === 0) {
            this.querySelector(`.${elName}__emptyMessage`).remove();
        }
        this.currentIdea = idea;
        // Create the item
        var newIdeaItem = new IdeaItem(idea);
        // Save it here for later use
        this.ideaItems.push(newIdeaItem);
        // Hide the current idea
        if (this.currentIdeaElement) {
            this.currentIdeaElement.remove();
        }
        this.ideaContainer.appendChild(newIdeaItem);
        newIdeaItem.classList.add(`${elName}__idea__fadeIn`);
        this.currentIdeaElement = newIdeaItem;
        if (currFavorites && currFavorites.map(item => item.title).includes(idea.title)) {
            document.querySelector('.button__favorite').style.backgroundImage = 'url("../images/yellowStar.svg")';
        } else {
            document.querySelector('.button__favorite').style.backgroundImage = 'url("../images/grayStar.svg")';
        }
    }
}

customElements.define('di-idea-display', IdeaDisplay);