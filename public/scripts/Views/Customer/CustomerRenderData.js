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
    let customer;
    for (let i = 0; i < paginatedItems.length; i++) {
        customer = paginatedItems[i];
        let itemElement = document.createElement("tr");
        itemElement.innerHTML = `<tr>
            <td>${customer.name}</td>
            <td class="monospace">${customer.ruc}</td>
            <td class="status"><i>${customer.state.name}</i></td>
            <td>
                <button class="btn btn_table-editor" data-id="${customer.id}">
                    <i class="fa-solid fa-pencil"></i>
                </button>
            </td>
        </tr>`;
        // write datas on table
        tableBody.appendChild(itemElement);
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
    }
    // CUSTOMER EDITOR ================================================
    // elements
    const editorButtonElements = document.querySelectorAll("tr td button");
    const closeEditorButtonElement = document.getElementById("closeEditor");
    const updateCustomerEntityElement = document.getElementById("updateCutomerEntity");
    // CUSTOMER CREATOR ================================================
}
