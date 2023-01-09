// @filename: BusinessEditor.ts
import { Modal } from "../../Classes.js"
import { getData, updateData } from "../../RequestOptions.js"
import { UIElement } from "../../Types/GeneralTypes.js"
import { renderBusiness } from "./BusinessView.js";

let entityURL: string;

export function closeBusinessEditor(id: string): void {
    let editor = new Modal(id)
    editor.close()
}

export async function openBusinessEditor(entity: string, url: string, id: string): Promise<void> {
    let editor = new Modal(id)
    editor.open()

    entityURL = `https://backend.netliinks.com:443/rest/entities/Business/${entity}`
    let data = await getData(entityURL)

    const entityName: UIElement = document.getElementById("entityName")
    entityName.innerHTML = data._instanceName
}

export function updateBusinessData(id: string) : void {
    const businessName: UIElement = document.getElementById("businessName")
    // get input data
    let raw = JSON.stringify({
        "name": businessName.value
    });

    // preventing rename with a empty value
    if (businessName.value === "" || businessName.value.trim() === "") closeBusinessEditor(id)
    else {
        updateData(entityURL, raw)
        closeBusinessEditor(id)
        setTimeout(() => {
            renderBusiness()
        }, 100)
    }
}

export function createNewBusiness(id: string): void {
}
