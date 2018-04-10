export default function getStyles(elName) {
    return `
        @keyframes fadeOut {
            from {
                opacity: 1;
                margin-left: 0;
            } to {
                opacity: 0;
                margin-left: -100vw;
            } 
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                margin-left: 100vw;
            } to {
                opacity: 1;
                margin-left: 0;
            } 
        }

        .${elName}__idea {
            box-sizing: border-box;
            width: 100vw;
            padding: 0 20px;
            transition: all 0.75s ease-in-out;
        }
        .${elName}__ideaTitle {
            font-size: 3em;
            text-align: center;
            margin: 10px 0;
            color: var(--c-teal1);
        }
        .${elName}__ideaDescription {
            font-size: 1em;
            text-align: center;
        }
        .${elName}__idea__dim {
            animation: fadeOut .2s;
        }
        .${elName}__idea__fadeIn {
            animation: fadeIn .2s;
        }

        @media screen and (max-width: 500px) {
            .${elName}__idea {
                box-sizing: border-box;
                width: 100vw;
                padding: 0 40px;
                transition: all 0.75s ease-in-out;
                
            }
        }
    `;
}