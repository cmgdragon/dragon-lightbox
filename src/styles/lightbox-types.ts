import IConfig from "../interfaces/IConfig";
import mobile_breakpoint from "../constants/mobile_breakpoint";

const lightbox_types_styles = (config: IConfig) =>`
.dlightbox-image {
    max-height: inherit;
    max-width: unset;
    object-fit: contain;
    width: inherit;
    ${config.autoscale === true ? 'width: 100%' : config.autoscale === false ? 'width: auto; max-width: inherit' : `max-width: ${config.autoscale}px`};
}
.dlightbox-video {
    max-height: inherit;
    max-width: unset;
    object-fit: contain;
    ${config.autoscale ? 'width: 100%' : 'width: auto; max-width: inherit'};
    ${Number.isInteger(config.autoscale) ? `width: inherit; max-width: ${config.autoscale}px` : ''};
}
.dlightbox-embed {
    max-height: inherit;
    max-width: unset;
    ${config.autoscale ? 'width: 100%' : 'width: 55vw'};
    ${config.autoscale ? 'height: calc(100vw - 55vw)' : 'height: calc(50vw - 20vw)'};
    ${Number.isInteger(config.autoscale) ? `max-width: ${config.autoscale}px` : ''};
    ${Number.isInteger(config.autoscale) ? `max-height: calc(${config.autoscale}px - calc(${config.autoscale >= 300 ? '300px' : `${config.autoscale}px`} / 2.2))` : ''};
}
@media (max-width: ${mobile_breakpoint}px) {
    .dlightbox-video, .dlightbox-embed { width: 100% }
    .dlightbox-embed { height: calc(100vw - 20vw) }
}
`;

export default lightbox_types_styles;