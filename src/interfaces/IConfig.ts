import Attribute from "../types/Attribute";

interface IConfig {
    lazy: boolean,
    fireEvent: string,
    autoplay: boolean,
    autoescale: number | boolean,
    type?: string,
    attributes?: Attribute[]
}

export default IConfig;