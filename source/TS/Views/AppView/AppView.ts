// @filename: AppView.ts
import { UI } from "../../lib.dom.js";
import { UIElement } from "../../Types/GeneralTypes.js";
import { renderCustomers } from "../CustomerView/CustomerView.js";
import { logOut, dismissLogOut, openLogOut } from "../Login/LogOut.js";
import { getData } from "../../RequestOptions.js"
import { renderGuards } from "../GuardsView/GuardsView.js";
import { renderUsers } from "../UsersView/UsersView.js";

export async function renderAppInterface() {
    const url = "https://backend.netliinks.com:443/rest/userInfo?fetchPlan=full";
    const sidebar: UIElement = document.getElementById("appSidebar");
    const content: UIElement = UI.App?.app;
    const wrapper: UIElement = UI.App?.wrapper;

    let data = await getData(url)

    async function renderInterface(interfaceData: any): Promise<void> {
        if (interfaceData.error) logOut() // if any error, close session (in case access token fails)
        else {
            wrapper.style.display = "block";
            content.style.display = "flex";
            sidebar.style.display = "flex";

            sidebar.innerHTML += `<div class="sidebar">
                <div class="sidebar_brand">
                    <img class="menu_brandicon" src="./public/pictures/icon_login-light.png" alt="NETLIINKS LOGO">
                    <span class="menu_brandname">NETGUARD</span>
                    <span class="menu_username">${interfaceData.username}</span>
                </div>

                <div class="sidebar_menu">
                    <div class="menu">
                        <div class="menu_item menu_item-isActive" id="stadistics-view">
                            <div class="menu_item_label">
                                <i class="fa-regular fa-chart-line"></i>
                                <span>Estadísticas</span>
                            </div>
                        </div>

                        <div class="menu_item" id="customers-view">
                            <div class="menu_item_label">
                                <i class="fa-regular fa-building"></i>
                                <span>Empresas</span>
                            </div>
                        </div>

                        <div class="menu_item_toggle">
                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-user"></i>
                                    <span>Usuarios</span>
                                </div>
                            </div>

                            <div class="menu_items">
                                <div class="menu_item" id="clients-view">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-user-group"></i>
                                        <span>Clientes</span>
                                    </div>
                                </div>

                                <div class="menu_item">
                                    <div class="menu_item_label" id="guards-view">
                                        <i class="fa-regular fa-user-police"></i>
                                        <span>Guardias</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="menu_item_toggle">
                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-up-from-bracket"></i>
                                    <span>Importar</span>
                                </div>
                            </div>

                            <div class="menu_items">
                                <div class="menu_item" id="import-clients">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-user"></i>
                                        <span>Clientes</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="import-guards">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-user-police"></i>
                                        <span>Guardias</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="menu_item_toggle">
                            <div class="menu_item">
                                <div class="menu_item_label">
                                    <i class="fa-regular fa-user"></i>
                                    <span>Bitácora</span>
                                </div>
                            </div>

                            <div class="menu_items">
                                <div class="menu_item" id="binnacle-events">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-circle-exclamation"></i>
                                        <span>Eventos</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="binnacle-platform">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-laptop"></i>
                                        <span>Plataforma</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="binnacle-visits">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-user"></i>
                                        <span>Visitas</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="binnacle-notes">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-note"></i>
                                        <span>Notas</span>
                                    </div>
                                </div>

                                <div class="menu_item">
                                    <div class="menu_item_label" id="binnacle-markings">
                                        <i class="fa-regular fa-calendar"></i>
                                        <span>Marcaciones</span>
                                    </div>
                                </div>

                                <div class="menu_item" id="binnacle-vehicular">
                                    <div class="menu_item_label">
                                        <i class="fa-regular fa-car"></i>
                                        <span>Vehicular</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="menu_item">
                            <div class="menu_item_label">
                                <i class="fa-regular fa-buildings"></i>
                                <span>Ciudadela</span>
                            </div>
                        </div>

                        <div class="menu_item">
                            <div class="menu_item_label">
                                <i class="fa-regular fa-user-group"></i>
                                <span>Adminsitración</span>
                            </div>
                        </div>
                    </div>

                    <div class="sidebar_bottom">
                        <hr>
                        <div class="menu_links">
                            <a href="#" class="menu_link_item">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-circle-question"></i>
                                    <span>Soporte</span>
                                </div>
                            </a>

                            <a href="https://www.netliinks.com" class="menu_link_item">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-sparkles"></i>
                                    <span>Versión 2.0</span>
                                </div>
                            </a>

                            <a href="#" class="menu_link_item">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-newspaper"></i>
                                    <span>Notas de la versión</span>
                                </div>
                            </a>
                            <br>
                            <a href="#" class="menu_link_item">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-browser"></i>
                                    <span>Visita nuestra web</span>
                                </div>
                            </a>
                        </div>

                        <hr>

                        <div class="menu_logout">
                            <a href="#" class="menu_link_item" id="openLogOut">
                                <div class="menu_link_item_label">
                                    <i class="fa-regular fa-up-from-bracket"></i>
                                    <span>Salir</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            <div class="modal" id="logOutModal">
                <div class="modal_dialog modal_body">
                    <h2 class="modal_title">Cerrar sesión</h2>

                    <div class="modal_content">
                        <p>${interfaceData.username} ¿Deseas cerrar sesión?</p>
                    </div>

                    <div class="modal_footer">
                        <button class="btn" id="dismissLogOut">Cancelar</button>

                        <button class="btn btn_danger" id="logOut">Cerrar sesión</button>
                    </div>
                </div>
            </div>`;
            // render functions
            document.getElementById("stadistics-view")?.addEventListener("click", (e) => renderBlankPage("Estadísticas"));
            document.getElementById("customers-view")?.addEventListener("click", (e) => renderCustomers());
            document.getElementById("clients-view")?.addEventListener("click", (e) => renderUsers());
            document.getElementById("guards-view")?.addEventListener("click", (e) => renderGuards());
            document.getElementById("import-clients")?.addEventListener("click", (e) => renderBlankPage("Importar clientes"));
            document.getElementById("import-guards")?.addEventListener("click", (e) => renderBlankPage("Importar guardias"));
            // binnacle
            document.getElementById("binnacle-events")?.addEventListener("click", (e) => renderBlankPage("Eventos"));
            document.getElementById("binnacle-platform")?.addEventListener("click", (e) => renderBlankPage("Plataforma"));
            document.getElementById("binnacle-visits")?.addEventListener("click", (e) => renderBlankPage("Visitas"));
            document.getElementById("binnacle-notes")?.addEventListener("click", (e) => renderBlankPage("Notas"));
            document.getElementById("binnacle-markings")?.addEventListener("click", (e) => renderBlankPage("Marcaciones"));
            document.getElementById("binnacle-vehicular")?.addEventListener("click", (e) => renderBlankPage("Vehicular"));

            // Close session functions
            document.getElementById("openLogOut")?.addEventListener("click", (e) => openLogOut("logOutModal"));
            document.getElementById("logOut")?.addEventListener("click", (e) => logOut());
            document.getElementById("dismissLogOut")?.addEventListener("click", (e) => dismissLogOut("logOutModal"));
            // End close session functions

            const menuItems: UIElement = document.querySelectorAll('.menu_item');
            const menuItemToggle: UIElement = document.querySelectorAll('.menu_item_toggle');

            menuItems?.forEach((menuItem: any) => {
                menuItem.addEventListener('click', (): void => {
                    menuItems.forEach((menuItem: any) => menuItem.classList.remove("menu_item-isActive"));
                    menuItemToggle?.forEach((IT: any) => IT?.classList.remove("menu_item_toggle-isActive"));
                    menuItem.classList.add("menu_item-isActive");
                });
            });

            menuItemToggle?.forEach((itemToggle: any) => {
                itemToggle?.addEventListener("click", (): void => {
                    itemToggle?.classList.add("menu_item_toggle-isActive");
                });
            });
        }

        renderBlankPage("Estadísticas");
    }

    renderInterface(data);
}

function renderBlankPage(name: string): void {
    let UIApp = UI.App;
    UIApp.content.innerHTML = `
    <h1 class="app_title">${name}</h1>
    <div class="container">
        <p class="message">Lo sentimos, ${name.toLowerCase()} aún está en desarrollo.</p>
    </div>`;
}
