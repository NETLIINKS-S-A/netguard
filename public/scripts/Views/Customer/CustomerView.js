import { UI } from "../../Libs/lib.dom.js";
import { getEntitiesData } from "../../Libs/lib.request.js";
import { pagination } from "../../Libs/lib.tools.js";
import { CFN } from "./Functions.js";
import { renderTableData } from "./Render.js";
const tableRows = UI.tableRows; // number of rows to show on tables
const UIApp = UI.App;
const app = UIApp?.content;
const appTools = UIApp?.tools;
let currentPage = 1;
export async function customerView() {
    // @ts-ignore
    let GET_DATA = await getEntitiesData("Customer");
    let arrayCustomers = GET_DATA;
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
        <input type="number" placeholder="${tableRows}" id="paginationLimiter" min="${tableRows}" max="30">
    </div>

    <div id="modal-content">
    </div>`;
    // Add tools
    const toolbox = UIApp?.tools;
    toolbox.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="add-new"><i class="fa-solid fa-plus"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
        </div>
    </div>`;
    const modal = document.getElementById("modal-content");
    const addNew = document.getElementById("add-new");
    addNew?.addEventListener("click", () => {
        CFN.newCustomer(modal);
    });
    // HTML ELEMENTS
    const tableBody = document.querySelector("#tableBody");
    const searchInput = document.querySelector("#search-input");
    const paginationCounter = document.getElementById("paginationCounter");
    let currentPage = 1;
    // search data on real-time
    await searchInput?.addEventListener("keyup", () => {
        const arrayData = arrayCustomers.filter((customer) => 
        // @ts-ignore
        `${customer.name.toLowerCase()}`.includes(searchInput.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows)
            filteredResult = tableRows;
        // display table data and pagination when
        // find results
        renderTableData(arrayData, tableBody, filteredResult, currentPage);
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, renderTableData);
    });
    // Table placeholder
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>`.repeat(tableRows);
    // Display data and pagination
    renderTableData(arrayCustomers, tableBody, tableRows, currentPage);
    pagination(arrayCustomers, paginationCounter, tableRows, currentPage, tableBody, renderTableData);
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
