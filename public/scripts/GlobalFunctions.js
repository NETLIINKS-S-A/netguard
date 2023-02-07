// @filename: GlobalFunctions.ts
import { $color } from "./Libs/lib.tools.js";
class Funcs {
    async TAGS_() {
        const tags = document.querySelectorAll(".tag span");
        tags.forEach((tag) => {
            let tagText = tag.innerText;
            if (tagText === "ENABLED" || tagText === "Enabled" || tagText === "enabled" || tagText === "activo" || tagText === "ACTIVO") {
                tag.innerText = "Activo";
                tag.classList.add("g");
            }
            else if (tagText === "Disabled" || tagText === "DISABLED" || tagText === "Inactivo" || tagText === "INACTIVO") {
                tag.innerText = "Inactivo";
                tag.classList.add("i");
            }
            else if (tagText === "NO APLICA" || tagText === "No aplica") {
                tag.innerText = "No aplica";
                tag.classList.add("i");
            }
            else if (tagText === "N/A" || tagText === "Ninguno" || tagText === "NINGUNO") {
                tag.innerText = "ninguno";
                tag.classList.add("i");
            }
            else if (tagText === "undefined" || tagText === "" || tagText === "UNDEFINED" || tagText === "•••") {
                tag.innerText = "•••";
            }
            else {
                tag.classList.add("b");
            }
        });
    }
    async validateRUC() {
        const rucTableElement = document.querySelectorAll(".ruc");
        rucTableElement.forEach((ruc) => {
            if (ruc.innerText.length > 10) {
                ruc.style.color = $color.red.r500;
            }
            else if (ruc.innerText.length < 10) {
                ruc.style.color = $color.red.r500;
            }
        });
    }
}
export const NLFuncs = new Funcs();
export class Modal {
    open() {
        const modal = document.getElementById("modal");
        modal ? modal.style.display = "block" : console.error("no se encuentra el modal");
        setTimeout(() => modal.classList.add("open"), 200);
    }
    close() {
        const modal = document.getElementById("modal");
        setTimeout(() => modal.classList.toggle("open"), 200);
        modal.style.display = "none";
        modal.remove();
    }
    cancel() {
        const modal = document.getElementById("modal");
        // TODO: add clear input functions
        setTimeout(() => modal.classList.toggle("open"), 200);
        modal.style.display = "none";
        modal.remove();
    }
}
class AppStorage {
    /**
     * @function save
     * @param name - string
     * @param value - string
     * @param showSaveInConsole option: "show"
     * @description save data in localStorage
     * @descripción guarda los datos en localStorage
     */
    save(name, value, showSaveInConsole) {
        let data = localStorage.setItem(name, value);
        if (showSaveInConsole === "show")
            this.showInConsole(name);
    }
    get(name, showInConsole) {
        let data = localStorage.getItem(name);
        return data;
    }
    remove(name) {
        let data = localStorage.removeItem(name);
        return data;
    }
    /**
     * @function showInConsole
     * @param name
     * @description show data saved in navigator console
     * @descripción muestra los datos guardados en la consola del navegador
     */
    showInConsole(name) {
        console.log(localStorage.getItem(name));
    }
}
/**
 * @class AppStorage
 *
 * ## description:
 * Interacts with localStorage
 *
 * ## Methods:
 * - Save: save data on localStorage (public)
 * - Get: get specifict data from localStorage (public)
 * - Remove: remove specific data from localStorage (public)
 * - showInConsole: show localStorage data in console (private). I'ts part of
 * save and get methods
 */
export let appStorage = new AppStorage();
