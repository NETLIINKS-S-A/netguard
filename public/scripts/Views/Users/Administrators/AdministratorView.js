// @filename: PlatformView.ts
import { getEntitiesData } from "../../../Backend/Connection.js";
import { pagination } from "../../../Shared/Functions/Pagination.js";
import { AppContent, appTools } from "../../../Shared/Settings/Misc.settings.js";
import { renderAdministratorData } from "./Render.js";
import { tableSettings } from "../../../Shared/Settings/Table.settings.js";
const tableRows = tableSettings.rows;
const currentPage = tableSettings.noPage;
const tools = appTools;
const app = AppContent;
export async function administratorsView() {
    // write application template
    app.innerHTML = `<h1 class="app_title">Administradores</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Estado</th>
                <th>Ciudadela</th>
                <th>Tipo</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="table-body">
        </tbody>
    </table>

    <div class="pagination">
        <div id="pagination-counter"></div>
    </div>`;
    // write app tools
    tools.innerHTML = `
    <div class="toolbox">
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="buscar" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
        </div>
    </div>`;
    // get elements
    const tableBody = document.querySelector("#table-body");
    const searchInput = document.querySelector("#search-input");
    const paginationCounter = document.getElementById("pagination-counter");
    // write table template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>`.repeat(tableRows);
    let GET_DATA = await getEntitiesData("User");
    let arrayAdministrators = GET_DATA.filter((data) => data.isSuper === true);
    console.log(arrayAdministrators);
    await searchInput?.addEventListener("keyup", () => {
        const arrayData = arrayAdministrators.filter((administrator) => `${administrator.firstName}
             ${administrator.lastName}
             ${administrator.description}`
            .toLowerCase()
            .includes(searchInput?.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows)
            filteredResult = tableRows;
        renderAdministratorData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, renderAdministratorData);
    });
    // render data
    await renderAdministratorData(arrayAdministrators, tableBody, tableRows, currentPage, paginationCounter);
    pagination(arrayAdministrators, paginationCounter, tableRows, currentPage, tableBody, renderAdministratorData);
}
