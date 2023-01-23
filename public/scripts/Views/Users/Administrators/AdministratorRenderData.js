// @filename: AdministratorRenderData.ts
import { $color, $font } from "../../../Libs/lib.tools.js";
export async function renderAdministratorData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = " ";
    page--;
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let arrayEvents = await items.slice(start, end);
    let index;
    for (index = 0; index < arrayEvents.length; index++) {
        let administrator = arrayEvents[index];
        let row = document.createElement("tr");
        row.innerHTML = `
        <tr>
            <td>${administrator?.firstName} ${administrator?.lastName}</td>
            <td>${administrator?.email}</td>
            <td class="table_badge user_status"><i>${administrator?.state.name}</i></td>
            <td class="citadels">${administrator?.citadel.description}</td>
            <td class="table_badge table_badge_usertype"><i>${administrator.userType}</i></td>

            <td><button class="btn btn_table-editor"><i class="fa-solid fa-arrows-rotate"></i></button></td>
        </tr>
        `;
        tableBody.appendChild(row);
        // fix states
        const states = document.querySelectorAll(".user_status i");
        states?.forEach((state) => {
            if (state.innerText === "Enabled") {
                state.classList.add("user_active");
                state.innerText = "Activo";
            }
            else if (state.innerText === "Disabled") {
                state.classList.add("user_inactive");
                state.innerText = "Inactivo";
            }
        });
        // Fix citadels
        const citadels = document.querySelectorAll(".citadels");
        citadels?.forEach((citadel) => {
            citadel.style.fontSize = $font.size.mid;
            citadel.style.fontWeight = $font.weigth.bold;
            citadel.style.textTransform = $font.cap.uppercase;
            citadel.style.color = $color.blue.b400;
            if (citadel.innerText === "NO APLICA" ||
                citadel.innerText === "No Aplica" ||
                citadel.innerText === "N/A") {
                citadel.style.color = $color.slategray.s500;
            }
        });
    }
}
