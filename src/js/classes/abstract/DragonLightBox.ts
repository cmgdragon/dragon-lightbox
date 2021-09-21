import IDragonLightBox from "../../interfaces/IDragonLightBox";

abstract class DragonLightBox extends Element implements IDragonLightBox {

    _element: HTMLDivElement;

    constructor() {
        super();
        this._element = document.createElement('div');
    }

    get element(): HTMLDivElement {
        return this.element;
    }

    createElement(): void {}

}

export default DragonLightBox;
