// @filename: NotesView.ts

// Emitido
// Título
// Fecha
// Hora
// --- button ---
import { UI } from "../../../Libs/lib.dom.js"
import { pagination } from "../../../Libs/lib.tools.js"
import { renderNotesData } from "./Render.js"
import { UIControl } from "../../../Libs/lib.types.js"
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
                <th width="45px"></th>
            </tr>
        </thead>
        <tbody id="table-body"></tbody>
    </table>

    <div class="pagination">
        <div id="pagination-counter"></div>
    </div>`

    // write app tools
    appTools.innerHTML = `
    <div class="toolbox">
        <div class="select">
            <input type="text" id="input-select" class="input select_box" placeholder="cargando..." readonly>
            <div class="select_options" id="select_options">
            </div>
        </div>

        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-up-from-bracket"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="buscar" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
        </div>
    </div>`

    // get elements
    const tableBody: UIControl = document.querySelector("#table-body")
    const searchInput: UIControl = document.querySelector("#search-input")
    const paginationCounter: UIControl =
        document.getElementById("pagination-counter")

    // Table body template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn btn_table_info"><i class="fa-solid fa-list"></i></button></td>
    </tr>`.repeat(tableRows)

    let GET_DATA: any = await getEntitiesData("Note")
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

        pagination(
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

    pagination(
        arrayNotes,
        paginationCounter,
        tableRows,
        currentPage,
        tableBody,
        renderNotesData
    )
}
