import { UI } from "../../DomElements.js"
import { DTROptions } from "../../RequestOptions.js"
import { UIElement } from "../../Types/GeneralTypes.js"

export async function renderBusiness() {
    const url = "https://backend.netliinks.com:443/rest/entities/Business?fetchPlan=full"

    const appContent = UI.App?.content
    appContent.innerHTML = `
        <h1 class="app_title">Empresas</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>ID</th>
                    <th>Creado por</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tableBody">

            </tbody>
        </table>`

    const toolbox = UI.App?.tools
    toolbox.innerHTML = `
        <div class="toolbox">
            <button class="btn btn_icon"><i class="fa-solid fa-arrow-rotate-right"></i></button>
            <button class="btn btn_icon"><i class="fa-solid fa-plus"></i></button>
            <div class="toolbox_spotlight">
                <input type="text" class="input input_spotlight" placeholder="Buscar por nombre" id="spotlight">
                <label class="btn btn_icon spotlight_label" for="spotlight"><i class="fa-solid fa-filter"></i></label>
            </div>
        </div>`

    let searchData: [] = []

    async function getData() {
        const response : Response = await fetch(url, DTROptions)
        return await response.json()
    }

    const search: UIElement = document.querySelector("#spotlight")
    const tableBody: UIElement = document.querySelector("#tableBody")

    search?.addEventListener("keyup", (): void => {
        // @ts-ignore
        const filteredDatas = searchData.filter(filteredData => `${filteredData.name}`.includes(search.value))

        let filteredDataResult = filteredDatas.length

        displayFilteredItems(filteredDatas, tableBody, filteredDataResult, currentPage)
        setupPagination(filteredDatas, pagination, UI.tableRows)
    })

    tableBody.innerHTML = `
        <tr>
            <td>Cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
        </tr>

        <tr>
            <td>Cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
        </tr>

        <tr>
            <td>Cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
        </tr>
    `

    const data = await getData();
        searchData = data

        // pagination
        const pagination: UIElement = document.getElementById("paginationCounter")
        let currentPage: number = 1

        function displayFilteredItems(items: any, wrapper: any, rowsPerPage: any, page: any) {
            wrapper.innerHTML = ""
            page--

            let start = rowsPerPage * page
            let end = start + rowsPerPage
            let paginatedItems = items.slice(start, end)

            for (let i = 0; i < paginatedItems.length; i++) {
                let item = paginatedItems[i]
                let itemElement = document.createElement("tr")
                itemElement.innerHTML = `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.id}</td>
                        <td>${item.createdBy}</td>
                        <td>
                            <button class="btn btn_table" onclick="editBusiness()">
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                        </td>
                    </tr>
                `

                wrapper.appendChild(itemElement)
            }
        } // End displayFilteredItems

        function setupPagination(items: any, wrapper: any, rowsPerPage: any) {
            wrapper.innerHTML = ""
            let pageCount
        }

        displayFilteredItems(searchData, tableBody, UI.tableRows, currentPage)
}
