export async function renderPlatformData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayPlatform = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayPlatform.length; index++) {
        let access = arrayPlatform[index];
        let row = document.createElement('tr');
        const windowsDevice = access.userAgent.includes("Windows NT");
        const linuxDevice = access.userAgent.includes("Linux x86_64");
        const macOsDevice = access.userAgent.includes("Macintosh");
        const androidDevice = access.userAgent.includes("Android");
        const iOSDevice = access.userAgent.includes("iPhone OS");
        if (windowsDevice) {
            access.userAgent = `<i class="fa-brands fa-windows"></i> Microsoft Windows`;
        }
        else if (macOsDevice) {
            access.userAgent = `<i class="fa-brands fa-apple"></i> Apple macOS`;
        }
        else if (androidDevice) {
            access.userAgent = `<i class="fa-brands fa-android"></i> Android`;
        }
        else if (linuxDevice) {
            access.userAgent = `<i class="fa-brands fa-linux"></i> Linux`;
        }
        else if (iOSDevice) {
            access.userAgent = `<i class="fa-brands fa-apple"></i> Apple iOS`;
        }
        row.innerHTML = `
        <tr>
            <td>${access.user.username}</td>
            <td>${access.userAgent}</td>
            <td>${access.system.name}</td>
            <td>${access.customer.name}</td>
            <td>${access.creationDate}</td>
            <td>${access.creationTime}</td>
        </tr>
        `;
        tableBody.appendChild(row);
    }
}
