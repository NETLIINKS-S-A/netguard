import { CustomerEditor, closeBusinessModal, } from "./CustomerViewFuncs.js";
/**
 *
 * @param items - The saved data and filtered data (tableData)
 * @param wrapper - The table body content (table body)
 * @param rowsPerPage - The quantity rows show per page (tableRows)
 * @param page - The current page
 */
export async function renderCustomerData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItems = items.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++) {
        let customer = paginatedItems[i];
        let itemElement = document.createElement("tr");
        itemElement.innerHTML = `<tr>
            <td>${customer.name}</td>
            <td class="monospace">${customer.ruc}</td>
            <td>${customer.createdBy}</td>
            <td>
                <button class="btn btn_table-editor" data-id="${customer.id}">
                    <i class="fa-solid fa-pencil"></i>
                </button>
            </td>
        </tr>`;
        // write datas on table
        tableBody.appendChild(itemElement);
    }
    // CUSTOMER EDITOR ================================================
    // elements
    const editorButtonElements = document.querySelectorAll("tr td button");
    const closeEditorButtonElement = document.getElementById("closeEditor");
    const updateCustomerEntityElement = document.getElementById("updateCutomerEntity");
    // functions
    const customerEditor = new CustomerEditor();
    editorButtonElements.forEach((btn) => {
        btn.addEventListener("click", () => {
            let entity = btn.dataset.id;
            customerEditor.open(entity, "editBusiness");
        });
    });
    closeEditorButtonElement.addEventListener("click", () => closeBusinessModal("editBusiness"));
    updateCustomerEntityElement.addEventListener("click", () => {
        customerEditor.update("editBusiness");
    });
    // CUSTOMER CREATOR ================================================
}
