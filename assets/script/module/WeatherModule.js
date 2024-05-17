
export function addModuleComment(obj) {
    const module = document.createElement("section");
    module.classList.add("module");

    const weatherMain = obj.list[0].weather[0].main;
    let text_0, text_1;

    switch (weatherMain) {
        case "Clouds":
            text_0 = "It will be cloudy";
            text_1 = "Avoid having your head in the clouds";
            break;
        case "Rain":
            text_0 = "It's going to rain";
            text_1 = "Consider taking an umbrella";
            break;
        case "Clear":
            text_0 = "It will be sunny";
            text_1 = "Sunscreen first and foremost";
            break;
        default:
            text_0 = "I can't predict";
            text_1 = "^^";
            break;
    }

    const title = document.createElement("h3");
    title.textContent = text_0;
    module.appendChild(title);

    const desc = document.createElement("h4");
    desc.textContent = text_1;
    module.appendChild(desc);

    return module;
}

export function addModuleSunnyTime(obj) {
    const module = document.createElement("section");
    module.classList.add("module");
    module.textContent = "mod_sunnytime";
    return module;
}

export function addModuleOther(obj) {
    const module = document.createElement("section");
    module.classList.add("module");
    module.textContent = "mod_other";
    return module;
}

export function addModuleText(text) {
    const module = document.createElement("section");
    module.classList.add("module");
    module.classList.add("module-title");

    const title = document.createElement("h2");
    title.textContent = text;
    module.appendChild(title);

    return module;
}