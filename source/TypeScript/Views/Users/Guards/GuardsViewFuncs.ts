import { customerNames } from "../../../Libs/lib.data.js"
import { UIControl } from "../../../Libs/lib.types.js"

export class TableFunctions {
    public renderBadges(badges: UIControl): void {
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
        const entityName: UIControl = document.getElementById("entity-name")

        entityName.innerHTML = "l"
    }

    public async filterDataByCustomer(select: UIControl, container: any, selectInput: UIControl, currentCustomer?: string): Promise<void> {
        let CNames = customerNames
        container.innerHTML = '' // clear template
        for (let i = 0; i < CNames.length; i++) {
            container.innerHTML += `
            <div class="select_option" id="${CNames.id}">${CNames[i].name}</div>`

            // Get first value as default value into select filter
            selectInput.value = CNames[0].name
        }

        const selectOPtions: UIControl = await container.querySelectorAll('div')
        // Open options on click
        select.addEventListener('click', (): void => select.classList.toggle("select_active"))

        selectOPtions.forEach((option: UIControl, i: number) => {
            i++
            option.addEventListener('click', async (): Promise<void> => {
                selectInput.value = await selectOPtions[i - 1].innerHTML

                currentCustomer = selectInput.value

                console.log(currentCustomer)
            })
        })
    }
}
