// @filename: BusinessEditor.ts
import { Modal } from "../../Classes.js";
import { getData, updateData } from "../../RequestOptions.js";
import { renderBusiness } from "./BusinessView.js";
let entityURL;
// Close editor
export function closeBusinessModal(id) {
    let editor = new Modal(id);
    editor.close();
}
export class BusinessEditor {
    async open(entity, url, id, rucInput) {
        let editor = new Modal(id);
        editor.open();
        entityURL = `https://backend.netliinks.com:443/rest/entities/Business/${entity}`;
        let data = await getData(entityURL);
        // write entity name on top of modal
        const entityName = document.getElementById("entityName");
        entityName.innerHTML = data._instanceName;
        // clear multi-input in cas there is written information
        clearRucIinput(rucInput);
    }
    async update(modalID, rucInput) {
        const businessName = document.getElementById("businessName");
        // get inputData
        let raw = JSON.stringify({
            "name": businessName.value
        });
        // preventing rename with a empty value
        if (businessName.value === "" || businessName.value.trim() === "")
            closeBusinessModal(modalID);
        else {
            updateData(entityURL, raw);
            closeBusinessModal(modalID);
            setTimeout(() => {
                renderBusiness(); // reload changes
                clearRucIinput(rucInput);
            }, 100);
        }
    }
}
export class MultiInput {
    clearInputs(inputs) {
        inputs?.forEach((r) => {
            r.value = "";
        });
    }
    handleInput(e) {
        const input = e.target;
        if (input?.nextElementSibling && input?.value)
            input.nextElementSibling.focus();
    }
    handlePaste(e, inputs) {
        const paste = e.clipboardData.getData("text");
        inputs?.forEach((input, i) => {
            input.value = paste[i];
        });
    }
}
export class NewBusiness {
    open(id) {
        let editorWindow = new Modal(id);
        editorWindow.open();
        console.info("this function is under construction");
    }
    add(id) {
        closeBusinessModal(id);
    }
    clearInputs(inputs) {
        inputs?.forEach((input) => {
            input.value = "";
        });
    }
}
function clearRucIinput(ruc) {
    ruc?.forEach((r) => {
        r.value = "";
    });
}
