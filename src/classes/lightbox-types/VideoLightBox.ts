import ContainerAttributes from "../../constants/containerAttributes";
import IConfig from "../../interfaces/IConfig";
import Attribute from "../../types/Attribute";
import DragonLightBox from "../abstract/DragonLightBox";

class VideoLightBox extends DragonLightBox {
    
    constructor(resource: string, attributes: Attribute[], config: IConfig) {
        super(resource, attributes, config);
    }
    
    override buildElement(): void {
        const video = document.createElement('video');
        video.setAttribute('tabindex', '0');
        video.hidden = true;
        this.element = video;
        this.setCommonAttributes();

        video.setAttribute(ContainerAttributes.CACHED, this.resourceUrl);
        video.controls = true;
        video.classList.add('dlightbox-video');
        this.spinner.showSpinner();

        const source = document.createElement('source');

        source.src = this.resourceUrl;

        video.addEventListener('click', (event) => event.stopPropagation());
        video.append(source);

        source.onerror = () => {
            this.loaded = false;
            this.spinner.showSpinner('Error on loading video');
            this.spinner.element.classList.add('error');
        }

        video.oncanplay = () => { 
            this.loaded = true
            if (this.element.getAttribute('src') == '') return;
            this.spinner.hideSpinner();
            video.classList.add('lightbox-shadow');
            video.hidden = false;
            if (this.config.autoplay && this.isSelected) {
                video.play();
            }
        }

    }

    override open(): void {
        if (!this.loaded || !this.isElementBuilt()) {
            this.buildElement();
            return;
        }
        this.element.style.display = '';
        if (this.config.autoplay) {
            (this.element as HTMLVideoElement).play();
        }
    }

    override close() {
        this.abortDownloadingUnloadedNode()
        this.spinner.hideSpinner();
        this.element.style.display = 'none';
        this.isSelected = false;
        (this.element as HTMLVideoElement).pause();
    }
}

export default VideoLightBox;
