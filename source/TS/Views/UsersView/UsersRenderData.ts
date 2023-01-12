// @filename: UsersRenderData.ts
/* ******************************************
DISPLAY TABLE DATA AND FILTERED TABLE DATA
******************************************** */
import { UIElement } from "../../Types/GeneralTypes.js"
import { UserEditor, MultiInput, closeUserModal } from "./UsersViewFuncs.js"

/**
 *
 * @param items - The saved data and filtered data (tableData)
 * @param wrapper - The table body content (table body)
 * @param rowsPerPage - The quantity rows show per page (tableRows)
 * @param page - The current page
 */
export async function displayUserData(items: any, tableBody: any, rowsPerPage: number, page: number, paginationElement?: any): Promise<void> {
    tableBody.innerHTML = ""
    page--

    let start = rowsPerPage * page
    let end = start + rowsPerPage
    let paginatedItems = items.slice(start, end)
    console.log(items[0].userType)

    for (let i = 0; i < paginatedItems.length; i++) {
        let user = paginatedItems[i]
        let itemElement = document.createElement("tr")
        itemElement.innerHTML = `<tr>
            <td>${user.firstName} ${user.lastName}</td>
            <td class="monospace">${user.email}</td>
            <td class="userState"><i>${user.state._instanceName}</i></td>
            <td>${user.citadel.description}</td>
            <td>${user.userType}</td>
            <td><button class="btn btn_table-editor"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete"><i class="fa-solid fa-trash"></i></button></td>
            </td>
        </tr>`

        // write datas on table
        tableBody.appendChild(itemElement)

        // states
        const states: UIElement = document.querySelectorAll(".userState i")
        states?.forEach((userState: UIElement) => {
            if (userState.innerText == "Enabled") userState.classList.add("user_active"), userState.innerText = "Activo"
            else if (userState.innerText == "Disabled") userState.classList.add("user_inactive"), userState.innerText = "Inactivo"
        })
    }

    // CUSTOMER EDITOR ================================================
    // elements
    const editorButtonElements: UIElement = document.querySelectorAll("tr td button")
    const closeEditorButtonElement : UIElement = document.getElementById("closeEditor")
    const updateCustomerEntityElement : UIElement = document.getElementById("updateCutomerEntity")

    // functions
    const userEditor: UserEditor = new UserEditor()
    editorButtonElements.forEach((btn: UIElement) => {
        btn.addEventListener("click", () => {
            let entity: string = btn.dataset.id
            userEditor.open(entity, "editBusiness", MultiInput)
        })
    })
    closeEditorButtonElement.addEventListener("click", () => closeUserModal("editBusiness"))
    updateCustomerEntityElement.addEventListener("click", () => {
        userEditor.update("editBusiness")
    })

    // CUSTOMER CREATOR ================================================
}
