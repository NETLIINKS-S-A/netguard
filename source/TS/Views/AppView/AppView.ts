// @filename: AppView.ts
import { UI } from "../../DOMElements.js"
import { UIElement } from "../../Types/GeneralTypes.js"
import { renderBusiness } from "../Business/BusinessView.js"
import { renderUsers } from "../Users/UsersView.js"
import { logOut, dismissLogOut, openLogOut } from "../Login/LogOut.js"
import { getData } from "../../RequestOptions.js"

export async function renderAppInterface() {
    const url = "https://backend.netliinks.com:443/rest/userInfo?fetchPlan=full"
    const app = UI.App.app
    const sidebar: UIElement = document.getElementById("appSidebar")
    const content: UIElement = UI.App?.app
    const wrapper: UIElement = UI.App?.wrapper

    let data = await getData(url)

    async function renderInterface(interfaceData: any): Promise<void> {
        if (interfaceData.error) logOut()
        else {
            app.style.display = "flex"
            wrapper.style.display = "block"
            content.style.display = "flex"
            sidebar.style.display = "flex"

            sidebar.innerHTML += `<div class="menu">
                <img class="menu_brandicon" src="./public/pictures/icon_login-light.png" alt="NETLIINKS LOGO">
                <span class="menu_brandname">NETGUARD</span>
                <span class="menu_username">${interfaceData.username}</span>

                <div class="menu_item" id="goToStadistics">
                    <div class="menu_item_icon">
                        <i class="fa-regular fa-chart-line"></i>
                    </div>
                    <div class="menu_item_name">Estadísticas</div>
                </div>

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
                <a href="#" id="openLogOut"><i class="fa-solid fa-arrow-right-from-bracket"></i> <div>salir</div></a>
            </div>

            <div class="modal" id="logOutModal">
                <div class="modal_dialog modal_body">
                    <h2 class="modal_title">Cerrar sesión</h2>

                    <div class="modal_content">
                        <p>${interfaceData.username} ¿Deseas cerrar sesión?</p>
                    </div>

                    <div class="modal_footer">
                        <button class="btn" id="dismissLogOut">Cerrar</button>

                        <button class="btn btn_danger" id="logOut">Cerrar sesión</button>
                    </div>
                </div>
            </div>
            `

            document.getElementById("goToBusiness")?.addEventListener("click", (e) => renderBusiness())

            document.getElementById("goToUsers")?.addEventListener("click", (e) => renderUsers())

            // Close session functions
            document.getElementById("openLogOut")?.addEventListener("click", (e) => openLogOut("logOutModal"))

            document.getElementById("logOut")?.addEventListener("click", (e) => logOut())

            document.getElementById("dismissLogOut")?.addEventListener("click", (e) => dismissLogOut("logOutModal"))
            // End close session functions

            const menu = document.querySelector(".menu")
            const items = menu?.querySelectorAll(".menu_item")
            // const icons = menu?.querySelectorAll(".fa-regular")

            items?.forEach(item => {
                item.addEventListener("click", () => {
                    items.forEach(item => {
                        item.classList.remove("menu_item-isActive")
                    })

                    item.classList.add("menu_item-isActive")
                })
            })
        }

        renderBusiness()
    }

    renderInterface(data)
}
