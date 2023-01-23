// @filename: AdministratorRenderData.ts
import { color } from "../../../Libs/lib.tools.colors.js"
import { UIElement } from "../../../Types/GeneralTypes.js"

export async function renderAdministratorData(
    items: any,
    tableBody: UIElement,
    rowsPerPage: number,
    page: number,
    paginationElement?: any
): Promise<void> {
    tableBody.innerHTML = " "
    page--

    let start: number = rowsPerPage * page
    let end: number = start + rowsPerPage
    let arrayEvents: [] = await items.slice(start, end)
    let index: number

    for (index = 0; index < arrayEvents.length; index++) {
        let administrator: any = arrayEvents[index]
        let row: UIElement = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>${administrator?.firstName} ${administrator?.lastName}</td>
            <td>${administrator?.email}</td>
            <td class="table_badge user_status"><i>${administrator?.state.name}</i></td>
            <td class="citadels">${administrator?.citadel.description}</td>
            <td class="table_badge table_badge_usertype"><i>${administrator.userType}</i></td>

            <td><button class="btn btn_table-editor"><i class="fa-solid fa-arrows-rotate"></i></button></td>
        </tr>
        `

        tableBody.appendChild(row)

        const prop: {} = {
            font: {
                size: {
                    small: "10px",
                    mid: "12px",
                    normal: "14px",
                    large: "16px"
                },

                weigth: {
                    normal: 400,
                    semibold: 500,
                    bold: 600,
                    extraBold: 700,
                    black: 800
                }
            }
        }

        // fix states
        const states: UIElement = document.querySelectorAll(".user_status i")
        states?.forEach((state: UIElement) => {
            if (state.innerText === "Enabled") {
                state.classList.add("user_active")
                state.innerText = "Activo"
            } else if (state.innerText === "Disabled") {
                state.classList.add("user_inactive")
                state.innerText = "Inactivo"
            }
        })

        // Fix citadels
        const citadels: UIElement = document.querySelectorAll(".citadels")
        citadels?.forEach((citadel: UIElement) => {
            if (citadel.innerText === "NO APLICA") {
                citadel.style.fontSize = "12px"
                citadel.style.fontWeight = "bolder"
            } else if (citadel.innerText === "No Aplica") {
                citadel.style.fontSize = "12px"
                citadel.style.fontWeight = "bolder"
                citadel.style.color = color.slategray.l500
            } else {
                citadel.style.fontSize = "12px"
                citadel.style.fontWeight = "bolder"
                citadel.style.textTransform = "uppercase"
                citadel.style.color = color.BLUE
            }

            if (citadel.innerText === "NO APLICA") citadel.style.fontSize = "12px", citadel.style.fontWeight = "bolder"
            else if (citadel.innerText === "No Aplica") citadel.style.fontSize = "12px", citadel.style.fontWeight = "bolder", citadel.innerText = "NO APLICA"
            else citadel.style.fontSize = "12px"
        })
    }
}
