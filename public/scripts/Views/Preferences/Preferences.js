// @filename: Preferences.ts
export function AppPreferences() {
    const content = document.getElementsByTagName("body");
    const app = document.querySelector("#app");
    app.innerHTML += `
        <div class="preference_overlay" id="preferences">
            <div class="preference_window">
                <h1><i class="fa-solid fa-gear"></i> Preferencias</h1>
                <section>
                    <h4><i class="fa-solid fa-palette"></i> Aspecto</h4>
                    <br>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <br>
                    <div class="pref_button_group">
                        <button class="pref_button aspect_button isActive">
                            <img src="public/icons/aspect_light1.png">
                            <span>Claro</span>
                        </button>

                        <button class="pref_button aspect_button">
                            <img src="public/icons/aspect_light1.png">
                            <span>Claro Neutral</span>
                        </button>

                        <button class="pref_button aspect_button">
                            <img src="public/icons/aspect_light1.png">
                            <span>Claro Gris</span>
                        </button>
                    </div>
                    <br>

                    <div class="pref_button_group">
                        <button class="pref_button aspect_button" id="dark-1">
                            <img src="public/icons/aspect_dark1.png">
                            <span>Oscuro</span>
                        </button>

                        <button class="pref_button aspect_button" id="dark-2">
                            <img src="public/icons/aspect_dark1.png">
                            <span>Oscuro Neutral</span>
                        </button>

                        <button class="pref_button aspect_button" id="dark-3">
                            <img src="public/icons/aspect_dark1.png">
                            <span>Oscuro Gris</span>
                        </button>
                    </div>
                </section>

                <section>
                    <h4><i class="fa-solid fa-table"></i> Tabla</h4>
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
        </div>`;
    class Theme {
        constructor(id, el, type) {
            this.id = id;
            this.el = el;
            this.type = type;
        }
        changeTheme() {
        }
    }
    const buttons = document.querySelectorAll('.aspect_button');
    const getCurrentTheme = localStorage.getItem("pref_theme");
    if (getCurrentTheme === "" || getCurrentTheme == null) {
        localStorage.setItem("pref_theme", "light1");
    }
    let aspt = "";
    if (getCurrentTheme == "") {
        aspt = "ligth1";
    }
    else {
        aspt = getCurrentTheme;
    }
    changeAspect(buttons, content[0], aspt);
    const saveButton = document.getElementById("save-preferences");
    saveButton?.addEventListener('click', () => {
        savePrefs(aspt);
    });
}
function changeAspect(els, BODY, aspect) {
    els.forEach((button) => {
        const buttonID = button.getAttribute("id");
        button.addEventListener('click', () => {
            els.forEach((button) => button.classList.remove("isActive"));
            button.classList.add("isActive");
            if (buttonID === 'dark-1') {
                BODY.classList.remove("dark_neutral");
                BODY.classList.add("dark_slategray");
                BODY.classList.add("dark");
                aspect = "dark1";
                console.log(aspect);
            }
            else if (buttonID == "dark-2") {
                BODY.classList.remove("dark");
                BODY.classList.remove("dark_slategray");
                BODY.classList.add("dark_neutral");
                aspect = "dark2";
                console.log(aspect);
            }
            else if (buttonID == "dark-3") {
                BODY.classList.remove("dark");
                BODY.classList.remove("dark_neutral");
                BODY.classList.add("dark_slategray");
                aspect = "dark3";
                console.log(aspect);
            }
        });
    });
    console.log(aspect);
}
function savePrefs(aspect) {
    const prefWindow = document.getElementById("preferences");
    prefWindow?.remove();
    window.location.reload();
}
export function checkAspectAtStartup() {
    const content = document.getElementsByTagName("body");
    let currentTheme = localStorage.getItem("pref_theme");
    console.log(currentTheme);
}
