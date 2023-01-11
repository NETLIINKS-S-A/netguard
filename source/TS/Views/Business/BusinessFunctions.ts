// @filename: BusinessEditor.ts
import { Modal } from "../../Classes.js"
import { getData, updateData } from "../../RequestOptions.js"
import { UIElement } from "../../Types/GeneralTypes.js"
import { renderBusiness } from "./BusinessView.js";

let entityURL: string;
// Close editor
export function closeBusinessModal(id: string): void {
    let editor = new Modal(id)
    editor.close()
}

export class BusinessEditor {
    async open(entity: string, id: string, rucInput: UIElement): Promise<void> {
        let editor = new Modal(id)
        editor.open()

        entityURL = `https://backend.netliinks.com:443/rest/entities/Customer/${entity}`
        let data = await getData(entityURL)

        // Write business data on modal window
        const entityName: UIElement = document.getElementById("entityName")
        const businessName: UIElement = document.getElementById("businessName")

        entityName.innerHTML = data.name
        businessName.value = data.name
        const rucValue = data.ruc

        // clear multi-input in cas there is written information
        clearRucIinput(rucInput)
    }

    async update(modalID: string, rucInput: any): Promise<void> {
        const businessName: UIElement = document.getElementById("businessName")
        // get inputData
        let raw = JSON.stringify({
            "name": businessName.value
        })

        // preventing rename with a empty value
        if (businessName.value === "" || businessName.value.trim() === "") closeBusinessModal(modalID)
        else {
            updateData(entityURL, raw)
            closeBusinessModal(modalID)
            setTimeout(() => {
                clearRucIinput(rucInput)
                renderBusiness() // reload changes
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

    handlePaste(e: any, inputs: UIElement): void {
        const paste = e.clipboardData.getData("text")
        inputs?.forEach((input: any, i: number) => {
            input.value = paste[i]
        })
    }
}

export class NewBusiness {
    open(id: string): void {
        let editorWindow = new Modal(id)
        editorWindow.open()
        console.info("this function is under construction")
    }

    add(id: string): void {
        closeBusinessModal(id)
    }

    clearInputs(inputs: UIElement): void {
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
