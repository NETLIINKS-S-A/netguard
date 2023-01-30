// @filename: VisitsRenderData.ts
import { UIControl } from "../../../Libs/lib.types.js"

export async function renderVisitData(
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
    let arrayVisits: [] = await items.slice(start, end)
    let index: number

    for (index = 0; index < arrayVisits.length; index++) {
        let visit: any = arrayVisits[index]
        let row: UIControl = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>${visit.firstName} ${visit.firstLastName}</td>
            <td>${visit.dni}</td>
            <td>${visit.creationDate}</td>
            <td>${visit.creationTime}</td>
            <td>${visit.visitState.name}</td>
            <td>${visit.user.firstName}</td>
            <td><button class="btn btn_table_info"><i class="fa-solid fa-list"></i></button></td>
        </tr>`

        tableBody.appendChild(row)
    }
}
