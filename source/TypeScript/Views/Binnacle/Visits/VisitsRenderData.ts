// @filename: VisitsRenderData.ts
import { UIElement } from "../../../Types/GeneralTypes.js"

export async function renderVisitData(
    items: any,
    tableBody: UIElement,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = ''
    page--

    let start: number = rowsPerPage * page
    let end: number = start + rowsPerPage
    let arrayVisits: [] = await items.slice(start, end)
    let index: number

    for (index = 0; index < arrayVisits.length; index++) {
        let visit: any = arrayVisits[index]
        let row: UIElement = document.createElement('tr')
        row.innerHTML = `
        <tr>
            <td>${visit.firstName} ${visit.firstLastName}</td>
            <td>${visit.dni}</td>
            <td>${visit.creationDate}</td>
            <td>${visit.creationTime}</td>
            <td>${visit.visitState.name}</td>
            <td>${visit.user.firstName}</td>
            <td><button class="btn"><i class="fa-solid fa-magnifying-glass"></i></button></td>
        </tr>`

        tableBody.appendChild(row)

        console.log(visit[index])
    }
}
