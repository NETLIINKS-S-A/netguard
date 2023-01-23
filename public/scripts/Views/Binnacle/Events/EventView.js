// @filename: EventView.ts
import { UI } from "../../../Libs/lib.dom.js";
import { getEntitiesData } from "../../../Libs/lib.request.js";
import { pagination } from "../../../Libs/lib.tools.js";
import { renderEventData } from "./EventRenderData.js";
const tableRows = UI.tableRows;
const UIApp = UI.App;
const app = UIApp?.content;
const appTools = UIApp?.tools;
const currentPage = 1;
export async function eventView() {
    // write application template
    app.innerHTML = `
    <h1 class="app_title">Eventos <span class="badge badge_title" id="data-count">Calculando...</span></h1>
    <table>
        <thead>
            <tr>
                <th>Usuario</th>
                <th>Notificación</th>
                <th>Fecha</th>
                <th>Hora</th>
            </tr>
            <tbody id="table-body">
            </tbody>
    </table>

    <div class="pagination" >
        <div id="pagination-counter"></div>
    </div>`;
    // write app tools
    appTools.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-up-from-bracket"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="buscar" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-filter"></i></label>
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
    </tr>`.repeat(tableRows);
    let GET_DATA = await getEntitiesData("Notification");
    let arrayEvents = GET_DATA;
    const dataCount = document.getElementById("data-count");
    dataCount.innerHTML = `${arrayEvents.length} eventos`;
    await searchInput?.addEventListener("keyup", () => {
        const arrayData = arrayEvents.filter((events) => `${events.user.firstName}
             ${events.user.lastName}
             ${events.description}`
            .toLowerCase()
            .includes(searchInput?.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows)
            filteredResult = tableRows;
        renderEventData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, renderEventData);
    });
    // render data
    await renderEventData(arrayEvents, tableBody, tableRows, currentPage, paginationCounter);
    pagination(arrayEvents, paginationCounter, tableRows, currentPage, tableBody, renderEventData);
}
