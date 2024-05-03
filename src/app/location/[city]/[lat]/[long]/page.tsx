import axios from "axios";
import {IWeatherData} from "@/shared/types/weatherData";
import React from "react";
import {Callout} from '@tremor/react';
import {RiAlarmWarningLine, RiCheckboxCircleLine} from "react-icons/ri";
import {CardInfo} from "@/shared/ui/CardInfo";
import {Sidebar} from "@/shared/ui/Sidebar";
import {TempChart} from "@/shared/ui/TempChart";
import {Divider} from '@tremor/react';
import {PrecipitationChart} from "@/shared/ui/PrecipitationChart";
import {HumidityChart} from "@/shared/ui/HumidityChart";
import {Metadata} from "next";

export const revalidate = 10;

interface IParams {
    city: string;
    lat: string;
    long: string;
}

interface IProps {
    params: IParams
}

const getWeatherData = async (lat: string, long: string) => {
    const res = await axios.get<IWeatherData>(`
        https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,uv_index,uv_index_clear_sky&daily=weather_code,temperature_2m_max
    `)

    if (!res.data) {
        throw new Error('Failed to fetch data')
    }

    return res.data;
}

export async function generateMetadata(
    {params}: IProps,
): Promise<Metadata> {
    // read route params
    const {city, lat, long,} = params

    const product = await getWeatherData(lat, long)

    return {
        title: `Пагода Город: ${city} ${lat},${long}`,
        description: `lat ${product.latitude}, long ${product.longitude}, elevation ${product.elevation}`
    }
}

async function Page({params: {city, lat, long}}: IProps) {
    const data: IWeatherData = await getWeatherData(lat, long);

    return (
        <main className="h-screen w-screen">
            <Sidebar city={city} lat={lat} long={long} data={data}/>

            <section className="bg-white min-h-full overflow-x-hidden p-4 md:p-5 lg:ml-[350px]">
                <div>
                    <div className="mb-3 md:mb-4">
                        <h1 className="text-2xl md:text-3xl font-bold mb-1">Сегодняшний обзор</h1>
                        <p className="flex gap-2 text-[17px] md:text-2xl">
                            <span>{new Date(data.current.time).toLocaleDateString()}</span>
                            <span>{data.timezone}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <CardInfo
                                text="Максимальная температура"
                                metric={`
                                    ${
                                    data.daily.temperature_2m_max.reduce((a, b) => Math.max(a, b))
                                }
                                    ${data.current_units.temperature_2m}
                                `}
                                color="amber"
                            />
                        </div>
                        <div>
                            <CardInfo
                                text="Минимальная температура"
                                metric={`
                                    ${
                                    data.daily.temperature_2m_max.reduce((a, b) => Math.min(a, b))
                                }
                                    ${data.current_units.temperature_2m}
                                `}
                                color="green"
                            />
                        </div>
                        <div>
                            <CardInfo
                                text="UV Индекс"
                                metric={
                                    data.hourly.uv_index.reduce((a, b) => Math.max(a, b))
                                }
                                color="red"
                            />
                            {
                                data.hourly.uv_index.reduce((a, b) => Math.max(a, b)) > 5 && <Callout
                                    className="mt-5"
                                    title="Сегодня высокий уровень ультрафиолета"
                                    icon={RiAlarmWarningLine}
                                    color="rose"
                                />
                            }
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <CardInfo
                                text="Скорость ветра"
                                metric={`${data.current.wind_direction_10m} ${data.current_units.wind_speed_10m}`}
                            />
                            <CardInfo
                                text="Направление ветра"
                                metric={`${data.current.wind_direction_10m} ${data.current_units.wind_direction_10m}`}
                            />
                        </div>
                    </div>
                </div>

                <Divider/>

                <div className="mt-4 md:mt-6 flex flex-col gap-5">
                    <TempChart data={data}/>
                    <Divider/>
                    <PrecipitationChart data={data}/>
                    <Divider/>
                    <HumidityChart data={data}/>
                </div>

            </section>
        </main>
    );
}

export default Page;