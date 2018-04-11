export default function getTemplate(elName, details) {
    return `
        <div class="${elName}__journalEntry ${elName}__side${details.side}">
            <div class="line"></div>
            <div class="${elName}__date ${elName}__side${details.side}">
                ${details.date}
            </div>
            <div class="${elName}__title ${elName}__side${details.side}">
                ${details.title}
            </div>
            <div class="${elName}__description ${elName}__side${details.side}">
                ${details.description}
            </div>
        </div>
    `;
}