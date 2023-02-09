// @filename: CustomerView.ts
// Functions
import { displayCustomerData } from "./CustomerRender.js";
import { FNCustomers } from "./CustomerFunctions.js";
import { pagination } from "../../Shared/Functions/Pagination.js";
import { getEntitiesData } from "../../Backend/Connection.js";
import { AppContent, appTools } from "../../Shared/Settings/Misc.settings.js";
import TableSettings from "../../Shared/Settings/Table.settings.js";
// Primary elements
const limitRows = TableSettings.rows;
const currentPage = TableSettings.noPage;
const appToolbar = appTools;
const appContent = AppContent;
export async function customerView() {
    // GET BACKEND DATA
    let DATA = await getEntitiesData("Customer");
    console.log(DATA);
    let arrayCustomers = DATA;
    // Write application template
    appContent.innerHTML = `
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
        <tbody id="table-body">

        </tbody>
    </table>

    <div class="pagination">
        <div id="pagination"></div>
    </div>

    <div id="modal-content">
    </div>`;
    // Add tools
    appToolbar.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="new-customer"><i class="fa-solid fa-plus"></i></button>

        <div class="toolbox_spotlight">
            <label class="btn btn_icon spotlight_label" for="search-input">
                <i class="fa-solid fa-search"></i>
            </label>

            <input type="text"
                class="input
                input_spotlight"
                placeholder="Buscar por nombre"
                id="search-input">
        </div>
    </div>`;
    // HTML ELEMENTS
    const table = document.querySelector("#table-body");
    const pagination_ = document.getElementById("pagination");
    const addCustomer = document.getElementById("new-customer");
    // search data on real-time
    const searchInput = document.querySelector("#search-input");
    await searchInput?.addEventListener("keyup", () => {
        console.log(searchInput.value.toLowerCase());
        const arrayData = arrayCustomers.filter((customer) => `${customer.name}`
            .toLowerCase()
            .trim()
            .includes(searchInput.value.toLowerCase().trim()));
        let filteredResult = arrayData.length;
        if (filteredResult >= limitRows)
            filteredResult = limitRows;
        displayCustomerData(arrayData, table, filteredResult, currentPage, pagination_);
        pagination(arrayData, pagination_, limitRows, currentPage, table, displayCustomerData);
    });
    // render load on tables
    table.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>`.repeat(limitRows);
    // Display data and pagination
    displayCustomerData(arrayCustomers, table, limitRows, currentPage, pagination_);
    pagination(arrayCustomers, pagination_, limitRows, currentPage, table, displayCustomerData);
    // Add new customer
    addCustomer.addEventListener("click", () => {
        FNCustomers.new();
    });
}
