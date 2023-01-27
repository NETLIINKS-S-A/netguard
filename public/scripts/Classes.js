export class Modal {
    constructor(id) {
        this.id = id;
        this.modal = document.getElementById(this.id);
    }
    open() {
        this.modal.style.display = "block";
        setTimeout(() => this.modal.classList.toggle("open"), 100);
    }
    close() {
        this.modal.classList.toggle("open");
        setTimeout(() => (this.modal.style.display = "none"), 100);
    }
}
export class AppStorage {
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
    showInConsole(name) { console.log(localStorage.getItem(name)); }
}
export let appStorage = new AppStorage();
