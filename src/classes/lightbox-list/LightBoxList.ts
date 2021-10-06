import ContainerAttributes from "../../constants/containerAttributes";
import IConfig from "../../interfaces/IConfig";
import IResourceElement from "../../interfaces/IResourceElement";
import LightBoxNode from "./LightBoxNode";

class LightBoxList {
   
    elements: Element[];
    head: LightBoxNode;
    tail: LightBoxNode;
    size: number;

    constructor(lightboxlist: IResourceElement[], config: IConfig) {
        this.elements = this.setElementsId(lightboxlist.map(l => l.element));
        this.head = new LightBoxNode(this.elements[0] as HTMLDivElement, lightboxlist[0].attributes, config);
        this.head.prev = null;
        let currentNode: LightBoxNode = this.head;

        for (let i = 1; i < lightboxlist.length; i++) {
            currentNode.next = new LightBoxNode(this.elements[i] as HTMLDivElement, lightboxlist[i].attributes, config);
            currentNode.prev = this.lookupByIndex(i - 2);
            currentNode = currentNode.next;
        }

        this.size = lightboxlist.length;
        currentNode.prev = this.lookupByIndex(this.size - 2);
        this.tail = currentNode;
    }
 
    setElementsId(elementsList: Element[]): Element[] {
        const ids = [...Array(elementsList.length).keys()];
        elementsList.forEach(element => {
            if (element.hasAttribute(ContainerAttributes.ID)) {
                ids.splice(Number(element.getAttribute(ContainerAttributes.ID)), 1)
            }
        });
        elementsList.filter(e => !e.hasAttribute(ContainerAttributes.ID)).forEach((element, i) => 
            element.setAttribute(ContainerAttributes.ID, String(ids[i])) );
        return elementsList;
    }

    private lookupByIndex(index: number) {
        let searchNode: LightBoxNode | null = this.head;

        for (let i = 0; i < index; i++) {
            searchNode = searchNode!.next;
        }
        return searchNode;
    }

    lookupById(id: number) {
        let searchNode: LightBoxNode | null = this.head;

        while (searchNode!.id !== id) {
            searchNode = searchNode!.next;
        }

        return searchNode;
    }
}

export default LightBoxList;