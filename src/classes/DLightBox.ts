import IConfig from "../interfaces/IConfig";
import defaultConfig from "../constants/defaultConfig";
import LightBoxContainer from "./lightbox-container/LightBoxContainer";
import ContainerAttributes from "../constants/containerAttributes";

class DLightBox {

    private _instances: Map<number, LightBoxContainer>;
    constructor() {

        this._instances = new Map<number, LightBoxContainer>();
        this.init();
    }

    get instances() {
        return this._instances;
    }

    private init(): void {
        const containers = document.querySelectorAll(`[${ContainerAttributes.INITIALIZER}]`);
        const groupContainers = Array.from(containers).filter(node => node.childElementCount !== 0)
        const soloContainers = Array.from(containers).filter(node => node.childElementCount === 0)

        for (const container of groupContainers) {
            const config = this.getConfig(container);
            const lb = new LightBoxContainer(Array.from(container.children) as Element[], config);
            this._instances.set(this._instances.size, lb);
        }

        for (const container of soloContainers) {
            const config = this.getConfig(container);
            const lb = new LightBoxContainer([container], config);
            this._instances.set(this._instances.size, lb);
        }
    }

    private getConfig = (container: Element): IConfig => {
        let config = defaultConfig;
        const attributes = Object.values(container.attributes).map(attr => ({name: attr.name, value: attr.nodeValue}));
        for (const { name, value } of attributes) {
            const parsedName = name.replace(`${ContainerAttributes.CONFIG}-`, '')
            if (value === '' || value == null) continue;

            if (Object.keys(config).includes(parsedName)) {
                let parsedValue: boolean | string | number = value;

                //boolean check
                parsedValue = value?.toLocaleLowerCase() === 'true' || value?.toLocaleLowerCase() === 'false' ?
                                    value?.toLocaleLowerCase() === 'true' : value!;
                //number check
                parsedValue = /^[0-9]+$/.test(parsedValue as string) ? Number(parsedValue) : parsedValue;

                config = { ...config, [parsedName]: parsedValue }
            }
        }
        return config;
    }
}

export default DLightBox;