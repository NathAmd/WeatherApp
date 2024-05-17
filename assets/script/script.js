import { Get, Set } from "./module/LocalStorage.js";
import { getCoordinates } from "./module/City.js";
import { getWeather, getCurrentWeather } from "./module/Weather.js";
import { GetTime } from "./module/Time.js";
import { addModule, addModuleButton, scrollModule } from "./module/AddModule.js";

const cityWeatherSave = Get("saveCity", []);
let city = null;
let lastTime = "";

Set("currentCity", null);
getCoordinates();

setInterval(() => {
    const tempCity = Get("currentCity", null);
    const correctCity = tempCity ? tempCity.address.town || tempCity.address.city || tempCity.address.village : null;

    if (city !== correctCity && tempCity !== null) {
        city = correctCity;
        getCurrentWeather(city, true);

        for (const x of cityWeatherSave) {
            if (x !== correctCity.toLowerCase()) {
                getWeather(x);
            }
        }
    }

    if (lastTime !== GetTime()) {
        lastTime = GetTime();
        document.querySelector("#currentCityTime").textContent = GetTime();
    }
}, 100);

document.querySelector(".module-add").addEventListener("click", addModule);
document.querySelector("#inputButton").addEventListener("click", addModuleButton);
document.querySelector("input").addEventListener("keyup", addModuleButton);
document.querySelector(".module-section").addEventListener("scroll", scrollModule);