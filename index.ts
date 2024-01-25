import DLightBox from "./src/classes/DLightBox";

declare global {
    interface Window {
        dragonLightBox: any
    }
}

(() => {
    const dl = new DLightBox();
    window.dragonLightBox = {
        instances: dl.instances,
        create: dl.create.bind(dl),
        refresh: dl.refresh.bind(dl)
    }
})()