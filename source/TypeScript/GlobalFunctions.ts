// @filename: GlobalFunctions.ts
import { $color } from "./Libs/lib.tools.js"
import { NLInterfaceElement, UIControl, UIController } from "./Libs/lib.types"

class Funcs {
    public async TAGS_(): Promise<NLInterfaceElement> {
        const tags: UIControl = document.querySelectorAll(".tag span")

        tags.forEach((tag: UIControl) => {
            let tagText = tag.innerText

            if (tagText === "ENABLED" || tagText === "Enabled" || tagText === "enabled" || tagText === "activo" || tagText === "ACTIVO") {
                tag.innerText = "Activo"
                tag.classList.add("g")
            }
            else if (tagText === "Disabled" || tagText === "DISABLED" || tagText === "Inactivo" || tagText === "INACTIVO") {
                tag.innerText = "Inactivo"
                tag.classList.add("i")
            }
            else if (tagText === "NO APLICA" || tagText === "No aplica") {
                tag.innerText = "No aplica"
                tag.classList.add("i")
            }
            else if (tagText === "N/A" || tagText === "Ninguno" || tagText === "NINGUNO" || tagText === "NA") {
                tag.innerText = "ninguno"
                tag.classList.add("i")
            }
            else if (tagText === "undefined" || tagText === "" || tagText === "UNDEFINED" || tagText === "•••") {
                tag.innerText = "•••"
            }

            else {
                tag.classList.add("b")
            }

        })
    }

    public async validateRUC(): Promise<void> {
        const rucTableElement = document.querySelectorAll(".ruc")

        rucTableElement.forEach((ruc: any) => {
            if (ruc.innerText.length > 10) {
                ruc.style.color = $color.red.r500
            }
            else if (ruc.innerText.length < 10) {
                ruc.style.color = $color.red.r500
            }
        })
    }
}

export const NLFuncs: Funcs = new Funcs()

export class Modal {
    public open(): void {
        const modal: UIController = document.getElementById("modal")
        modal ? modal.style.display = "block" : console.error("no se encuentra el modal")
        setTimeout(() => modal.classList.add("open"), 200)
    }

    public close(): void {
        const modal: UIController = document.getElementById("modal")
        setTimeout(() => modal.classList.toggle("open"), 200)

        modal.style.display = "none"
        modal.remove()
    }

    public cancel(): void {
        const modal: UIController = document.getElementById("modal")

        // TODO: add clear input functions

        setTimeout(() => modal.classList.toggle("open"), 200)

        modal.style.display = "none"
        modal.remove()
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
    public save(name: string, value: string, showSaveInConsole?: string): void {
        let data: any = localStorage.setItem(name, value)
        if (showSaveInConsole === "show") this.showInConsole(name)
    }

    public get(name: string, showInConsole?: string): void {
        let data: any = localStorage.getItem(name)
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
    private showInConsole(name: string) {
        console.log(localStorage.getItem(name))
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
export let appStorage: AppStorage = new AppStorage()
