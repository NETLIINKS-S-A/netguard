// @filename: BusinessView.ts
import { UI } from "../../DOMElements";
import { getData } from "../../RequestOptions";
let tableRows = UI.tableRows; // number of rows to show on tables
let UIApp = UI.App;
export async function renderBusiness() {
    const url = "https://backend.netliinks.com:443/rest/entities/Customer?fetchPlan=full";
    let tableData = [];
    const search = document.querySelector("#spotlight");
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
                        <div class="rucInputs">
                            <label for="n1" class="form_label">RUC</label>
                            <input multiInput firstMultiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n1" id="n1">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n2">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n3">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n4">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n5">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n6">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n7">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n8">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n9">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n10">
                        </div>
                    </div>
                </form>

                <div class="modal_footer">
                    <button class="btn" id="closeEditor">Cancelar</button>
                    <button class="btn btn_success" id="updateData">Guardar</button>
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
                        <div class="rucInputs">
                            <label for="n1" class="form_label">RUC</label>
                            <input multiInput firstMultiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n1" id="n1">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n2">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n3">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n4">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n5">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n6">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n7">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n8">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n9">
                            <input multiInput type="text" maxlength="1" placeholder="0" class="input input_block" name="n10">
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
                <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="spotlight">
                <label class="btn btn_icon spotlight_label" for="spotlight"><i class="fa-solid fa-filter"></i></label>
            </div>
        </div>`;
    const tableBody = document.querySelector("#tableBody");
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
    await search?.addEventListener("keyup", () => {
        // @ts-ignore
        const filteredDatas = tableData.filter(filteredData => `${filteredData.name.toLowerCase()}`.includes(search.value.toLowerCase()));
        let filteredDataResult = filteredDatas.length;
        if (filteredDataResult >= tableRows)
            filteredDataResult = tableRows;
        displayFilteredItems(filteredDatas, tableBody, filteredDataResult, currentPage);
        setupPagination(filteredDatas, pagination, tableRows);
    });
    // const data = await getData(url);
    tableData = await getData(url);
    // pagination
    const pagination = document.getElementById("paginationCounter");
    let currentPage = 1;
    // Display data and pagination
    displayFilteredItems(tableData, tableBody, tableRows, currentPage);
    setupPagination(tableData, pagination, tableRows);
}
