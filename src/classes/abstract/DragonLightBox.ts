import IConfig from "../../interfaces/IConfig";
import IDragonLightBox from "../../interfaces/IDragonLightBox";
import LightBoxSpinner from '../lightbox-spinner/LightBoxSpinner';

abstract class DragonLightBox implements IDragonLightBox {

    private _element: HTMLElement | null;
    private _resourceUrl: string;
    private _error: boolean;
    protected config: IConfig;
    private _isSelected: boolean;
    private _spinner: LightBoxSpinner;
    constructor(resourceUrl: string, config: IConfig) {
        this._resourceUrl = resourceUrl;
        this.config = config;
        this._isSelected = false;
        this._element = null;
        this._error = false;
        this._spinner = new LightBoxSpinner();

        if (!this.config.lazy) {
            this.buildElement();
        }
    }
    
    get element() {
        return this._element!;
    }
    get isSelected() {
        return this._isSelected;
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
    set error(didLoad: boolean) {
        this._error = didLoad;
    }
    
    protected buildElement(): any {}

    protected isElementBuilt(): boolean {
        if (!this.element) return false;

        if (this._error) { this.element.remove() }

        const attributesValues = Object.values(this.element.attributes).map(attr => attr.nodeValue);
        if (this._error || !attributesValues.includes(this.resourceUrl)) {
            this.error = false;
            return false;
        }
        return true;
    }
    open(): void {
        if (!this.isElementBuilt()) {
            this.buildElement();
        }
        this.element.style.display = '';
    }
    close(): void {
        this.element.style.display = 'none';
        this.isSelected = false;
    }
}


export default DragonLightBox;
