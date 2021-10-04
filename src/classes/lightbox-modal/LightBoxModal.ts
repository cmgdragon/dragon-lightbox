import addStyles from "../../styles/functions/addStyles";
import LightBoxContainer from "../lightbox-container/LightBoxContainer";

class LightBoxModal {
    private modal: HTMLElement | null;
    private container: LightBoxContainer;

    constructor(container: LightBoxContainer) {
        this.modal = null;
        this.container = container;
    }
    
    getModal() {
        if (this.modal) {
            return this.modal;
        }

        this.modal = this.buildModal();
        this.modal?.addEventListener('click', () => this.container.destroyContainer());
        return this.modal;
    }

    private buildModal(): HTMLElement {
        document.body.classList.add('overflow-hidden');
        const modal = document.createElement('div');
        modal.id = 'dragon-lightbox-modal';
        modal.classList.add('lightbox-modal');

        modal.prepend(addStyles(this.container.config));

        return modal;
    }

}

export default LightBoxModal;
