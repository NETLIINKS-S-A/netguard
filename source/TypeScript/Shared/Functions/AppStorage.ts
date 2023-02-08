// @filename: AppStorage.ts

export class AppStorage {
    /**
     * @function showInConsole
     * @param name
     * @description show data saved in navigator console
     * @descripción muestra los datos guardados en la consola del navegador
     */
    static showInConsole(name: string) {
        console.log(localStorage.getItem(name))
    }

    /**
     * @function save
     * @param name - string
     * @param value - string
     * @param showSaveInConsole option: "show"
     * @description save data in localStorage
     * @descripción guarda los datos en localStorage
     */
    static save(name: string, value: string, showSaveInConsole?: string): void {
        let data: any = localStorage.setItem(name, value)
        if (showSaveInConsole === "show") AppStorage.showInConsole(name)
    }

    static get(name: string, showInConsole?: string): void {
        let data: any = localStorage.getItem(name)
        return data
    }

    static remove(name: string): void {
        let data: any = localStorage.removeItem(name)
        return data
    }
}
