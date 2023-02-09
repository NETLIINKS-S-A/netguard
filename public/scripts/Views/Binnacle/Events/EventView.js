// @filename: EventView.ts
import { getEntitiesData } from "../../../Backend/Connection.js";
import { pagination } from "../../../Shared/Functions/Pagination.js";
import { AppContent, appTools } from "../../../Shared/Settings/Misc.settings.js";
import { renderEventData } from "./Render.js";
import { select } from "../../../Shared/Functions/InputSelect.js";
import { tableSettings } from "../../../Shared/Settings/Table.settings.js";
const tableRows = tableSettings.rows;
const currentPage = tableSettings.noPage;
const app = AppContent;
const tools = appTools;
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
    tools.innerHTML = `
    <div class="toolbox">
        <div class="select filter" id="select">
            <input type="text"
                class="input select_box"
                id="input"
                placeholder="Dropdown Menu"
                readonly>

                <div class="select_options" id="select_options"><div></div></div>
        </div>
        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-up-from-bracket"></i></button>
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
    </tr>`.repeat(tableRows);
    let GET_DATA = await getEntitiesData("Notification");
    let arrayEvents = GET_DATA;
    const CUSTOMER_DATA = await getEntitiesData("Customer");
    let customers = []; // data goes here
    CUSTOMER_DATA.forEach((data) => {
        customers.push(data.name);
    });
    const inputSelect = document.querySelector(".select");
    inputSelect?.addEventListener("click", () => {
        inputSelect.classList.toggle("select_active");
    });
    select(inputSelect, customers);
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
