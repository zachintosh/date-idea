export default function getTemplate(elName, idea) {
    return `
        <div class="${elName}__idea">
            <div class="${elName}__ideaTitle">${idea.title}</div>
            <div class="${elName}__ideaDescription">
                ${idea.description}
            </div>
        </div>
    `;
}