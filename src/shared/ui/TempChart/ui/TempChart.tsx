"use client";
import {AreaChart, Card} from '@tremor/react';
import {IWeatherData} from "@/shared/types/weatherData";
import {useMemo} from "react";
import {handleTime} from "@/shared/lib/handleTime";

const dataFormatter = (number: number) =>
    `${Intl.NumberFormat('us').format(number).toString()} °C`;

interface IProps {
    data: IWeatherData;
}

function TempChart({data}: IProps) {
    const times = useMemo(() => {
        return handleTime(data.hourly.time)
    }, [data])

    const res = useMemo(() => {
        return times.map((time, index) => ({
            date: `${time} ч`,
            "Температура": data.hourly.temperature_2m[index],
            "UV index": data.hourly.uv_index[index],
        }))
    }, [times]);

    return (
        <Card>
            <p>Температура & UV index</p>
            <AreaChart
                className="h-80 w-full"
                data={res}
                index="date"
                categories={['Температура', "UV index"]}
                colors={['emerald', 'rose']}
                valueFormatter={dataFormatter}
                yAxisWidth={70}
                onValueChange={(v) => console.log(v)}
                animationDuration={700}
            />
        </Card>
    );
}

export default TempChart;