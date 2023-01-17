// @filename: NotesView.ts

// Emitido
// Título
// Fecha
// Hora
// --- button ---
import { UI } from "../../../Libs/lib.dom.js"
import { setupPagination } from "../../../Libs/lib.tools.pagination.js"
import { renderNotesData } from "./NotesRenderData.js"
import { UIElement } from "../../../Types/GeneralTypes.js"
import { getEntitiesData } from "../../../Libs/lib.request.js"

const tableRows: number = UI.tableRows
const UIApp = UI.App
const app = UIApp?.content
const appTools = UIApp?.tools
const currentPage: number = 1

export async function notesView(): Promise<void> {
    // write application template
    app.innerHTML = `
    <h1>Notas</h1>
    <table>
        <thead>
            <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Fecha</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="table-body"></tbody>
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
    const searchInput: UIElement = document.querySelector("#search-input")
    const paginationCounter: UIElement = document.getElementById("pagination-counter")

    // write table template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-magnifying-glass"></i></button></td>
    </tr>`.repeat(tableRows);

    let GET_DATA: any = await getEntitiesData('Note');
    console.log(GET_DATA)
    let arrayNotes: any = GET_DATA

    await searchInput?.addEventListener("keyup", (): void => {
        const arrayData = arrayNotes.filter((note: any) =>
            `${note.name}
             ${note.description}`
                .toLowerCase()
                .includes(searchInput?.value.toLowerCase())
        )

        let filteredResult = arrayData.length
        if (filteredResult >= tableRows) filteredResult = tableRows

        renderNotesData(
            arrayData,
            tableBody,
            filteredResult,
            currentPage,
            paginationCounter
        )

        setupPagination(
            arrayData,
            paginationCounter,
            tableRows,
            currentPage,
            tableBody,
            renderNotesData
        )
    })

    // render data
    await renderNotesData(
        arrayNotes,
        tableBody,
        tableRows,
        currentPage,
        paginationCounter
    )

    setupPagination(
        arrayNotes,
        paginationCounter,
        tableRows,
        currentPage,
        tableBody,
        renderNotesData
    )
}
