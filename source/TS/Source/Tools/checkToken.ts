import { UI } from "../Sections/AppElements.js";
import { InterfaceElement } from "./types.js";
import { renderInteface } from "../../index.js";

/* ===========================
Verify current session
============================== */
/**
 * @function checkCurrentSesssion()
 * @description checks the existense or validity of a token and show interface
 */

export function checkTokenValidation(): void {
    const AccessToken = UI.accessToken
    const app: InterfaceElement = UI.App.app
    const login: InterfaceElement = UI.login

    if (!AccessToken) app.style.display = "none"
    else if (AccessToken === "undefined") console.error("Unespected error #00l01")
    else login.style.display = "none", renderInteface()
}
