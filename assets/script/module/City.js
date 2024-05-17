import { Set } from "./LocalStorage.js";

const apiKeyLocation = "pk.faf470af2a5b24064bf159d6d289601c";

export function getCoordinates() {
    const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        const { latitude, longitude } = pos.coords;
        const coordinates = [latitude.toString(), longitude.toString()];
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        getCity(coordinates);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

function getCity(coordinates) {
    const [lat, lng] = coordinates;

    fetch(`https://us1.locationiq.com/v1/reverse.php?key=${apiKeyLocation}&lat=${lat}&lon=${lng}&format=json`)
        .then((response) => response.text())
        .then((text) => {
            const locationData = JSON.parse(text);
            console.log(locationData);
            Set("currentCity", locationData);
        });
}