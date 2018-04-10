export default function getTemplate(elName) {
    return `
        <div class="${elName}__ideaContainer">
            <div class="${elName}__emptyMessage">Press the button below to get a random idea!</div> 
        </div>
    `;
}