import { FNEmergency } from "./EmergencyFunctions.js";
export async function renderEmergencyUserData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayEmergencyUsers = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayEmergencyUsers.length; index++) {
        let emergencyUser = arrayEmergencyUsers[index];
        let row = document.createElement("tr");
        row.innerHTML = `
        <tr>
            <td>${emergencyUser?.name}</td>
            <td class="monospace">${emergencyUser?.phone}</td>
            <td><button class="btn btn_table-editor" id="edit" data-id="${emergencyUser?.id}"><i class="fa-solid fa-pencil"></i></button></td>
        </tr>`;
        // write data on table
        tableBody.appendChild(row);
    }
    const editorButton = document.querySelectorAll("#edit");
    editorButton.forEach((editor) => {
        editor.addEventListener("click", () => {
            let id = editor.dataset.id;
            FNEmergency.editor(id);
        });
    });
}
