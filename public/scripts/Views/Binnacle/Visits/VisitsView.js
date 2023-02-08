// @filename: VisitsView.ts
import { pagination } from "../../../Shared/Functions/Pagination.js";
import { VisitsControllers } from "./Render.js";
import { getEntitiesData } from "../../../Backend/Connection.js";
import { tableSettings } from "../../../Shared/Settings/Table.js";
import { AppContent, appTools } from "../../../Shared/Settings/Misc.js";
const tableRows = tableSettings.Rows;
const currentPage = tableSettings.paginationPage;
const app = AppContent;
const tools = appTools;
export async function visitsView() {
    // write application template
    app.innerHTML = `
    <h1>Visitas</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>CI</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Generado por</th>
                <th width="45px"></th>
            </tr>
        </thead>
        <tbody id="table-body"></tbody>
    </table>

    <div class="pagination" style="display: none !important">
        <div id="pagination-counter"></div>
    </div>

    <div id="modal-container"></div>
    `;
    // write app tools
    tools.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-up-from-bracket"></i></button>
        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-trash"></i></button>
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
        <td><button class="btn btn_table_info"><i class="fa-solid fa-list"></i></button></td>
    </tr>`.repeat(tableRows);
    let GET_DATA = await getEntitiesData("Visit");
    let arrayVisits = GET_DATA;
    await searchInput?.addEventListener("keyup", () => {
        const arrayData = arrayVisits.filter((visit) => `${visit.name}
             ${visit.description}`
            .toLowerCase()
            .includes(searchInput?.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows)
            filteredResult = tableRows;
        VisitsControllers.render(arrayData, tableBody, filteredResult, currentPage);
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, VisitsControllers.render);
    });
    // render data
    await VisitsControllers.render(arrayVisits, tableBody, tableRows, currentPage);
    pagination(arrayVisits, paginationCounter, tableRows, currentPage, tableBody, VisitsControllers.render);
    const showDetailButtons = document.querySelectorAll(".btn_table_info");
    console.log(showDetailButtons);
    VisitsControllers.showInfo(showDetailButtons);
}
