
/**
 * @param { Object on start function } element
 * @param { Name of the class } className
 * @returns { object }
 */
export function findParentWithClass(element, className) {
    // Si l'élément est null ou si nous avons atteint l'élément racine du document, retourner null
    if (element === null || element === document.body) {
        return null;
    }
    // Si l'élément a la classe recherchée, retourne l'élément
    if (element.classList.contains(className)) {
        return element;
    }
    // Sinon, continuer à chercher récursivement dans l'arbre DOM
    return findParentWithClass(element.parentNode, className);
}


/**
 * @param { Object on start function } element
 * @param { Name of the class } className
 * @returns { Array }
 */
export function findAllChildrenWithClass(element, className) {
    let childrenWithClass = [];

    // Si l'élément est null, retourner le tableau vide
    if (element === null) {
        return childrenWithClass;
    }
    // Parcourir tous les enfants de l'élément actuel
    element.childNodes.forEach(child => {
        childrenWithClass = childrenWithClass.concat(findAllChildrenWithClass(child, className))
    });

    if (element.classList && element.classList.contains(className)) {
        childrenWithClass.push(element)
    }
    
    return childrenWithClass;
}

//Created by Styloxis, the JavaScript MASTER ;)