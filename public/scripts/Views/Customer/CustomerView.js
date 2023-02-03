import { UI } from "../../Libs/lib.dom.js";
import { getEntitiesData } from "../../Libs/lib.request.js";
import { pagination } from "../../Libs/lib.tools.js";
import { CFN } from "./Functions.js";
import { renderTableData } from "./Render.js";
import { settings } from "../../Libs/lib.settings.js";
const rows = settings.limitRows;
const UIApp = UI.App;
const app = UIApp?.content;
const Toolbar = UIApp?.tools;
let currentPage = 1;
export async function customerView() {
    // Write application template
    app.innerHTML = `
    <h1 class="app_title">Empresas</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>RUC</th>
                <th>Estado</th>
                <th width="45px"></th>
            </tr>
        </thead>
        <tbody id="tableBody">

        </tbody>
    </table>

    <div class="pagination">
        <div id="paginationCounter"></div>
    </div>

    <div id="modal-content">
    </div>`;
    // Add tools
    const toolbar = Toolbar;
    toolbar.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="new-customer"><i class="fa-solid fa-plus"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
        </div>
    </div>`;
    // GET BACKEND DATA
    let GET_DATA = await getEntitiesData("Customer");
    let arrayCustomers = GET_DATA; // filter in the future
    // EX:
    // arrayCustomers.filter(value).include(value)
    const modal = document.getElementById("modal-content");
    const newCustomer = document.getElementById("new-customer");
    newCustomer?.addEventListener("click", () => {
        CFN.newCustomer(modal);
    });
    // HTML ELEMENTS
    const table = document.querySelector("#tableBody");
    const paginationCounter = document.getElementById("paginationCounter");
    // search data on real-time
    const SEARCH = document.querySelector("#search-input");
    await SEARCH?.addEventListener("keyup", () => {
        const arrayData = arrayCustomers.filter((customer) => 
        // @ts-ignore
        `${customer.name.toLowerCase()}`.includes(SEARCH.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= rows)
            filteredResult = rows;
        // render data
        renderTableData(arrayData, table, filteredResult, currentPage);
        // render pagination
        pagination(arrayData, paginationCounter, rows, currentPage, table, renderTableData);
    });
    // render load on tables
    table.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>`.repeat(rows);
    // Display data and pagination
    renderTableData(arrayCustomers, table, rows, currentPage);
    pagination(arrayCustomers, paginationCounter, rows, currentPage, table, renderTableData);
    // Edit Customer
    const editButtons = document.querySelectorAll(".btn_table-editor");
    editButtons.forEach((editButton) => {
        editButton.addEventListener("click", () => {
            let entity = editButton.dataset.id;
            console.log(editButton, entity);
            CFN.editCustomer(modal, entity);
        });
    });
}
