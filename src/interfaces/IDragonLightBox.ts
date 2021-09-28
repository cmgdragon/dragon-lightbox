interface IDragonLightBox {
    resourceUrl: string,
    element: HTMLElement,
    error: boolean,
    isSelected: boolean,
    open: () => void,
    close: () => void
}

export default IDragonLightBox;