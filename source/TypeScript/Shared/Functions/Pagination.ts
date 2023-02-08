// @filename: Pagination.ts

import { UIControl } from "../Libs/lib.types.g.js"

/**
 *
 * @param items - All db data
 * @param wrapper - Here render pagination
 * @param rowsPerPage - rows to show
 * @param currentPage - Actual page (1)
 * @param tableBody - the table body
 */
export function pagination(items: [], wrapper: UIControl, rowsPerPage: number, currentPage: number, tableBody?: UIControl, displayFunc?: any): void {
    wrapper.innerHTML = ""

    let pageCount = Math.ceil(items.length / rowsPerPage)

    let btn: UIControl
    for (let i = 1; i < pageCount + 1; i++) {
        btn = setupButtons(
            i,
            items,
            currentPage,
            tableBody,
            rowsPerPage,
            displayFunc
        )
        wrapper.appendChild(btn)
    }
}

/**
 *
 * @param page
 * @param items
 * @param currentPage
 * @param tableBody
 * @returns button
 */
function setupButtons(
    page: UIControl,
    items: [],
    currentPage: number,
    tableBody: UIControl,
    rowsPerPage: number,
    displayData: any
): void {
    const button: UIControl = document.createElement("button")
    button.innerText = page

    if (currentPage == page) button.classList.add("isActive")

    button.addEventListener("click", () => {
        currentPage = page
        displayData(items, tableBody, rowsPerPage, currentPage)

        let currentButton: UIControl = document.querySelector(
            ".pagination button.isActive"
        )
        currentButton.classList.remove("isActive")
        button.classList.add("isActive")
    })

    return button
}
