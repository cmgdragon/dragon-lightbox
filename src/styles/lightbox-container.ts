import IConfig from "../interfaces/IConfig";

const lightbox_container_styles = (config: IConfig) =>`
.lightbox-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
}

.lightbox-shadow { filter: drop-shadow(0 0 15px black) }

.lightbox-container__media {
    ${Number.isInteger(config.autoescale) ? `width: ${config.autoescale}px` : 'width: 80%'};
    max-height: 90vh;
    width: 100%;
    max-width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lightbox-container__next-arrow,
.lightbox-container__prev-arrow {
    width: 10%;
    height: 3em;
    position: relative;
    margin-bottom: 1rem;
    opacity: .8;
}
.lightbox-container__next-arrow:hover,
.lightbox-container__prev-arrow:hover {
    opacity: 1;
    cursor: pointer;
}

.lightbox-container__next-arrow::after,
.lightbox-container__next-arrow::before,
.lightbox-container__prev-arrow::after,
.lightbox-container__prev-arrow::before {
    content: '';
    width: 3px;
    height: 30px;
    position: absolute;
    background-color: white;
    transform-origin: bottom left;
    transform: rotate(-40deg);
    top: -4.3px;
    left: calc(50% + 10%);
    border-radius: 2px;
}

.lightbox-container__next-arrow::before,
.lightbox-container__prev-arrow::before {
    top: 22px;
    transform-origin: top left;
    transform: rotate(40deg);
}

.lightbox-container__prev-arrow {
    transform: scaleX(-1);
}

.lightbox-container__close {
    width: 30px;
    height: 30px;
    position: relative;
    position: absolute;
    top: 2rem;
    right: 1.5rem;
    opacity: .8;
}
.lightbox-container__close:hover {
    cursor: pointer;
    opacity: 1;
}
.lightbox-container__close::after,
.lightbox-container__close::before {
    content: '';
    width: 3px;
    height: 30px;
    position: absolute;
    left: 50%;
    background-color: white;
    transform: rotate(-45deg);
    border-radius: 2px;
}
.lightbox-container__close::before {
    transform: rotate(45deg);
}

#lightbox-container__hidden-tabindex { 
    opacity: 0;
    position: absolute;
    top: 0;
}
`;

export default lightbox_container_styles;