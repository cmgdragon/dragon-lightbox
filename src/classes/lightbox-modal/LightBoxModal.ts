import addStyles from "../../styles/functions/addStyles";
import LightBoxContainer from "../lightbox-container/LightBoxContainer";

class LightBoxModal {
    private modal: HTMLElement | null;
    private container: LightBoxContainer;
    private lastTabPos: number = 0;

    constructor(container: LightBoxContainer) {
        this.modal = null;
        this.container = container;
    }
    
    getModal() {
        if (this.modal) {
            return this.modal;
        }

        this.modal = this.buildModal();
        this.modal?.addEventListener('mousedown', e => {
            const path = e.composedPath() as HTMLElement[];
            if (!path.find((el, i) => i == 1 && el.classList?.contains('lightbox-container__media')))
                this.container.destroyContainer();
        });
        return this.modal;
    }

    private buildModal(): HTMLElement {
        const modal = document.createElement('div')
        modal.id = 'dragon-lightbox-modal'
        modal.classList.add('lightbox-modal')

        modal.prepend(addStyles(this.container.config))

        if (this.container.elements.length == 1) return modal

        modal.addEventListener('touchstart', ({touches}) => {
            this.lastTabPos = touches[0].screenX;
            this.container.mediaElement.style.transition = 'none'
        })
        modal.addEventListener('touchmove', ({touches}) => 
            this.container.mediaElement.style.transform = `translateX(${touches[0].screenX - this.lastTabPos}px)`)
        modal.addEventListener('touchend', ({changedTouches}) => {
            this.container.mediaElement.style.transition = '';
            const endTabPos = changedTouches[0].screenX;
            this.container.mediaElement.style.transform = ``;
            if (Math.abs(endTabPos - this.lastTabPos) < 100) return;
            if (endTabPos > this.lastTabPos)
                this.container.prev();
            else 
                this.container.next();
        })

        return modal;
    }

}

export default LightBoxModal;
