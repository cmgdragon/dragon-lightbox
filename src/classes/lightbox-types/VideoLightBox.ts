import ContainerAttributes from "../../constants/containerAttributes";
import IConfig from "../../interfaces/IConfig";
import DragonLightBox from "../abstract/DragonLightBox";

class VideoLightBox extends DragonLightBox {
    
    constructor(resource: string, config: IConfig) {
        super(resource, config);
    }

    override buildElement(): void {
        const video = document.createElement('video');
        video.setAttribute(ContainerAttributes.LAZY, this.resourceUrl);
        video.controls = true;
        video.classList.add('lightbox-video');

        const source = document.createElement('source');
        source.src = this.resourceUrl;

        video.addEventListener('click', (event) => event.stopPropagation());
        video.append(source);

        this.element = video;
    }

    override close() {
        this.element.style.display = 'none';
        (this.element as HTMLVideoElement).pause();
    }
}

export default VideoLightBox;
