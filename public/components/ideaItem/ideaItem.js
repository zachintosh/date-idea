import getStyles from './ideaItem-style.js';
import getTemplate from './ideaItem-template.js';

var elName = 'di-idea-display';

const styleEl = document.createElement('style');
styleEl.setAttribute('component', elName);
styleEl.textContent = getStyles(elName);
document.head.appendChild(styleEl);

export default class IdeaItem extends HTMLElement {
    constructor(idea) {
        // Always call super first in constructor
        super();
        this.idea = idea;
    }

    // Fires when the element is added to the document
    connectedCallback() {
        this.innerHTML = getTemplate(elName, this.idea);
    }
}

customElements.define('di-idea-item', IdeaItem);