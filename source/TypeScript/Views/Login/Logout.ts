// @filename: Logout.ts
//
import { Modal } from "../../Classes.js"
import { application } from "./Login.js"
import { UIControl } from "../../Libs/lib.types.js"

class Logout extends Modal {
    public open_(): void {
        const modalElement: UIControl = document.getElementById("modal-content")

        modalElement.innerHTML = `
            <div class="modal" id="modal">
                <div class="modal_dialog modal_body">
                    <h2 class="modal_title">Cerrar sesión</h2>

                    <div class="modal_content">
                        <p>¿Deseas cerrar sesión?</p>
                    </div>

                    <div class="modal_footer">
                        <button class="btn" id="dismissLogOut">Cancelar</button>

                        <button class="btn btn_danger" id="logout-button">Cerrar sesión</button>
                    </div>
                </div>
            </div>
        `
        this.open()

        document.getElementById("logout-button")?.addEventListener("click", (): void => this.logout_())
    }

    public logout_(): void {
        localStorage.removeItem("access_token")
        application.checkToken()
        window.location.reload()
    }

    public dismiss_(): void {

    }
}

export const logout: Logout = new Logout()

// export function openLogout(id: FNPHTMLElement) {
//     const show: Modal = new Modal(id)
//     show.open()
// }

// export function logout() {
//     let app = new App()

//     localStorage.removeItem("access_token")
//     app.checkToken()
//     window.location.reload()
// }

// export function dismissLogout(id: any) {
//     const close: Modal = new Modal(id)
//     close.close()
// }
