import IConfig from "../interfaces/IConfig";
import mobile_breakpoint from "../constants/mobile_breakpoint";

const lightbox_types_styles = (_config: IConfig) =>`
.dlightbox-image {
    max-height: inherit;
    max-width: unset;
    object-fit: contain;
    width: inherit;
}
.dlightbox-video {
    max-height: inherit;
    max-width: unset;
    object-fit: contain;
}
.dlightbox-embed {
    max-height: inherit;
    max-width: unset;
}
@media (max-width: ${mobile_breakpoint}px) {
    .dlightbox-video, .dlightbox-embed { width: 100% !important }
    .dlightbox-embed { height: calc(100vw - 20vw) !important }
}
`;

export default lightbox_types_styles;