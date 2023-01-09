// @filename: LogOut.ts
// TODO: Change this filename to Logout.ts
import { Modal } from "../../Classes.js";
import { checkTokenValidation } from "./TokenValidator.js";
export function openLogOut(id) {
    const show = new Modal(id);
    show.open();
}
export function logOut() {
    localStorage.removeItem("accessToken");
    checkTokenValidation();
    window.location.reload();
}
export function dismissLogOut(id) {
    const close = new Modal(id);
    close.close();
}
