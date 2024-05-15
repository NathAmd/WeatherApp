export function getDay(nbr) {
    nbr = nbr < 0 ? 6-nbr : nbr
    let day = ["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"];
    return day[nbr];
}

export function GetTime() {
    let date = new Date();
    return getDay(date.getDay()) + ", " + correctZero(date.getHours()) + ":" + correctZero(date.getMinutes());
}

function correctZero(nbr) {
    return nbr < 10 ? "0" + nbr : nbr
}