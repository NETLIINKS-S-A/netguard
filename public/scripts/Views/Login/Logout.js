// @filename: Logout.ts
//
import { Modal } from "../../Classes.js";
import { checkTokenValidation } from "./TokenValidator.js";
export function openLogout(id) {
    const show = new Modal(id);
    show.open();
}
export function logout() {
    localStorage.removeItem("accessToken");
    checkTokenValidation();
    window.location.reload();
}
export function dismissLogout(id) {
    const close = new Modal(id);
    close.close();
}
