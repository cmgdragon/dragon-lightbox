import LightBoxList from "./LightBoxList";
import LightBoxNode from "./LightBoxNode";

class LightBoxContainer {

    private lightboxList: LightBoxList;
    private selectedBox: LightBoxNode | null = null;

    constructor(containerSelector:string) {
        if (!document.querySelector(containerSelector)) {
            throw new Error("You must provide a list of elements!")
        }
        this.lightboxList = new LightBoxList(
            document.querySelectorAll(containerSelector)
        );
    }

    openLightBox(index: number) {
        const selectedBox: LightBoxNode = this.lightboxList.lookup(index)!;
        selectedBox.value.classList.add("current-selected");
        this.selectedBox = selectedBox;
    }

    
}

export default LightBoxContainer;