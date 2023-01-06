import { Modal } from "../../Classes.js";
import { checkTokenValidation } from "./TokenValidator.js";
export function logOut(id) {
    const show = new Modal(id);
    show.open();
}
export function endSession() {
    localStorage.removeItem("accessToken");
    checkTokenValidation();
}
export function dismissLogOut(id) {
    const close = new Modal(id);
    close.close();
}
