// @filename: Classes.ts
import { UIElement } from "./Libs/lib.types.js"

export class Modal {
    private id: string
    readonly modal: UIElement

    public constructor(id: string) {
        this.id = id
        this.modal = document.getElementById(this.id)
    }

    public open(): void {
        this.modal.style.display = "block"
        setTimeout(() => this.modal.classList.toggle("open"), 100)
    }

    public close(): void {
        this.modal.classList.toggle("open")
        setTimeout(() => (this.modal.style.display = "none"), 100)
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
    public save(name: string, value: string, showSaveInConsole?: string): void {
        let data: any = localStorage.setItem(name, value)
        if (showSaveInConsole === "show") this.showInConsole(name)
    }

    public get(name: string, showInConsole?: string): void {
        let data: any = localStorage.getItem(name)
        if (showInConsole === "show") console.log(data)

        return data
    }

    public remove(name: string): void {
        let data: any = localStorage.removeItem(name)
        return data
    }

    /**
     * @function showInConsole
     * @param name
     * @description show data saved in navigator console
     * @descripción muestra los datos guardados en la consola del navegador
     */
    private showInConsole(name: string) { console.log(localStorage.getItem(name)) }
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
export let appStorage: AppStorage = new AppStorage()
