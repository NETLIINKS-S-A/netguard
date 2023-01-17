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
            <td class="table_badge user_status"><i>${administrator?.state.name}</i></td>
            <td>${administrator?.citadel.name}</td>
            <td class="table_badge table_badge_usertype"><i>${administrator.userType}</i></td>

            <td><button class="btn btn_table-editor"><i class="fa-solid fa-pencil"></i></button></td>
        </tr>
        `;
        tableBody.appendChild(row);
        // fix states
        const states = document.querySelectorAll('.user_status i');
        states?.forEach((state) => {
            if (state.innerText === 'Enabled') {
                state.classList.add('user_active');
                state.innerText = 'Activo';
            }
            else if (state.innerText === 'Disabled') {
                state.classList.add('user_inactive');
                state.innerText = 'Inactivo';
            }
        });
        const userType = document.querySelectorAll('.table_badge_usertype i');
        userType?.forEach((type) => {
            if (type.innerText === 'CUSTOMER') {
                type.classList.add('user_active');
                type.innerText = 'Cliente';
            }
            else if (type.innerText === 'GUARD') {
                type.classList.add('user_inactive');
                type.innerText = 'Guardia';
            }
        });
    }
}
