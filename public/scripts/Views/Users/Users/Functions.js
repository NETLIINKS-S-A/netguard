// @filename: UsesViewFuncs.ts
import { Modal } from "../../../Classes.js";
import { getData, getEntityData, updateData } from "../../../Libs/lib.request.js";
import { usersView as renderUsers } from "./UsersView.js";
class NLFClients {
    async TAGS(TABLE_TAGS) {
        TABLE_TAGS?.forEach((TAG) => {
            if (TAG.innerText === "ENABLED" ||
                TAG.innerText === "Enabled") {
                TAG.classList.add("g");
                TAG.innerText === "Activo";
            }
            else if (TAG.innerText === "DISABLED" ||
                TAG.innerText === "Disabled" ||
                TAG.innerText === "Inactivo" ||
                TAG.innerText === "INACTIVO") {
                TAG.classList.add("i");
                TAG.innerText = "Inactivo";
            }
            else if (TAG.innerText === "NO APLICA") {
                TAG.innerText = "no aplica";
            }
            else if (TAG.innerText === "No Aplica") {
                TAG.innerText = "no aplica";
            }
            else if (TAG.innerText === "N/A") {
                TAG.innerText = "ninguno";
            }
            else if (TAG.innerText === "UNDEFINED") {
                TAG.innerText = "•••";
            }
            else if (TAG.innerText != "no aplica" &&
                TAG.innerText != "NINGUNO" &&
                TAG.innerText != "•••") {
                TAG.classList.add("b");
            }
        });
    }
    async editor(entity) {
        let GET_DATA = getEntityData("Users", entity);
    }
}
export const FNClients = new NLFClients();
let entityURL;
// Close editor
export function closeUserModal(id) {
    let editor = new Modal(id);
    editor.close();
}
export class UserEditor {
    async open(entity, id, rucInput) {
        let editor = new Modal(id);
        editor.open();
        entityURL = `https://backend.netliinks.com:443/rest/entities/Users/${entity}`;
        let data = await getData(entityURL);
        // Write business data on modal window
        const entityName = document.getElementById("entityName");
        const businessName = document.getElementById("businessName");
        entityName.innerHTML = data.name;
        businessName.value = data.name;
        const rucValue = data.ruc;
        // clear multi-input in cas there is written information
        clearRucIinput(rucInput);
    }
    async update(modalID) {
        const businessName = document.getElementById("businessName");
        // get inputData
        let raw = JSON.stringify({
            name: businessName.value,
        });
        // preventing rename with a empty value
        if (businessName.value === "" || businessName.value.trim() === "")
            alert("Debe completar todos los campos");
        else {
            updateData(entityURL, raw);
            closeUserModal(modalID);
            setTimeout(() => {
                renderUsers(); // reload changes
            }, 1000);
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
export class newUser {
    open(id) {
        let editorWindow = new Modal(id);
        editorWindow.open();
        console.info("this function is under construction");
    }
    add(id) {
        closeUserModal(id);
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
