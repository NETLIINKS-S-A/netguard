// @filename: EmergenctUserView.ts
import { getEntitiesData } from "../../../Libs/lib.request.js"
import { UIElement } from "../../../Types/GeneralTypes.js"
import { UI } from "../../../Libs/lib.dom.js"
import { setupPagination } from "../../../Libs/lib.tools.pagination.js"
import { renderEmergencyUserData } from "./EmergencyRenderData.js"

const tableRows = UI.tableRows
const UIApp = UI.App
const app = UIApp?.content
const appTools = UIApp?.tools
const currentPage: number = 1

export async function emergencyUserView() {
    let GET_DATA: void = await getEntitiesData("Contact")
    let arrayEmergencyUsers: any = GET_DATA

    // write application template
    app.innerHTML = `<h1 class="app_title">Emergencia</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th></th>
            </tr>
            <tbody id="table-body">
            </tbody>
    </table>

    <div class="pagination">
        <div id="pagination-counter"></div>
    </div>`

    // write app tools
    appTools.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-plus"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="buscar" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-filter"></i></label>
        </div>
    </div>`

    // get elements
    const tableBody: UIElement = document.querySelector("#table-body")
    const searchInput: UIElement = document.querySelector("#search-input")
    const paginationCounter: UIElement =
        document.getElementById("pagination-counter")

    // search data
    await searchInput?.addEventListener("keyup", (): void => {
        // @ts-ignore
        const arrayData = arrayEmergencyUsers.filter((emergencyUser) =>
            `${emergencyUser.name}
             ${emergencyUser.phone}`
                .toLowerCase()
                .includes(searchInput?.value.toLowerCase())
        )

        let filteredResult = arrayData.length
        if (filteredResult >= tableRows) filteredResult = tableRows

        renderEmergencyUserData(
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
            renderEmergencyUserData
        )
    })

    // write table template
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td><button class="btn"><i class="fa-solid fa-pencil"></i></button></td>
    </tr>`.repeat(tableRows)

    // display data
    await renderEmergencyUserData(
        arrayEmergencyUsers,
        tableBody,
        tableRows,
        currentPage,
        paginationCounter
    )

    setupPagination(
        arrayEmergencyUsers,
        paginationCounter,
        tableRows,
        currentPage,
        tableBody,
        renderEmergencyUserData
    )
}
