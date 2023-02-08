// @filename: Login.ts
import { applicationView } from "../../Views/ApplicationUI/ApplicationView.js";
import { AppContainer, token } from "../Settings/Misc.js";
class Login {
    constructor() {
        this.loginInterface = document.getElementById("login");
        this.accessToken = token;
        this.appContainer = AppContainer;
    }
    render() {
        this.loginInterface.innerHTML = `
            <div class="login_window">
                <!-- login header -->
                <div class="login_header">
                    <div class="login_showcase">
                        <img class="login_showcase_picture"
                            src="./public/pictures/icon_login-light.png"
                            alt="NETLIINKS LOGO">

                        <div class="login_showcase_text">
                            <h4>Netliinks s.a.</h4>
                            <p>Networking & security</p>
                        </div>
                    </div>
                </div>

                <!-- login body -->
                <div class="login_body">
                    <h1 class="login_body_title">Iniciar Sesión</h1>
                    <p class="login_body_subtitle">
                        Inicie sesión con los datos proporcionados por el proveedor.
                    </p>

                    <!-- login form -->
                    <form autocomplete="off"
                        method="POST"
                        id="login-form"
                        class="login_form">

                        <div class="input_group">
                            <label for="user-email"
                                class="form_label">
                                Correo
                            </label>
                            <input type="text"
                                class="input"
                                name="email"
                                placeholder="jhon.doe@ejemplo.com"
                                id="user-email">
                        </div>

                        <div class="input_group">
                            <label for="user-password"
                                class="form_label">
                                Contraseña
                            </label>
                            <input type="text"
                                class="input"
                                name="email"
                                placeholder="•••••••••••"
                                id="user-password">
                        </div>

                        <button id="loginSubmitButton"
                            class="btn btn-isWidder btn_success">
                            Iniciar sesión
                        </button>
                    </form>
                </div>

                <!-- login footer -->
                <div class="login_footer">
                    <div class="login_footer_horizontal">
                        <i class="fa-duotone fa-buildings"></i>
                        <i class="fa-duotone fa-user-police"></i>
                        <i class="fa-duotone fa-inboxes"></i>
                        <i class="fa-duotone fa-briefcase-medical"></i>
                        <i class="fa-duotone fa-file-excel"></i>
                        <i class="fa-duotone fa-note"></i>
                    </div>

                    <p>Accede a todas nuestras herramientas</p>
                </div>
            </div>`;
    }
    checkToken() {
        if (!this.accessToken)
            this.appContainer.style.display = "none";
        else if (this.accessToken === "undefined")
            throw new Error("Error: access token is undefined");
        else if (this.accessToken === null)
            throw new Error("Error: access token is null");
        else
            this.appContainer.style.display = "block",
                this.loginInterface.style.display = "none",
                applicationView();
    }
    checkExpiration() { }
}
/**
 * A set of instructions for login
 */
export const login = new Login();
