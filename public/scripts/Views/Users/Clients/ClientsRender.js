import { StylingTable } from "../../../Shared/Functions/StylingTable.js";
import { FNClients } from "./ClientsFunctions.js";
/**
 *
 * @param items - The saved data and filtered data (tableData)
 * @param wrapper - The table body content (table body)
 * @param rowsPerPage - The quantity rows show per page (tableRows)
 * @param page - The current page
 */
export async function displayUserData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItems = items.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++) {
        let user = paginatedItems[i];
        let itemElement = document.createElement("tr");
        itemElement.innerHTML = `<tr>
            <td>${user?.firstName} ${user?.lastName}</td>
            <td class="monospace">${user.email}</td>
            <td class="tag"><span>${user.state._instanceName}</span></td>
            <td class="tag"><span>${user.citadel?.description}</span></td>
            <td><button class="btn btn_table-editor" id="edit" data-entityid="${user.id}"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete" id="remove-entity" data-entityid="${user.id}"><i class="fa-solid fa-trash"></i></button></td>
            </td>
        </tr>`;
        // write datas on table
        tableBody.appendChild(itemElement);
    }
    // fix tags
    StylingTable.TAGS();
    // Edit clients
    const openEditor = document.querySelectorAll("#edit");
    openEditor.forEach((editor) => {
        editor.addEventListener("click", () => {
            let editorID = editor.dataset.entityid;
            FNClients.editor(editorID);
        });
    });
    // Remove client
    const removeClientButtons = document.querySelectorAll("#remove-entity");
    removeClientButtons.forEach((removeClientButton) => {
        removeClientButton.addEventListener("click", () => {
            let editorID = removeClientButton.dataset.entityid;
            FNClients.remove_();
        });
    });
}
