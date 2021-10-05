import ElementBind from "../types/ElementBind";

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