import DragonLightBox from "./abstract/DragonLightBox";

class LightBoxNode {
    value: DragonLightBox;
    prev: LightBoxNode | null;
    next: LightBoxNode | null;
    constructor(value: DragonLightBox) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export default LightBoxNode;