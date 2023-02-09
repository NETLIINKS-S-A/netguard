export async function renderNotesData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayNotes = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayNotes.length; index++) {
        let note = arrayNotes[index];
        let row = document.createElement("tr");
        row.innerHTML = `
        <tr>
            <td>${note.title}</td>
            <td>${note.user.firstName} ${note.user.lastName}</td>
            <td>${note.creationDate}</td>
            <td><button class="btn btn_table_info"><i class="fa-solid fa-list"></i></button></td>
        </tr>`;
        tableBody.appendChild(row);
    }
}
