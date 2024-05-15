import { Get, Set } from "./LocalStorage.js"

const apiKeyLocation = "pk.faf470af2a5b24064bf159d6d289601c"



// Step 1: Get user coordinates 
export function getCoordintes() {
    var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name 
function getCity(coordinates) {
    var lat = coordinates[0];
    var lng = coordinates[1];

    // Call api
    const api = fetch("https://us1.locationiq.com/v1/reverse.php?key=" + apiKeyLocation + "&lat=" + lat + "&lon=" + lng + "&format=json")
    const response = api.then((response) => response.text());
    response.then((text) => {
        text = JSON.parse(text)
        console.log(text)
        Set("currentCity",text)
    })
}