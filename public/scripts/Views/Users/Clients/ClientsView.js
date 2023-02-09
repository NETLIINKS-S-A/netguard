// @filename: UsersView.ts
import { getEntitiesData } from "../../../Backend/Connection.js";
import { pagination } from "../../../Shared/Functions/Pagination.js";
import { displayUserData } from "./ClientsRender.js";
import { FNClients } from "./ClientsFunctions.js";
import { AppContent, appTools } from "../../../Shared/Settings/Misc.settings.js";
import { tableSettings } from "../../../Shared/Settings/Table.settings.js";
import { select } from "../../../Shared/Functions/InputSelect.js";
// Page settings
const LIMIT_ROWS = tableSettings.rows; // 25 (default)
const currentPage = tableSettings.noPage; // 1 (default)
// DOM Elements
const app = AppContent;
const tools = appTools;
export async function clientsView() {
    let GET_DATA = await getEntitiesData("User");
    let notSuper = GET_DATA.filter((data) => data.isSuper === false);
    let arrayUsers = notSuper.filter((data) => `${data.userType}`.includes("CUSTOMER"));
    const CUSTOMER_DATA = await getEntitiesData("Customer");
    let customers = []; // data goes here
    CUSTOMER_DATA.forEach((data) => {
        customers.push(data.name);
    });
    // BusinesView interface
    app.innerHTML = `
        <h1 class="app_title">Clientes</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>ID</th>
                    <th>Estado</th>
                    <th>Ciudadela</th>
                    <th width="45px"></th>
                    <th width="45px"></th>
                </tr>
            </thead>
            <tbody id="tableBody">

            </tbody>
        </table>

        <div class="pagination">
            <div id="paginationCounter"></div>
        </div>`;
    // Add tools
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

            <button class="btn btn_icon" id="add-new-client"><i class="fa-solid fa-user-plus"></i></button>

            <button class="btn btn_icon" id="addNewClientAdmin"><i class="fa-solid fa-shield-plus"></i></button>

            <div class="toolbox_spotlight">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            </div>
        </div>`;
    // HTML ELEMENTS
    const inputSelect = document.querySelector(".select");
    inputSelect?.addEventListener("click", () => {
        inputSelect.classList.toggle("select_active");
    });
    select(inputSelect, customers);
    const tableBody = document.querySelector("#tableBody");
    const searchInput = document.querySelector("#search-input");
    const paginationCounter = document.getElementById("paginationCounter");
    // search data on real-time
    await searchInput?.addEventListener("keyup", () => {
        const arrayData = arrayUsers.filter((user) => `${user.firstName}
             ${user.lastName}
             ${user.description}`
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= LIMIT_ROWS)
            filteredResult = LIMIT_ROWS;
        displayUserData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(arrayData, paginationCounter, LIMIT_ROWS, currentPage, tableBody, displayUserData);
    });
    // Table placeholder
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button class="btn"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`.repeat(LIMIT_ROWS);
    // Display data and pagination
    displayUserData(arrayUsers, tableBody, LIMIT_ROWS, currentPage, paginationCounter);
    pagination(arrayUsers, paginationCounter, LIMIT_ROWS, currentPage, tableBody, displayUserData);
    // add New client
    const addNewUserButton = document.getElementById("add-new-client");
    addNewUserButton.addEventListener("click", () => {
        FNClients.new_();
    });
}
