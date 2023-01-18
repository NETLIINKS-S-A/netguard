// @filename: CitadelsRenderData.ts
import { UIElement } from "../../Types/GeneralTypes.js";

export async function renderCitadelData(
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
    let arrayCitadels: [] = await items.slice(start, end)
    let index: number

    for (index = 0; index < arrayCitadels.length; index++) {
        let citadel: any = arrayCitadels[index]
        let row: UIElement = document.createElement('tr')
        row.innerHTML = `
        <tr>
            <td>${citadel.name}</td>
            <td>${citadel.description}</td>
            <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`

        tableBody.appendChild(row)
    }
}
