// @filename: CitadelsView.ts
import { getEntitiesData } from "../../Backend/Connection.js";
import { pagination } from "../../Shared/Functions/Pagination.js";
import { AppContent, appTools } from "../../Shared/Settings/Misc.js";
import { tableSettings } from "../../Shared/Settings/Table.js";
import { renderCitadelData } from "./Render.js";
const tableRows = tableSettings.Rows;
const currentPage = tableSettings.paginationPage;
const app = AppContent;
const tools = appTools;
export async function citadelsView() {
    // write application template
    app.innerHTML = `
    <h1>Ciudadelas</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Descrición</th>
                <th width="45px"></th>
                <th width="45px"></th>
            </tr>
        </thead>
        <tbody id="table-body"></tbody>
    </table>

    <div class="pagination">
        <div id="pagination-counter"></div>
    </div>`;
    // write app tools
    tools.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-add"></i></button>
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
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button class="btn"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`.repeat(tableRows);
    let GET_DATA = await getEntitiesData("Citadel");
    let arrayCitadels = GET_DATA;
    await searchInput?.addEventListener("keyup", () => {
        const arrayData = arrayCitadels.filter((citadel) => `${citadel.name}
             ${citadel.description}`
            .toLowerCase()
            .includes(searchInput?.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows)
            filteredResult = tableRows;
        renderCitadelData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, renderCitadelData);
    });
    // render data
    await renderCitadelData(arrayCitadels, tableBody, tableRows, currentPage, paginationCounter);
    pagination(arrayCitadels, paginationCounter, tableRows, currentPage, tableBody, renderCitadelData);
}
