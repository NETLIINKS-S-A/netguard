// @filename: GuardsView.ts

// Functions
import { displayGuardsData } from "./GuardsRender.js"
import { FNGuards } from "./GuardsFunctions.js"

// Libs
import { BackendValues, NLData, UIControl } from "../../../Shared/Libs/lib.types.g.js"
import { pagination } from "../../../Shared/Functions/Pagination.js"
import { AppContent, appTools } from "../../../Shared/Settings/Misc.settings.js"
// import { tableSettings } from "../../../Shared/Settings/Table.settings"
import { getEntitiesData } from "../../../Backend/Connection.js"
import { tableSettings } from "../../../Shared/Settings/Table.settings.js"
import { select } from "../../../Test/SelectMenu.test.js"

// Primary elements
let rows: number = tableSettings.rows // 25
const currentPage: number = tableSettings.noPage // 1
const appToolbar = appTools
const appContent = AppContent

export async function guardsView(): Promise<BackendValues> {
    const BACKEND_DATA: NLData = await getEntitiesData("User")
    let notSuperUser: any = BACKEND_DATA.filter((data: any) => data.isSuper === false)
    let arrayGuards: any = notSuperUser.filter((data: any) =>
        `${data.userType}`.includes("GUARD"))

    const CUSTOMER_DATA: NLData = await getEntitiesData("Customer")
    let customers: any = []

    CUSTOMER_DATA.forEach((data: any) => {
        customers.push(data.name)
    })

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

        <div class="select filter" id="select">
             <input type="text"
                 class="input select_box"
                 id="input"
                 placeholder="Dropdown Menu"
                 readonly>

             <div class="select_options" id="select_options"><div></div></div>
         </div>


        <button class="btn btn_icon" id="new-guard">
            <i class="fa-solid fa-user-plus"></i>
        </button>

        <button class="btn btn_icon" id="new-superuser">
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

    const inputSelect: UIControl = document.querySelector(".select")

    inputSelect?.addEventListener("click", () => {
        inputSelect.classList.toggle("select_active")
    })

    select(inputSelect, customers)

    // get rendered elements
    const tableBody: UIControl =
        document.querySelector("#table-body")

    const searchInput: UIControl =
        document.querySelector("#search-input")

    const pagination_: UIControl =
        document.getElementById("pagination")

    const newGuard_: UIControl =
        document.getElementById("new-guard")

    // search data
    await searchInput?.addEventListener("keyup", (): void => {
        const arrayData = arrayGuards.filter((guard: any) =>
            `${guard.firstName}
             ${guard.lastName}
             ${guard.email}
             ${guard.citadel?.description}
             ${guard.description}`
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        )

        let filteredResult = arrayData.length
        console.log(filteredResult)
        if (filteredResult >= rows) filteredResult = rows

        displayGuardsData(arrayData, tableBody, filteredResult, currentPage, pagination_)
        pagination(arrayData, pagination_, rows, currentPage, tableBody, displayGuardsData)
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
    `.repeat(rows)

    displayGuardsData(
        arrayGuards,
        tableBody,
        rows,
        currentPage,
        pagination_
    )

    pagination(
        arrayGuards,
        pagination_,
        rows,
        currentPage,
        tableBody,
        displayGuardsData
    )

    newGuard_.addEventListener("click", (): void => {
        FNGuards.new()
    })
}
