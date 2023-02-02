// @filename: UsersRenderData.ts
/* ******************************************
DISPLAY TABLE DATA AND FILTERED TABLE DATA
******************************************** */
import { UIControl } from "../../../Libs/lib.types.js"
import { UserEditor, MultiInput, closeUserModal } from "./Functions.js"

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
            <td class="status"><i>${user.state._instanceName}</i></td>
            <td class="citadels"><i>${user.citadel?.description}</i></td>
            <td><button class="btn btn_table-editor"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete"><i class="fa-solid fa-trash"></i></button></td>
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

        // Fix citadels
        const citadels: UIControl = document.querySelectorAll(".citadels i")
        citadels?.forEach((citadel: UIControl) => {
            if (citadel.innerText === "NO APLICA") {
                citadel.innerText = "no aplica"
            } else if (citadel.innerText === "No Aplica") {
                citadel.innerText = "no aplica"
            } else if (citadel.innerText === "N/A") {
                citadel.innerText = "ninguno"
            } else if (citadel.innerText === "UNDEFINED") {
                citadel.innerText = "•••"
            } else if (
                citadel.innerText != "no aplica" &&
                citadel.innerText != "NINGUNO" &&
                citadel.innerText != "•••"
            ) {
                citadel.classList.add("b")
            }
        })

        // Fix type
        const types: UIControl = document.querySelectorAll(".type i")
        types.forEach((type: UIControl) => {
            if (type.innerText === "CUSTOMER") {
                type.classList.add("p")
                type.innerText = "Cliente"
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
