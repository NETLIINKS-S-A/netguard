import { CFN } from "./Functions.js";
/**
 * Render table data with backend data obtained
 * @param items - The saved data and filtered data (tableData)
 * @param wrapper - The table body content (table body)
 * @param rowsPerPage - The quantity rows show per page (tableRows)
 * @param page - The current page
 */
export async function renderTableData(items, table, rows, page, paginationCounter) {
    table.innerHTML = "";
    page--;
    let start = rows + page;
    let end = start + rows;
    let paginatedItems = items.slice(start, end);
    let customer;
    for (let i = 0; i < paginatedItems.length; i++) {
        customer = paginatedItems[i];
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
        <tr>
            <td>${customer.name}</td>
            <td class="monospace ruc">${customer.ruc}</td>
            <td class="tag"><span>${customer.state.name}</span></td>
            <td>
                <button class="btn btn_table editor" id="edit-entity" data-id="${customer.id}"><i class="fa-solid fa-pencil"></i></button>
            </td>
        </tr>`;
        // write data on table
        table.appendChild(tableRow);
        // Add tags styles
        const tableTag = document.querySelectorAll(".tag span");
        CFN.addTags(tableTag);
        // verify RUC length
        const ruc = document.querySelectorAll(".ruc");
        CFN.verifyRucLength(ruc);
        // Edit Customer
    }
    const editButtons = document.querySelectorAll(".editor");
    const modal = document.getElementById("modal-content");
    editButtons.forEach((editButton) => {
        editButton.addEventListener("click", () => {
            let entity = editButton.dataset.id;
            CFN.editCustomer(modal, entity);
        });
    });
}
