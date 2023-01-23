export async function renderEventData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = " ";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayEvents = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayEvents.length; index++) {
        let event = arrayEvents[index];
        let row = document.createElement("tr");
        row.innerHTML = `
        <tr>
            <td>${event.user.firstName} ${event.user.lastName}</td>
            <td>${event.description}</td>
            <td>${event.creationDate}</td>
            <td>${event.creationTime}</td>
        </tr>
        `;
        tableBody.appendChild(row);
    }
}
