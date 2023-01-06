import { Modal } from "../../Classes.js";
import { checkTokenValidation } from "./TokenValidator.js";

export function openLogOut(id: any) {
    const show: Modal = new Modal(id)
    show.open()
}

export function logOut() {
    localStorage.removeItem("accessToken")
    checkTokenValidation()
    window.location.reload()
}

export function dismissLogOut(id: any) {
    const close: Modal = new Modal(id)
    close.close()
}
