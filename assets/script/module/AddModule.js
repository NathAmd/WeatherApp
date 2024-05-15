import { findParentWithClass, findAllChildrenWithClass } from "../module/Finder.js"
import { Get, Set } from "./LocalStorage.js"


export let addModule = (e) => {
    let parent = findParentWithClass(e.target, "module-add")
    let form = findAllChildrenWithClass(parent, "form-add-city")

    console.log(e.target.id)
    if (e.target.id == "") {
        form[0].style.visibility = form[0].style.visibility == "visible" ? "hidden" : "visible"
        form[0].style.position = form[0].style.position == "static" ? "absolute" : "static"
    }

    document.querySelector(".module-section").scrollTop = 9999999;
}

export let addModuleButton = (e) => {
    if (e.key == 'Enter' || e.key == null) {
        let grp = Get("saveCity", []);
        let val = document.querySelector("#inputCity").value;
        if (!grp.includes(val) && val.length > 2) {
            grp.push(val)
            Set("saveCity", grp);
            location.reload()
        }
    }
}

export let removeButton = (e) => {
    let parent = findParentWithClass(e.target, "module-remove")

    let grp = Get("saveCity", []);
    const index = grp.indexOf(parent.dataset.city);
    grp.splice(index, 1);
    Set("saveCity", grp);
    location.reload()

}

export let scrollModule = (e) => {
    let parent = findParentWithClass(e.target, "module-section")
    //console.log(parent.scrollTop)

    let alpha = clamp( 1 * (parent.scrollTop / 200) , 0 , 1)
    let rgb = 'rgb(' + lerp(94,0, alpha) + ',' + lerp(164,0, alpha) + ',' + lerp(239,0, alpha) +')'
    document.documentElement.style.setProperty('--background', rgb);
}

function lerp(a, b, alpha) {
    return a + alpha * ( b - a )
}

function clamp(val, min, max) {
    return val < min ? min : val > max ? max : val
}
