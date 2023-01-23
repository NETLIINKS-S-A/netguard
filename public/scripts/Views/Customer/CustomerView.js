import { UI } from "../../Libs/lib.dom.js";
import { renderCustomerData } from "./CustomerRenderData.js";
// libs
import { getEntitiesData } from "../../Libs/lib.request.js";
import { pagination } from "../../Libs/lib.tools.js";
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

    <!-- =========================
                EDITOR
    ========================= -->
    <div class="modal" id="editBusiness">
        <div class="modal_dialog modal_body" style="max-width: 450px !important">
            <h2 class="modal_title">Editar <span id="entityName" class="modal_title-name"></span></h2>

            <form autocomplete="off" id="businessEditorForm">
                <div class="input_group">
                    <label for="businessName" class="form_label">Nombre</label>
                    <input class="input" id="businessName" placeholder="Nombre">
                </div>

                <div class="input_group">
                    <label class="form_label">RUC</label>
                    <input type="text" class="input" id="rucInputElement" maxlength="10">
                </div>

                <div class="form_group">
                    <div class="input_group customerStatus">
                        <label for="customerStatus" class="form_label">Estado: <span id="customerStatusLabel">inactivo</span></label>
                        <input type="checkbox" name="customerStatus" id="customerStatus" class="toggle">
                    </div>

                    <div class="input_group">
                        <label for="vehicularEntrance" class="form_label">Ingreso vehicular: <span id="customerVehicularEntranceLabel">no</span></label>
                        <input type="checkbox" name="vehicularEntrance" id="vehicularEntrance" class="toggle">
                    </div>
                </div>
            </form>

            <div class="modal_footer">
                <button class="btn" id="closeEditor">Cancelar</button>
                <button class="btn btn_success" id="updateCutomerEntity">Guardar</button>
            </div>
        </div>
    </div>

    <!-- =========================
        ADD NEW BUSINESS
    ========================= -->
    <div class="modal" id="addNewBusinessModal">
        <div class="modal_dialog modal_body" style="max-width: 450px !important">
            <h2 class="modal_title">Crear nueva empresa</h2>

            <form autocomplete="off" id="createBusinessForm">
                <div class="input_group">
                    <label for="businessName" class="form_label">Nombre</label>
                    <input class="input" id="businessName" placeholder="Nombre">
                </div>

                <div class="input_group">
                    <label class="form_label">RUC</label>
                    <input type="text" class="input" id="rucInputElement" maxlength="10">
                </div>

                <div class="form_group">
                    <div class="input_group customerStatus">
                        <label for="customerStatus" class="form_label">Estado: <span id="customerStatusLabel">inactivo</span></label>
                        <input type="checkbox" name="customerStatus" id="customerStatus" class="toggle">
                    </div>

                    <div class="input_group">
                        <label for="vehicularEntrance" class="form_label">Ingreso vehicular: <span id="customerVehicularEntranceLabel">no</span></label>
                        <input type="checkbox" name="vehicularEntrance" id="vehicularEntrance" class="toggle">
                    </div>
                </div>

            </form>

            <div class="modal_footer">
                <button class="btn" id="closeAddNewBusinessModal">Cancelar</button>
                <button class="btn btn_success" id="saveNewBusiness">Guardar</button>
            </div>
        </div>
    </div>`;
    // Add tools
    const toolbox = UIApp?.tools;
    toolbox.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="addNewBusiness"><i class="fa-solid fa-plus"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
        </div>
    </div>`;
    // HTML ELEMENTS
    const tableBody = document.querySelector("#tableBody");
    const searchInput = document.querySelector("#searcher");
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
        renderCustomerData(arrayData, tableBody, filteredResult, currentPage, paginationCounter);
        pagination(
        // @ts-ignore
        arrayData, paginationCounter, tableRows, currentPage, tableBody, renderCustomerData);
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
    renderCustomerData(arrayCustomers, tableBody, tableRows, currentPage, paginationCounter);
    pagination(arrayCustomers, paginationCounter, tableRows, currentPage, tableBody, renderCustomerData);
    // Customer Status
    const toggleStatus = document.getElementById("customerStatus");
    const customerStatusLabel = document.getElementById("customerStatusLabel");
    toggleStatus.addEventListener("click", () => {
        if (toggleStatus?.checked == true)
            customerStatusLabel.innerHTML = "activo";
        else
            customerStatusLabel.innerHTML = "inactivo";
    });
    // Vehicular Entrance
    const toggleVehicularEntrace = document.getElementById("vehicularEntrance");
    const customerVehicularEntranceLabel = document.getElementById("customerVehicularEntranceLabel");
    toggleVehicularEntrace.addEventListener("click", () => {
        if (toggleVehicularEntrace?.checked == true)
            customerVehicularEntranceLabel.innerHTML = "si";
        else
            customerVehicularEntranceLabel.innerHTML = "no";
    });
}
