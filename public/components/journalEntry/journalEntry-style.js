export default function getStyles(elName) {
    return `
        .${elName}__journalEntry {
            border-top: solid 1px white;
            margin-top: 5px;
        }
        .${elName}__journalEntry.${elName}__side1 {
            
        }
        .${elName}__journalEntry.${elName}__side2 {
            transform: translate(calc(100% + 3px));
        }
        
        .${elName}__date {
            width: 100%;
            color: #68c5ff;
            font-weight: 500;
            font-size: 14px;
            text-transform: uppercase;
        }
        .${elName}__date.${elName}__side1 {
            text-align: right;
            transform: translate(calc(-100% - 12px), -10px);
        }
        .${elName}__date.${elName}__side2 {
            text-align: left;
            transform: translate(calc(100% + 12px), -10px);
        }

        .${elName}__title {
            font-size: 30px;
            color: var(--c-teal1);
            transform: translate(0, -14px);
            width: 100%;
        }
        .${elName}__title.${elName}__side2 {
            transform: translate(0, -14px);
            text-align: right;
        }

        .${elName}__description {
            transform: translate(0, -74px);
            width: 100%;
        }
        .${elName}__description.${elName}__side2 {
            transform: translate(0, -74px);
            text-align: right;
        }

        
    `;
}