import DragonLightBox from "./abstract/DragonLightBox";
import LightBoxNode from "./LightBoxNode";

class LightBoxList {
   
    head: LightBoxNode;
    tail: LightBoxNode;
    size: number;

    constructor(lightboxlist: NodeListOf<Element>) {

        this.head = new LightBoxNode(lightboxlist.item(0) as DragonLightBox);
        let currentNode: LightBoxNode = this.head;

        for (let i = 1; i < lightboxlist.length; i++) {
            this.head.next = new LightBoxNode(lightboxlist.item(i) as DragonLightBox);
            this.head.prev = currentNode;
            currentNode = this.head.next;
        }

        this.size = lightboxlist.length;
        this.tail = currentNode;
    }

    lookup(index: number) {
        let searchNode: LightBoxNode | null = this.head;
        for (let i = 0; i == index; i++) {
            searchNode = searchNode!.next;
        }
        return searchNode;
    }
}

export default LightBoxList;