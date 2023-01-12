// @filename: CustomerView.ts
import { UI } from "../../lib.dom.js";
import { getData } from "../../RequestOptions.js";
import { displayCustomerData } from "./CustomerRenderData.js";
import { setupPagination } from "../../lib.tools.pagination.js";
let tableRows = UI.tableRows; // number of rows to show on tables
let UIApp = UI.App;
export async function renderCustomers() {
    const url = "https://backend.netliinks.com:443/rest/entities/Customer?fetchPlan=full";
    let tableData = [];
    // BusinesView interface
    const appContent = UIApp?.content;
    appContent.innerHTML = `
        <h1 class="app_title">Empresas</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>RUC</th>
                    <th>Estado</th>
                    <th></th>
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
        </div>
        `;
    // Add tools
    const toolbox = UIApp?.tools;
    toolbox.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="addNewBusiness"><i class="fa-solid fa-plus"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="searcher">
            <label class="btn btn_icon spotlight_label" for="searcher"><i class="fa-solid fa-filter"></i></label>
        </div>
    </div>`;
    // HTML ELEMENTS
    const tableBody = document.querySelector("#tableBody");
    const searchElement = document.querySelector("#searcher");
    const paginationElement = document.getElementById("paginationCounter");
    let currentPage = 1;
    // search data on real-time
    await searchElement?.addEventListener("keyup", () => {
        // @ts-ignore
        const filteredDatas = tableData.filter(filteredData => `${filteredData.name.toLowerCase()}`.includes(searchElement.value.toLowerCase()));
        let filteredDataResult = filteredDatas.length;
        if (filteredDataResult >= tableRows)
            filteredDataResult = tableRows;
        displayCustomerData(filteredDatas, tableBody, filteredDataResult, currentPage, paginationElement);
    });
    // Table placeholder
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>

    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>

    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>`;
    // const data = await getData(url);
    tableData = await getData(url);
    // Display data and pagination
    displayCustomerData(tableData, tableBody, tableRows, currentPage, paginationElement);
    setupPagination(tableData, paginationElement, tableRows, currentPage, tableBody, displayCustomerData);
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
