import { getDay } from "../module/Time.js"
import { Get, Set } from "./LocalStorage.js"
import { removeButton } from "../module/AddModule.js"
import { addModuleText } from "../module/WeatherModule.js"




const apiKeyWeather = "e22f18a92d289ce5ee4834ce7f7c9c6b";


export function getCurrentWeather(city) {
    console.log(city)
    if (city != null) {
        const api = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKeyWeather + "")
        const response = api.then((response) => response.text());
        response.then((text) => {
            text = JSON.parse(text)
            changeHeader(text,city)
        })
    }
}

export function getWeather(city) {
    if (city != null) {
        const api = fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKeyWeather + "")
        const response = api.then((response) => response.text());
        response.then((text) => {
            text = JSON.parse(text)
            addCity(text, city)
        })
        api.catch((reason) => {
            console.log("error: ",city)
        })
    }
}


function changeHeader(obj, city) {
    document.querySelector("#currentCityTemp").textContent = Math.round(obj.main.temp) + "°";
    document.querySelector("#currentCityName").textContent = city;
    document.querySelector(".header-logo-temp").textContent = getWithearIcon(obj.weather[0].main)

    getWeather(city)
}

function addCity(obj, city) {
    if (obj.cod == "200") {
        console.log(obj)
        let tempCity = Get("currentCity", null);
        let correctCity = tempCity.address.town ? tempCity.address.town : tempCity.address.city

        let currentCity =  city == correctCity ? true : false

        let zone = document.querySelector("#moduleZone");

        let module = document.createElement("section")
        module.classList.add("module")

        zone.insertBefore(module, currentCity ? zone.firstElementChild : zone.lastElementChild);

        if (!currentCity) {
            let title = document.createElement("h2")
            title.textContent = city;
            module.appendChild(title)
        }

        let table = CreateTable("module-table")

        let grp = getFiveDay(obj.list)
        console.log(grp)

        let i = 0
        for (const x of grp) {
            table.appendChild(CreateLigne([i == 0 ? "Today" : getDay(x.day), '<span class="material-symbols-outlined">humidity_percentage</span> ' + Math.round(x.humidity) + "%", '<span class="material-symbols-outlined">' + getWithearIcon(x.lg_before) + '</span>', '<span class="material-symbols-outlined">' + getWithearIcon(x.lg_after) + '</span>', Math.round(x.temp_min) + "°", Math.round(x.temp_max) + "°"], "Day_" + i))
            i++
        }


        
        module.appendChild(table)


        if (!currentCity) {
            let remove = document.createElement("button")
            remove.dataset.city = city
            remove.addEventListener('click', removeButton)
            remove.classList.add('module-remove')
            remove.innerHTML = '<span class="material-symbols-outlined">delete</span>'
            module.appendChild(remove)
        } else {
            zone.insertBefore(addModuleText("City"), module.nextSibling)
        }

        
    }
}

function CreateTable(id) {
    let table = document.createElement("table")
    table.classList.add(id)
    return table
}

function CreateLigne(text,id) {
    let ligne = document.createElement("tr")
    ligne.classList.add(id)

    let i = 0;
    for (const x of text) {
        let caseTable = document.createElement("td")

        caseTable.innerHTML = x
        caseTable.classList.add("case_" + i)


        ligne.appendChild(caseTable)
        i++
    }

    return ligne
}

function getFiveDay(array) {

    let newArray = [];

    let day = -1;

    for (const x of array) {
        let date = new Date(x.dt * 1000)

        if (date.getDay() != day) {
            day = date.getDay()
            newArray.push({ day: date.getDay(), humidity: x.main.humidity, lg_before: x.weather[0].main, lg_after: x.weather[0].main, temp_min: x.main.temp_min, temp_max: x.main.temp_max })
        } else {
            newArray[newArray.length - 1].humidity = (newArray[newArray.length - 1].humidity + x.main.humidity) / 2

            newArray[newArray.length - 1].temp_min = newArray[newArray.length - 1].temp_min < x.main.temp_min ? newArray[newArray.length - 1].temp_min : x.main.temp_min
            newArray[newArray.length - 1].temp_max = newArray[newArray.length - 1].temp_max > x.main.temp_max ? newArray[newArray.length - 1].temp_max : x.main.temp_max

            if (date.getHours() < 12) {
                newArray[newArray.length - 1].lg_before = x.weather[0].main;
            } else {
                newArray[newArray.length - 1].lg_after = x.weather[0].main;
            }
        }

        
    }

    return newArray
}

function getWithearIcon(weather) {
    console.log(weather)
    //sunny clear_night

    switch (weather) {
        case "Clouds":
            return "cloud"
            break;
        case "Rain":
            return "rainy_light"
            break;
        case "Clear":
            return "sunny"
            break;
    
        default:
            console.log(weather)
            return "report"
            break;
    }
}