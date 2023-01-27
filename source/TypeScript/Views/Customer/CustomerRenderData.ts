// @filename: CustomerRenderData.ts
/* ******************************************
DISPLAY TABLE DATA AND FILTERED TABLE DATA
******************************************** */
import { UIElement } from "../../Libs/lib.types.js"
import { CFN } from "./CustomerViewFuncs.js"

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
            <td>${customer.createdBy}</td>
            <td>
                <button class="btn btn_table-editor" data-id="${customer.id}">
                    <i class="fa-solid fa-pencil"></i>
                </button>
            </td>
        </tr>`
        // write datas on table
        tableBody.appendChild(itemElement)
    }

    // CUSTOMER EDITOR ================================================
    // elements
    const editorButtonElements: UIElement =
        document.querySelectorAll("tr td button")
    const closeEditorButtonElement: UIElement =
        document.getElementById("closeEditor")
    const updateCustomerEntityElement: UIElement = document.getElementById(
        "updateCutomerEntity"
    )

    // CUSTOMER CREATOR ================================================
}
