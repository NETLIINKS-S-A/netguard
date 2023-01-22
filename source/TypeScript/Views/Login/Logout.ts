// @filename: Logout.ts
//
import { Modal } from "../../Classes.js"
import { FNPHTMLElement } from "../../Types/FunctionParameterTypes.js"
import { App } from "./TokenValidator.js"

export function openLogout(id: FNPHTMLElement) {
    const show: Modal = new Modal(id)
    show.open()
}

export function logout() {
    let app = new App()

    localStorage.removeItem("access_token")
    app.checkToken()
    window.location.reload()
}

export function dismissLogout(id: any) {
    const close: Modal = new Modal(id)
    close.close()
}
