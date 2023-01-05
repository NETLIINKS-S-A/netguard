import { Modal } from "../Complements/classes.js"
import { checkSessionValidity } from "../Complements/checkToken.js"

export function destroySession(id: any) {
    const show = new Modal(id)
    show.open()
}

/**
 * @function endSession
 */
export function endSession() {
    localStorage.removeItem("access_token")
    checkSessionValidity()
}
