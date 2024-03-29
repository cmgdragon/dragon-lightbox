import ContainerAttributes from "../../constants/containerAttributes";
import customEvents from "../../constants/customEvents";
import IConfig from "../../interfaces/IConfig";
import IEventDetail from "../../interfaces/IEventDetail";
import IResourceElement from "../../interfaces/IResourceElement";
import ElementBind from "../../types/ElementBind";
import DragonLightBox from "../abstract/DragonLightBox";
import LightBoxList from "../lightbox-list/LightBoxList";
import LightBoxNode from "../lightbox-list/LightBoxNode";
import LightBoxModal from "../lightbox-modal/LightBoxModal";
import LightBoxSpinner from "../lightbox-spinner/LightBoxSpinner";

class LightBoxContainer {

    id: number;
    lightboxList: LightBoxList;
    private selectedBox: LightBoxNode;
    private modal: LightBoxModal;
    private spinner: LightBoxSpinner;
    private _config: IConfig;
    private elementCount: number;
    container: HTMLElement | null;
    private _elements: Element[];
    private _bindedElements: ElementBind[] = [];
    mediaElement: HTMLElement;
    private events: Map<String, CustomEvent>;

    constructor(size ,resources: IResourceElement[], config: IConfig, nobind?: boolean) {
        this.container = null;
        this.id = size;
        this.mediaElement = document.createElement('div');
        this._config = config;
        this.modal = new LightBoxModal(this);
        this.spinner = LightBoxSpinner.getSpinner();
        this.elementCount = resources.length;
        this.lightboxList = new LightBoxList(resources, this.config);
        this.selectedBox = this.lightboxList.head;
        this.selectedBox.lightbox.isSelected = true;
        this._elements = this.lightboxList.elements;
        this.events = this.buildCustomEvents({ detail: {
            config: this.config,
            count: this.elementCount,
            id: this.id,
            elements: this.elements,
            selectedBox: () => ({ 
                resourceUrl: this.selectedBox.lightbox.resourceUrl,
                element: this.selectedBox.element,
                config: this.selectedBox.lightbox.config,
                attributes: this.selectedBox.lightbox.attributes
            })
        } as IEventDetail })

        if (!nobind) {
            const elementsBind = { elements: this.elements, fireevent: config.fireevent };
            this.addNodeEventListeners(elementsBind);
        }
    }

    get config() {
        return this._config;
    }

    get elements() {
        return this._elements;
    }

    get bindings() {
        return this._bindedElements;
    }

    listen(listener: string, cb: () => void) {
        this.mediaElement.addEventListener(listener, cb)
    }

    addNodeEventListeners(elementsList: ElementBind | (NodeList | Node)) {
        if (!('length' in elementsList)) {
            if ( !elementsList.hasOwnProperty('elements')) {
                if ([elementsList].length !== this.elementCount) {
                    throw new Error(`You must provide a set of ${this.elementCount} elements!`);
                }
                this.bindElements([elementsList] as Element[]);
                this._bindedElements.push({ elements: [elementsList] as Element[], fireevent: this.config.fireevent })
                return;
            }
        } else { //check if NodeList o ElementBind

            if ( !elementsList.hasOwnProperty('elements')) {
                if (elementsList.length !== this.elementCount) {
                    throw new Error(`You must provide a set of ${this.elementCount} elements!`);
                }
                this.bindElements([...elementsList].map(e => e as Element))
                this._bindedElements.push({ elements: [...elementsList].map(e => e as Element), fireevent: this.config.fireevent })
                return;
            }
        }
            const { elements, fireevent } = elementsList as ElementBind;

            this.bindElements(elements, fireevent)
            this._bindedElements.push({ elements, fireevent })

    }

    bindElements(elementsList: Element[], fireevent?: string) {
        this.lightboxList.setElementsId(elementsList)
        .forEach(element => {
            element.addEventListener(fireevent ?? this.config.fireevent, this.nodeListener);
            if (fireevent == 'click') element.addEventListener('keydown', this.nodeListener);
        })
    }

    removeNodeEventListeners() {
        this.destroyContainer();
        for (const { elements, fireevent } of this._bindedElements) {
            elements.forEach(element => {
                element.removeEventListener(fireevent ?? this.config.fireevent, this.nodeListener);
                if (fireevent == 'click') element.removeEventListener('keydown', this.nodeListener)
            });
        }
    }

    private nodeListener = (event: Event) => {
        if (event.type == 'keydown') {
            if ((event as KeyboardEvent).key != 'Enter') return;
        }
        const id = (event.composedPath() as Element[]).find(_el => 
            this._bindedElements.map(eb => eb.elements).flat(1).find(el => el === _el))
            ?.getAttribute(ContainerAttributes.ID) ?? '0';
        const lightbox = this.getLightBoxById(Number(id));
        if ((event.target as Element).nodeType === 1) event.preventDefault();
        this.openContainer(lightbox);
        document.getElementById('lightbox-container__hidden-tabindex')?.focus();
    }

    private closeContainerBodyEvent = (event: KeyboardEvent) => {
            if (this.container && event.key ===  'Escape') {
                this.destroyContainer();
            }
    }

    private nextArrowModalEvent = (event: KeyboardEvent) => {
        if (this.container && event.key ===  'ArrowRight') {
            this.next(event);
        }
    }

    private prevArrowModalEvent = (event: KeyboardEvent) => {
        if (this.container && event.key ===  'ArrowLeft') {
            this.prev(event);
        }
    }

    private buildCustomEvents = (props: CustomEventInit): Map<String, CustomEvent> => {
        const eventMap = new Map<String, CustomEvent>();
        for (const name of Object.values(customEvents)) {
            eventMap.set(name, new CustomEvent(name, props));
        }
    
        return eventMap;
    }

    private createContainer(): void {
        this.container = document.createElement('div');
        this.config.showscroll ? null : document.body.classList.add('dlightbox-hidden');
        document.body.addEventListener('keydown', this.closeContainerBodyEvent);
        this.container.classList.add('lightbox-container');
        this.container.setAttribute('tabindex', '-1');
        this.mediaElement.setAttribute('tabindex', '0');
        this.mediaElement.classList.add('lightbox-container__media');
        this.mediaElement.append(this.spinner.element);

        const close = document.createElement('div');
        close.classList.add('lightbox-container__close');
        close.setAttribute('tabindex', '0');
        close.addEventListener('keydown', ({key}) => { if (key === 'Enter') this.destroyContainer() });

        this.container.prepend(close);

        if (this.elementCount > 1) {
            const nextArrow = document.createElement('div');
            const prevArrow = document.createElement('div');
            nextArrow.classList.add('lightbox-container__next-arrow');
            prevArrow.classList.add('lightbox-container__prev-arrow');
            nextArrow.setAttribute('tabindex', '0');
            prevArrow.setAttribute('tabindex', '0');

           this.container.addEventListener('keydown', ({key}) => { 
                if (key === 'Tab' && document.activeElement === nextArrow) {
                    setTimeout(() => prevArrow.focus(), 0);
                }
            });

            nextArrow.addEventListener('mousedown', event => this.next(event));
            prevArrow.addEventListener('mousedown', event => this.prev(event));
            nextArrow.addEventListener('keydown', event => { if (event.key === 'Enter') this.next(event) });
            prevArrow.addEventListener('keydown', event => { if (event.key === 'Enter') this.prev(event) });
            this.modal.getModal().addEventListener('keydown', this.nextArrowModalEvent);
            this.modal.getModal().addEventListener('keydown', this.prevArrowModalEvent);

            this.container.prepend(prevArrow);
            this.container.append(this.mediaElement);
            this.container.append(nextArrow);
        } else {
            const lastFocusableElement = document.createElement('div');
            lastFocusableElement.tabIndex = 0;
            this.container.append(lastFocusableElement);

            close.addEventListener('keydown', ({key}) => { 
                if (key === 'Tab') {
                    setTimeout(() => this.mediaElement.focus(), 0);
                }
            });

            this.container.prepend(this.mediaElement);
        }

        setTimeout(() => this.container!.focus(), 0);
    }

    destroyContainer(): void {
        if (!this.container) return;
        this.modal.getModal().classList.remove('lightbox-modal-open');
        this.mediaElement.classList.remove('lightbox-container__media-open');
        setTimeout(() => {           
            this.mediaElement.blur();
            document.body.removeAttribute('tabindex');
            this.selectedBox.lightbox.close();
            this.container!.remove();
            this.modal.getModal().remove();
            document.body.classList.remove('dlightbox-hidden');
            document.body.removeEventListener('keydown', this.closeContainerBodyEvent);
            this.modal.getModal().removeEventListener('keydown', this.nextArrowModalEvent);
            this.modal.getModal().removeEventListener('keydown', this.prevArrowModalEvent);
            this.mediaElement?.dispatchEvent(this.events.get(customEvents.CLOSE) as CustomEvent);
            this.container = null;
        }, 200);
    }

    private getLightBoxById(index: number): LightBoxNode {
        return this.lightboxList.lookupById(index)!;
    }

    openContainer(box: LightBoxNode | number = this.lightboxList.head) {
        if (document.getElementById('dragon-lightbox-modal')) return;

        document.body.setAttribute('tabindex', '-1');
        this.spinner.element.classList.remove('error');

        const lightboxNode = Number.isInteger(box) ? 
            this.getLightBoxById(<number>box)
            : (box as LightBoxNode);

        if (!(lightboxNode.lightbox instanceof DragonLightBox)) {
            throw new Error("Invalid lightbox");
        }

        const modal = this.modal.getModal();

        this.createContainer();
        setTimeout(() => {           
            this.modal.getModal().classList.add('lightbox-modal-open');
            this.mediaElement.classList.add('lightbox-container__media-open');
        }, 0);

        lightboxNode.lightbox.open();
        this.mediaElement.append(lightboxNode.lightbox.element!);
        
        modal.append(this.container!);
        modal.append(this.container!);
        document.body.prepend(modal);
        
        this.selectedBox.lightbox.isSelected = false;
        this.selectedBox = lightboxNode;
        this.selectedBox.lightbox.isSelected = true;
        this.mediaElement?.dispatchEvent(this.events.get(customEvents.OPEN) as CustomEvent);
    }

    private appendMediaElement(element: HTMLElement) {
        if (![...this.mediaElement.children].some(el => el === element)) {
            this.mediaElement.append(element)
        }
    }

    private openLightBox(lightboxnode: LightBoxNode, isNext: boolean) {
        const selectedBox = lightboxnode;

        setTimeout(() => {
            this.mediaElement.classList.remove(`lightbox-type__closed-${isNext ? 'left' : 'right'}`);
        }, 100);
        
        this.mediaElement.classList.add(`lightbox-type__closed-${isNext ? 'left' : 'right'}`);

        selectedBox.lightbox.open();
        this.appendMediaElement(lightboxnode.lightbox.element!);

        this.selectedBox = isNext ? selectedBox.prev! : selectedBox.next!;
    }

    private closeLightBox(node: LightBoxNode) {
        node.lightbox.close();
    }

    next(event?: Event) {
        event?.stopPropagation();
        event?.preventDefault();
        this.closeLightBox(this.selectedBox);
        if (this.selectedBox === this.lightboxList.tail) {
            this.openLightBox(this.lightboxList.head, true);

            this.selectedBox = this.lightboxList.head;
            this.selectedBox.lightbox.isSelected = true;
        } else {
            this.openLightBox(this.selectedBox.next!, true);

            this.selectedBox = this.selectedBox.next!;
            this.selectedBox.lightbox.isSelected = true;
        }
        this.mediaElement?.dispatchEvent(this.events.get(customEvents.CHANGE) as CustomEvent);
    }
  
    prev(event?: Event) {
        event?.stopPropagation();
        event?.preventDefault();
        this.closeLightBox(this.selectedBox);
        if (this.selectedBox === this.lightboxList.head) {
            this.openLightBox(this.lightboxList.tail, false);

            this.selectedBox = this.lightboxList.tail;
            this.selectedBox.lightbox.isSelected = true;
        } else {
            this.openLightBox(this.selectedBox.prev!, false)

            this.selectedBox = this.selectedBox.prev!;
            this.selectedBox.lightbox.isSelected = true;
        }
        this.mediaElement?.dispatchEvent(this.events.get(customEvents.CHANGE) as CustomEvent);
    }

}

export default LightBoxContainer;