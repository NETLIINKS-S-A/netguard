// @filename: EmergencyUserRenderData.ts
import { UIElement } from "../../Types/GeneralTypes.js";

export async function renderEmergencyUserData(
    items: any,
    tableBody: UIElement,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = '';
    page--;

    let start: number = rowsPerPage * page;
    let end: number = start + rowsPerPage
    let arrayEmergencyUsers: [] = await items.slice(start, end)
    let index: number

    for (index = 0; index < arrayEmergencyUsers.length; index++) {
        let emergencyUser: any = arrayEmergencyUsers[index]
        let row: UIElement = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>${emergencyUser?.name}</td>
            <td class="monospace">${emergencyUser?.phone}</td>
            <td><button class="btn btn_table-editor"><i class="fa-solid fa-pencil"></i></button></td>
        </tr>`

        // write data on table
        tableBody.appendChild(row);
    }
}
