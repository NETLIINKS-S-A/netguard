// @filename: Classes.ts
import { UIElement } from "./Types/GeneralTypes.js"

export class Modal {
    private id: string
    public modal: UIElement

    public constructor(id: string) {
        this.id = id
        this.modal = document.getElementById(this.id)
    }

    public open(): void {
        this.modal.style.display = "block"
        setTimeout(() => this.modal.classList.toggle("open"), 100)
    }

    public close(): void {
        this.modal.classList.toggle("open")
        setTimeout(() => (this.modal.style.display = "none"), 100)
    }
}
