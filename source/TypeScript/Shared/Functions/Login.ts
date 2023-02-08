// @filename: Login.ts

import { applicationView } from "../../Views/ApplicationUI/ApplicationView.js"
import { UIControl } from "../Libs/lib.types.g.js"
import { AppContainer } from "../Settings/Misc.js"
import { AppStorage } from "./AppStorage.js"

class Login {
    private loginInterface = <HTMLElement>document.getElementById("login")
    private accessToken: string | null = localStorage.getItem("access_token")
    private appContainer: UIControl = AppContainer

    public render() {
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
                            <input type="password"
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
            </div>`
    }

    public async checkToken(): Promise<void> {
        const accessToken: string | null = localStorage.getItem("access_token")

        if (!accessToken)
            this.appContainer.style.display = "none"
        else if (accessToken === "undefined")
            console.error("Error: access token is undefined")

        else if (accessToken === null || this.accessToken === "null")
            console.error("Error: access token is null"),
                console.error("No se ha podido generar el token correctamente")
        else
            this.appContainer.style.display = "block",
                this.loginInterface.style.display = "none",
                applicationView()

    }

    public checkExpiration() { }
}

/**
 * A set of instructions for login
 */
export const login: Login = new Login()
