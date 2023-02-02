// @filename: NotesRenderData.ts
import { UIControl } from "../../../Libs/lib.types"

/**
 * @function renderNotesData
 * @description render Notes data
 * @param items - array with datas
 * @param tableBody - DOM element
 * @param rowsPerPage - rows quantity
 * @param page - number of first page
 * @param paginationElement - DOM element
 */
export async function renderNotesData(
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
    let arrayNotes: [] = await items.slice(start, end)
    let index: number

    for (index = 0; index < arrayNotes.length; index++) {
        let note: any = arrayNotes[index]
        let row: UIControl = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>${note.title}</td>
            <td>${note.user.firstName} ${note.user.lastName}</td>
            <td>${note.creationDate}</td>
            <td><button class="btn btn_table_info"><i class="fa-solid fa-list"></i></button></td>
        </tr>`

        tableBody.appendChild(row)
    }
}
