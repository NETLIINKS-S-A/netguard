// @filename: EmergencyUserRenderData.ts
import { UIControl } from "../../../Shared/Libs/lib.types.g.js"
import { FNEmergency } from "./EmergencyFunctions.js"

export async function renderEmergencyUserData(
    items: any,
    tableBody: UIControl,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = ""
    page--

    let start: number = rowsPerPage * page
    let end: number = start + rowsPerPage
    let arrayEmergencyUsers: [] = await items.slice(start, end)
    let index: number

    for (index = 0; index < arrayEmergencyUsers.length; index++) {
        let emergencyUser: any = arrayEmergencyUsers[index]
        let row: UIControl = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>${emergencyUser?.name}</td>
            <td class="monospace">${emergencyUser?.phone}</td>
            <td><button class="btn btn_table-editor" id="edit" data-id="${emergencyUser?.id}"><i class="fa-solid fa-pencil"></i></button></td>
        </tr>`

        // write data on table
        tableBody.appendChild(row)
    }

    const editorButton: UIControl = document.querySelectorAll("#edit")

    editorButton.forEach((editor: UIControl) => {
        editor.addEventListener("click", (): void => {
            let id = editor.dataset.id
            FNEmergency.editor(id)
        })
    })
}
