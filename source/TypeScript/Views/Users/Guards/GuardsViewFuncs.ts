import { customerNames } from "../../../Libs/lib.data.js"
import { UIElement } from "../../../Libs/lib.types.js"

export class TableFunctions {
    public renderBadges(badges: UIElement): void {
        badges?.forEach((badge: any) => {
            if (badge?.innerText === "Enabled") {
                badge.classList.add("user_active")
                badge.innerText = "Activo"
            } else if (badge?.innerText === "Disabled") {
                badge.classList.add("user_inactive")
                badge.innerText = "Inactivo"
            }
        })
    }

    public async deleteEntity(): Promise<void> {
        const entityName: UIElement = document.getElementById("entity-name")

        entityName.innerHTML = "l"
    }

    public async filterDataByCustomer(select: UIElement, container: any, selectInput: UIElement): Promise<void> {
        let CNames = customerNames
        container.innerHTML = '' // clear template
        for (let i = 0; i < CNames.length; i++) {
            container.innerHTML += `
            <div class="select_option" id="${CNames.id}">${CNames[i].name}</div>`

            // Get first value as default value into select filter
            selectInput.value = CNames[0].name
        }

        const selectOPtions: UIElement = await container.querySelectorAll('div')
        // Open options on click
        select.addEventListener('click', (): void => select.classList.toggle("select_active"))

        selectOPtions.forEach((option: UIElement, i: number) => {
            i++
            option.addEventListener('click', async (): Promise<void> => {
                selectInput.value = await selectOPtions[i - 1].innerHTML
            })
        })
    }
}
