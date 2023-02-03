// @filename: UsersRenderData.ts
/* ******************************************
DISPLAY TABLE DATA AND FILTERED TABLE DATA
******************************************** */
import { UIControl } from "../../../Libs/lib.types.js"
import { UserEditor, MultiInput, closeUserModal, FNClients } from "./Functions.js"

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
            <td><button class="btn btn_table-editor"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete"><i class="fa-solid fa-trash"></i></button></td>
            </td>
        </tr>`

        // write datas on table
        tableBody.appendChild(itemElement)

        // fix tags
        const tags: UIControl = document.querySelectorAll(".tag span")
        FNClients.TAGS(tags)

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

    // functions
    const userEditor: UserEditor = new UserEditor()
    editorButtonElements.forEach((btn: UIControl) => {
        btn.addEventListener("click", () => {
            let entity: string = btn.dataset.id
            userEditor.open(entity, "editBusiness", MultiInput)
        })
    })
    closeEditorButtonElement.addEventListener("click", () =>
        closeUserModal("editBusiness")
    )
    updateCustomerEntityElement.addEventListener("click", () => {
        userEditor.update("editBusiness")
    })

    // CUSTOMER CREATOR ================================================
}
