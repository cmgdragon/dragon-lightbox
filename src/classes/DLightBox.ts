import IConfig from "../interfaces/IConfig";
import defaultConfig from "../constants/defaultConfig";
import LightBoxContainer from "./lightbox-container/LightBoxContainer";
import ContainerAttributes from "../constants/containerAttributes";
import ILightBoxContainerInstance from "../interfaces/ILightBoxContainerInstance";
import IResourceElement from "../interfaces/IResourceElement";
import Attribute from "../types/Attribute";
import getConfigByAttributes from "./functions/getConfigByAttributes";
import smartAttributes from "../constants/smartAttributes";

class DLightBox {

    private _instances: Map<number, ILightBoxContainerInstance>;
    constructor() {
        this._instances = new Map<number, ILightBoxContainerInstance>();
        this.autoinit();
    }

    get instances() {
        return this._instances;
    }

    private createInstanceObject = (lb: LightBoxContainer): ILightBoxContainerInstance => {
        const instance = {
            open: lb.openContainer.bind(lb),
            close: lb.destroyContainer.bind(lb),
            remove: () => this.removeInstanceObject(lb),
            bind: lb.addNodeEventListeners.bind(lb),
            listen: lb.listen.bind(lb),
            elements: lb.elements,
            bindings: lb.bindings
        }
        this.instances.set(this.instances.size == 0 ? 0 : 
            [...this.instances.keys()][this.instances.size-1]+1, instance)
        return instance;
    }

    private removeInstanceObject = (lb: LightBoxContainer): void => {
        lb.removeNodeEventListeners.call(lb);
        this.instances.delete(lb.id);
    }

    create(resources: [string, Attribute[]?] | [string, Attribute[]?][], _config?: IConfig): ILightBoxContainerInstance {

        try {
            
            const resourcesList = Array.isArray(resources[0]) ? resources : [[resources]];
            const resourceElements: IResourceElement[] = new Array<IResourceElement>();

            for (const [url, attributes] of resourcesList as Array<any>) {

                const element = document.createElement('div');
                const _attributes = attributes ?? null;

                if (_attributes && _attributes.find(a => a.name === ContainerAttributes.TYPE)) {
                    element.setAttribute(ContainerAttributes.TYPE, _attributes.find(a => a.name === ContainerAttributes.TYPE)?.value ?? '')
                }
                element.setAttribute('data-dlightbox', String(url));
                resourceElements.push({ element, attributes: _attributes });
                
            }

            const config = _config ? { ...defaultConfig, ..._config } : defaultConfig;
            const lb = new LightBoxContainer(this.instances.size, resourceElements, config, true);
    
            return this.createInstanceObject(lb);

        } catch (error: any) {
            throw new Error(`Invalid dlightbox input: ${error.message}`);
        }       
    }

    refresh() {
        this.instances.forEach(i => i.remove());
        this.autoinit();
    }

    private autoinit(): void {
        const groupContainers = document.querySelectorAll(`[${ContainerAttributes.CONTAINER}]`);
        const soloContainers = document.querySelectorAll(`[${ContainerAttributes.INITIALIZER}]:not([${ContainerAttributes.CONTAINER}] [${ContainerAttributes.INITIALIZER}])`);

        const initContainer = (container: Element, resources: IResourceElement[]) => {
            let config = this.getConfig(container);
            config.attributes = this.getAttributes(container);
            config = { ...config, ...this.getConfig(container, config.attributes) }

            const lb = new LightBoxContainer(this.instances.size, resources, config);
            this.createInstanceObject(lb);
        }

        for (const container of groupContainers) {
            const _smartAttributes = smartAttributes.map(attr => `[${attr}]`);
            const resources: IResourceElement[] = Array.from(container.querySelectorAll(`${_smartAttributes.join()}`))
                .filter(element => !element.hasAttribute(ContainerAttributes.IGNORE))
                .map(element => ({ element, attributes: this.getAttributes(element) }))
            if (resources.length) initContainer(container, resources);
        }
        
        for (const container of soloContainers) {
            const resources: IResourceElement[] = [{ element: container, attributes: this.getAttributes(container) }]
            initContainer(container, resources);
        }
    }

    private getConfig = (container: Element, _attributes?: Attribute[]): IConfig => {
        const attributes = _attributes ? _attributes :
        <Attribute[]> Object.values(container.attributes).map(attr => ({name: attr.name, value: attr.nodeValue}));
        return getConfigByAttributes(defaultConfig, attributes);
    }

    private getAttributes = (element: Element): Attribute[] => {
        const _attributes: Attribute[]  = [];
        if (!element.attributes) return _attributes;

        const omittedAttr = ['tabindex', 'class'];

        for (const { name, nodeValue } of Object.values(element.attributes)) {
            if (omittedAttr.includes(name.toLowerCase())) continue;
            const parsedName = name.replace(`${ContainerAttributes.DATA}-`, '')
            _attributes.push({ name: parsedName, value: nodeValue ?? '' })
        }
        return _attributes;
    }
}

export default DLightBox;