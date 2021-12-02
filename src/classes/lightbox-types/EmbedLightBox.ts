import ContainerAttributes from "../../constants/containerAttributes";
import IConfig from "../../interfaces/IConfig";
import { autoscale_embed } from "../../styles/functions/getAutoscale";
import Attribute from "../../types/Attribute";
import DragonLightBox from "../abstract/DragonLightBox";
import getVideoProviderUrl from "./functions/getVideoProviderUrl";

class EmbedLightBox extends DragonLightBox {
    
    constructor(resource: string, attributes: Attribute[], config: IConfig) {
        super(resource, attributes, config);
    }
    
    override buildElement(): void {
        const iframe = document.createElement('iframe');
        iframe.hidden = true;
        this.element = iframe;
        this.spinner.showSpinner();
        this.setCommonAttributes();
        iframe.setAttribute('style', autoscale_embed(this.config.autoscale));

        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.setAttribute('tabindex', '0');
        iframe.setAttribute(ContainerAttributes.CACHED, this.resourceUrl);
        iframe.setAttribute('frameborder', '0');
        iframe.allowFullscreen = true;
        iframe.classList.add('dlightbox-embed');
        iframe.style.display = 'none';
        let iframeSrc = '';

        iframeSrc = getVideoProviderUrl(this.resourceUrl, this.config.autoplay);
        iframe.src = iframeSrc === '' ? this.resourceUrl : iframeSrc;
      
        iframe.onload = () => {
            this.loaded = true;
            if (!this.isSelected) return;
            iframe.classList.add('lightbox-shadow');
            this.spinner.hideSpinner();
            iframe.hidden = false;
            iframe.style.display = '';
        };

        iframe.onerror = () => {
            this.loaded = false;
            this.element.remove();
            this.spinner.showSpinner('Error on loading iframe');
            this.spinner.element.classList.add('error');
        }

    }

    override open(): void {
        if (!this.isElementBuilt() && this.config.autoplay) {
            this.buildElement();
            return;
        } else {
            if (!this.isElementBuilt()) {
                this.buildElement();
                this.element.style.display = '';
                return;
            }
            this.element.classList.add('lightbox-shadow');
            this.element.style.display = '';
        }
    }

    override abortDownloadingUnloadedNode = () => {
        if (!this.loaded && this.element.getAttribute('src') == '') {
            this.element.remove();
            return;
        }
    }

    override close(): void {
        this.abortDownloadingUnloadedNode()
        this.spinner.hideSpinner();
        this.loaded = false;
        this.element.remove();
        this.element.classList.remove('lightbox-shadow');
        this.element.style.display = 'none';
        this.isSelected = false;
    }

}

export default EmbedLightBox;
