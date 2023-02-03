import { UserEditor, MultiInput, closeUserModal, FNClients } from "./Functions.js";
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
            <td><button class="btn btn_table-editor"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete"><i class="fa-solid fa-trash"></i></button></td>
            </td>
        </tr>`;
        // write datas on table
        tableBody.appendChild(itemElement);
        // fix tags
        const tags = document.querySelectorAll(".tag span");
        FNClients.TAGS(tags);
    }
    // CUSTOMER EDITOR ================================================
    // elements
    const editorButtonElements = document.querySelectorAll("tr td button");
    const closeEditorButtonElement = document.getElementById("closeEditor");
    const updateCustomerEntityElement = document.getElementById("updateCutomerEntity");
    // functions
    const userEditor = new UserEditor();
    editorButtonElements.forEach((btn) => {
        btn.addEventListener("click", () => {
            let entity = btn.dataset.id;
            userEditor.open(entity, "editBusiness", MultiInput);
        });
    });
    closeEditorButtonElement.addEventListener("click", () => closeUserModal("editBusiness"));
    updateCustomerEntityElement.addEventListener("click", () => {
        userEditor.update("editBusiness");
    });
    // CUSTOMER CREATOR ================================================
}
