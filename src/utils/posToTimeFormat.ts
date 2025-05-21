export default function posToTimeFormat(loc: number): {
    hours: number,
    minutes: number,
    seconds: number
} {
    const hours = parseInt(loc.toString());
    const rawMinutes = (loc - hours) * 60;
    const minutes = parseInt(rawMinutes.toString());
    const seconds = (rawMinutes - minutes) * 60;

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}