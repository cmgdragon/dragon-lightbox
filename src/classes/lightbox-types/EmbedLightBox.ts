import IConfig from "../../interfaces/IConfig";
import DragonLightBox from "../abstract/DragonLightBox";

class EmbedLightBox extends DragonLightBox {
    
    constructor(resource: string, config: IConfig) {
        super(resource, config);
    }

    override buildElement(): void {
        const iframe = document.createElement('iframe');


        this.element = iframe;
    }

}

export default EmbedLightBox;
