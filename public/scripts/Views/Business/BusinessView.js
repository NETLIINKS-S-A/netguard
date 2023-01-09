// @filename: BusinessView.ts
import { UI } from "../../DomElements.js";
import { closeBusinessEditor, openBusinessEditor, updateBusinessData } from "./BusinessEditor.js";
import { getData } from "../../RequestOptions.js";
let tableRows = UI.tableRows;
let UIApp = UI.App;
export async function renderBusiness() {
    const url = "https://backend.netliinks.com:443/rest/entities/Business?fetchPlan=full";
    const appContent = UIApp?.content;
    appContent.innerHTML = `
        <h1 class="app_title">Empresas</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>ID</th>
                    <th>Creado por</th>
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
            <div class="modal_dialog modal_body">
                <h2 class="modal_title">Editar <span id="entityName" class="modal_title-name"></span></h2>

                <form>
                    <div class="form_group">
                        <div class="input_group">
                            <label for="businessName" class="form_label">Nombre</label>
                            <input class="input" id="businessName" placeholder="Nombre">
                        </div>

                        <div class="input_group">
                            <label for="ruc" class="form_label">RUC</label>
                            <input type="number" class="input" id="ruc" placeholder="0321854965">
                        </div>
                    </div>

                    <br>

                    <div class="input-group">
                        <label for="estado" class="form_label">Estado</label>
                        <select>
                            <option value="">--Please choose an option--</option>
                            <option value="dog">Dog</option>
                        </select>
                    </div>
                </form>

                <div class="form-container" id="FormContainer">
                </div>

                <div class="modal_footer">
                    <button class="btn" id="closeEditor">Cerrar</button>
                    <button class="btn btn_primary" id="updateData">Guardar</button>
                </div>
            </div>
        </div>
        `;
    // Add tools
    const toolbox = UIApp?.tools;
    toolbox.innerHTML = `
        <div class="toolbox">
            <button class="btn btn_icon"><i class="fa-solid fa-arrow-rotate-right"></i></button>
            <button class="btn btn_icon"><i class="fa-solid fa-plus"></i></button>
            <div class="toolbox_spotlight">
                <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="spotlight">
                <label class="btn btn_icon spotlight_label" for="spotlight"><i class="fa-solid fa-filter"></i></label>
            </div>
        </div>`;
    let tableData = [];
    // async function getData() {
    //     const response : Response = await fetch(url, DTROptions)
    //     return await response.json()
    // }
    const search = document.querySelector("#spotlight");
    const tableBody = document.querySelector("#tableBody");
    search?.addEventListener("keyup", () => {
        // @ts-ignore
        const filteredDatas = tableData.filter(filteredData => `${filteredData.name}`.includes(search.value));
        let filteredDataResult = filteredDatas.length;
        displayFilteredItems(filteredDatas, tableBody, filteredDataResult, currentPage);
        setupPagination(filteredDatas, pagination, tableRows);
    });
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
        </tr>
    `;
    const data = await getData(url);
    tableData = data;
    // pagination
    const pagination = document.getElementById("paginationCounter");
    let currentPage = 1;
    function displayFilteredItems(items, wrapper, rowsPerPage, page) {
        wrapper.innerHTML = "";
        page--;
        let start = rowsPerPage * page;
        let end = start + rowsPerPage;
        let paginatedItems = items.slice(start, end);
        for (let i = 0; i < paginatedItems.length; i++) {
            let item = paginatedItems[i];
            let itemElement = document.createElement("tr");
            itemElement.innerHTML = `
                <tr>
                    <td id="businessNameItem">${item.name}</td>
                    <td>${item.id}</td>
                    <td>${item.createdBy}</td>
                    <td>
                        <button class="btn btn_table-editor" data-id="${item.id}">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                    </td>
                </tr>`;
            wrapper.appendChild(itemElement);
        }
        // Open editor
        const openEditorButtons = document.querySelectorAll("tr td button");
        openEditorButtons.forEach((openEditorButton) => {
            openEditorButton.addEventListener("click", () => {
                let entity = openEditorButton.dataset.id;
                openBusinessEditor(entity, url, "editBusiness");
            });
        });
        // CloseEditor
        const closeEditor = document.getElementById("closeEditor");
        closeEditor.addEventListener("click", () => closeBusinessEditor("editBusiness"));
        // updateData
        const updateData = document.getElementById("updateData");
        updateData.addEventListener("click", () => {
            updateBusinessData("editBusiness");
        });
    } // End displayFilteredItems
    // Pagination
    function setupPagination(items, wrapper, rowsPerPage) {
        wrapper.innerHTML = "";
        let pageCount = Math.ceil(items.length / rowsPerPage);
        for (let i = 1; i < pageCount + 1; i++) {
            let btn = paginationButton(i, items);
            wrapper.appendChild(btn);
        }
    }
    // Create and add pagination buttons
    function paginationButton(page, items) {
        let button = document.createElement("button");
        button.innerText = page;
        if (currentPage == page)
            button.classList.add("active");
        button.addEventListener("click", () => {
            currentPage = page;
            displayFilteredItems(items, tableBody, tableRows, currentPage);
            let currentButton = document.querySelector('pagination button.active');
            currentButton.classList.remove("active");
            button.classList.add("active");
        });
        return button;
    }
    displayFilteredItems(tableData, tableBody, tableRows, currentPage);
    setupPagination(tableData, pagination, tableRows);
}
