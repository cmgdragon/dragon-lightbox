import ElementBind from "../types/ElementBind";
import IConfig from "./IConfig";

interface ILightBoxContainerInstance {
    open: (number?: number) => void,
    close: ()  => void,
    remove: () => void,
    bind: (elementsList: ElementBind) => void,
    elements: Element[],
    listen: (listener: string, cb: () => void) => void,
    bindings: ElementBind[]
}

export default ILightBoxContainerInstance;