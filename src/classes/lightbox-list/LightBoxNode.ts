import ContainerAttributes from "../../constants/containerAttributes";
import ContainerTypes from "../../constants/containerTypes";
import imageExtensions from "../../constants/imageExtensions";
import smartAttributes from "../../constants/smartAttributes";
import videoExtensions from "../../constants/videoExtensions";
import videoProviders from "../../constants/videoProviders";
import IConfig from "../../interfaces/IConfig";
import Attribute from "../../types/Attribute";
import DragonLightBox from "../abstract/DragonLightBox";
import getConfigByAttributes from "../functions/getConfigByAttributes";
import { ImageLightBox, VideoLightBox, EmbedLightBox } from "../lightbox-types";

class LightBoxNode {
    private _lightbox: DragonLightBox;
    id: number;
    private _prev: LightBoxNode | null;
    private _next: LightBoxNode | null;
    element: HTMLElement;

    constructor(element: HTMLElement, attributes: Attribute[], config: IConfig) {
        this.element = element;
        this.id = Number(element.getAttribute(ContainerAttributes.ID));
        const _attributes = attributes ? getConfigByAttributes(config, attributes) : null;
        const cutomConfig = { ...config, ..._attributes  }
        this._lightbox = this.getLightBoxType(element, attributes, cutomConfig);
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

    private getLightBoxType(element: HTMLElement, attributes: Attribute[], config: IConfig): DragonLightBox {

        const resource: string = element.getAttribute(smartAttributes.filter(attr => element.getAttribute(attr))[0]) ?? '';
        const type: string | null = element.getAttribute(ContainerAttributes.TYPE) ??
            config.type ?? null;

        if (resource === '') {
            throw new Error(`Invalid resource. Please, use any of these tags: ${smartAttributes.join()}`);   
        }

        if (type === ContainerTypes.VIDEO || element.localName == 'video' || videoExtensions.some(mime => resource.indexOf(mime) !== -1)) {
            return new VideoLightBox(resource, attributes, config);
        }

        if ( type === ContainerTypes.IMAGE || element.localName == 'img' || imageExtensions.some(mime => resource.indexOf(mime) !== -1)) {
            return new ImageLightBox(resource, attributes, config);
        }

        if (type === ContainerTypes.EMBED || Object.values(videoProviders).some(provider => resource.indexOf(provider) !== -1)) {
            return new EmbedLightBox(resource, attributes, config);
        }

        return new EmbedLightBox(resource, attributes, config);
    }


}

export default LightBoxNode;