// @filename: GuardsView.ts

// Functions
import { displayGuardsData } from "./GuardsRender.js"
import { FNGuards } from "./GuardsFunctions.js"

// Libs
import { UI as DOM } from "../../../Libs/lib.dom.js"
import { NLData, UIControl } from "../../../Libs/lib.types.js"
import { getEntitiesData } from "../../../Libs/lib.request.js"
import { settings } from "../../../Libs/lib.settings.js"
import { pagination } from "../../../Libs/lib.tools.js"

// Primary elements
const limitRows: number = settings.limitRows
const currentPage: number = settings.currentPaginationPage
const AppDOM: any = DOM?.App
const appToolbar = AppDOM?.tools
const appContent = AppDOM?.content

export async function guardsView() {
    const BACKEND_DATA: NLData = await getEntitiesData("User")
    let arrayGuards: any = BACKEND_DATA.filter((data: any) => data.isSuper === false)
    arrayGuards.filter((data: any) => `${data.userType}`.includes("GUARD"))

    // Write application template
    appContent.innerHTML = `
    <h1 class="app_title">Guardias</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Estado</th>
                <th>Ciudadela</th>
                <th>Teléfono</th>
                <th width="45px"></th>
                <th width="45px"></th>
            </tr>
        </thead>
        <tbody id="table-body">

        </tbody>
    </table>

    <div class="pagination">
        <div id="pagination"></div>
    </div>`

    // write appTools
    appToolbar.innerHTML = `
    <div class="toolbox">
        <div class="select filter">
            <input type="text"
                id="input-select"
                class="input select_box"
                placeholder="cargando..."
                readonly>

            <div class="select_options" id="select_options">
            </div>
        </div>

        <button class="btn btn_icon" id="addNewBusiness">
            <i class="fa-solid fa-user-plus"></i>
        </button>

        <button class="btn btn_icon" id="addNewBusinessAdmin">
            <i class="fa-solid fa-shield-plus"></i>
        </button>

        <div class="toolbox_spotlight">
            <input type="text"
                class="input input_spotlight"
                placeholder="Buscar por nombre"
                id="search-input">

            <label class="btn btn_icon spotlight_label"
                for="search-input">
                <i class="fa-solid fa-search"></i>
            </label>
        </div>
    </div>`

    // get rendered elements
    const tableBody: UIControl =
        document.getElementById("table-body")

    const searchInput: UIControl =
        document.querySelector("#search-input")

    const pagination_: UIControl =
        document.getElementById("pagination")

    const select: UIControl = document.querySelector(".select")
    const selectInput: UIControl = document.getElementById("input-select")
    const selectOptionsContainer: UIControl =
        document.querySelector(".select_options")

    // search data
    await searchInput?.addEventListener("keyup", (): void => {
        // @ts-ignore
        const arrayData = arrayGuardsFilteredByCustomer.filter((guard) =>
            `${guard.firstName}
             ${guard.lastName}
             ${guard.description}`
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        )

        let filteredResult = arrayData.length
        if (filteredResult >= limitRows) filteredResult = limitRows

        displayGuardsData(
            arrayData,
            tableBody,
            filteredResult,
            currentPage,
            pagination_
        )
        pagination(
            arrayData,
            pagination_,
            limitRows,
            currentPage,
            tableBody,
            displayGuardsData
        )
    })

    // write table template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button class="btn"><i class="fa-solid fa-trash"></i></button></td>
    </tr>
    `.repeat(limitRows)

    displayGuardsData(
        arrayGuards,
        tableBody,
        limitRows,
        currentPage,
        pagination_
    )

    pagination(
        arrayGuards,
        pagination_,
        limitRows,
        currentPage,
        tableBody,
        displayGuardsData
    )
}
