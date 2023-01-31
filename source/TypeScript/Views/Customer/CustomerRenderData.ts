// @filename: CustomerRenderData.ts
/* ******************************************
DISPLAY TABLE DATA AND FILTERED TABLE DATA
******************************************** */
import { UIControl } from "../../Libs/lib.types.js"

/**
 *
 * @param items - The saved data and filtered data (tableData)
 * @param wrapper - The table body content (table body)
 * @param rowsPerPage - The quantity rows show per page (tableRows)
 * @param page - The current page
 */
export async function renderCustomerData(
    items: any,
    tableBody: any,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = ""
    page--

    let start = rowsPerPage * page
    let end = start + rowsPerPage
    let paginatedItems = items.slice(start, end)

    let customer: any
    for (let i = 0; i < paginatedItems.length; i++) {
        customer = paginatedItems[i]
        let itemElement = document.createElement("tr")
        itemElement.innerHTML = `<tr>
            <td>${customer.name}</td>
            <td class="monospace">${customer.ruc}</td>
            <td class="status"><i>${customer.state.name}</i></td>
            <td>
                <button class="btn btn_table-editor" data-id="${customer.id}">
                    <i class="fa-solid fa-pencil"></i>
                </button>
            </td>
        </tr>`
        // write datas on table
        tableBody.appendChild(itemElement)

        // fix states
        const states: UIControl = document.querySelectorAll(".status i")
        states?.forEach((state: UIControl) => {
            if (state.innerText === "ENABLED") {
                state.classList.add("g")
                state.innerText = "Activo"
            } else if (state.innerText === "DISABLED") {
                state.classList.add("i")
                state.innerText = "Inactivo"
            }
        })
    }

    // CUSTOMER EDITOR ================================================
    // elements
    const editorButtonElements: UIControl =
        document.querySelectorAll("tr td button")
    const closeEditorButtonElement: UIControl =
        document.getElementById("closeEditor")
    const updateCustomerEntityElement: UIControl = document.getElementById(
        "updateCutomerEntity"
    )

    // CUSTOMER CREATOR ================================================
}
