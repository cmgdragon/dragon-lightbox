interface IDragonLightBox {
    resourceUrl: string,
    element: HTMLElement,
    open: () => void,
    close: () => void
}

export default IDragonLightBox;