import { InterfaceElement } from "./Types.js"

export class Modal {
    id: string
    modal: InterfaceElement

    constructor(id: string) {
        this.id = id
        this.modal = document.getElementById(this.id)
    }

    open(): void {
        this.modal.style.display = "block"
        setTimeout(() => this.modal.classList.toggle("open"), 100);
    }

    close(): void {
        this.modal.classList.toggle("open")
        setTimeout(() => this.modal.style.display = "none", 100);
    }
}