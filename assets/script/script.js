import { Get, Set } from "./module/LocalStorage.js"
import { findParentWithClass, findAllChildrenWithClass } from "./module/Finder.js"
import { getCoordintes } from "./module/City.js"
import { getWeather, getCurrentWeather } from "./module/Weather.js"
import { GetTime } from "./module/Time.js"
import { addModule, addModuleButton, scrollModule } from "./module/AddModule.js"

let city = null;
let cityWeatherSave = Get("saveCity", []);
let lastTime = "";

Set("currentCity", null);
getCoordintes();

setInterval(() => {
    let tempCity = Get("currentCity", null);

    let correctCity = tempCity.address.town ? tempCity.address.town : tempCity.address.city ? tempCity.address.city : tempCity.address.village
    if (city != correctCity && tempCity != null) {
        city = correctCity;
        getCurrentWeather(city, true)

        
        for (const x of cityWeatherSave) {
            if (x != correctCity) {
                getWeather(x)
            }
        }
    }

    if (lastTime != GetTime()) {
        lastTime = GetTime()
        document.querySelector("#currentCityTime").textContent = GetTime();
    }
},100)

document.querySelector(".module-add").addEventListener('click', addModule)
document.querySelector("#inputButton").addEventListener('click', addModuleButton)
document.querySelector("input").addEventListener('keyup', addModuleButton)

document.querySelector(".module-section").addEventListener('scroll', scrollModule)

