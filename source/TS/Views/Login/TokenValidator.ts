import { UI } from "../../DomElements.js"
import { InterfaceElement } from "../../Types.js"
import { renderAppInterface } from "../AppView/AppView.js"

export function checkTokenValidation(): void {
    const AccessToken = UI.accessToken
    const app: InterfaceElement = UI.App.app
    const login: InterfaceElement = UI.Login?.login

    if (!AccessToken)
        app.style.display = "none"
    else if (AccessToken === "undefined")
        console.error("Error: access token is undefined")
    else if (AccessToken == null)
        console.error("Error: access token is null")
    else
        app.style.display = "block",
        login.style.display = "none",
        renderAppInterface()
}
