// @filename: Logout.ts
//
import { Modal } from "../../Classes.js";
import { App } from "./Login.js";
export function openLogout(id) {
    const show = new Modal(id);
    show.open();
}
export function logout() {
    let app = new App();
    localStorage.removeItem("access_token");
    app.checkToken();
    window.location.reload();
}
export function dismissLogout(id) {
    const close = new Modal(id);
    close.close();
}
