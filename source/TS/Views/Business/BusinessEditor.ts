// @filename: BusinessEditor.ts
import { Modal } from "../../Classes.js"
import { getData, updateData } from "../../RequestOptions.js"
import { UIElement } from "../../Types/GeneralTypes.js"

let entityURL: string;
export async function openBusinessEditor(entity: string, url: string, id: string): Promise<void> {
    let editor = new Modal(id)
    editor.open()

    entityURL = `https://backend.netliinks.com:443/rest/entities/Business/${entity}`
    let data = await getData(entityURL)

    const entityName: UIElement = document.getElementById("entityName")
    entityName.innerHTML = data._instanceName
}

export function closeBusinessEditor(id: string): void {
    let editor = new Modal(id)
    editor.close()
}

export function updateBusinessData(id: string) : void {
    const businessName: UIElement = document.getElementById("businessName")
    // get input data
    let raw = JSON.stringify({
        "name": businessName.value
    });

    updateData(entityURL, raw)
    closeBusinessEditor(id)
}
