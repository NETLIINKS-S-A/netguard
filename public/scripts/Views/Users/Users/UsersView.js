// @filename: UsersView.ts
import { getEntitiesData } from '../../../Libs/lib.request.js';
import { UI } from '../../../Libs/lib.dom.js';
import { setupPagination } from '../../../Libs/lib.tools.pagination.js';
import { displayUserData } from './UsersRenderData.js';
const tableRows = UI.tableRows;
const UIApp = UI.App;
const app = UIApp?.content;
const appTools = UIApp?.tools;
let currentPage = 1;
export async function usersView() {
    let GET_DATA = await getEntitiesData('User');
    let notSuper = GET_DATA
        .filter((data) => data.isSuper === false);
    let arrayUsers = notSuper
        .filter((data) => `${data.userType}`.includes('CUSTOMER'));
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
                <th></th>
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
    appTools.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="addNewBusiness"><i class="fa-solid fa-plus"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="searcher">
            <label class="btn btn_icon spotlight_label" for="searcher"><i class="fa-solid fa-filter"></i></label>
        </div>
    </div>`;
    // HTML ELEMENTS
    const tableBody = document.querySelector('#tableBody');
    const searchInput = document.querySelector('#searcher');
    const paginationCounter = document.getElementById('paginationCounter');
    // search data on real-time
    await searchInput?.addEventListener('keyup', () => {
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
        setupPagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, displayUserData);
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
    setupPagination(arrayUsers, paginationCounter, tableRows, currentPage, tableBody, displayUserData);
    // Customer Status
    const toggleStatus = document.getElementById('customerStatus');
    const customerStatusLabel = document.getElementById('customerStatusLabel');
    toggleStatus.addEventListener('click', () => {
        if (toggleStatus?.checked == true)
            customerStatusLabel.innerHTML = 'activo';
        else
            customerStatusLabel.innerHTML = 'inactivo';
    });
    // Vehicular Entrance
    const toggleVehicularEntrace = document.getElementById('vehicularEntrance');
    const customerVehicularEntranceLabel = document.getElementById('customerVehicularEntranceLabel');
    toggleVehicularEntrace.addEventListener('click', () => {
        if (toggleVehicularEntrace?.checked == true)
            customerVehicularEntranceLabel.innerHTML = 'si';
        else
            customerVehicularEntranceLabel.innerHTML = 'no';
    });
    console.log(arrayUsers);
}
