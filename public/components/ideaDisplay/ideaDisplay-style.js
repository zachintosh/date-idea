export default function getStyles(elName) {
    return `
        .${elName}__ideaContainer {
            display: flex;
            justify-content: center;
            width: 100%;
            padding-top: 20px;
            margin-top: none;
        }

        @media screen and (max-width: 500px) {
            .${elName}__ideaContainer {
                margin-top: 5vh;
            }
        }
    `;
}