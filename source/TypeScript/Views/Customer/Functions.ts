// @filename: BusinessEditor.ts
import { getEntityData, postNewData } from "../../Libs/lib.request.js"
import { UIController } from "../../Libs/lib.types.js"
import { $color } from "../../Libs/lib.tools.js"

let entityURL: string
// Close editor

class Funcs {
    public async addTags(tableTag: any): Promise<void> {
        tableTag?.forEach((state: UIController) => {
            if (
                state.innerText === "ENABLED" ||
                state.innerText === "Enabled"
            ) {
                state.classList.add("g")
                state.innerText = "Activo"
            } else if (
                state.innerText === "DISABLED" ||
                state.innerText === "DISABLED"
            ) {
                state.classList.add("i")
                state.innerText = "Inactivo"
            }
        })
    }

    public async verifyRucLength(tableRuc: any): Promise<void> {
        tableRuc.forEach((ruc: any) => {
            if (ruc.innerText.length > 10) {
                ruc.style.color = $color.red.r500
            } else if (ruc.innerText.length < 10) {
                ruc.style.color = $color.red.r500
            }
        })
    }

    public newCustomer(modalElement: UIController): void {
        modalElement.innerHTML = `
        <div class="modal" id="modal">
            <div class="modal_dialog modal_body" style="max-width: 450px !important">
                <h2 class="modal_title">Nueva empresa</h2>

                <form>
                    <div class="input_group">
                        <label for="customer-name" class="form_label">Nombre</label>
                        <input type="text" placeholder="empresa" class="input" id="customer-name">
                    </div>

                    <div class="form_group">
                        <div class="input_group">
                            <label for="customer-ruc" class="form_label">RUC</label>
                            <input type="text" placeholder="0900900000" class="input monospace" maxlength="10" id="customer-ruc">
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
                    </div>

                    <div class="input_group">
                        <label for="vehicular-entrance" class="form_label">Ingreso vehicular: <span id="customer-vehicular-status">no</span></label>
                        <input type="checkbox" name="vehicularEntrance" id="vehicular-entrance" class="toggle">
                    </div>

                </form>
                <div class="modal_footer">
                    <button class="btn" id="cancel">Cancelar</button>
                    <button class="btn btn_success" id="new-customer-entity">Guardar</button>
                </div>
            </div>
        </div>`
        this.open()

        // C U S T O M E R   N A M E
        const customerName = document.getElementById("customer-name")
        // R U C
        const customerRuc = document.getElementById("customer-ruc")
        // S T A T U S
        const customerStatus = document.getElementById("input-select")

        // V E H I C U L A R   E N T R A N C E
        const toggle: UIController = document.getElementById("vehicular-entrance")
        // toggle.checked = true
        let vehicularStatus: boolean
        let statusData: boolean

        toggle?.addEventListener("click", (): void => {
            const labelStatus: UIController = document.getElementById(
                "customer-vehicular-status"
            )
            if (toggle?.checked)
                (labelStatus.innerText = "si"), (vehicularStatus = true)
            else (labelStatus.innerText = "no"), (vehicularStatus = false)
        })

        const select: UIController = document.querySelector(".select")
        const selectInput: UIController = document.getElementById("input-select")
        const selectOptions: UIController =
            document.querySelectorAll(".select_option")

        select.addEventListener("click", () => {
            select.classList.toggle("select_active")
        })

        selectOptions.forEach((option: any) => {
            option.addEventListener("click", async (): Promise<void> => {
                if (option.dataset.status == "active") statusData = true
                else statusData = false

                selectInput.value = option.innerText
            })
        })

        // Modal controls
        document.getElementById("cancel")?.addEventListener("click", (): void => this.cancel())

        document.getElementById("new-customer-entity")?.addEventListener("click", (): any => this.submit(customerName, customerRuc, customerStatus, vehicularStatus = false))
    }

    public async editCustomer(
        modalElement: UIController,
        entity: any
    ): Promise<void> {
        const currentEntity: any = await getEntityData("Customer", entity)
        console.log(currentEntity)

        modalElement.innerHTML = `
        <div class="modal" id="modal">
            <div class="modal_dialog modal_body" style="max-width: 450px !important">
                <h2 class="modal_title">Editar empresa</h2>

                <form>
                    <div class="input_group">
                        <label for="customer-name" class="form_label">Nombre</label>
                        <input type="text" id="customer-name" placeholder="empresa" class="input" disabled="disabled">
                    </div>

                    <div class="form_group">
                        <div class="input_group">
                            <label for="customer-ruc" class="form_label">RUC</label>
                            <input type="text" placeholder="0900900000" class="input monospace" maxlength="10" id="customer-ruc">
                        </div>

                        <div class="input_group">
                            <label class="form_label">Estado</label>

                            <div class="select">
                                <input type="text" id="input-select" class="input select_box" value="Activo" readonly>
                                <div class="select_options" id="select_options">
                                    <div class="select_option" data-stateId="60885987-1b61-4247-94c7-dff348347f93">Activo</div>
                                    <div class="select_option" data-stateId="225b5e5d-9bb1-469a-b2d9-ca85d53db47b">Inactivo</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="input_group">
                        <label for="vehicular-entrance" class="form_label">Ingreso vehicular: <span id="customer-vehicular-status">no</span></label>
                        <input type="checkbox" name="vehicularEntrance" id="vehicular-entrance" class="toggle">
                    </div>

                </form>
                <div class="modal_footer">
                    <button class="btn" id="cancel">Cancelar</button>
                    <button class="btn btn_success" id="updateCutomerEntity">Guardar</button>
                </div>
            </div>
        </div>`
        this.open()

        const cancel: UIController = document.getElementById("cancel")
        cancel.addEventListener("click", (): void => {
            this.cancel()
        })

        // Fill data
        // NAME INPUT
        const customerNameInput: UIController =
            document.getElementById("customer-name")

        // RUC INPUT
        const customerRUCInput: UIController =
            document.getElementById("customer-ruc")

        customerNameInput.value = currentEntity.name

        customerRUCInput.value = parseInt(currentEntity.ruc)

        if (customerRUCInput.value == "NaN")
            customerRUCInput.classList.add("input_error")

        customerRUCInput.addEventListener("keyup", () => {
            customerRUCInput.classList.remove("input_error")
        })

        const toggle: UIController = document.getElementById("vehicular-entrance")
        // toggle.checked = true
        let vehicularStatus: boolean
        let customerStatus: boolean

        toggle?.addEventListener("click", (): void => {
            const labelStatus: UIController = document.getElementById(
                "customer-vehicular-status"
            )
            if (toggle?.checked)
                (labelStatus.innerText = "si"), (vehicularStatus = true)
            else (labelStatus.innerText = "no"), (vehicularStatus = false)
        })

        const select: UIController = document.querySelector(".select")
        const selectInput: UIController = document.getElementById("input-select")
        const selectOptions: UIController =
            document.querySelectorAll(".select_option")

        select.addEventListener("click", () => {
            select.classList.toggle("select_active")
        })

        selectOptions.forEach((option: any) => {
            option.addEventListener("click", async (): Promise<void> => {
                if (option.dataset.status == "active") customerStatus = true
                else customerStatus = false

                selectInput.value = option.innerText
            })
        })
    }

    private cancel(): void {
        const modal: UIController = document.getElementById("modal")

        setTimeout(() => modal.classList.toggle("open"), 200)

        modal.style.display = "none"
        modal.remove()
    }

    private open(): void {
        const modal: UIController = document.getElementById("modal")
        modal.style.display = "block"
        setTimeout(() => {
            modal.classList.add("open")
        }, 200)
    }

    private async submit(name: UIController, ruc: UIController, status: UIController, vehicularEntrance: UIController): Promise<void> {

        let stateId: string = status.dataset.statesId

        let raw: any = JSON.stringify({
            "name": `${name.value}`,
            "ruc": `${ruc.value}`,
            "asociated": `${name.value}`.toLowerCase().trim(),
            "state": {
                "id": `${stateId}`
            }
        })

        postNewData("Customer", raw)
    }
}

export let CFN: Funcs = new Funcs()
