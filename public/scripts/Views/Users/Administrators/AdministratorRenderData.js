export async function renderAdministratorData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = ' ';
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayEvents = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayEvents.length; index++) {
        let administrator = arrayEvents[index];
        let row = document.createElement('tr');
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
