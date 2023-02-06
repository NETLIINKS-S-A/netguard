// @filename: UsersView.ts
import { getEntitiesData } from "../../../Libs/lib.request.js";
import { UI } from "../../../Libs/lib.dom.js";
import { pagination } from "../../../Libs/lib.tools.js";
import { displayUserData } from "./Render.js";
const tableRows = UI.tableRows;
const UIApp = UI.App;
const app = UIApp?.content;
const appTools = UIApp?.tools;
let currentPage = 1;
export async function usersView() {
    let GET_DATA = await getEntitiesData("User");
    let notSuper = GET_DATA.filter((data) => data.isSuper === false);
    let arrayUsers = notSuper.filter((data) => `${data.userType}`.includes("CUSTOMER"));
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
            <input type="number" placeholder="${tableRows}" id="paginationLimiter" min="${tableRows}" max="30">
        </div>`;
    // Add tools
    appTools.innerHTML = `
        <div class="toolbox">
            <div class="select">
                <input type="text" id="input-select" class="input select_box" placeholder="cargando..." readonly>
                <div class="select_options" id="select_options">
                </div>
            </div>

            <button class="btn btn_icon" id="addNewClient"><i class="fa-solid fa-user-plus"></i></button>
            <button class="btn btn_icon" id="addNewClientAdmin"><i class="fa-solid fa-shield-plus"></i></button>
            <div class="toolbox_spotlight">
                <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
                <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
            </div>
        </div>`;
    // HTML ELEMENTS
    const tableBody = document.querySelector("#tableBody");
    const searchInput = document.querySelector("#searcher");
    const paginationCounter = document.getElementById("paginationCounter");
    // search data on real-time
    await searchInput?.addEventListener("keyup", () => {
        // @ts-ignore
        const arrayData = arrayUsers.filter((user) => `${user.firstName}
                                                    ${user.lastName}
                                                    ${user.description}`
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows)
            filteredResult = tableRows;
        displayUserData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, displayUserData);
    });
    // Table placeholder
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button class="btn"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`.repeat(tableRows);
    // Display data and pagination
    displayUserData(arrayUsers, tableBody, tableRows, currentPage, paginationCounter);
    // @ts-ignore
    pagination(arrayUsers, paginationCounter, tableRows, currentPage, tableBody, displayUserData);
}
