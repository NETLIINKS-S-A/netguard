// @filename: UsesViewFuncs.ts
import { Modal } from "../../../Classes.js"
import { getData, getEntityData, updateData } from "../../../Libs/lib.request.js"
import { UIControl, UIController } from "../../../Libs/lib.types.js"
import { usersView as renderUsers } from "./UsersView.js"

class NLFClients {
    public async TAGS(TABLE_TAGS: UIControl): Promise<void> {
        TABLE_TAGS?.forEach((TAG: UIController) => {
            if (
                TAG.innerText === "ENABLED" ||
                TAG.innerText === "Enabled"
            ) {
                TAG.classList.add("g")
                TAG.innerText === "Activo"
            } else if (
                TAG.innerText === "DISABLED" ||
                TAG.innerText === "Disabled" ||
                TAG.innerText === "Inactivo" ||
                TAG.innerText === "INACTIVO"
            ) {
                TAG.classList.add("i")
                TAG.innerText = "Inactivo"
            } else if (TAG.innerText === "NO APLICA") {
                TAG.innerText = "no aplica"
            } else if (TAG.innerText === "No Aplica") {
                TAG.innerText = "no aplica"
            } else if (TAG.innerText === "N/A") {
                TAG.innerText = "ninguno"
            } else if (TAG.innerText === "UNDEFINED") {
                TAG.innerText = "•••"
            } else if (
                TAG.innerText != "no aplica" &&
                TAG.innerText != "NINGUNO" &&
                TAG.innerText != "•••"
            ) {
                TAG.classList.add("b")
            }
        })
    }

    public async editor(entity: string) {
        let GET_DATA = getEntityData("Users", entity)
    }
}

export const FNClients: NLFClients = new NLFClients()


let entityURL: string
// Close editor
export function closeUserModal(id: string): void {
    let editor = new Modal(id)
    editor.close()
}

export class UserEditor {
    async open(entity: string, id: string, rucInput: UIControl): Promise<void> {
        let editor = new Modal(id)
        editor.open()

        entityURL = `https://backend.netliinks.com:443/rest/entities/Users/${entity}`
        let data = await getData(entityURL)

        // Write business data on modal window
        const entityName: UIControl = document.getElementById("entityName")
        const businessName: UIControl = document.getElementById("businessName")

        entityName.innerHTML = data.name
        businessName.value = data.name
        const rucValue = data.ruc

        // clear multi-input in cas there is written information
        clearRucIinput(rucInput)
    }

    async update(modalID: string): Promise<void> {
        const businessName: UIControl = document.getElementById("businessName")
        // get inputData
        let raw = JSON.stringify({
            name: businessName.value,
        })

        // preventing rename with a empty value
        if (businessName.value === "" || businessName.value.trim() === "")
            alert("Debe completar todos los campos")
        else {
            updateData(entityURL, raw)
            closeUserModal(modalID)
            setTimeout(() => {
                renderUsers() // reload changes
            }, 1000)
        }
    }
}

export class MultiInput {
    clearInputs(inputs: HTMLElement | any): void {
        inputs?.forEach((r: any) => {
            r.value = ""
        })
    }

    handleInput(e: any): void {
        const input = e.target
        if (input?.nextElementSibling && input?.value)
            input.nextElementSibling.focus()
    }

    handlePaste(e: any, inputs: UIControl): void {
        const paste = e.clipboardData.getData("text")
        inputs?.forEach((input: any, i: number) => {
            input.value = paste[i]
        })
    }
}

export class newUser {
    open(id: string): void {
        let editorWindow = new Modal(id)
        editorWindow.open()
        console.info("this function is under construction")
    }

    add(id: string): void {
        closeUserModal(id)
    }

    clearInputs(inputs: UIControl): void {
        inputs?.forEach((input: any) => {
            input.value = ""
        })
    }
}

function clearRucIinput(ruc: any): void {
    ruc?.forEach((r: any) => {
        r.value = ""
    })
}
