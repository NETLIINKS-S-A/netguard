// @filename: GuardsRender.ts

import { NLFuncs } from "../../../GlobalFunctions.js"

export async function displayGuardsData(items: any, table: any, rows: number, page: number, paginationCounter?: any): Promise<void> {
    table.innerHTML = ""
    page--

    let start: number = rows + page
    let end: number = start + rows
    let paginatedItems = items.slice(start, end)

    for (let i = 0; i < paginatedItems.length; i++) {
        let guard = paginatedItems[i]
        let row = document.createElement("tr")

        row.innerHTML = `
            <tr>
                <td>${guard?.firstName} ${guard?.lastName}</td>
                <td class="monospace">${guard.email}</td>
                <td class="tag"><span>${guard.state._instanceName}</span></td>
                <td class="tag"><span>${guard.citadel?.description}</span></td>
                <td class="tag"><span>${guard.phone}</span></td>
                <td>
                    <button class="btn btn_table-editor" data-id="${guard?.id}">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                </td>

                <td>
                    <button class="btn btn_table-delete"
                        id="deleteGuard"
                        data-id="${guard?.id}">
                            <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>`

        table.appendChild(row)

        // format table
        NLFuncs.TAGS_()
    }

}


//         <tr>
//             <td>${guard?.firstName} ${guard?.lastName}</td>
//             <td class="monospace">${guard.email}</td>
//             <td class="tag"><i>${guard.state._instanceName}</i></td>
//             <td class="tag"><i>${guard.citadel?.description}</i></td>
//             <td class="tag"><i>${guard.phone}</i></td>
//             <td><button class="btn btn_table-editor" data-id="${guard?.id}"><i class="fa-solid fa-pencil"></i></button></td>
//             <td><button class="btn btn_table-delete" id="deleteGuard" data-id="${guard?.id}"><i class="fa-solid fa-trash"></i></button></td>
//             </td>
//         </tr>`

//         // write data on table
//         tableBody.appendChild(row)
//     }

//     const deleteButtons: UIControl =
//         document.querySelectorAll(".btn_table-delete")

//     const modalCancelButton: UIControl = document.getElementById("cancel")
// }
