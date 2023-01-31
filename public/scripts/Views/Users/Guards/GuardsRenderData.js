// @filename: GuardsRenderData.ts
import { Modal } from "../../../Classes.js";
import { TableFn } from "./GuardsViewFuncs.js";
export async function renderGuardData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayGuards = items.slice(start, end);
    let index;
    for (index = 0; index < arrayGuards.length; index++) {
        let guard = arrayGuards[index];
        let row = document.createElement("tr");
        row.innerHTML = `
        <tr>
            <td>${guard?.firstName} ${guard?.lastName}</td>
            <td class="monospace">${guard.email}</td>
            <td class="status"><i>${guard.state._instanceName}</i></td>
            <td class="citadels"><i>${guard.citadel?.description}</i></td>
            <td><button class="btn btn_table-editor"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete" id="deleteGuard" data-id="${guard?.id}"><i class="fa-solid fa-trash"></i></button></td>
            </td>
        </tr>`;
        // write data on table
        tableBody.appendChild(row);
        // fix states
        const states = document.querySelectorAll(".status i");
        states?.forEach((state) => {
            if (state.innerText === "ENABLED") {
                state.classList.add("g");
                state.innerText = "Activo";
            }
            else if (state.innerText === "DISABLED") {
                state.classList.add("i");
                state.innerText = "Inactivo";
            }
        });
        // Fix citadels
        const citadels = document.querySelectorAll(".citadels i");
        citadels?.forEach((citadel) => {
            if (citadel.innerText === "NO APLICA") {
                citadel.innerText = "no aplica";
            }
            else if (citadel.innerText === "No Aplica") {
                citadel.innerText = "no aplica";
            }
            else if (citadel.innerText === "N/A") {
                citadel.innerText = "ninguno";
            }
            else if (citadel.innerText === "UNDEFINED") {
                citadel.innerText = "•••";
            }
            else if (citadel.innerText != "no aplica" && citadel.innerText != "NINGUNO" && citadel.innerText != "•••") {
                citadel.classList.add("b");
            }
        });
        // Fix type
        const types = document.querySelectorAll(".type i");
        types.forEach((type) => {
            if (type.innerText === "CUSTOMER") {
                type.classList.add("p");
                type.innerText = "Cliente";
            }
        });
    }
    const deleteButtons = document.querySelectorAll(".btn_table-delete");
    const modalCancelButton = document.getElementById("cancel");
    let modal = new Modal("delete");
    modalCancelButton?.addEventListener('click', () => {
        modal.close();
    });
    await deleteButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.open();
            TableFn.deleteEntity();
        });
    });
}
