import { InterfaceElement } from "./types.js"

export class Modal {
    id: any
    modal: InterfaceElement
    constructor(id: any) {
        this.id = id
        this.modal = document.getElementById(this.id)
    }

    open(): void {
        // const modal: HTMLElement | null = document.getElementById(this.id)
        this.modal.style.display = "block"

        setTimeout((): void => {
            this.modal?.classList.toggle("open")
        }, 100)
    }

    close(): void {
        this.modal?.classList.toggle("open")

        setTimeout((): void => {
            this.modal.style.display = "none"
        }, 100)
    }
}
