// @filename: Logout.ts
//
import { Modal } from "../../Classes.js";
import { application } from "./Login.js";
class Logout extends Modal {
    open_() {
        const modalElement = document.getElementById("modal-content");
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
        `;
        this.open();
        document.getElementById("logout-button")?.addEventListener("click", () => this.logout_());
    }
    logout_() {
        localStorage.removeItem("access_token");
        application.checkToken();
        window.location.reload();
    }
    dismiss_() {
    }
}
export const logout = new Logout();
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
