import IConfig from "../interfaces/IConfig";
import lightbox_container_styles from "./lightbox-container";
import lightbox_modal_styles from "./lightbox-modal";
import lightbox_types_styles from "./lightbox-types";


const addStyles = (config: IConfig): HTMLStyleElement => {
    const styles = document.createElement('style');
    styles.innerText = `
        ${lightbox_modal_styles(config)}
        ${lightbox_container_styles(config)}
        ${lightbox_types_styles(config)}
    `;

    return styles;
}

export default addStyles;