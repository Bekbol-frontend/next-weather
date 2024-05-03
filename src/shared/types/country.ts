interface IValue {
    latitude: string;
    longitude: string;
    isoCode: string;
}

export interface ICountry {
    value: IValue,
    label: string,
}

interface ICityValue {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
}

export interface ICity {
    value: ICityValue;
    label: string;
}