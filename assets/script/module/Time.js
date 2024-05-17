export function getDay(nbr) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[(nbr < 0 ? 6 - nbr : nbr) % 7];
}

export function GetTime() {
    const date = new Date();
    const hours = correctZero(date.getHours());
    const minutes = correctZero(date.getMinutes());
    return `${getDay(date.getDay())}, ${hours}:${minutes}`;
}

function correctZero(nbr) {
    return nbr < 10 ? `0${nbr}` : nbr.toString();
}