// @filename: CustomerView.ts
import { UIControl } from "../../Libs/lib.types.js"
import { UI } from "../../Libs/lib.dom.js"
import { getEntitiesData } from "../../Libs/lib.request.js"
import { pagination } from "../../Libs/lib.tools.js"

import { CFN } from "./Functions.js"
import { renderTableData } from "./Render.js"

const tableRows: number = UI.tableRows // number of rows to show on tables
const UIApp: UIControl = UI.App
const app: UIControl = UIApp?.content
const appTools: UIControl = UIApp?.tools
let currentPage: number = 1

export async function customerView() {
    // @ts-ignore
    let GET_DATA: [] = await getEntitiesData("Customer")
    let arrayCustomers: [] = GET_DATA

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
        <tbody id="tableBody">

        </tbody>
    </table>

    <div class="pagination">
        <div id="paginationCounter"></div>
        <input type="number" placeholder="${tableRows}" id="paginationLimiter" min="${tableRows}" max="30">
    </div>

    <div id="modal-content">
    </div>`

    // Add tools
    const toolbox = UIApp?.tools
    toolbox.innerHTML = `
    <div class="toolbox">
        <button class="btn btn_icon" id="add-new"><i class="fa-solid fa-plus"></i></button>
        <div class="toolbox_spotlight">
            <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="search-input">
            <label class="btn btn_icon spotlight_label" for="search-input"><i class="fa-solid fa-search"></i></label>
        </div>
    </div>`

    const modal = document.getElementById("modal-content")
    const addNew = document.getElementById("add-new")

    addNew?.addEventListener('click', (): void => {
        CFN.newCustomer(modal)
    })

    // HTML ELEMENTS
    const tableBody: UIControl = document.querySelector("#tableBody")
    const searchInput: UIControl = document.querySelector("#search-input")
    const paginationCounter: UIControl =
        document.getElementById("paginationCounter")
    let currentPage: number = 1

    // search data on real-time
    await searchInput?.addEventListener("keyup", (): void => {
        const arrayData: any = arrayCustomers.filter((customer) =>
            // @ts-ignore
            `${customer.name.toLowerCase()}`.includes(
                searchInput.value.toLowerCase()
            )
        )

        let filteredResult = arrayData.length
        if (filteredResult >= tableRows) filteredResult = tableRows

        // display table data and pagination when
        // find results
        renderTableData(arrayData, tableBody, filteredResult, currentPage)
        pagination(arrayData, paginationCounter, tableRows, currentPage, tableBody, renderTableData)
    })

    // Table placeholder
    tableBody.innerHTML = `
    <tr>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
        <td>Cargando...</td>
    </tr>`.repeat(tableRows)

    // Display data and pagination
    renderTableData(arrayCustomers, tableBody, tableRows, currentPage)
    pagination(arrayCustomers, paginationCounter, tableRows, currentPage, tableBody, renderTableData)

    // Edit Customer
    const editButtons: UIControl = document.querySelectorAll(".btn_table-editor")
    editButtons.forEach((editButton: UIControl) => {
        editButton.addEventListener('click', (): void => {
            let entity = editButton.dataset.id
            console.log(editButton, entity)
            CFN.editCustomer(modal, entity)

        })
    })
}
