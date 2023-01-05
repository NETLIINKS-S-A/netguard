import { UIType } from "../Tools/types.js"

export const UI: UIType = {
    App: {
        app: document.getElementById("app"),
        wrapper: document.getElementById("appWrapper"),
        content: document.getElementById("appContent"),
        date: document.getElementById("appDate"),
        tools: document.getElementById("appTools")
    },

    login: document.getElementById("login"),
    UserAgent: navigator.userAgent,
    accessToken: localStorage.getItem("access_token"),
    tableRows: 8
}
