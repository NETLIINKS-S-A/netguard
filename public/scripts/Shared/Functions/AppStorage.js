// @filename: AppStorage.ts
export class AppStorage {
    /**
     * @function showInConsole
     * @param name
     * @description show data saved in navigator console
     * @descripción muestra los datos guardados en la consola del navegador
     */
    static showInConsole(name) {
        console.log(localStorage.getItem(name));
    }
    /**
     * @function save
     * @param name - string
     * @param value - string
     * @param showSaveInConsole option: "show"
     * @description save data in localStorage
     * @descripción guarda los datos en localStorage
     */
    static save(name, value, showSaveInConsole) {
        let data = localStorage.setItem(name, value);
        if (showSaveInConsole === "show")
            AppStorage.showInConsole(name);
    }
    static get(name, showInConsole) {
        let data = localStorage.getItem(name);
        return data;
    }
    static remove(name) {
        let data = localStorage.removeItem(name);
        return data;
    }
}
