import IConfig from "../../interfaces/IConfig";
import DragonLightBox from "../abstract/DragonLightBox";

class ImageLightBox extends DragonLightBox {
    
    constructor(resource: string, config: IConfig) {
        super(resource, config);
    }

    override buildElement(): void {
        const image = document.createElement('img');
        image.src = this.resourceUrl;
        image.classList.add('lightbox-image');

        this.element = image;
    }

}

export default ImageLightBox;
