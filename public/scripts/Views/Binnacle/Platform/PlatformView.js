// @filename: PlatformView.ts
import { getEntitiesData } from "../../../Backend/Connection.js";
import { pagination } from "../../../Shared/Functions/Pagination.js";
import { AppContent, appTools } from "../../../Shared/Settings/Misc.settings.js";
import TableSettings from "../../../Shared/Settings/Table.settings.js";
import { renderPlatformData } from "./Render.js";
const tableRows = TableSettings.rows;
const currentPage = TableSettings.noPage;
const app = AppContent;
const tools = appTools;
export async function platformView() {
    // write application template
    app.innerHTML = `
    <h1 class="app_title">Accesos <span class="badge badge_title" id="data-count">Calculando...</span></h1>
    <table>
        <thead>
            <tr>
                <th>Usuario</th>
                <th>Dispositivo</th>
                <th>Plataforma</th>
                <th>Empresa</th>
                <th>Fecha</th>
                <th>Hora</th>
            </tr>
            <tbody id="table-body">
            </tbody>
    </table>

    <div class="pagination" style="display: none !important">
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
    let GET_DATA = await getEntitiesData("WebAccess");
    let arrayPlatform = GET_DATA;
    const dataCount = document.getElementById("data-count");
    dataCount.innerHTML = `${arrayPlatform.length} accesos`;
    await searchInput?.addEventListener("keyup", () => {
        const arrayData = arrayPlatform.filter((events) => `${events.user.username}
             ${events.userAgent}
             ${events.system.name}
             ${events.customer.name}`
            .toLowerCase()
            .includes(searchInput?.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows)
            filteredResult = tableRows;
        renderPlatformData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, renderPlatformData);
    });
    // render data
    await renderPlatformData(arrayPlatform, tableBody, tableRows, currentPage, paginationCounter);
    pagination(arrayPlatform, paginationCounter, tableRows, currentPage, tableBody, renderPlatformData);
}
