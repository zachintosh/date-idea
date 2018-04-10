export default function getStyles(elName) {
    return `
        .${elName}__ideaContainer {
            display: flex;
            justify-content: center;
            width: 100%;
            padding-top: 20vh;
            margin-top: none;
        }
        .${elName}__emptyMessage {
            padding: 0 20vw;
            text-align: center;
        }

        @media screen and (max-width: 500px) {
            .${elName}__ideaContainer {
                margin-top: 5vh;
            }
        }
    `;
}