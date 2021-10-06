export const autoscale_image = (autoscale: boolean | number) => {
    return `${autoscale === true ? 'width: 100%' : autoscale === false ? 'width: auto; max-width: inherit' : `max-width: ${autoscale}px`};`
}

export const autoscale_video = (autoscale: boolean | number) => {
    return `
    ${autoscale ? 'width: 100%' : 'width: auto; max-width: inherit'};
    ${Number.isInteger(autoscale) ? `width: inherit; max-width: ${autoscale}px` : ''};
    `
}

export const autoscale_embed = (autoscale: boolean | number) => {
    return `
    ${autoscale ? 'width: 100%' : 'width: 55vw'};
    ${autoscale ? 'height: calc(100vw - 55vw)' : 'height: calc(50vw - 20vw)'};
    ${Number.isInteger(autoscale) ? `max-width: ${autoscale}px` : ''};
    ${Number.isInteger(autoscale) ? `max-height: calc(${autoscale}px - calc(${autoscale >= 300 ? '300px' : `${autoscale}px`} / 2.2))` : ''};
    `
}