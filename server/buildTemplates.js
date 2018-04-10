import {html, render} from 'lit-html';

var ideaTemplate = (idea) => {
    html`
    <div class="idea-template grey-text text-darken-3">
        <div class="idea-container">
            <div class="left-col spacer">
                <div class="idea-title">${idea.title}</div>
                    <span class="idea-description">${idea.description}</span>
                </div>
            <div class="right-col flex-container">
        </div>
    </div>`
}
