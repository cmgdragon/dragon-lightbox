import Attribute from "../types/Attribute";

interface IConfig {
    lazy: boolean,
    fireevent: string,
    autoplay: boolean,
    autoscale: number | boolean,
    showscroll: boolean,
    type?: string,
    attributes?: Attribute[]
}

export default IConfig;