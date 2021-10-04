import IConfig from "../interfaces/IConfig";

const lightbox_spinner_styles = (config: IConfig) => `
.lightbox-spinner {
    width: 15vw;
    height: 15vw;
    position: relative;
}
.lightbox-spinner > .lightbox-spinner-back,
.lightbox-spinner > .lightbox-spinner-front {          
    border-radius: 50%;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.lightbox-spinner > .lightbox-spinner-front {
    position: absolute;
}
.lightbox-spinner > .lightbox-spinner-back {
    z-index: -1;
}
.lightbox-spinner > .lightbox-spinner-front > *,
.lightbox-spinner > .lightbox-spinner-back > * {
    max-width: 15px;
    max-height: 15px;
}
.lightbox-spinner-back > .back {
    width: 14%;
    height: 14%;
    background-color: white;
    border-radius: 50%;
    animation: expand .5s ease-in infinite;
}
.lightbox-spinner-front > .front {
    width: 15%;
    border-radius: 50%;
    height: 15%;
    background-color: white;
    animation: blink .5s ease-in infinite;
}
.lightbox-spinner.error > .lightbox-spinner-back > .back,
.lightbox-spinner.error > .lightbox-spinner-front > .front {
    background-color: red;
    animation: none;
}
.lightbox-spinner.error > .lightbox-spinner-back > .back {
    animation: none;
    transform: scale(2);
    opacity: .4;
}
@keyframes blink {
    0% {
        transform: scale(.4);
        opacity: 0;
    }
    20% {
        transform: scale(.7);
        opacity: .3;
    }
    100% {
        transform: scale(1.2);
        opacity: 0;
    }
}
@keyframes expand {
    0% {
        transform: scale(1);
        opacity: 0;
    }
    20% {
        transform: scale(2);
        opacity: .4;
    }
    100% {
        transform: scale(2.4);
        opacity: 0;
    }
}
.lightbox-spinner-ball1.back,
.lightbox-spinner-ball1.front {
    animation-delay: 0s !important;
}
.lightbox-spinner-ball2.back,
.lightbox-spinner-ball2.front {
    animation-delay: .16s !important;
}
.lightbox-spinner-ball3.back,
.lightbox-spinner-ball3.front {
    animation-delay: .32s !important;
}
`;

export default lightbox_spinner_styles;