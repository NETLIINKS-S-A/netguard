// @filename: UsersView.ts

import { getEntitiesData } from "../../../Backend/Connection.js"
import { NLData, UIControl, BackendValues } from "../../../Shared/Libs/lib.types.g.js"
import { pagination } from "../../../Shared/Functions/Pagination.js"
import { displayUserData } from "./ClientsRender.js"
import { FNClients } from "./ClientsFunctions.js"
import { tableSettings } from "../../../Shared/Settings/Table.js"
import { AppContent, appTools } from "../../../Shared/Settings/Misc.js"

// Page settings
const LIMIT_ROWS = tableSettings.Rows
const currentPage: number = tableSettings.paginationPage
// DOM Elements
const app = AppContent
const tools = appTools

export async function clientsView(): Promise<BackendValues> {
    let GET_DATA: NLData = await getEntitiesData("User")
    let notSuper: any = GET_DATA.filter((data: any) => data.isSuper === false)
    let arrayUsers: any = notSuper.filter((data: any) =>
        `${data.userType}`.includes("CUSTOMER")
    )

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
                    <th width="45px"></th>
                    <th width="45px"></th>
                </tr>
            </thead>
            <tbody id="tableBody">

            </tbody>
        </table>

        <div class="pagination">
            <div id="paginationCounter"></div>
        </div>`

    // Add tools
    tools.innerHTML = `
        <div class="toolbox">
            <div class="select">
                <input type="text" id="input-select" class="input select_box" placeholder="cargando..." readonly>
                <div class="select_options" id="select_options">
                </div>
            </div>

            <button class="btn btn_icon" id="add-new-client"><i class="fa-solid fa-user-plus"></i></button>

            <button class="btn btn_icon" id="addNewClientAdmin"><i class="fa-solid fa-shield-plus"></i></button>

            <div class="toolbox_spotlight">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            </div>
        </div>`

    // HTML ELEMENTS
    const tableBody: UIControl = document.querySelector("#tableBody")
    const searchInput: UIControl = document.querySelector("#search-input")
    const paginationCounter: UIControl =
        document.getElementById("paginationCounter")

    // search data on real-time
    await searchInput?.addEventListener("keyup", (): void => {
        const arrayData: any = arrayUsers.filter((user: any) =>
            `${user.firstName}
             ${user.lastName}
             ${user.description}`
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        )

        let filteredResult = arrayData.length

        if (filteredResult >= LIMIT_ROWS) filteredResult = LIMIT_ROWS

        displayUserData(arrayData, tableBody, filteredResult, currentPage, paginationCounter)
        pagination(arrayData, paginationCounter, LIMIT_ROWS, currentPage, tableBody, displayUserData)
    })

    // Table placeholder
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button class="btn"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`.repeat(LIMIT_ROWS)


    // Display data and pagination
    displayUserData(arrayUsers, tableBody, LIMIT_ROWS, currentPage, paginationCounter)
    pagination(arrayUsers, paginationCounter, LIMIT_ROWS, currentPage, tableBody, displayUserData)

    // add New client
    const addNewUserButton: UIControl = document.getElementById("add-new-client")
    addNewUserButton.addEventListener("click", (): void => {
        FNClients.new_()
    })


}
