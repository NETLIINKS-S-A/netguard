export async function renderCitadelData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = "";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayCitadels = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayCitadels.length; index++) {
        let citadel = arrayCitadels[index];
        let row = document.createElement("tr");
        row.innerHTML = `
        <tr>
            <td>${citadel.name}</td>
            <td class="citadels"><i>${citadel.description}</i></td>
            <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button class="btn btn_table-delete"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
        tableBody.appendChild(row);
        // Fix citadels
        const citadels = document.querySelectorAll(".citadels i");
        citadels?.forEach((citadel) => {
            if (citadel.innerText === "NO APLICA") {
                citadel.innerText = "no aplica";
            }
            else if (citadel.innerText === "No Aplica") {
                citadel.innerText = "no aplica";
            }
            else if (citadel.innerText === "N/A") {
                citadel.innerText = "ninguno";
            }
            else if (citadel.innerText === "UNDEFINED") {
                citadel.innerText = "•••";
            }
            else if (citadel.innerText != "no aplica" && citadel.innerText != "NINGUNO" && citadel.innerText != "•••") {
                citadel.classList.add("b");
            }
        });
    }
}
