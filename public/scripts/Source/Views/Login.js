import { Modal } from "../Classes/classes.js";
import { checkTokenValidation } from "../Tools/checkToken.js";
export function destroySession(id) {
    const show = new Modal(id);
    show.open();
}
/**
 * @function endSession
 */
export function endSession() {
    localStorage.removeItem("access_token");
    checkTokenValidation();
}
