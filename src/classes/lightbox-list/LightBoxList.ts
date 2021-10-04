import IConfig from "../../interfaces/IConfig";
import IResourceElement from "../../interfaces/IResourceElement";
import LightBoxNode from "./LightBoxNode";

class LightBoxList {
   
    head: LightBoxNode;
    tail: LightBoxNode;
    size: number;

    constructor(lightboxlist: IResourceElement[], config: IConfig) {
        
        this.head = new LightBoxNode(0, lightboxlist[0].element as HTMLDivElement, lightboxlist[0].attributes, config);
        this.head.prev = null;
        let currentNode: LightBoxNode = this.head;

        for (let i = 1; i < lightboxlist.length; i++) {
            currentNode.next = new LightBoxNode(i, lightboxlist[i].element as HTMLDivElement, lightboxlist[0].attributes, config);
            currentNode.prev = this.lookup(i - 2);
            currentNode = currentNode.next;
        }

        this.size = lightboxlist.length;
        currentNode.prev = this.lookup(this.size - 2);
        this.tail = currentNode;
    }
 
    lookup(index: number) {
        let searchNode: LightBoxNode | null = this.head;

        for (let i = 0; i < index; i++) {
            searchNode = searchNode!.next;
        }
        return searchNode;
    }
}

export default LightBoxList;