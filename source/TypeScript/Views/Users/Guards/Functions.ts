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

                        <form autocomplete="off" id="modal-form">
                            <div class="input_group">
                                <label for="guard-first-name" class="form_label">Nombre</label>
                                <input class="input" id="guard-first-name" value="${arrayGuards.firstName} ${arrayGuards.lastName} ${arrayGuards.secondLastName}" readonly disabled="true">
                            </div>

                            <div class="input_group">
                                <label for="guard-customer" class="form_label">Empresa</label>
                                <input class="input" id="guard-customer" value="${arrayGuards.customer.name}" readonly disabled="true">
                            </div>

                            <div class="input_group">
                                <label for="guard-customer" class="form_label">ID</label>
                                <input class="input" id="guard-customer" value="${arrayGuards.username}" readonly disabled="true">
                            </div>

                            <div class="input_group">
                                <label for="guard-customer" class="form_label">Teléfono</label>
                                <input class="input" id="guard-customer" value="${arrayGuards.phone}" maxlength="10">
                            </div>

                            <div class="input_group">
                                <label class="form_label">Estado</label>

                                <div class="select">
                                    <input type="text" id="input-select" class="input select_box" value="Activo" readonly>
                                    <div class="select_options" id="select_options">
                                        <div class="select_option" data-status="active">Activo</div>
                                        <div class="select_option" data-status="inactive">Inactivo</div>
                                    </div>
                                </div>
                            </div>

                        </form>

                        <div class="modal_footer">
                            <button class="btn" id="close">cancelar</button>
                            <button class="btn btn_warning" id="reset">Reiniciar</button>
                            <button class="btn btn_success" id="submit">Actualizar</button>
                        </div>
                    </div>
                </div>`
                this.open()

                console.log(arrayGuards)

                const closeButton = document.getElementById("close")
                closeButton?.addEventListener('click', () => {
                    const modal: UIControl = document.getElementById("modal")
                    modal.classList.toggle("open")
                    modal.style.display = "none"
                    modal.remove()
                })

                let customerStatus: boolean

                const select: UIControl = document.querySelector(".select")
                const selectInput: UIControl = document.getElementById('input-select')
                const selectOptions: UIControl = document.querySelectorAll('.select_option')

                select.addEventListener('click', () => {
                    select.classList.toggle("select_active")
                })

                selectOptions.forEach((option: any) => {
                    option.addEventListener('click', async (): Promise<void> => {
                        if (option.dataset.status == "active") customerStatus = true
                        else customerStatus = false

                        selectInput.value = option.innerText

                    })
                })
            })
        })
    }

    private open(): void {
        const modal: UIControl = document.getElementById("modal")
        modal.style.display = "block"
        setTimeout((): void => modal.classList.add("open"), 250)
    }
}

export let TableFn: TBLFn = new TBLFn()
