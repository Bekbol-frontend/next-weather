"use client";
import {memo, useMemo, useState} from "react";
import {Country, City} from 'country-state-city';
import Select from 'react-select'
import {ICity, ICountry} from "@/shared/types/country"
import {useRouter} from "next/navigation";
import {LiaGlobeAmericasSolid} from "react-icons/lia";

const options: ICountry[] = Country.getAllCountries().map(el => (
    {
        value: {
            latitude: el.latitude,
            longitude: el.longitude,
            isoCode: el.isoCode
        },
        label: el.name,
    }
))

function CitySelect() {
    const [country, setCountry] = useState<ICountry | null>(null);
    const [city, setCity] = useState<ICity | null>(null);

    const router = useRouter();

    const changeSelectCountry = (selectVal: ICountry | null) => {
        setCountry(selectVal);
        setCity(null);
    }

    const changeSelectCity = (selectVal: ICity | null) => {
        setCity(selectVal);
        router.push(`/location/${selectVal?.value.name}/${selectVal?.value.latitude}/${selectVal?.value.longitude}`)
    }

    // @ts-ignore
    const allCityes:ICity[] = useMemo<ICity[]>(function (){
        if(country) {
            return City.getCitiesOfCountry(country?.value.isoCode)?.map(el => (
                {
                    value: {
                        latitude: el.latitude,
                        longitude: el.longitude,
                        countryCode: el.countryCode,
                        name: el.name,
                        stateCode: el.stateCode,
                    },
                    label: el.name
                }
            ))
        }

        return [];
    }, [country]);

    return (
        <div className="space-y-4">
            <div>
                <div className="flex items-center text-white space-x-0.5 mb-2">
                    <span className="flex mr-1"><LiaGlobeAmericasSolid/></span>
                    <span>Country</span>
                </div>
                <Select options={options} value={country} onChange={changeSelectCountry}/>
            </div>
            {
                country && <div>
                    <div className="flex items-center text-white space-x-0.5 mb-2">
                        <span className="flex mr-1"><LiaGlobeAmericasSolid/></span>
                        <span>City</span>
                    </div>
                    <Select
                        value={city}
                        onChange={changeSelectCity}
                        options={allCityes}
                    />
                </div>
            }
        </div>
    );
}

export default memo(CitySelect);