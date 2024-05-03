import {memo} from "react";
import styles from "./Sidebar.module.css"
import {CitySelect} from "@/shared/ui/CitySelect";
import {number} from "prop-types";
import {IWeatherData} from "@/shared/types/weatherData";
import {weatherIcons} from "@/shared/lib/weatherIcons";
import Image from "next/image";

interface IProps {
    city: string;
    lat: string;
    long: string;
    data: IWeatherData;
}

function Sidebar(props: IProps) {
    const {lat, long, city, data} = props;

    return (
        <div className={styles.sidebar}>
            <div className={styles.top}>
                <h1 className={styles.city}>{decodeURI(city)}</h1>
                <p className={styles.latLong}>Lat/Long: {lat}, {long}</p>
            </div>
            <div className={styles.citySelect}>
                <CitySelect/>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.timeBlock}>
                <div>
                    <h3 className={styles.dateTime}>
                        {new Date().toLocaleDateString("ru-RU", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </h3>
                    <p className={styles.timeZone}>
                        Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                    </p>
                </div>
                <p>
                    {
                        new Date().toLocaleTimeString("ru-RU", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                        })
                    }
                </p>
            </div>
            <div className={styles.tempInfo}>
                <div className={styles.weatherImage}>
                    <Image
                        src={`https://www.weatherbit.io/static/img/icons/${weatherIcons[data.current.weather_code].icon}.png`}
                        alt="Weather Image"
                        width={70}
                        height={70}
                    />
                </div>
                <div>
                    <p className={styles.temp}>{data.current.temperature_2m} {data.hourly_units.temperature_2m}</p>
                    <p>{
                        weatherIcons[data.current.weather_code].label
                    }</p>
                </div>
            </div>
        </div>
    );
}

export default memo(Sidebar);