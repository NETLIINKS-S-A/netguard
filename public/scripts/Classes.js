class Funcs {
    async TAGS(TABLE_TAGS) {
        TABLE_TAGS?.forEach((TAG) => {
            if (TAG.innerText === "ENABLED" ||
                TAG.innerText === "Enabled") {
                TAG.classList.add("g");
                TAG.innerText === "Activo";
            }
            else if (TAG.innerText === "DISABLED" ||
                TAG.innerText === "Disabled" ||
                TAG.innerText === "Inactivo" ||
                TAG.innerText === "INACTIVO") {
                TAG.classList.add("i");
                TAG.innerText = "Inactivo";
            }
            else if (TAG.innerText === "NO APLICA") {
                TAG.innerText = "no aplica";
            }
            else if (TAG.innerText === "No Aplica") {
                TAG.innerText = "no aplica";
            }
            else if (TAG.innerText === "N/A") {
                TAG.innerText = "ninguno";
            }
            else if (TAG.innerText === "UNDEFINED") {
                TAG.innerText = "•••";
            }
            else if (TAG.innerText != "no aplica" &&
                TAG.innerText != "NINGUNO" &&
                TAG.innerText != "•••") {
                TAG.classList.add("b");
            }
        });
    }
}
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
        if (showInConsole === "show")
            console.log(data);
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
export const NLFuncs = new Funcs();
