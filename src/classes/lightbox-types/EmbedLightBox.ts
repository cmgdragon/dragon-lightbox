import ContainerAttributes from "../../constants/containerAttributes";
import IConfig from "../../interfaces/IConfig";
import DragonLightBox from "../abstract/DragonLightBox";
import getVideoProviderUrl from "./functions/getVideoProviderUrl";

class EmbedLightBox extends DragonLightBox {
    
    protected isLoaded: boolean = false;
    constructor(resource: string, config: IConfig) {
        super(resource, config);
    }
    
    override buildElement(): void {
        const iframe = document.createElement('iframe');
        iframe.hidden = true;
        this.element = iframe;

        iframe.setAttribute('tabindex', '0');
        iframe.setAttribute(ContainerAttributes.CACHED, this.resourceUrl);
        iframe.setAttribute('frameborder', '0');
        iframe.allowFullscreen = true;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.classList.add('lightbox-embed');
        iframe.style.display = 'none';
        this.spinner.showSpinner();
        
        let iframeSrc = getVideoProviderUrl(this.resourceUrl);
        
        if (this.config.autoplay) {
            iframeSrc += '?autoplay=1';
        }
        
        iframe.src = iframeSrc;

        setTimeout(() => {
            this.element.insertAdjacentElement('afterend', iframe);   
        }, 0);
        
        iframe.onload = () => {
            console.log('LOADED IFRAME');
            this.isLoaded = true;
            if (!this.isSelected) return;
            iframe.classList.add('lightbox-shadow');
            this.spinner.hideSpinner();
            iframe.hidden = false;
            iframe.style.display = '';
        };
        
        iframe.onerror = () => {
            this.error = true;
            this.spinner.hideSpinner();
            console.log("didn't load");
        }

        iframe.onblur = () => console.log('BLUR');
        iframe.onfocus = () => console.log('BLUR');
    }
    override open(): void {
        if (this.config.autoplay) {
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

    override close(): void {
        this.spinner.hideSpinner();
        if (this.config.autoplay) {
            this.element.remove();
            return;
        }
        this.element.classList.remove('lightbox-shadow');
        this.element.style.display = 'none';
        this.isSelected = false;
    }

}

export default EmbedLightBox;
