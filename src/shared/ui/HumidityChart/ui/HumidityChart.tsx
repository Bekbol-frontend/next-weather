"use client";

import {IWeatherData} from "@/shared/types/weatherData";
import {AreaChart, Card} from '@tremor/react';
import {useMemo} from "react";
import {handleTime} from "@/shared/lib/handleTime";

interface IProps {
    data: IWeatherData
}

const dataFormatter = (number: number) =>
    `${Intl.NumberFormat('us').format(number).toString()} %`;

function HumidityChart({data}: IProps) {

    const times = useMemo(() => {
        return handleTime(data.hourly.time)
    }, [data])

    const res = useMemo(() => {
        return times.map((time, index) => ({
            date: `${time} ч`,
            "Влажность": data.hourly.relative_humidity_2m[index],
        }))
    }, [times]);

    return (
        <Card>
            <p>Влажность</p>
            <AreaChart
                className="h-80 w-full"
                data={res}
                index="date"
                categories={["Влажность"]}
                colors={['indigo']}
                valueFormatter={dataFormatter}
                yAxisWidth={70}
                onValueChange={(v) => console.log(v)}
                animationDuration={700}
            />
        </Card>
    );
}

export default HumidityChart;