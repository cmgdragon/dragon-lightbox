import ContainerAttributes from "../../constants/containerAttributes";
import ContainerTypes from "../../constants/containerTypes";
import videoExtensions from "../../constants/videoExtensions";
import IConfig from "../../interfaces/IConfig";
import DragonLightBox from "../abstract/DragonLightBox";
import { ImageLightBox, VideoLightBox, EmbedLightBox } from "../lightbox-types";

class LightBoxNode {
    private _lightbox: DragonLightBox;
    private _prev: LightBoxNode | null;
    private _next: LightBoxNode | null;

    constructor(id: number, element: HTMLDivElement, config: IConfig) {
        element.setAttribute('data-dlightbox-id', String(id));
        this._lightbox = this.getLightBoxType(element, config);
        this._next = null;
        this._prev = null;
    }

    get lightbox() {
        return this._lightbox;
    }

    get next() {
        return this._next;
    }

    get prev() {
        return this._prev;
    }

    set next(next) {
        this._next = next;
    }

    set prev(prev) {
        this._prev = prev;
    }

    private getLightBoxType(element: HTMLElement, config: IConfig): DragonLightBox {
        const resource: string = (element.getAttribute("src") 
                                || element.getAttribute("href")
                                || element.getAttribute(ContainerAttributes.URL)
                            ) ?? '';

        const type: string | null = element.getAttribute(ContainerAttributes.TYPE);

        if (resource === '') {
            throw new Error('An element resource from a data-dlightbox list is invalid');   
        }

        if (type === ContainerTypes.VIDEO || videoExtensions.some(mime => resource.indexOf(mime) !== -1)) {
            return new VideoLightBox(resource, config);
        }
    
        if (type === ContainerTypes.EMBED) {
            return new EmbedLightBox(resource, config);
        }

        return new ImageLightBox(resource, config);
    }


}

export default LightBoxNode;