export async function renderVisitData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = '';
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayVisits = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayVisits.length; index++) {
        let visit = arrayVisits[index];
        let row = document.createElement('tr');
        row.innerHTML = `
        <tr>
            <td>${visit.firstName} ${visit.firstLastName}</td>
            <td>${visit.dni}</td>
            <td>${visit.creationDate}</td>
            <td>${visit.creationTime}</td>
            <td>${visit.visitState.name}</td>
            <td>${visit.user.firstName}</td>
            <td><button class="btn"><i class="fa-solid fa-magnifying-glass"></i></button></td>
        </tr>`;
        tableBody.appendChild(row);
    }
}
