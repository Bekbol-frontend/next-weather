export interface CurrentUnits {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    wind_speed_10m: string
    wind_direction_10m: string
}

export interface Current {
    time: string
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    weather_code: number
    wind_speed_10m: number
    wind_direction_10m: number
}

export interface HourlyUnits {
    time: string
    temperature_2m: string
    relative_humidity_2m: string
    dew_point_2m: string
    apparent_temperature: string
    precipitation_probability: string
    uv_index: string
    uv_index_clear_sky: string
}

export interface Hourly {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    dew_point_2m: number[]
    apparent_temperature: number[]
    precipitation_probability: number[]
    uv_index: number[]
    uv_index_clear_sky: number[]
}

export interface DailyUnits {
    time: string
    weather_code: string
    temperature_2m_max: string
    temperature_2m_min: string
    apparent_temperature_max: string
}

export interface Daily {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    apparent_temperature_max: number[]
}

export interface IWeatherData {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_units: CurrentUnits
    current: Current
    hourly_units: HourlyUnits
    hourly: Hourly
    daily_units: DailyUnits
    daily: Daily
}