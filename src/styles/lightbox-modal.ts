import IConfig from "../interfaces/IConfig";

const lightbox_modal_styles = (config: IConfig) => `
.overflow-hidden {
    overflow-y: hidden !important;
}
.lightbox-modal {
    display: flex;
    justify-content: center;
    z-index: 1000;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.87);
    transition: opacity .2s ease-in;
    transition-property: transform, opacity;
    opacity: 0;
}
.lightbox-modal-open {
    opacity: 1;
}
`;

export default lightbox_modal_styles;