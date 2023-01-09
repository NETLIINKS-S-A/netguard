// @filename: DomElements.ts
// TODO: change filename to DOMElements.ts
import { UIType } from "./Types/GeneralTypes.js"

export const UI: UIType = {
    App: {
        app: document.getElementById("app"),
        wrapper: document.getElementById("appWrapper"),
        content: document.getElementById("appContent"),
        date: document.getElementById("appDate"),
        tools: document.getElementById("appTools")
    },

    Login: {
        login: document.getElementById("login"),
        mail: document.getElementById("userEmail"),
        password: document.getElementById("userPassword"),
        form: document.getElementById("loginForm")
    },

    UserAgent: navigator.userAgent,

    accessToken: localStorage.getItem("accessToken"),

    tableRows: 8
}
