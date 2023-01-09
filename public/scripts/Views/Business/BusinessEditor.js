// @filename: BusinessEditor.ts
import { Modal } from "../../Classes.js";
import { getData, updateData } from "../../RequestOptions.js";
let entityURL;
export async function openBusinessEditor(entity, url, id) {
    let editor = new Modal(id);
    editor.open();
    entityURL = `https://backend.netliinks.com:443/rest/entities/Business/${entity}`;
    let data = await getData(entityURL);
    const entityName = document.getElementById("entityName");
    entityName.innerHTML = data._instanceName;
}
export function closeBusinessEditor(id) {
    let editor = new Modal(id);
    editor.close();
}
export function updateBusinessData(id) {
    const businessName = document.getElementById("businessName");
    // get input data
    let raw = JSON.stringify({
        "name": businessName.value
    });
    updateData(entityURL, raw);
    closeBusinessEditor(id);
}
