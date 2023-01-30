import { appStorage } from "../../Classes.js";
import { settings } from "../../Libs/lib.settings.js";
const content = document.getElementsByTagName("body")[0];
let savedTheme = appStorage.get('theme');
if (savedTheme === null || savedTheme === undefined) {
    settings.theme;
}
else {
    settings.theme = savedTheme;
}
/**
 * @description tempTheme save the current selected theme but, it is deleted
 * when not save the preferences
 *
 * @descripción thempTheme guarda el tema seleccionado actual, este se elimina
 * si no guardamos las preferencias
 */
let tempTheme;
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
                    <button class="pref_button aspect_button isActive" data-theme="light_slategray">
                        <img src="public/icons/light_slategray.png">
                        <span>Claro</span>
                    </button>

                    <button class="pref_button aspect_button" data-theme="light_neutral">
                        <img src="public/icons/theme_placeholder.png">
                        <span>Claro Neutral</span>
                    </button>

                    <button class="pref_button aspect_button" data-theme="light_gray">
                        <img src="public/icons/theme_placeholder.png">
                        <span>Claro Gris</span>
                    </button>
                </div>
                <br>

                <div class="pref_button_group">
                    <button class="pref_button aspect_button" data-theme="dark_slategray">
                        <img src="public/icons/dark_slategray.png">
                        <span>Oscuro</span>
                    </button>

                    <button class="pref_button aspect_button" data-theme="dark_neutral">
                        <img src="public/icons/dark_neutral.png">
                        <span>Oscuro Neutral</span>
                    </button>

                    <button class="pref_button aspect_button" data-theme="dark_gray">
                        <img src="public/icons/dark_gray.png">
                        <span>Oscuro Gris</span>
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
                    <button class="btn btn_primary" id="save-preferences">Guardar</button>
                </div>
            </section>
        </div>
    </div>`;
    const preferencesWindow = document.getElementById("app-preferences-window");
    // Themes
    const togglesButton = document.querySelectorAll(".aspect_button");
    togglesButton.forEach((button) => {
        button.addEventListener('click', () => {
            togglesButton.forEach((button) => button.classList.remove('isActive'));
            content.className = "";
            // set theme
            content.classList.add(`${button.dataset.theme}`);
            button.classList.add('isActive');
            settings.theme = `${button.dataset.theme}`;
            tempTheme = "";
            tempTheme = settings.theme;
        });
    });
    // Tables
    // Accessibility
    // SAVE
    const save = document.getElementById('save-preferences');
    save?.addEventListener('click', () => {
        const currentTheme = content.classList.contains(`${settings.theme}`);
        appStorage.save("theme", settings.theme, "show");
        // hide preferences on save
        preferences.style.display = "none";
        preferencesWindow?.remove();
    });
    // CANCEL
    // BUG: not return if the current theme is light
    const cancel = document.getElementById("cancel-preferences");
    cancel?.addEventListener('click', () => {
        preferences.style.display = "none";
        content.classList.remove(tempTheme);
        content.classList.add(savedTheme);
        preferencesWindow?.remove();
        // clear temporal theme variable
        tempTheme = "";
    });
}
content.classList.add(savedTheme);
