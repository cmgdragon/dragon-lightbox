import IConfig from "../../interfaces/IConfig";
import IDragonLightBox from "../../interfaces/IDragonLightBox";

abstract class DragonLightBox implements IDragonLightBox {

    private _element: HTMLElement;
    private _resourceUrl: string;
    protected config: IConfig;
    constructor(resourceUrl: string, config: IConfig) {
        this._resourceUrl = resourceUrl;
        this.config = config;
        this._element = document.createElement('div');

        if (!this.config.lazy) {
            this.buildElement();
        }
    }
    
    get element() {
        return this._element!;
    }
    set element(element: HTMLElement) {
        this._element = element;
    }
    get resourceUrl() {
        return this._resourceUrl;
    }
    
    protected buildElement(): any {}
    open(): void {
        const attributesValues = Object.values(this.element.attributes).map(attr => attr.nodeValue);
        if (!attributesValues.includes(this.resourceUrl)) {
            this.buildElement();
        }
        this.element.style.display = '';
    }
    close(): void {
        this.element.style.display = 'none';
    }
}


export default DragonLightBox;
