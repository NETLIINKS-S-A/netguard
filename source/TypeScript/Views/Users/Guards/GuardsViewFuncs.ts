import { customerNames } from "../../../Libs/lib.data.js"
import { getEntityData } from "../../../Libs/lib.request.js"
import { UIControl } from "../../../Libs/lib.types.js"

class TBLFn {
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

    public async filterDataByCustomer(select: UIControl,
        container: any,
        selectInput: UIControl,
        currentCustomer?: string): Promise<void> {
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

    public async edit(controllers: UIControl): Promise<void> {
        controllers.forEach((controller: UIControl) => {
            // get entity
            const entityID: string = controller.dataset.id
            // add functionality
            controller.addEventListener("click", async (): Promise<void> => {
                const arrayGuards: any = await getEntityData(entityID, "User")

                const modalContainer: UIControl = document.getElementById("modal-container")

                modalContainer.innerHTML = `
                <div class="modal" id="modal">
                    <div class="modal_dialog modal_body">
                        <h4 class="modal_title">Editar guardia</h4>

                    </div>
                </div>`

                this.open()
            })
        })
    }

    private open(): void {
        const modal: UIControl = document.getElementById("modal")
        modal.style.display = "block"
        setTimeout((): void => modal.classList.add("open"), 300)
    }
}

export let TableFn: TBLFn = new TBLFn()
