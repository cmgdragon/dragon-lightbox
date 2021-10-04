class LightBoxSpinner {
    private static lbSpinner: LightBoxSpinner;
    private _element: HTMLElement;

    private constructor() {
        this._element = this.generateSpinner();
    }
    
    static getSpinner(): LightBoxSpinner {
        if (!LightBoxSpinner.lbSpinner) {
            LightBoxSpinner.lbSpinner = new LightBoxSpinner();
        }

        return LightBoxSpinner.lbSpinner;
    }

    get element() {
        return this._element;
    }

    showSpinner(ariaLabel?: string): void {
        if (this._element) {
            this._element.ariaLabel = ariaLabel ? ariaLabel : '';
            this._element.classList.remove('error');
            this._element.style.display = '';
        }
    }

    hideSpinner(): void {
        if (this._element) {
            this._element.ariaLabel = '';
            this._element.classList.remove('error');
            this._element.style.display = 'none';
        }
    }

    private generateSpinner = (): HTMLElement => {
        const spinner = document.createElement('div');
        const spinner_front = document.createElement('div');
        const spinner_back = document.createElement('div');
        
        spinner.id = "lightbox-spinner";
        spinner.classList.add('lightbox-spinner');
        spinner_front.classList.add('lightbox-spinner-front');
        spinner_back.classList.add('lightbox-spinner-back');

        for (let i = 1; i < 4; i++) {
            spinner_front.append( document.createElement('div') );
            spinner_back.append( document.createElement('div') );
            spinner_front.children[i-1].classList.add(`lightbox-spinner-ball${i}`, 'front');
            spinner_back.children[i-1].classList.add(`lightbox-spinner-ball${i}`, 'back');
        }

        spinner.append(spinner_front, spinner_back);

        return spinner;
    }

}

export default LightBoxSpinner;