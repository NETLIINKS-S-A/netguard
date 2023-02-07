// @filename: CustomerView.ts
import { UIControl } from "../../Libs/lib.types.js"
import { UI } from "../../Libs/lib.dom.js"
import { getEntitiesData } from "../../Libs/lib.request.js"
import { pagination } from "../../Libs/lib.tools.js"
import { settings } from "../../Libs/lib.settings.js"
import { displayCustomerData } from "./CustomerRender.js"
import { FNCustomers } from "./CustomerFunctions.js"
import { NLFuncs } from "../../GlobalFunctions.js"

const limitRows: number = settings.limitRows
const UIApp: UIControl = UI.App
const app: UIControl = UIApp?.content
const Toolbar: UIControl = UIApp?.tools
let currentPage: number = 1

export async function customerView() {
    // GET BACKEND DATA
    let GET_DATA: any = await getEntitiesData("Customer")
    let arrayCustomers: any = GET_DATA

    // Write application template
    app.innerHTML = `
    <h1 class="app_title">Empresas</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>RUC</th>
                <th>Estado</th>
                <th width="45px"></th>
            </tr>
        </thead>
        <tbody id="table-body">

        </tbody>
    </table>

    <div class="pagination">
        <div id="paginationCounter"></div>
    </div>

    <div id="modal-content">
    </div>`

    // Add tools
    const toolbar = Toolbar
    toolbar.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="new-customer"><i class="fa-solid fa-plus"></i></button>
        <div class="toolbox_spotlight">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
        </div>
    </div>`

    // HTML ELEMENTS
    const table: UIControl =
        document.querySelector("#table-body")

    const paginationCounter: UIControl =
        document.getElementById("paginationCounter")

    // search data on real-time
    const searchInput: UIControl = document.querySelector("#search-input")

    await searchInput?.addEventListener("keyup", (): void => {
        console.log(searchInput.value.toLowerCase())
        const arrayData: any = arrayCustomers.filter((customer: any) =>
            `${customer.name}`
                .toLowerCase()
                .trim()
                .includes(searchInput.value.toLowerCase().trim())
        )


        let filteredResult = arrayData.length

        if (filteredResult >= limitRows) filteredResult = limitRows

        // render data
        displayCustomerData(arrayData, table, filteredResult, currentPage, paginationCounter)

        // render pagination
        pagination(arrayData, paginationCounter, limitRows, currentPage, table, displayCustomerData)
    })

    // render load on tables
    table.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>`.repeat(limitRows)

    // Display data and pagination
    displayCustomerData(arrayCustomers, table, limitRows, currentPage, paginationCounter)
    pagination(arrayCustomers, paginationCounter, limitRows, currentPage, table, displayCustomerData)

}
