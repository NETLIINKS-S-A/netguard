// @filename: Functions.ts
import { NewValue, UIControl } from "../../../Shared/Libs/lib.types.g.js"
import { getEntityData } from "../../../Backend/Connection.js"
import { Modal } from "../../../Shared/Functions/Modal.js"

class NLFClients extends Modal {

    public async editor(entity: string): Promise<void> {
        let DATA: any = await getEntityData("User", entity)

        const modalElement: UIControl = document.getElementById("modal-content")

        modalElement.innerHTML = `
        <div class="modal" id="modal">
            <div class="modal_dialog modal_body" style="max-width: 450px !important">
                <h2 class="modal_title">Editar <span id="entityName" class="modal_title-name">${DATA.firstName} ${DATA.lastName}</span></h2>

                <form autocomplete="off" id="businessEditorForm">
                    <div class="input_group">
                        <label for="businessName" class="form_label">Nombre</label>
                        <input class="input" id="businessName" placeholder="Nombre">
                    </div>

                    <div class="input_group">
                        <label class="form_label">RUC</label>
                        <input type="text" class="input" id="rucInputElement" maxlength="10">
                    </div>

                    <div class="form_group">
                        <div class="input_group">
                            <label for="toggle-status" class="form_label">Estado: <span id="toggle-status-label">inactivo</span></label>
                            <input type="checkbox" name="toggle-status" id="toggle-status" class="toggle">
                        </div>

                        <div class="input_group">
                            <label for="vehicular-entrance" class="form_label">Ingreso vehicular: <span id="vehicular-entrance-label">no</span></label>
                            <input type="checkbox" name="vehicular-entrance" id="vehicular-entrance" class="toggle">
                        </div>
                    </div>
                </form>

                <div class="modal_footer">
                    <button class="btn" id="cancel">Cancelar</button>
                    <button class="btn btn_success" id="updateCutomerEntity">Guardar</button>
                </div>
            </div>
        </div>`
        this.open()

        // Customer Status Toggle
        const toggleStatus: UIControl =
            document.getElementById("toggle-status")

        toggleStatus.addEventListener("click", () => {
            const toggleStatusLabel: UIControl =
                document.getElementById("toggle-status-label")

            toggleStatus?.checked == true
                ? toggleStatusLabel.innerHTML = "activo"
                : toggleStatusLabel.innerHTML = "inactivo"
        })

        // Vehicular Entrance Toggle
        const toggleVEntrance: UIControl =
            document.getElementById("vehicular-entrance")

        toggleVEntrance.addEventListener("click", (): void => {
            const toggleVEntranceLabel: UIControl =
                document.getElementById("vehicular-entrance-label")

            toggleVEntrance?.checked === true
                ? toggleVEntranceLabel.innerHTML = "si"
                : toggleVEntranceLabel.innerHTML = "no"
        })

        // cancel
        const cancel: UIControl =
            document.getElementById("cancel")

        cancel.addEventListener('click', (): void => {
            this.cancel()
        })
    }

    public new_(): void {
        const modalElement: UIControl = document.getElementById("modal-content")

        modalElement.innerHTML = `
        <div class="modal" id="modal">
            <div class="modal_dialog modal_body" style="max-width: 450px !important">
                <h2 class="modal_title">Nuevo cliente</h2>

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

        const closeButton = document.getElementById("cancel")
        closeButton?.addEventListener("click", (): void => {
            this.cancel()
        })

    }

    public async newSuperuser(entity: string): Promise<NewValue> {
        // ...
    }

    public async remove_(): Promise<void> {
        const modalElement: UIControl = document.getElementById("modal-content")

        modalElement.innerHTML = `
            <div class="modal" id="modal">
            <div class="modal_dialog modal_body" style="max-width: 450px !important">
                <h2 class="modal_title">¿Deseas eliminar este usuario?</h2>

                <p>Esta acción no se puede revertir</p>

                <div class="modal_footer">
                    <button class="btn" id="cancel">Cancelar</button>
                    <button class="btn btn_danger" id="delete">Eliminar</button>
                </div>
            </div>
        </div>
        `
        this.open()

        document.getElementById("cancel")?.addEventListener("click", (): void => this.cancel())
    }
}

export const FNClients: NLFClients = new NLFClients()


// let entityURL: string
// // Close editor
// export function closeUserModal(id: string): void {
//     let editor = new Modal(id)
//     editor.close()
// }

// export class UserEditor {
//     async open(entity: string, id: string, rucInput: UIControl): Promise<void> {
//         let editor = new Modal(id)
//         editor.open()

//         entityURL = `https://backend.netliinks.com:443/rest/entities/Users/${entity}`
//         let data = await getData(entityURL)

//         // Write business data on modal window
//         const entityName: UIControl = document.getElementById("entityName")
//         const businessName: UIControl = document.getElementById("businessName")

//         entityName.innerHTML = data.name
//         businessName.value = data.name
//         const rucValue = data.ruc

//         // clear multi-input in cas there is written information
//         clearRucIinput(rucInput)
//     }

//     async update(modalID: string): Promise<void> {
//         const businessName: UIControl = document.getElementById("businessName")
//         // get inputData
//         let raw = JSON.stringify({
//             name: businessName.value,
//         })

//         // preventing rename with a empty value
//         if (businessName.value === "" || businessName.value.trim() === "")
//             alert("Debe completar todos los campos")
//         else {
//             updateData(entityURL, raw)
//             closeUserModal(modalID)
//             setTimeout(() => {
//                 renderUsers() // reload changes
//             }, 1000)
//         }
//     }
// }

// export class MultiInput {
//     clearInputs(inputs: HTMLElement | any): void {
//         inputs?.forEach((r: any) => {
//             r.value = ""
//         })
//     }

//     handleInput(e: any): void {
//         const input = e.target
//         if (input?.nextElementSibling && input?.value)
//             input.nextElementSibling.focus()
//     }

//     handlePaste(e: any, inputs: UIControl): void {
//         const paste = e.clipboardData.getData("text")
//         inputs?.forEach((input: any, i: number) => {
//             input.value = paste[i]
//         })
//     }
// }

// export class newUser {
//     open(id: string): void {
//         let editorWindow = new Modal(id)
//         editorWindow.open()
//         console.info("this function is under construction")
//     }

//     add(id: string): void {
//         closeUserModal(id)
//     }

//     clearInputs(inputs: UIControl): void {
//         inputs?.forEach((input: any) => {
//             input.value = ""
//         })
//     }
// }

// function clearRucIinput(ruc: any): void {
//     ruc?.forEach((r: any) => {
//         r.value = ""
//     })
// }
