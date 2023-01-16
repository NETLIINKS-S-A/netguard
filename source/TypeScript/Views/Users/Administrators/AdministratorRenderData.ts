// @filename: AdministratorRenderData.ts
import { UIElement } from '../../../Types/GeneralTypes.js';

export async function renderAdministratorData(
    items: any,
    tableBody: UIElement,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = ' ';
    page--;

    let start: number = rowsPerPage * page;
    let end: number = start + rowsPerPage;
    let arrayEvents: [] = await items.slice(start, end);
    let index: number;

    for (index = 0; index < arrayEvents.length; index++) {
        let administrator: any = arrayEvents[index];
        let row: UIElement = document.createElement('tr');
        row.innerHTML = `
        <tr>
            <td>${administrator?.firstName} ${administrator?.lastName}</td>
            <td>${administrator?.email}</td>
            <td class="table_badge table_badge_usertype">${administrator.userType}</td>
            <td>${administrator.creationTime}</td>
        </tr>
        `;

        tableBody.appendChild(row);
    }
}
