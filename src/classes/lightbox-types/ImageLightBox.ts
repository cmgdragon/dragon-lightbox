import IConfig from "../../interfaces/IConfig";
import { autoscale_image } from "../../styles/functions/getAutoscale";
import Attribute from "../../types/Attribute";
import DragonLightBox from "../abstract/DragonLightBox";

class ImageLightBox extends DragonLightBox {
    
    constructor(resource: string, attributes: Attribute[], config: IConfig) {
        super(resource, attributes, config);
    }

    override buildElement(): void {
        const image = document.createElement('img');
        image.hidden = true;
        this.element = image;
        this.setCommonAttributes();
        image.setAttribute('style', autoscale_image(this.config.autoscale));

        image.classList.add('dlightbox-image');
        this.spinner.showSpinner();
        
        image.src = this.resourceUrl;

        image.onerror = () => {
            this.loaded = false;
            if (this.element.getAttribute('src') == '') return;
            this.spinner.showSpinner('Error on loading image');
            this.spinner.element.classList.add('error');
        }

        image.onload = () => {
            this.spinner.hideSpinner();
            this.loaded = true;
            image.classList.add('lightbox-shadow');
            image.hidden = false;
        }

    }

}

export default ImageLightBox;
