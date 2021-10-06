import ContainerAttributes from "../../constants/containerAttributes";
import IConfig from "../../interfaces/IConfig";
import Attribute from "../../types/Attribute";

const getConfigByAttributes = (config: IConfig, attributes: Attribute[]): IConfig => {
    for (const { name, value } of attributes) {
        const parsedName = name.replace(`${ContainerAttributes.DATA}-`, '')
        if (value === '' || value == null) continue;

        if (Object.keys(config).includes(parsedName)) {
            let parsedValue: boolean | string | number = value;

            //boolean check
            parsedValue = value?.toLocaleLowerCase() === 'true' || value?.toLocaleLowerCase() === 'false' ?
                                value?.toLocaleLowerCase() === 'true' : value!;
            //number check
            parsedValue = /^[0-9]+$/.test(parsedValue as string) ? Number(parsedValue) : parsedValue;

            config = { ...config, [parsedName]: parsedValue }
        }
    }
    return config;
}

export default getConfigByAttributes;