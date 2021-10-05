import mobile_breakpoint from "../constants/mobile_breakpoint";
import IConfig from "../interfaces/IConfig";

const lightbox_container_styles = (config: IConfig) =>`
.lightbox-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
}
.lightbox-shadow { filter: drop-shadow(0 0 15px black); }
.lightbox-container__media {
    ${Number.isInteger(config.autoscale) ? `width: ${config.autoscale}px` : 'width: 80%'};
    max-height: 90vh;
    width: 100%;
    max-width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .2s ease-in;
    transform: scale(.7);
}
.lightbox-container__media > * {
    transition: .1s ease-in;
    transition-property: transform, opacity;
    transform: translateX(0px);
    opacity: 1;
}
.lightbox-type__closed-left > * { 
    transition: none;
    opacity: 0;
    transform: translateX(100px);
}
.lightbox-type__closed-right > * { 
    transition: none;
    opacity: 0;
    transform: translateX(-100px);
}
.lightbox-container__media-open {
    transform: scale(1);
}
.lightbox-container__media:focus {
    outline: none;
}
.lightbox-container__media:focus > *:not(img, video) {
    filter: drop-shadow(0 0 5px white);
}
.lightbox-container__next-arrow,
.lightbox-container__prev-arrow {
    width: 10%;
    height: 3em;
    position: relative;
    margin-bottom: 1rem;
    transform: scale(.8);
    opacity: .8;
    transition: transform .3s;
}
.lightbox-container__next-arrow:focus,
.lightbox-container__prev-arrow:focus,
.lightbox-container__close:focus {
    outline: none;
    transform: scale(1.2);
    opacity: 1;
}
.lightbox-container__prev-arrow:focus { transform: scale(-1.2); }
.lightbox-container__prev-arrow {
    transform: scale(-.8);
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
.lightbox-container__close {
    width: 20px;
    height: 20px;
    position: relative;
    position: absolute;
    top: 2rem;
    right: 1.5rem;
    opacity: .8;
    transition: transform .3s;
}
.lightbox-container__close:hover {
    cursor: pointer;
    opacity: 1;
}
.lightbox-container__close::after,
.lightbox-container__close::before {
    content: '';
    width: 3px;
    height: 20px;
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
@media (max-width: ${mobile_breakpoint}px) {
    .lightbox-container__next-arrow,
    .lightbox-container__prev-arrow {
        position: absolute;
        top: 80vh;
        transform: scale(.6) translateX(3rem);
    }
    .lightbox-container__prev-arrow {
        transform: scale(-.6) translateX(3rem);
    }
    .lightbox-container__media { 
        max-width: 100%;
        max-height: 70vh;
    }
    .lightbox-container__close:focus {
        transform: none;
        opacity: .8;
    }
    .lightbox-container__next-arrow:focus {
        transform: scale(.6) translateX(3rem);
        opacity: .8;
    }
    .lightbox-container__prev-arrow:focus {
        transform: scale(-.6) translateX(3rem);
        opacity: .8;
    }
}
@media (hover: none) {
    .lightbox-container__next-arrow:hover,
    .lightbox-container__prev-arrow:hover { opacity: .8 }
}
`;

export default lightbox_container_styles;