import IConfig from "../interfaces/IConfig";

const lightbox_types_styles = (config: IConfig) =>`
.lightbox-image {
    ${config.autoescale === true ? 'width: 100%' : config.autoescale === false ? 'max-width: 100%' : `max-width: ${config.autoescale}px`};
}

.lightbox-video {
    ${config.autoescale === true ? 'width: 100%' : config.autoescale === false ? 'max-width: 100%' : `max-width: ${config.autoescale}px`};
}
`;

export default lightbox_types_styles;