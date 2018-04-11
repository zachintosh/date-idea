import getStyles from './journalEntry-style.js';
import getTemplate from './journalEntry-template.js';

var elName = 'di-journal-entry';

const styleEl = document.createElement('style');
styleEl.setAttribute('component', elName);
styleEl.textContent = getStyles(elName);
document.head.appendChild(styleEl);

class JournalEntry extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        this.date = this.getAttribute('date');
        this.title = this.getAttribute('title');
        this.side = this.getAttribute('side');
        this.description = this.innerHTML;
    }

    // Fires when the element is added to the document
    connectedCallback() {
        this.innerHTML = getTemplate(elName, {
            date: this.date,
            title: this.title,
            description: this.description,
            side: this.side
        });
        
    }
}

customElements.define('di-journal-entry', JournalEntry);