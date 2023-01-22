import { TableFunctions } from "./GuardsViewFuncs.js";
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
            <td class="guard_state"><i>${guard.state._instanceName}</i></td>
            <td>${guard.citadel?.description}</td>
            <td><button class="btn btn_table-editor"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete" id="deleteGuard" data-id="${guard?.id}"><i class="fa-solid fa-trash"></i></button></td>
            </td>
        </tr>`;
        // write data on table
        tableBody.appendChild(row);
        // fix states
        const states = document.querySelectorAll(".guard_state i");
        tableFunctions.renderBadges(states);
        const deleteEntity = document.querySelectorAll(".btn_table-delete");
        deleteEntity.forEach((DE) => {
            DE.addEventListener('click', () => {
                tableFunctions.deleteEntity();
            });
        });
    }
    // TODO: editor
    // TODO: add new
}
let tableFunctions = new TableFunctions();
