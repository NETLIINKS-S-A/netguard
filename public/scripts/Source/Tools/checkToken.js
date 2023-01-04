import { UI } from "../Sections/AppElements.js";
import { renderInteface } from "../../index.js";
/* ===========================
Verify current session
============================== */
/**
 * @function checkCurrentSesssion()
 * @description checks the existense or validity of a token and show interface
 */
export function checkTokenValidation() {
    let app = UI.App.app;
    app ? null : true;
    if (!UI.accessToken)
        app.style.display = "none";
    else if (UI.accessToken == "undefined")
        console.error("Key is undefined");
    else
        UI.login.style.display = "none", renderInteface();
}
