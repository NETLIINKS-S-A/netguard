import { UI } from "../Tools/AppElements.js";
import { renderInteface } from "../../index.js";
/* ===========================
Verify current session
============================== */
/**
 * @function checkCurrentSesssion()
 * @description checks the existense or validity of a token and show interface
 */
export function checkSessionValidity() {
    const AccessToken = UI.accessToken;
    const app = UI.App.app;
    const login = UI.login;
    if (!AccessToken)
        app.style.display = "none";
    else if (AccessToken === "undefined")
        console.error("Unespected error #00l01");
    else
        login.style.display = "none", renderInteface();
}
