export const handleTime = (times: string[]) => {
    return times.map(time => new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false
    })).slice(0, 24)
}