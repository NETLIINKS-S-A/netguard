/**
 * @function renderNotesData
 * @description render Notes data
 * @param items - array with datas
 * @param tableBody - DOM element
 * @param rowsPerPage - rows quantity
 * @param page - number of first page
 * @param paginationElement - DOM element
 */
export async function renderNotesData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = '';
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayNotes = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayNotes.length; index++) {
        let note = arrayNotes[index];
        let row = document.createElement('tr');
        row.innerHTML = `
        <tr>
            <td>${note.title}</td>
            <td>${note.user.firstName} ${note.user.lastName}</td>
            <td>${note.creationDate}</td>
            <td><button class="btn"><i class="fa-solid fa-magnifying-glass"></i></button></td>
        </tr>`;
        tableBody.appendChild(row);
    }
}
