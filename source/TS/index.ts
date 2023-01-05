import { UI } from './Source/Tools/AppElements'
import { checkSessionValidity } from './Source/Complements/checkToken.js'
import { InterfaceElement } from './Source/Complements/types.js'
import { DTROptions } from './Source/Complements/RequestOptions.js'
// Importing views
import { renderBusiness } from './Source/Views/BusinessView.js'
import { renderUsers } from './Source/Views/UsersView.js'
import { destroySession, endSession } from './Source/Views/Login.js'

// KEYBINDINGS
window.addEventListener("keyup", (e): void => {
    const spotlight: HTMLElement | null = document.getElementById("spotlight")
    let key: string = e.code
    if (e.altKey && key === "KeyS") spotlight?.focus()
})

/* ===========================
Document date
============================== */
function renderAppDate() {
    const appMonth: InterfaceElement = document.getElementById("appMonth")
    const appDay: InterfaceElement = document.getElementById("appDay")
    const dt = new Date()
    const month = dt.getMonth()
    const day = dt.getDay()
    const date =dt.getDate()

    const months = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre",
        "Octubre", "Noviembre", "Diciembre"
    ]

    const days = [
        "Domingo", "Lunes", "Martes",
        "Miércoles", "Jueves", "Viernes",
        "Sábado"
    ]

    appMonth.innerHTML = months[month]
    appDay.innerHTML = days[day]
}

renderAppDate();

/* ===========================
Render login
============================== */
/**
 * @function login()
 * @description Inicia sesión y genera el token de acceso
 *
 * @todo verificar los datos
 * @todo cerrar sesión al caducar el token
 */
function login() {
    const email: InterfaceElement = document.getElementById("userEmail")
    const password: InterfaceElement = document.getElementById("userPassword")
    const form = document.getElementById("loginForm")

    form?.addEventListener("submit", (e) => {
        e.preventDefault()

        // validar si los campos están vacíos
        // TODO: mejorar la validación en este campo
        if (email?.value === "") alert("El campo email no puede estar vacío")
        else if (password.value === "") alert("El campo password no puede estar vacío")
        else {
            generateToken()
            UI.login.style.display = "none"
        }
    })

    // Generate an access token
    async function generateToken() {
        let url: string = "https://backend.netliinks.com:443/oauth/token"
        let requestOptions = {
            method: "POST",
            body: `grant_type=password&username=${email.value}&password=${password.value}`,
            headers: {
                "Accept" : "application/json",
                "User-agent" : `${UI.UserAgent}`,
                "Authorization" : "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
                "Content-Type" : "application/x-www-form-urlencoded",
                "Cookie": "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF"
            }
        }

        fetch(url, requestOptions)
            .then((response: Response) => response.json())
            .then((data) => {
                localStorage.setItem("access_token", data.access_token)

                if (!data.error) {
                    setTimeout(() => {
                        UI.login.style.display = "none";
                        window.location.reload()
                        renderInteface()
                    }, 100)
                }
            }).catch(error => console.error("Error" + error))
    }
}

/* ===========================
Render Interface
============================== */

/**
 * @function renderInterface()
 * @description render user interface
 */
export async function renderInteface() {
    let url = "https://backend.netliinks.com:443/rest/userInfo?fetchPlan=full"

    fetch(url, DTROptions)
        .then((response: Response) => response.json())
        .then((data) => {
            const app = UI.App.app
            const sidebar: InterfaceElement = document.getElementById("appSidebar")
            let content = UI.App.content
            let wrapper = UI.App.wrapper

            if (data.error) {
                localStorage.removeItem("access_token")
            } else {
                app.style.display = "flex"
                content.style.display = "block"
                wrapper.style.display = "block"
                sidebar.style.display = "flex"

                sidebar.innerHTML += `<div class="menu">
                    <img class="menu_brandicon" src="./public/pictures/icon_login-light.png" alt="NETLIINKS LOGO">
                    <span class="menu_brandname">NETGUARD</span>
                    <span class="menu_username">${data.username}</span>

                    <div class="menu_item menu_item-isActive" id="goToBusiness">
                        <div class="menu_item_icon">
                            <i class="fa-regular fa-building"></i>
                        </div>
                        <div class="menu_item_name">Empresas</div>
                    </div>

                    <div class="menu_item" id="goToUsers">
                        <div class="menu_item_icon">
                            <i class="fa-regular fa-user-group"></i>
                        </div>
                        <div class="menu_item_name">Usuarios</div>
                    </div>

                    <div class="menu_item" onclick="renderBinnacle()">
                        <div class="menu_item_icon">
                            <i class="fa-regular fa-book"></i>
                        </div>
                        <div class="menu_item_name">Bitácora</div>
                    </div>

                    <div class="menu_item" onclick="renderImportInterface()">
                        <div class="menu_item_icon">
                            <i class="fa-regular fa-up-from-bracket"></i>
                        </div>
                        <div class="menu_item_name">Importar</div>
                    </div>

                    <div class="menu_item" onclick="renderCitadelsData()">
                        <div class="menu_item_icon">
                            <i class="fa-regular fa-buildings"></i>
                        </div>
                        <div class="menu_item_name">Ciudadela</div>
                    </div>

                    <div class="menu_item" onclick="renderAdminsData()">
                        <div class="menu_item_icon">
                            <i class="fa-regular fa-user-group"></i>
                        </div>
                        <div class="menu_item_name">Administración</div>
                    </div>
                </div>

                <div class="options">
                    <a href="https://www.netliinks.com"><i class="fa-regular fa-circle-question"></i> <div>Soporte</div></a>
                    <a href="https://www.netliinks.com"><i class="fa-regular fa-sparkles"></i> <div>Versión 2.0.0</div></a>
                    <a href="https://www.netliinks.com"><i class="fa-regular fa-newspaper"></i> <div>Notas de la versión</div></a>
                    <br>
                    <a href="https://www.netliinks.com"><i class="fa-solid fa-browser"></i> <div>Visita nuestra web</div></a>
                    <br>
                    <a href="#" id="destroySession"><i class="fa-solid fa-arrow-right-from-bracket"></i> <div>salir</div></a>
                </div>

                <div class="modal" id="DestroySession">
                    <div class="modal-dialog modal-body">
                        <h2 class="modal-title">Cerrar sesión</h2>

                        <div class="modal-content">
                            <p>${data.username} ¿Deseas cerrar sesión?</p>
                        </div>

                        <div class="modal-footer">
                            <button class="button" onclick="closeModal('DestroySession')">Cerrar</button>

                            <button class="button button-danger" id="endSession">Cerrar sesión</button>
                        </div>
                    </div>
                </div>
                `
                // Render business section
                document.getElementById("goToBusiness")?.addEventListener("click", e => renderBusiness())
                // Render users section
                document.getElementById("goToUsers")?.addEventListener("click", e => renderUsers())
                // Destroy current session
                document.getElementById("destroySession")?.addEventListener("click", e => {
                    destroySession('DestroySession')
                })

                document.getElementById("endSession")?.addEventListener("click", e => endSession()
                )

                const menu = document.querySelector(".menu")
                const items = menu?.querySelectorAll(".menu_item")
                // reserved for optional style
                // const icons = menu?.querySelectorAll(".fa-regular")

                items?.forEach((item)=> {
                    item.addEventListener("click", () => {
                        items.forEach((item) => {
                            item.classList.remove("menu_item-isActive")
                        })

                        item.classList.add("menu_item-isActive")
                    })
                })

                renderBusiness()
            }
        })
}

login()
setTimeout(() => {
    checkSessionValidity()
}, 100)
