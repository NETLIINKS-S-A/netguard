// @filename: EventRenderData.ts
import { UIControl } from "../../../Libs/lib.types"

export async function renderEventData(
    items: any,
    tableBody: UIControl,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = " "
    page--

    let start: number = rowsPerPage * page
    let end: number = start + rowsPerPage
    let arrayEvents: [] = await items.slice(start, end)
    let index: number

    for (index = 0; index < arrayEvents.length; index++) {
        let event: any = arrayEvents[index]
        let row: UIControl = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>${event.user.firstName} ${event.user.lastName}</td>
            <td>${event.description}</td>
            <td>${event.creationDate}</td>
            <td>${event.creationTime}</td>
        </tr>
        `

        tableBody.appendChild(row)
    }
}
