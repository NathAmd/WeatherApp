import { findParentWithClass, findAllChildrenWithClass } from "../module/Finder.js"
import { Get, Set } from "./LocalStorage.js"


export const addModule = (e) => {
    const parent = findParentWithClass(e.target, "module-add");
    const form = findAllChildrenWithClass(parent, "form-add-city");

    if (e.target.id === "") {
        form[0].style.visibility = form[0].style.visibility === "visible" ? "hidden" : "visible";
        form[0].style.position = form[0].style.position === "static" ? "absolute" : "static";
    }

    document.querySelector(".module-section").scrollTop = 9999999;
}

export const addModuleButton = (e) => {
    if (e.key === 'Enter' || e.key === null) {
        const grp = Get("saveCity", []);
        const val = document.querySelector("#inputCity").value.toLowerCase();
        if (!grp.includes(val) && val.length > 2) {
            grp.push(val);
            Set("saveCity", grp);
            location.reload();
        }
    }
}

export const removeButton = (e) => {
    const parent = findParentWithClass(e.target, "module-remove");
    const grp = Get("saveCity", []);
    const index = grp.indexOf(parent.dataset.city);
    grp.splice(index, 1);
    Set("saveCity", grp);
    location.reload();
}

export const scrollModule = (e) => {
    const parent = findParentWithClass(e.target, "module-section");
    const alpha = clamp(parent.scrollTop / 200, 0, 1);
    const rgb = `rgb(${lerp(94, 0, alpha)}, ${lerp(164, 0, alpha)}, ${lerp(239, 0, alpha)})`;
    document.documentElement.style.setProperty('--background', rgb);
}

const lerp = (a, b, alpha) => a + alpha * (b - a);
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);