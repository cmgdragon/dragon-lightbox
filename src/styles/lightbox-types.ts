import IConfig from "../interfaces/IConfig";
import mobile_breakpoint from "../constants/mobile_breakpoint";

const lightbox_types_styles = (config: IConfig) =>`
.dlightbox-image {
    max-height: inherit;
    max-width: unset;
    object-fit: contain;
    width: inherit;
    ${config.autoescale === true ? 'width: 100%' : config.autoescale === false ? 'width: auto; max-width: inherit' : `max-width: ${config.autoescale}px`};
}
.dlightbox-video {
    max-height: inherit;
    max-width: unset;
    object-fit: contain;
    ${config.autoescale ? 'width: 100%' : 'width: auto; max-width: inherit'};
    ${Number.isInteger(config.autoescale) ? `width: inherit; max-width: ${config.autoescale}px` : ''};
}
.dlightbox-embed {
    max-height: inherit;
    max-width: unset;
    ${config.autoescale ? 'width: 100%' : 'width: 55vw'};
    ${config.autoescale ? 'height: calc(100vw - 55vw)' : 'height: calc(50vw - 20vw)'};
    ${Number.isInteger(config.autoescale) ? `max-width: ${config.autoescale}px` : ''};
    ${Number.isInteger(config.autoescale) ? `max-height: calc(${config.autoescale}px - calc(${config.autoescale >= 300 ? '300px' : `${config.autoescale}px`} / 2.2))` : ''};
}
@media (max-width: ${mobile_breakpoint}px) {
    .dlightbox-video, .dlightbox-embed { width: 100% }
    .dlightbox-embed { height: calc(100vw - 20vw) }
}
`;

export default lightbox_types_styles;