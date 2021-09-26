import IConfig from "../../interfaces/IConfig";
import LightBoxList from "../lightbox-list/LightBoxList";
import LightBoxNode from "../lightbox-list/LightBoxNode";
import LightBoxModal from "../lightbox-modal/LightBoxModal";

class LightBoxContainer {

    lightboxList: LightBoxList;
    private selectedBox: LightBoxNode;
    private modal: LightBoxModal;
    private isGroup: boolean;
    private _config: IConfig;
    container: HTMLElement | null;
    mediaElement: HTMLElement;

    constructor(elements: Element[], config: IConfig) {
        this.container = null;
        this.mediaElement = document.createElement('div');
        this._config = config;
        this.modal = new LightBoxModal(this);
        this.isGroup = elements.length === 1 ? false : true;
        this.lightboxList = new LightBoxList(elements, this.config);
        this.selectedBox = this.lightboxList.head;

        this.addEventListeners(elements);
    }

    get config() {
        return this._config;
    }

    private addEventListeners(elements: Element[]) {
        elements.forEach(element => element.addEventListener('click', () => {
            const id = element.getAttribute('data-dlightbox-id');
            const lightbox = this.getLightBoxByIndex(Number(id));
            this.openContainer(lightbox);
            document.getElementById('lightbox-container__hidden-tabindex')?.focus();
        }))

        document.body.addEventListener('keydown', event => {
            if (this.container && event.key ===  'Escape') {
                this.destroyContainer();
            }
        });
    }

    private createContainer(): void {
        this.container = document.createElement('div');
        this.container.classList.add('lightbox-container');
        this.mediaElement.classList.add('lightbox-container__media');


        const close = document.createElement('div');
        close.classList.add('lightbox-container__close');
        close.setAttribute('tabindex', '0');
        close.addEventListener('keydown', ({key}) => { if (key === 'Enter') this.destroyContainer() });
        this.container.prepend(close);

        if (this.isGroup) {
            const nextArrow = document.createElement('div');
            const prevArrow = document.createElement('div');
            nextArrow.classList.add('lightbox-container__next-arrow');
            prevArrow.classList.add('lightbox-container__prev-arrow');
            nextArrow.setAttribute('tabindex', '0');
            prevArrow.setAttribute('tabindex', '0');

            nextArrow.addEventListener('click', event => this.next(event));
            prevArrow.addEventListener('click', event => this.prev(event));
            nextArrow.addEventListener('keydown', event => { if (event.key === 'Enter') this.next(event) });
            prevArrow.addEventListener('keydown', event => { if (event.key === 'Enter') this.prev(event) });


            this.container.prepend(prevArrow);
            this.container.append(this.mediaElement);
            this.container.append(nextArrow);
        } else {
            this.container.append(this.mediaElement);
        }

        const hiddenTabindex = document.createElement('div');
        hiddenTabindex.setAttribute('tabindex', '-1');
        hiddenTabindex.setAttribute('id', 'lightbox-container__hidden-tabindex');
        this.container.prepend(hiddenTabindex);
        hiddenTabindex.focus();
    }

    destroyContainer(): void {
        this.selectedBox.lightbox.close();
        this.container!.remove();
        this.modal.getModal().remove();
        this.container = null;
    }

    private getLightBoxByIndex(index: number): LightBoxNode {
        return this.lightboxList.lookup(index)!;
    }

    openContainer(box: LightBoxNode) {
        const lightbox = box.lightbox;

        const modal = this.modal.getModal();

        this.createContainer();
        lightbox.open();
        this.mediaElement.append(lightbox.element);

        modal.append(this.container!);
        this.modal.getModal().append(this.container!);
        document.body.prepend(modal);


        this.selectedBox = box;
    }

    private appendMediaElement(element: HTMLElement) {
        if (![...this.mediaElement.children].some(el => el === element)) {
            this.mediaElement.append(element)
        }
    }

    openLightBox(lightboxnode: LightBoxNode, isNext: boolean) {
        const selectedBox = lightboxnode;
        
        selectedBox.lightbox.open();
        this.appendMediaElement(lightboxnode.lightbox.element)

        this.selectedBox = isNext ? selectedBox.prev! : selectedBox.next!;
    }

    closeLightBox(node: LightBoxNode) {
        node.lightbox.close();
    }

    next(event: Event) {
        event.stopPropagation();
        this.closeLightBox(this.selectedBox);
        if (this.selectedBox === this.lightboxList.tail) {
            this.openLightBox(this.lightboxList.head, true);
            this.selectedBox = this.lightboxList.head;
        } else {
            this.openLightBox(this.selectedBox.next!, true);
            this.selectedBox = this.selectedBox.next!;
        }
    }
  
    prev(event: Event) {
        event.stopPropagation();
        this.closeLightBox(this.selectedBox);
        if (this.selectedBox === this.lightboxList.head) {
            this.openLightBox(this.lightboxList.tail, false);
            this.selectedBox = this.lightboxList.tail;
        } else {
            this.openLightBox(this.selectedBox.prev!, false);
            this.selectedBox = this.selectedBox.prev!;
        }
    }

}

export default LightBoxContainer;