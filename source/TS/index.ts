import { checkTokenValidation, login } from "./Views/Login/Login.js"
import { UI } from "./DomElements.js"

// Login
const form = UI.Login?.form
const mail = UI.Login?.mail
const password = UI.Login?.password
form?.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault()

    if (mail?.value === "")
        alert("El campo email está vacío")
    else if (password.value === "")
        alert("El campo password está vacío")
    else
        login(mail.value, password.value)
})

checkTokenValidation()
