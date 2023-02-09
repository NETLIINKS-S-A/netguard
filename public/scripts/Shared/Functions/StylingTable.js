// @filename: StylingTable.ts
import Color from "../Libs/lib.color.g.js";
export class StylingTable {
    static async TAGS() {
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
            else if (tagText === "N/A" || tagText === "Ninguno" || tagText === "NINGUNO" || tagText === "NA") {
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
    static async validateRUC() {
        const rucTableElement = document.querySelectorAll(".ruc");
        rucTableElement.forEach((ruc) => {
            if (ruc.innerText.length > 10)
                ruc.style.color = Color.red.r500;
            else if (ruc.innerText.length < 10)
                ruc.style.color = Color.red.r500;
        });
    }
}
