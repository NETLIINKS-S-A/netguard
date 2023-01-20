/**
 *
 * @param items - All db data
 * @param wrapper - Here render pagination
 * @param rowsPerPage - rows to show
 * @param currentPage - Actual page (1)
 * @param tableBody - the table body
 */
export function setupPagination(items, wrapper, rowsPerPage, currentPage, tableBody, displayFunc) {
    wrapper.innerHTML = "";
    let pageCount = Math.ceil(items.length / rowsPerPage);
    let btn;
    for (let i = 1; i < pageCount + 1; i++) {
        btn = paginationButton(i, items, currentPage, tableBody, rowsPerPage, displayFunc);
        wrapper.appendChild(btn);
    }
    truncatePagination(wrapper);
}
/**
 *
 * @param page
 * @param items
 * @param currentPage
 * @param tableBody
 * @returns button
 */
function paginationButton(page, items, currentPage, tableBody, rowsPerPage, displayData) {
    const button = document.createElement("button");
    button.innerText = page;
    if (currentPage == page)
        button.classList.add("isActive");
    button.addEventListener("click", () => {
        currentPage = page;
        displayData(items, tableBody, rowsPerPage, currentPage);
        let currentButton = document.querySelector(".pagination button.isActive");
        currentButton.classList.remove("isActive");
        button.classList.add("isActive");
    });
    return button;
}
async function truncatePagination(w) {
    const paginationWrapper = w;
    console.log(paginationWrapper);
}
