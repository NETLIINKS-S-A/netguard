// @filename: GuardsRenderData.ts
import { Modal } from "../../../Classes.js"
import { UIElement } from "../../../Types/GeneralTypes.js"
import { TableFunctions } from "./GuardsViewFuncs.js"

export async function renderGuardData(
    items: any,
    tableBody: UIElement,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = ""
    page--

    let start: number = rowsPerPage * page
    let end: number = start + rowsPerPage
    let arrayGuards: [] = items.slice(start, end)

    let index: number
    for (index = 0; index < arrayGuards.length; index++) {
        let guard: any = arrayGuards[index]
        let row = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>${guard?.firstName} ${guard?.lastName}</td>
            <td class="monospace">${guard.email}</td>
            <td class="guard_state"><i>${guard.state._instanceName}</i></td>
            <td>${guard.citadel?.description}</td>
            <td><button class="btn btn_table-editor"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete" id="deleteGuard" data-id="${guard?.id}"><i class="fa-solid fa-trash"></i></button></td>
            </td>
        </tr>`

        // write data on table
        tableBody.appendChild(row)

        // fix states
        const states: UIElement = document.querySelectorAll(".guard_state i")
        tableFunctions.renderBadges(states)
    }

    const deleteButtons: UIElement =
        document.querySelectorAll(".btn_table-delete")
    console.log(deleteButtons)
    const modalCancelButton = document.getElementById("cancel")
    let modal = new Modal("delete")

    modalCancelButton?.addEventListener('click', () => {
        modal.close()
    })

    await deleteButtons.forEach((btn: UIElement) => {
        btn.addEventListener('click', (): void => {
            modal.open()
            tableFunctions.deleteEntity()
        })
    })
}

let tableFunctions: TableFunctions = new TableFunctions()