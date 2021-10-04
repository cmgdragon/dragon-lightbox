import IConfig from "../interfaces/IConfig";
import defaultConfig from "../constants/defaultConfig";
import LightBoxContainer from "./lightbox-container/LightBoxContainer";
import ContainerAttributes from "../constants/containerAttributes";
import ILightBoxContainerInstance from "../interfaces/ILightBoxContainerInstance";
import IResourceElement from "../interfaces/IResourceElement";
import Attribute from "../types/Attribute";

class DLightBox {

    static _instances: Map<number, ILightBoxContainerInstance>;
    constructor() {
        DLightBox._instances = new Map<number, ILightBoxContainerInstance>();
        this.autoinit();
    }

    get instances() {
        return DLightBox._instances;
    }

    static createInstanceObject = (lb: LightBoxContainer): ILightBoxContainerInstance => {
        return {
            open: lb.openContainer.bind(lb),
            close: lb.destroyContainer.bind(lb),
            remove: () => DLightBox.removeInstanceObject(lb),
            bind: lb.addNodeEventListeners.bind(lb),
            listen: lb.listen.bind(lb),
            elements: lb.elements,
            bindings: lb.bindings
        }
    }

    static removeInstanceObject = (lb: LightBoxContainer): void => {
        lb.removeNodeEventListeners.call(lb);
        DLightBox._instances.delete(lb.id);
    }

    create(resources: [string, Attribute[]?] | [string, Attribute[]?][], _config?: IConfig): ILightBoxContainerInstance {
        if (typeof resources[0] !== 'string' && !Array.isArray(resources[0])) {
            throw new Error("Invalid type");
        }

        const resourcesList = Array.isArray(resources[0]) || Array.isArray(resources) ? [resources] : [[resources]];
        const resourceElements: IResourceElement[] = new Array<IResourceElement>();
        for (const [url, attributes] of resourcesList) {

            const element = document.createElement('div');
            const _attributes = <Attribute[]> attributes ?? null;

            if (_attributes && _attributes.find(a => a.name === ContainerAttributes.TYPE)) {
                element.setAttribute(ContainerAttributes.TYPE, _attributes.find(a => a.name === ContainerAttributes.TYPE)?.value ?? '')
            }
            element.setAttribute('data-dlightbox', String(url));
            resourceElements.push({ element, attributes: _attributes });

        }

        const config = _config ? { ...defaultConfig, ..._config } : defaultConfig;
        const lb = new LightBoxContainer(resourceElements, config, true);
        const instance = DLightBox.createInstanceObject(lb);
        DLightBox._instances.set(lb.id, instance);

        return instance;
    }

    private autoinit(): void {
        const groupContainers = document.querySelectorAll(`[${ContainerAttributes.CONTAINER}]`);
        const soloContainers = document.querySelectorAll(`[${ContainerAttributes.INITIALIZER}]:not([${ContainerAttributes.CONTAINER}]>[${ContainerAttributes.INITIALIZER}])`);

        const initContainer = (container: Element, resources: IResourceElement[]) => {
            const config = this.getConfig(container);
            config.attributes = this.getAttributes(container);
            config.type = config.attributes.find(a => a.name === 'data-type')?.value;
            const lb = new LightBoxContainer(resources, config);
            DLightBox._instances.set(lb.id, DLightBox.createInstanceObject(lb));
        }

        for (const container of groupContainers) {
            const resources: IResourceElement[] = Array.from(container.children).map(element => ({ element, attributes: this.getAttributes(element) }))
            initContainer(container, resources);
        }
        
        for (const container of soloContainers) {
            const resources: IResourceElement[] = [{ element: container, attributes: this.getAttributes(container) }]
            initContainer(container, resources);

        }
    }

    private getConfig = (container: Element): IConfig => {
        let config = defaultConfig;
        const attributes = Object.values(container.attributes).map(attr => ({name: attr.name, value: attr.nodeValue}));
        for (const { name, value } of attributes) {
            const parsedName = name.replace(`${ContainerAttributes.DATA}-`, '')
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

    private getAttributes = (element: Element): Attribute[] => {
        const _attributes: Attribute[]  = [];
        if (!element.attributes) return _attributes;
        for (const { name, nodeValue } of Object.values(element.attributes)) {
            const parsedName = name.replace(`${ContainerAttributes.DATA}-`, '')
            _attributes.push({ name: parsedName, value: nodeValue ?? '' })
        }
        return _attributes;
    }
}

export default DLightBox;