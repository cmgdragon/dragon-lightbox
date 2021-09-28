import IConfig from "../../interfaces/IConfig";
import DragonLightBox from "../abstract/DragonLightBox";

class ImageLightBox extends DragonLightBox {
    
    constructor(resource: string, config: IConfig) {
        super(resource, config);
    }

    override buildElement(): void {
        const image = document.createElement('img');
        image.setAttribute('tabindex', '0');
        image.hidden = true;
        this.element = image;

        image.classList.add('lightbox-image');
        this.spinner.showSpinner();
        
        image.src = this.resourceUrl;

        image.onerror = () => {
            console.log("didn't load");
            this.spinner.hideSpinner();
            this.error = true;
        }

        image.onload = () => {
            image.classList.add('lightbox-shadow');
            this.spinner.hideSpinner();
            image.hidden = false;
        }

    }

}

export default ImageLightBox;
