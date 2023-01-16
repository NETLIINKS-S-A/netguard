// @filename: EventRenderData.ts
import { UIElement } from '../../../Types/GeneralTypes.js';

export async function renderEventData(
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
        let event: any = arrayEvents[index];
        let row: UIElement = document.createElement('tr');
        row.innerHTML = `
        <tr>
            <td>${event}</td>
        </tr>
        `;

        tableBody.appendChild(row);
    }
}
