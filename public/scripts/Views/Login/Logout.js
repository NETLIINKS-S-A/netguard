// @filename: Logout.ts
//
import { Modal, appStorage } from "../../GlobalFunctions.js";
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
                        <button class="btn" id="dismiss">Cancelar</button>

                        <button class="btn btn_danger" id="logout-button">Cerrar sesión</button>
                    </div>
                </div>
            </div>
        `;
        this.open();
        document.getElementById("logout-button")?.addEventListener("click", () => this.logout_());
        document.getElementById("dismiss")?.addEventListener("click", () => this.close());
    }
    logout_() {
        appStorage.remove("access_token");
        application.checkToken();
        window.location.reload();
    }
}
export const logout = new Logout();
