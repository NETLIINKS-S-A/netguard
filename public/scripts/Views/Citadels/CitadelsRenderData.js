export async function renderCitadelData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = '';
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayCitadels = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayCitadels.length; index++) {
        let citadel = arrayCitadels[index];
        let row = document.createElement('tr');
        row.innerHTML = `
        <tr>
            <td>${citadel.name}</td>
            <td>${citadel.description}</td>
            <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
        tableBody.appendChild(row);
        console.log(citadel[index]);
    }
}
