// @filename: PlatformView.ts
import { UI } from '../../../Libs/lib.dom.js';
import { getEntitiesData } from '../../../Libs/lib.request.js';
import { setupPagination } from '../../../Libs/lib.tools.pagination.js';
import { UIElement } from '../../../Types/GeneralTypes.js';
import { renderAdministratorData } from './AdministratorRenderData.js';

const tableRows: number = 22;
const UIApp = UI.App;
const app = UIApp?.content;
const appTools = UIApp?.tools;
const currentPage: number = 1;

export async function administratorsView(): Promise<void> {
    // write application template
    app.innerHTML = `<h1 class="app_title">Administradores</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Estado</th>
                <th>Ciudadela</th>
                <th></th>
                <th></th>
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
        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-up-from-bracket"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="buscar" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-filter"></i></label>
        </div>
    </div>`;

    // get elements
    const tableBody: UIElement = document.querySelector('#table-body');
    const searchInput: UIElement = document.querySelector('#search-input');
    const paginationCounter: UIElement =
        document.getElementById('pagination-counter');

    // write table template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>`.repeat(tableRows);

    let GET_DATA: any = await getEntitiesData('User');
    let arrayAdministrators: any = GET_DATA
        .filter((data: any) => data.isSuper === true)
    console.log(arrayAdministrators)

    await searchInput?.addEventListener('keyup', (): void => {
        const arrayData = arrayAdministrators.filter((administrator: any) =>
            `${administrator.firstName}
             ${administrator.lastName}
             ${administrator.description}`
                .toLowerCase()
                .includes(searchInput?.value.toLowerCase())
        );

        let filteredResult = arrayData.length;
        if (filteredResult >= tableRows) filteredResult = tableRows;

        renderAdministratorData(
            arrayData,
            tableBody,
            filteredResult,
            currentPage,
            paginationCounter
        );

        setupPagination(
            arrayData,
            paginationCounter,
            tableRows,
            currentPage,
            tableBody,
            renderAdministratorData
        );
    });

    // render data
    await renderAdministratorData(
        arrayAdministrators,
        tableBody,
        tableRows,
        currentPage,
        paginationCounter
    );

    setupPagination(
        arrayAdministrators,
        paginationCounter,
        tableRows,
        currentPage,
        tableBody,
        renderAdministratorData
    );
}
