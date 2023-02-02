// @filename: EmergenctUserView.ts
import { getEntitiesData } from "../../../Libs/lib.request.js";
import { UI } from "../../../Libs/lib.dom.js";
import { pagination } from "../../../Libs/lib.tools.js";
import { renderEmergencyUserData } from "./Render.js";
const tableRows = UI.tableRows;
const UIApp = UI.App;
const app = UIApp?.content;
const appTools = UIApp?.tools;
const currentPage = 1;
export async function emergencyUserView() {
    let GET_DATA = await getEntitiesData("Contact");
    let arrayEmergencyUsers = GET_DATA;
    // write application template
    app.innerHTML = `<h1 class="app_title">Emergencia</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th width="45px"></th>
            </tr>
            <tbody id="table-body">
            </tbody>
    </table>

    <div class="pagination">
        <div id="pagination-counter"></div>
    </div>`;
    // write app tools
    appTools.innerHTML = `
    <div class="toolbox">
        <div class="select">
            <input type="text" id="input-select" class="input select_box" placeholder="cargando..." readonly>
            <div class="select_options" id="select_options">
            </div>
        </div>

        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-user-plus"></i></button>

        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
        </div>
    </div>`;
    // get elements
    const tableBody = document.querySelector("#table-body");
    const searchInput = document.querySelector("#search-input");
    const paginationCounter = document.getElementById("pagination-counter");
    // search data
    await searchInput?.addEventListener("keyup", () => {
        // @ts-ignore
        const arrayData = arrayEmergencyUsers.filter((emergencyUser) => `${emergencyUser.name}
             ${emergencyUser.phone}`
            .toLowerCase()
            .includes(searchInput?.value.toLowerCase()));
        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows)
            filteredResult = tableRows;
        renderEmergencyUserData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, renderEmergencyUserData);
    });
    // write table template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
    </tr>`.repeat(tableRows);
    // display data
    await renderEmergencyUserData(arrayEmergencyUsers, tableBody, tableRows, currentPage, paginationCounter);
    pagination(arrayEmergencyUsers, paginationCounter, tableRows, currentPage, tableBody, renderEmergencyUserData);
}
