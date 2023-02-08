// @filename: StylingTable.ts

import { color_ } from "../Libs/lib.color.g.js"
import { NLInterfaceElement, UIControl } from "../Libs/lib.types.g.js"

export class StylingTable {

    static async TAGS(): Promise<NLInterfaceElement> {
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

    static async validateRUC(): Promise<NLInterfaceElement> {
        const rucTableElement = document.querySelectorAll(".ruc")

        rucTableElement.forEach((ruc: any) => {
            if (ruc.innerText.length > 10)
                ruc.style.color = color_.red.r500

            else if (ruc.innerText.length < 10)
                ruc.style.color = color_.red.r500
        })
    }
}
