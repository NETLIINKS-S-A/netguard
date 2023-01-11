// @filename: CustomerPagination.ts
/* ******************************************
DISPLAY TABLE DATA AND FILTERED TABLE DATA
******************************************** */
/**
 *
 * @param items - The saved data and filtered data (tableData)
 * @param wrapper - The table body content (table body)
 * @param rowsPerPage - The quantity rows show per page (tableRows)
 * @param page - The current page
 */
export async function displayCustomerData(items, tableBody, rowsPerPage, page, paginationElement) {
    tableBody.innerHTML = "";
    page--;
    console.log("Hola");
    console.log(items);
    console.log(tableBody);
    console.log(rowsPerPage);
    console.log(page);
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItems = items.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++) {
        let customer = paginatedItems[i];
        let itemElement = document.createElement("tr");
        itemElement.innerHTML = `<tr>
            <td>${customer.name}</td>
            <td class="monospace">${customer.ruc}</td>
            <td>${customer.createdBy}</td>
            <td>
                <button class="btn btn_table-editor" data-id="${customer.id}">
                    <i class="fa-solid fa-pencil"></i>
                </button>
            </td>
        </tr>`;
        // write datas on table
        tableBody.appendChild(itemElement);
        console.log("Hola");
    }
}
//     function setupPagination(items: any, wrapper: any, rowsPerPage: any) {
//         wrapper.innerHTML = ""
//         let pageCount = Math.ceil(items.length / rowsPerPage)
//         for (let i = 1; i < pageCount + 1; i++) {
//             let btn: UIElement = paginationButton(i, items)
//             wrapper.appendChild(btn)
//         }
//     }
//     // Create and add pagination buttons
//     function paginationButton(page: FNPHTMLElement, items: FNPHTMLElement) {
//         let button: UIElement = document.createElement("button")
//         button.innerText = page
//         if (currentPage == page) button.classList.add("active")
//         button.addEventListener("click", () => {
//             currentPage = page
//             displayFilteredItems(items, tableBody, tableRows, currentPage)
//             let currentButton: UIElement = document.querySelector('.pagination button.active')
//             currentButton.classList.remove("active")
//             button.classList.add("active")
//         })
//         return button
//     }
// function displayFilteredItems(items: any, wrapper: any, rowsPerPage: any, page: any) {
//         wrapper.innerHTML = ""
//         page--
//         let start = rowsPerPage * page
//         let end = start + rowsPerPage
//         let paginatedItems = items.slice(start, end)
//         for (let i = 0; i < paginatedItems.length; i++) {
//             let item = paginatedItems[i]
//             let itemElement = document.createElement("tr")
//             itemElement.innerHTML = `
//                 <tr>
//                     <td>${item.name}</td>
//                     <td class="monospace">${item.ruc}</td>
//                     <td>${item.createdBy}</td>
//                     <td>
//                         <button class="btn btn_table-editor" data-id="${item.id}">
//                             <i class="fa-solid fa-pencil"></i>
//                         </button>
//                     </td>
//                 </tr>`
//             wrapper.appendChild(itemElement)
//         }
//         const businessModalObjs = {
//             add: {
//                 open: document.getElementById("addNewBusiness"),
//                 close: document.getElementById("closeAddNewBusinessModal"),
//                 save: document.getElementById("saveNewBusiness"),
//                 form: document.getElementById("createBusinessForm")
//             },
//             edit: {
//                 open: document.querySelectorAll("tr td button"),
//                 close: document.getElementById("closeEditor"),
//                 update: document.getElementById("updateData"),
//             }
//         }
//         /* ********************************
//         ADD NEW BUSINESS
//         ******************************** */
//         let newBusiness: NewBusiness = new NewBusiness()
//         // Open modal
//         businessModalObjs.add.open?.addEventListener("click", () => newBusiness.open("addNewBusinessModal"))
//         // Close modal
//         businessModalObjs.add.close?.addEventListener("click", () => closeBusinessModal("addNewBusinessModal"))
//         // Save new business
//         businessModalObjs.add.save?.addEventListener("click", () => {
//             newBusiness.add("addNewBusinessModal")
//         })
//         /* ********************************
//         EDIT BUSINESS
//         ******************************** */
//         const businessEditor: BusinessEditor = new BusinessEditor()
//         // Open editor
//         businessModalObjs.edit.open?.forEach((openEditorButton: UIElement) => {
//             openEditorButton.addEventListener("click", () => {
//                 let entity: string = openEditorButton.dataset.id
//                 businessEditor.open(entity, "editBusiness", multiInputElems)
//             })
//         })
//         // CloseEditor
//         businessModalObjs.edit.close?.addEventListener("click", () => closeBusinessModal("editBusiness"))
//         // updateData
//         businessModalObjs.edit.update?.addEventListener("click" ,() => businessEditor.update("editBusiness", multiInputElems))
//         // updateData on Submit
//         const businessEditorForm = document.getElementById("businessEditorForm")
//         businessEditorForm?.addEventListener("submit", (e) => {
//             e.preventDefault()
//             businessEditor.update("editBusiness", multiInputElems)
//             displayFilteredItems(tableData, tableBody, tableRows, currentPage)
//         })
//         /* ********************************
//         RUC MULTI-INPUT
//         ******************************** */
//         const multiInputElems: UIElement = document.querySelectorAll("[multiInput]")
//         const multiInputFirstElems: UIElement = document.querySelectorAll("[firstMultiInput]")
//         const multiInputFuncs: MultiInput = new MultiInput;
//         let rucValue: [] = [] // save data here
//         multiInputFirstElems?.forEach((input: UIElement, i: number) => {
//             input.addEventListener("paste", (e: SubmitEvent): void => {
//                 multiInputFuncs.handlePaste(e, multiInputElems)
//             })
//         })
//         // multiInputFirstElems?.forEach((item: UIElement, i: number) => {
//         //     item[i].addEventListener("paste", (e: SubmitEvent): void => multiInputFuncs.handlePaste(e, multiInputElems))
//         // })
//         multiInputElems[0].addEventListener("paste", (e: SubmitEvent): void => multiInputFuncs.handlePaste(e, multiInputElems))
//         multiInputElems[10].addEventListener("paste", (e: SubmitEvent): void => multiInputFuncs.handlePaste(e, multiInputElems))
//         // RUC FROM NEW BUSINESS
//         //
//         // Change to next input when write a value
//         businessEditorForm?.addEventListener("input", (ev: Event): void => multiInputFuncs.handleInput(ev))
//         // save data on rucValue
//         businessEditorForm?.addEventListener("submit", (e: SubmitEvent): void => {
//             e.preventDefault()
//             // @ts-ignore
//             multiInputElems?.forEach((rucInput: any, i: number) => rucValue.push(rucInput.value))
//         })
//         // RUC FROM NEW BUSINESS
//         businessModalObjs.add.form?.addEventListener("input", (e): void => multiInputFuncs.handleInput(e))
//         businessModalObjs.add.form?.addEventListener("submit", (e): void => {
//             e.preventDefault()
//             // @ts-ignore
//             multiInputElems?.forEach((rucInput: any, i: number) => rucValue.push(rucInput.value))
//         })
//     } // End displayFilteredItems
//     /* ********************************
//     PAGINATION
//     ******************************** */
//     // calculate pagination items
//     function setupPagination(items: any, wrapper: any, rowsPerPage: any) {
//         wrapper.innerHTML = ""
//         let pageCount = Math.ceil(items.length / rowsPerPage)
//         for (let i = 1; i < pageCount + 1; i++) {
//             let btn: UIElement = paginationButton(i, items)
//             wrapper.appendChild(btn)
//         }
//     }
//     // Create and add pagination buttons
//     function paginationButton(page: FNPHTMLElement, items: FNPHTMLElement) {
//         let button: UIElement = document.createElement("button")
//         button.innerText = page
//         if (currentPage == page) button.classList.add("active")
//         button.addEventListener("click", () => {
//             currentPage = page
//             displayFilteredItems(items, tableBody, tableRows, currentPage)
//             let currentButton: UIElement = document.querySelector('.pagination button.active')
//             currentButton.classList.remove("active")
//             button.classList.add("active")
//         })
//         return button
//     }
