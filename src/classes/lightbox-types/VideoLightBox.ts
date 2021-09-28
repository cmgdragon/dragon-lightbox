import ContainerAttributes from "../../constants/containerAttributes";
import IConfig from "../../interfaces/IConfig";
import DragonLightBox from "../abstract/DragonLightBox";

class VideoLightBox extends DragonLightBox {
    
    constructor(resource: string, config: IConfig) {
        super(resource, config);
    }
    
    override buildElement(): void {
        const video = document.createElement('video');
        video.setAttribute('tabindex', '0');
        video.hidden = true;
        this.element = video;

        video.setAttribute(ContainerAttributes.CACHED, this.resourceUrl);
        video.controls = true;
        video.classList.add('lightbox-video');
        this.spinner.showSpinner();

        const source = document.createElement('source');

        source.src = this.resourceUrl;

        video.addEventListener('click', (event) => event.stopPropagation());
        video.append(source);

        source.onerror = () => {
            this.error = true;
            this.spinner.hideSpinner();
            console.log("didn't load")
        }

        video.oncanplay = () => { 
            console.log('LOADED');
            this.spinner.hideSpinner();
            video.classList.add('lightbox-shadow');
            video.hidden = false;
            if (this.config.autoplay && this.isSelected) {
                video.play();
            }
        }

    }

    override open(): void {
        if (!this.isElementBuilt()) {
            this.buildElement();
        }
        this.element.style.display = '';
        if (this.config.autoplay) {
            (this.element as HTMLVideoElement).play();
        }
    }

    override close() {
        this.element.style.display = 'none';
        this.isSelected = false;
        (this.element as HTMLVideoElement).pause();
    }
}

export default VideoLightBox;
