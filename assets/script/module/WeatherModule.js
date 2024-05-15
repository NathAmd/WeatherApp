
function addModuleComment(obj) {
    
}

function addModuleSunnyTime(obj) {

}

function addModuleOther(obj) {

}

export function addModuleText(text) {
    let module = document.createElement("section")
    module.classList.add("module")
    module.classList.add("module-title")


    let title = document.createElement("h2")
    title.textContent = text;
    module.appendChild(title)

    return module
}