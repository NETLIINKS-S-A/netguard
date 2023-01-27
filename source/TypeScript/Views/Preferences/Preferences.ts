// @filename: Preferences.ts

import { UIElement, settings } from "../../Libs/lib.types.js"

const content: UIElement = document.getElementsByTagName("body")

let savedTheme = localStorage.getItem("theme")
if (savedTheme === null || savedTheme === undefined) {
    settings.theme
} else {
    settings.theme = savedTheme
}

export function AppPreferences() {
    const app: UIElement = document.querySelector("#app")

    app.innerHTML += `
    <div class="preference_overlay" id="preferences">
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
                    <button class="btn">Cancelar</button>
                    <button class="btn btn_primary" id="save-preferences">Guardar</button>
                </div>
            </section>
        </div>
    </div>`

    // Themes
    const themesButtons = document.querySelectorAll(".aspect_button")
    themesButtons.forEach((button: UIElement) => {
        button.addEventListener('click', (): void => {
            themesButtons.forEach((button: UIElement) => button.classList.remove('isActive'))
            content[0].className = ""
            // set theme
            content[0].classList.add(`${button.dataset.theme}`)
            button.classList.add('isActive')
            settings.theme = `${button.dataset.theme}`
        })
    })
    // Tables
    // Accessibility

    // SAVE
    const save = document.getElementById('save-preferences')
    save?.addEventListener('click', () => {
        const currentTheme = content[0].classList.contains(`${settings.theme}`)
        localStorage.setItem("theme", settings.theme)
        console.log(currentTheme)
        window.location.reload()
    })
}

console.log(savedTheme)
content[0].classList.add(savedTheme)
