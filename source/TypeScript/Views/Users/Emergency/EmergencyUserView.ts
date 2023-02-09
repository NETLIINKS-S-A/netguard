// @filename: EmergenctUserView.ts
// import { getEntitiesData } from "../../../Libs/lib.request.js"
import { getEntitiesData } from "../../../Backend/Connection.js"
import { NLData, UIControl } from "../../../Shared/Libs/lib.types.g.js"
import { pagination } from "../../../Shared/Functions/Pagination.js"
import { renderEmergencyUserData } from "./EmergencyRender.js"
import { AppContent, appTools } from "../../../Shared/Settings/Misc.settings.js"
import { tableSettings } from "../../../Shared/Settings/Table.settings.js"
import { select } from "../../../Shared/Functions/InputSelect.js"

const tableRows = tableSettings.rows // 25
const currentPage = tableSettings.noPage // 1
const app = AppContent
const tools = appTools

export async function emergencyUserView() {
    let GET_DATA: NLData = await getEntitiesData("Contact")
    let arrayEmergencyUsers: any = GET_DATA

    const CUSTOMER_DATA: NLData = await getEntitiesData("Customer")

    let customers: any = [] // data goes here

    CUSTOMER_DATA.forEach((data: any) => {
        customers.push(data.name)
    })


    // write application template
    app.innerHTML = `<h1 class="app_title">Emergencia</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th width="45px"></th>
            </tr>
            <tbody id="table-body">
            </tbody>
    </table>

    <div class="pagination">
        <div id="pagination-counter"></div>
    </div>`

    // write app tools
    tools.innerHTML = `
    <div class="toolbox">
        <div class="select filter" id="select">
            <input type="text"
                class="input select_box"
                id="input"
                placeholder="Dropdown Menu"
                readonly>

                <div class="select_options" id="select_options"><div></div></div>
        </div>

        <button class="btn btn_icon" id="add-new-emergency-contact"><i class="fa-solid fa-user-plus"></i></button>

        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
        </div>
    </div>`

    // get elements
    const inputSelect: UIControl = document.querySelector(".select")

    inputSelect?.addEventListener("click", () => {
        inputSelect.classList.toggle("select_active")
    })

    select(inputSelect, customers)

    const tableBody = <HTMLElement>document.querySelector("#table-body")
    const searchInput: UIControl = <HTMLElement>document.querySelector("#search-input")
    const paginationCounter = <HTMLElement>document.getElementById("pagination-counter")

    // search data
    await searchInput?.addEventListener("keyup", (): void => {
        // @ts-ignore
        const arrayData = arrayEmergencyUsers.filter((emergencyUser: any) =>
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

        pagination(
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

    pagination(
        arrayEmergencyUsers,
        paginationCounter,
        tableRows,
        currentPage,
        tableBody,
        renderEmergencyUserData
    )
}
