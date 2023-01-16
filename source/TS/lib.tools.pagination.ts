// @filename: lib.tools.pagination.ts
import { FNPHTMLElement } from './Types/FunctionParameterTypes.js';
import { UIElement } from './Types/GeneralTypes.js';

/**
 *
 * @param items - All db data
 * @param wrapper - Here render pagination
 * @param rowsPerPage - rows to show
 * @param currentPage - Actual page (1)
 * @param tableBody - the table body
 */
export function setupPagination(
    items: [],
    wrapper: UIElement,
    rowsPerPage: number,
    currentPage: number,
    tableBody?: UIElement,
    displayFunc?: any
): void {
    wrapper.innerHTML = '';
    let pageCount = Math.ceil(items.length / rowsPerPage);

    for (let i = 1; i < pageCount + 1; i++) {
        let btn: UIElement = paginationButton(
            i,
            items,
            currentPage,
            tableBody,
            rowsPerPage,
            displayFunc
        );
        wrapper.appendChild(btn);
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
function paginationButton(
    page: FNPHTMLElement,
    items: [],
    currentPage: number,
    tableBody: UIElement,
    rowsPerPage: number,
    displayData: any
): void {
    const button: UIElement = document.createElement('button');
    button.innerText = page;

    if (currentPage == page) button.classList.add('isActive');

    button.addEventListener('click', () => {
        currentPage = page;
        displayData(items, tableBody, rowsPerPage, currentPage);

        let currentButton: UIElement = document.querySelector(
            '.pagination button.isActive'
        );
        currentButton.classList.remove('isActive');
        button.classList.add('isActive');
    });

    return button;
}
