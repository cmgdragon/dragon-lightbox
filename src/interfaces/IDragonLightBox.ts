interface IDragonLightBox {
    resourceUrl: string,
    element: HTMLElement,
    loaded: boolean,
    isSelected: boolean,
    open: () => void,
    close: () => void
}

export default IDragonLightBox;