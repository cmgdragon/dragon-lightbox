class Modal {
    private instance: Modal | null;

    constructor() {
        this.instance = null;
    }
    
    getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new Modal();
        return this.instance;
    }

}

export default Modal;
