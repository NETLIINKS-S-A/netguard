// @filename: BusinessView.ts
import { UI } from "../../DomElements.js"
import { DTROptions } from "../../RequestOptions.js"
import { UIElement } from "../../Types/GeneralTypes.js"
import { FNPHTMLElement } from "../../Types/FunctionParameterTypes.js"
import { Modal } from "../../Classes"

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
        </table>

        <div class="pagination">
            <div id="paginationCounter"></div>
            <input type="number" placeholder="${UI.tableRows}" id="paginationLimiter" min="${UI.tableRows}" max="30">
        </div>`

    // Add tools
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

    let tableData: [] = []

    async function getData() {
        const response : Response = await fetch(url, DTROptions)
        return await response.json()
    }

    const search: UIElement = document.querySelector("#spotlight")
    const tableBody: UIElement = document.querySelector("#tableBody")

    search?.addEventListener("keyup", (): void => {
        // @ts-ignore
        const filteredDatas = tableData.filter(filteredData => `${filteredData.name}`.includes(search.value))

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
        tableData = data

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
                        <button class="btn btn_table" id="editBusiness" data-id="${item.id}">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                    </td>
                </tr>`

            wrapper.appendChild(itemElement)

            const editBusinessButtons = document.querySelectorAll("#editBusiness")

            editBusinessButtons.forEach(editBusinessButton => {
                editBusinessButton.addEventListener("click", () => {
                    openBusinessEditor(item.name, item.id, item.createdBy)
                })
            })
        }
    } // End displayFilteredItems

    // Pagination
    function setupPagination(items: any, wrapper: any, rowsPerPage: any) {
        wrapper.innerHTML = ""
        let pageCount = Math.ceil(items.length / rowsPerPage)

        for (let i = 1; i < pageCount + 1; i++) {
            let btn: UIElement = paginationButton(i, items)
            wrapper.appendChild(btn)
        }
    }

    // Create and add pagination buttons
    function paginationButton(page: FNPHTMLElement, items: FNPHTMLElement) {
        let button: UIElement = document.createElement("button")
        button.innerText = page

        if (currentPage == page) button.classList.add("active")

        button.addEventListener("click", () => {
            currentPage = page
            displayFilteredItems(items, tableBody, UI.tableRows, currentPage)

            let currentButton: UIElement = document.querySelector('pagination button.active')
            currentButton.classList.remove("active")
            button.classList.add("active")
        })

        return button
    }

    displayFilteredItems(tableData, tableBody, UI.tableRows, currentPage)
    setupPagination(tableData, pagination, UI.tableRows)
}

function openBusinessEditor<T>(name: T, id: T, creator: T): void {
    console.log(name)
    console.log(id)
    console.log(creator)
}
