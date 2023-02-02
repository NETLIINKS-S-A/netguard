// @filename: index.ts
import { App } from "./Views/Login/Login.js"
import { login } from "./Views/Login/Check.js"

import { renderAppDate } from "./Views/ApplicationUI/ApplicationDateAndTime.js"
import { UIControl } from "./Libs/lib.types.js"

const app: App = new App()
app.render()
// get login elements
const loginForm = document.getElementById("login-form")
const userEmail: UIControl = document.getElementById("user-email")
const userPassword: UIControl = document.getElementById("user-password")
// submit data
loginForm?.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault()
    if (userEmail?.value === "") alert('El campo "correo" no puede estar vacío')
    else if (userPassword?.value === "")
        alert('El campo "Contraseña" no puede estar vacío')
    else login(userEmail.value, userPassword.value)
})
// check token validation at the app start
app.checkToken()
renderAppDate()

// Keybindings
window.addEventListener("keyup", (e): void => {
    const spotlight = document.getElementById("spotlight")
    let key = e.code

    if (e.altKey && key == "KeyS") spotlight?.focus()
})

// body
const content = document.getElementsByTagName("body")
let savedTheme = localStorage.getItem("theme")
content[0].classList.add(`${savedTheme}`)
