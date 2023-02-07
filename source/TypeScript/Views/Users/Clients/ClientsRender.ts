// @filename: UsersRenderData.ts
/* ******************************************
DISPLAY TABLE DATA AND FILTERED TABLE DATA
******************************************** */
import { NLFuncs } from "../../../GlobalFunctions.js"
import { UIControl } from "../../../Libs/lib.types.js"
import { FNClients } from "./ClientsFunctions.js"

/**
 *
 * @param items - The saved data and filtered data (tableData)
 * @param wrapper - The table body content (table body)
 * @param rowsPerPage - The quantity rows show per page (tableRows)
 * @param page - The current page
 */
export async function displayUserData(
    items: any,
    tableBody: any,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = ""
    page--

    let start: number = rowsPerPage * page
    let end: number = start + rowsPerPage
    let paginatedItems: any = items.slice(start, end)

    for (let i = 0; i < paginatedItems.length; i++) {
        let user = paginatedItems[i]
        let itemElement = document.createElement("tr")
        itemElement.innerHTML = `<tr>
            <td>${user?.firstName} ${user?.lastName}</td>
            <td class="monospace">${user.email}</td>
            <td class="tag"><span>${user.state._instanceName}</span></td>
            <td class="tag"><span>${user.citadel?.description}</span></td>
            <td><button class="btn btn_table-editor" id="edit" data-entityid="${user.id}"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete"><i class="fa-solid fa-trash"></i></button></td>
            </td>
        </tr>`

        // write datas on table
        tableBody.appendChild(itemElement)
    }

    // fix tags
    NLFuncs.TAGS_()

    // Edit clients
    const openEditor: UIControl = document.querySelectorAll("#edit")

    openEditor.forEach((editor: UIControl) => {
        editor.addEventListener("click", (): void => {
            let editorID = editor.dataset.entityid
            FNClients.editor(editorID)
        })
    })
}
