// @filename: Modal.ts
export class Modal {
    open() {
        const modal = document.getElementById("modal");
        modal ? modal.style.display = "block" : console.error("no se encuentra el modal");
        setTimeout(() => modal.classList.add("open"), 200);
    }
    close() {
        const modal = document.getElementById("modal");
        setTimeout(() => modal?.classList.toggle("open"), 200);
        modal.style.display = "none";
        modal.remove();
    }
    cancel() {
        const modal = document.getElementById("modal");
        // TODO: add clear input functions
        setTimeout(() => modal.classList.toggle("open"), 200);
        modal.style.display = "none";
        modal.remove();
    }
}
