// @filename: PlatformView.ts
import { UI } from "../../../Libs/lib.dom.js";
import { getEntitiesData } from "../../../Libs/lib.request.js";
import { setupPagination } from "../../../Libs/lib.tools.pagination.js";
import { renderAdministratorData } from "./AdministratorRenderData.js";
const tableRows = UI?.tableRows;
const UIApp = UI.App;
const app = UIApp?.content;
const appTools = UIApp?.tools;
const currentPage = 1;
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
    appTools.innerHTML = `
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
        setupPagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, renderAdministratorData);
    });
    // render data
    await renderAdministratorData(arrayAdministrators, tableBody, tableRows, currentPage, paginationCounter);
    setupPagination(arrayAdministrators, paginationCounter, tableRows, currentPage, tableBody, renderAdministratorData);
}
