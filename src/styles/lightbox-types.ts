import IConfig from "../interfaces/IConfig";

const lightbox_types_styles = (config: IConfig) =>`
.lightbox-image {
    max-height: inherit;
    object-fit: contain;
    width: inherit;
    ${config.autoescale === true ? 'width: 100%' : config.autoescale === false ? 'width: auto; max-width: inherit' : `max-width: ${config.autoescale}px`};
}

.lightbox-video {
    max-height: inherit;
    object-fit: contain;
    ${config.autoescale ? 'width: 100%' : 'width: auto; max-width: inherit'};
    ${Number.isInteger(config.autoescale) ? `width: inherit; max-width: ${config.autoescale}px` : ''};
}

.lightbox-embed {
    max-height: inherit;
    ${config.autoescale ? 'width: 100%' : 'width: 55vw'};
    ${config.autoescale ? 'height: calc(100vw - 55vw)' : 'height: calc(50vw - 20vw)'};
    ${Number.isInteger(config.autoescale) ? `max-width: ${config.autoescale}px` : ''};
    ${Number.isInteger(config.autoescale) ? `max-height: calc(${config.autoescale}px - calc(${config.autoescale >= 300 ? '300px' : `${config.autoescale}px`} / 2.2))` : ''};
}
`;

export default lightbox_types_styles;