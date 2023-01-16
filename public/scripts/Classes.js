export class Modal {
    id;
    modal;
    constructor(id) {
        this.id = id;
        this.modal = document.getElementById(this.id);
    }
    open() {
        this.modal.style.display = 'block';
        setTimeout(() => this.modal.classList.toggle('open'), 100);
    }
    close() {
        this.modal.classList.toggle('open');
        setTimeout(() => (this.modal.style.display = 'none'), 100);
    }
}
