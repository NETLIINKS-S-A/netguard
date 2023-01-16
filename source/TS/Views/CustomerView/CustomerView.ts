// @filename: CustomerView.ts
import { UIElement } from '../../Types/GeneralTypes.js';
import { UI } from '../../lib.dom.js';
import { displayCustomerData } from './CustomerRenderData.js';
import { setupPagination } from '../../lib.tools.pagination.js';
import { getEntitiesData } from '../../RequestOptions.js';

const tableRows: number = UI.tableRows; // number of rows to show on tables
const UIApp: UIElement = UI.App;
const app: UIElement = UIApp?.content;
const appTools: UIElement = UIApp?.tools;
let currentPage: number = 1;

export async function renderCustomers() {
    // @ts-ignore
    let GET_DATA: [] = await getEntitiesData('Customer');
    let arrayCustomers: [] = GET_DATA;

    // Write application template
    app.innerHTML = `
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
    </div>`;

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
    const tableBody: UIElement = document.querySelector('#tableBody');
    const searchInput: UIElement = document.querySelector('#searcher');
    const paginationCounter: UIElement =
        document.getElementById('paginationCounter');
    let currentPage: number = 1;

    // search data on real-time
    await searchInput?.addEventListener('keyup', (): void => {
        // @ts-ignore
        const arrayData = arrayCustomers.filter((customer) =>
            `${customer.name.toLowerCase()}`.includes(
                searchInput.value.toLowerCase()
            )
        );

        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows) filteredResult = tableRows;

        displayCustomerData(
            arrayData,
            tableBody,
            filteredResult,
            currentPage,
            paginationCounter
        );
        // @ts-ignore
        setupPagination(
            arrayData,
            paginationCounter,
            tableRows,
            currentPage,
            tableBody,
            displayCustomerData
        );
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
    displayCustomerData(
        arrayCustomers,
        tableBody,
        tableRows,
        currentPage,
        paginationCounter
    );
    setupPagination(
        arrayCustomers,
        paginationCounter,
        tableRows,
        currentPage,
        tableBody,
        displayCustomerData
    );

    // Customer Status
    const toggleStatus: UIElement = document.getElementById('customerStatus');
    const customerStatusLabel: UIElement = document.getElementById(
        'customerStatusLabel'
    );

    toggleStatus.addEventListener('click', () => {
        if (toggleStatus?.checked == true)
            customerStatusLabel.innerHTML = 'activo';
        else customerStatusLabel.innerHTML = 'inactivo';
    });

    // Vehicular Entrance
    const toggleVehicularEntrace: UIElement =
        document.getElementById('vehicularEntrance');
    const customerVehicularEntranceLabel: UIElement = document.getElementById(
        'customerVehicularEntranceLabel'
    );
    toggleVehicularEntrace.addEventListener('click', () => {
        if (toggleVehicularEntrace?.checked == true)
            customerVehicularEntranceLabel.innerHTML = 'si';
        else customerVehicularEntranceLabel.innerHTML = 'no';
    });
}
