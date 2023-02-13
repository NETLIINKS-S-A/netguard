import { AppStorage } from "../../Shared/Functions/AppStorage.js";
import { interfaceSettings } from "../../Shared/Settings/Global.settings.js";
let currentTheme = interfaceSettings.theme;
/**
 * @function AppPreferences()
 *
 * @descripción abre las preferencias de la aplicación. Edita y guarda las
 * preferencias del usuario
 */
export function AppPreferences() {
    const preferences = document.querySelector("#app-preferences");
    preferences.style.display = "block";
    preferences.innerHTML += `
    <div class="preference_overlay preferences_isActive" id="app-preferences-window">
        <div class="preference_window">
            <h1><i class="fa-solid fa-gear"></i> Preferencias</h1>
            <section>
                <h4><i class="fa-solid fa-palette"></i> Aspecto</h4>
                <br>
                <p>Cambia el aspecto general de la plataforma. <i>Los cambios se guardan localmente</i>.</p>
                <br>
                <div class="pref_button_group">
                    <button class="pref_button aspect_button isActive" data-theme="light_theme">
                        <img src="public/icons/light.png">
                        <span>Claro</span>
                    </button>

                    <button class="pref_button aspect_button" data-theme="dark_theme">
                        <img src="public/icons/dark.png">
                        <span>Oscuro</span>
                    </button>

                    <button class="pref_button aspect_button" data-theme="automatic_theme">
                        <img src="public/icons/automatic.png">
                        <span>Automático</span>
                    </button>
                </div>
            </section>

            <section>
                <h4><i class="fa-solid fa-table"></i> Tablas</h4>
                <br>
                <p><i class="fa-solid fa-triangle-exclamation"></i> Esta sección está en desarrollo.</p>
            </section>

            <section>
                <h4><i class="fa-solid fa-eye"></i> Accesibilidad</h4>
                <br>
                <p><i class="fa-solid fa-triangle-exclamation"></i> Esta sección está en desarrollo.</p>
            </section>

            <section>
                <div class="preferences_footer_buttons">
                    <button class="btn" id="cancel-preferences">Cancelar</button>
                    <button class="btn btn_success" id="save-preferences">Guardar</button>
                </div>
            </section>
        </div>
    </div>`;
    const preferencesWindow = document.getElementById("app-preferences-window");
    const togglesButton = document.querySelectorAll(".aspect_button");
    const body = document.querySelector("body");
    const openPreferences = document.getElementById("open-preferences");
    togglesButton.forEach((button) => {
        button.dataset.theme === currentTheme ? button.classList.add("isActive") : button.classList.remove("isActive");
        const themeID = button.dataset.theme;
        button.addEventListener("click", () => {
            console.log(themeID);
            body.className = "";
            body?.classList.add(themeID);
            togglesButton.forEach((button) => button.classList.remove("isActive"));
            button.classList.add("isActive");
            currentTheme = themeID;
        });
    });
    const saveButton = document.getElementById("save-preferences");
    saveButton.addEventListener("click", () => {
        AppStorage.save("user_theme", currentTheme);
        preferences.style.display = "none";
        preferences.innerHTML = "";
        openPreferences.classList.remove("menu_item-isActive");
    });
    const closeButton = document.getElementById("cancel-preferences");
    closeButton.addEventListener("click", () => {
        currentTheme = localStorage.getItem("user_theme");
        body.className = "";
        body?.classList.add(currentTheme);
        preferences.style.display = "none";
        preferences.innerHTML = "";
        openPreferences.classList.remove("menu_item-isActive");
    });
}
