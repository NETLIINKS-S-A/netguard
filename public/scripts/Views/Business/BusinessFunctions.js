// @filename: BusinessEditor.ts
import { Modal } from "../../Classes.js";
import { getData, updateData } from "../../RequestOptions.js";
import { renderBusiness } from "./BusinessView.js";
let entityURL;
// Close editor
//
export function closeBusinessModal(id) {
    let editor = new Modal(id);
    editor.close();
}
// Open editor
//
export async function openBusinessEditor(entity, url, id, rucInput) {
    let editor = new Modal(id);
    editor.open();
    entityURL = `https://backend.netliinks.com:443/rest/entities/Business/${entity}`;
    let data = await getData(entityURL);
    const entityName = document.getElementById("entityName");
    entityName.innerHTML = data._instanceName;
    // Clear rucInput in case there is written information
    clearRucIinput(rucInput);
}
// Update data
//
export function updateBusinessData(id, rucInput) {
    const businessName = document.getElementById("businessName");
    // get input data
    let raw = JSON.stringify({
        "name": businessName.value
    });
    // preventing rename with a empty value
    if (businessName.value === "" || businessName.value.trim() === "")
        closeBusinessModal(id);
    else {
        updateData(entityURL, raw);
        closeBusinessModal(id);
        setTimeout(() => {
            renderBusiness(); // reload changes
            // Clear rucInput in case there is written information
            clearRucIinput(rucInput);
            // console.clear() // clear if some change fail
        }, 100);
    }
}
function clearRucIinput(ruc) {
    ruc?.forEach((r) => {
        r.value = "";
    });
}
export function addNewBusiness(id) {
    let editor = new Modal(id);
    editor.open();
    console.info("this function is under construction");
}
export function saveNewBusiness(id) {
    console.info("this function is under construction");
    closeBusinessModal(id);
}
// HANDLE INSERTED NUMBER
export function handleInput(e) {
    const input = e.target;
    if (input?.nextElementSibling && input?.value)
        input.nextElementSibling.focus();
}
// HANDLE CLIPBOARD DATA
export function handlePaste(e, inputs) {
    const paste = e.clipboardData.getData("text");
    inputs?.forEach((input, i) => {
        input.value = paste[i];
    });
}
