import IConfig from "../../interfaces/IConfig";
import IDragonLightBox from "../../interfaces/IDragonLightBox";
import Attribute from "../../types/Attribute";
import LightBoxSpinner from '../lightbox-spinner/LightBoxSpinner';

abstract class DragonLightBox implements IDragonLightBox {

    private _element: HTMLElement | null;
    private _resourceUrl: string;
    private _loaded: boolean;
    private _config: IConfig;
    private _isSelected: boolean;
    private _spinner: LightBoxSpinner;
    private _attributes: Attribute[];
    constructor(resourceUrl: string, attributes: Attribute[], config: IConfig) {
        this._resourceUrl = resourceUrl;
        this._attributes = attributes;
        this._config = config;
        this._isSelected = false;
        this._element = null;
        this._loaded = false;
        this._spinner = LightBoxSpinner.getSpinner();

        if (!this.config.lazy) {
            this.buildElement();
        }
    }
    
    get element() {
        return this._element!;
    }
    get config() {
        return this._config;
    }
    get attributes() {
        return this._attributes;
    }
    get isSelected() {
        return this._isSelected;
    }
    get loaded() {
        return this._loaded;
    }
    set loaded(loaded: boolean) {
        this._loaded = loaded;
    }
    get spinner() {
        return this._spinner;
    }
    set isSelected(isSelected: boolean) {
        this._isSelected = isSelected;
    }
    set element(element: HTMLElement) {
        this._element = element;
    }
    get resourceUrl() {
        return this._resourceUrl;
    }
    
    protected buildElement(): any {}

    protected abortDownloadingUnloadedNode = () => {
        this.spinner.element.classList.remove('error');
        if (!this.loaded && this.element.getAttribute('src') != '') {    
            this.element.setAttribute('src', '');
            this.element.remove();
            return;
        }
    }
    protected setCommonAttributes = (): void => {
        if (!this.element || !this.attributes) return;
        for (const { name, value } of this.attributes) {
            if (Object.keys(this.config).find(k => k === name) || !value) continue;
            this.element.setAttribute(name, value);
        }
    }
    protected isElementBuilt(): boolean {
        if (!this.element) return false;

        const attributesValues = Object.values(this.element.attributes).map(attr => attr.nodeValue);
        if (!attributesValues.includes(this.resourceUrl)) {
            return false;
        }
        return true;
    }
    open(): void {
        if (!this.loaded || !this.isElementBuilt()) {
            this.buildElement();
            return;
        }
        this.element.style.display = '';
    }
    close(): void {
        this.abortDownloadingUnloadedNode();
        this.spinner.hideSpinner();
        this.element.style.display = 'none';
        this.isSelected = false;
    }
}


export default DragonLightBox;
