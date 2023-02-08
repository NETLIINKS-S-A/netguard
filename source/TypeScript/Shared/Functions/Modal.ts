// @filename: Modal.ts

import { UIControl } from "../Libs/lib.types.g.js"

export class Modal {
    public open(): void {
        const modal: UIControl = document.getElementById("modal")
        modal ? modal.style.display = "block" : console.error("no se encuentra el modal")
        setTimeout(() => modal.classList.add("open"), 200)
    }

    public close(): void {
        const modal: UIControl = document.getElementById("modal")
        setTimeout(() => modal.classList.toggle("open"), 200)

        modal.style.display = "none"
        modal.remove()
    }

    public cancel(): void {
        const modal: UIControl = document.getElementById("modal")

        // TODO: add clear input functions

        setTimeout(() => modal.classList.toggle("open"), 200)

        modal.style.display = "none"
        modal.remove()
    }
}
