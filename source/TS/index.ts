// @filename: index.ts
import { login } from "./Views/Login/Login.js"
import { checkTokenValidation } from "./Views/Login/TokenValidator.js"
import { UI } from "./DOMElements.js"
import { renderAppDate } from "./Views/AppView/AppDate.js"

// Login
const form = UI.Login?.form
const mail = UI.Login?.mail
const password = UI.Login?.password
form?.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault()
    // TODO: make modals for this errors
    if (mail?.value === "")
        alert("El campo email está vacío")
    else if (password.value === "")
        alert("El campo password está vacío")
    else
        login(mail.value, password.value)
})

checkTokenValidation()
renderAppDate();

// Keybindings
window.addEventListener("keyup", (e): void => {
    const spotlight = document.getElementById("spotlight")
    let key = e.code

    if (e.altKey && key == "KeyS") spotlight?.focus()
})
