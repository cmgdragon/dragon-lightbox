import Attribute from "../types/Attribute";
import IConfig from "./IConfig";

interface IEventDetail {
    config: IConfig,
    count: number,
    id: number,
    elements: Element[],
    selectedBox: {
        resourceUrl: string;
        element: HTMLElement;
        attributes: Attribute[];
    }
}

export default IEventDetail;