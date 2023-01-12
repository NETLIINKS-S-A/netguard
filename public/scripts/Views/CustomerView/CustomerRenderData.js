import { CustomerEditor, MultiInput, closeBusinessModal } from "./CustomerViewFuncs.js";
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
    }
    // CUSTOMER EDITOR ================================================
    // elements
    const editorButtonElements = document.querySelectorAll("tr td button");
    const closeEditorButtonElement = document.getElementById("closeEditor");
    const updateCustomerEntityElement = document.getElementById("updateCutomerEntity");
    // functions
    const customerEditor = new CustomerEditor();
    editorButtonElements.forEach((btn) => {
        btn.addEventListener("click", () => {
            let entity = btn.dataset.id;
            customerEditor.open(entity, "editBusiness", MultiInput);
        });
    });
    closeEditorButtonElement.addEventListener("click", () => closeBusinessModal("editBusiness"));
    updateCustomerEntityElement.addEventListener("click", () => {
        customerEditor.update("editBusiness");
    });
    // CUSTOMER CREATOR ================================================
}
//         const businessModalObjs = {
//             add: {
//                 open: document.getElementById("addNewBusiness"),
//                 close: document.getElementById("closeAddNewBusinessModal"),
//                 save: document.getElementById("saveNewBusiness"),
//                 form: document.getElementById("createBusinessForm")
//             },
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
//         // updateData
//         businessModalObjs.edit.update?.addEventListener("click" ,() => businessEditor.update("editBusiness", multiInputElems))
//         // updateData on Submit
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
