// @filename: TokenValidator.ts
import { UI } from "../../Libs/lib.dom.js"
import { UIElement } from "../../Libs/lib.types.js"
import { applicationView } from "../ApplicationUI/ApplicationView.js"
import { logout } from "./Logout.js"

export class App {
    public render() {
        const UI: UIElement = document.getElementById("login")
        UI.innerHTML = `
        <div class="login_window">
            <!-- Login Header -->
            <div class="login_header">
                <div class="login_showcase">
                    <img class="login_showcase_picture" src="./public/pictures/icon_login-light.png" alt="Netliinks Logo">
                    <div class="login_showcase_text">
                        <h4>Netliinks s.a.</h4>
                        <p>Networking & security</p>
                    </div>
                </div>
            </div>

            <!-- Login Body -->
            <div class="login_body">
                <h1 class="login_body_title">Iniciar Sesión</h1>
                <p class="login_body_subtitle">Inicie sesión con los datos proporcionados por el proveedor</p>

                <!-- Login Form -->
                <form autocomplete="off" method="POST" id="login-form" class="login_form">
                    <div class="input_group">
                        <label for="user-email" class="form_label">Correo</label>
                        <input type="text" class="input" name="email" placeholder="jhon.doe@ejemplo.com" id="user-email">
                    </div>

                    <div class="input_group">
                        <label for="user-password" class="form_label">Contraseña</label>
                        <input type="password" class="input" name="password" placeholder="••••••••••" id="user-password">
                    </div>

                    <button id="loginSubmitButton" class="btn btn_widder btn_success">Iniciar sesión</button>
                </form>
            </div>

            <!-- Login Footer -->
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
        const accessToken: string | null = localStorage.getItem('access_token')
        const application: UIElement = UI.App.app
        const login: UIElement = document.getElementById("login")

        if (!accessToken) application.style.display = "none"
        else if (accessToken === "undefined") console.error("Error: access token is undefined")
        else if (accessToken === null) console.error("Error: access token is null")

        else {
            application.style.display = "block"
            login.style.display = "none"
            applicationView()
        }
    }

    public checkExpirationTime(time: number) {
        if (time === 0) {
            logout()
        }

        console.log(time)
    }
}
