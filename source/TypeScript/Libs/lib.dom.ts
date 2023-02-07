// @filename: lib.dom.ts
export const UI: any = {
    App: {
        app: document.getElementById("app"),
        wrapper: document.getElementById("appWrapper"),
        content: document.getElementById("appContent"),
        date: document.getElementById("appDate"),
        tools: document.getElementById("appTools"),
        modal: document.getElementById("modal-content")
    },

    Login: {
        login: document.getElementById("login"),
    },

    UserAgent: navigator.userAgent,
    accessToken: localStorage.getItem("access_token"),
    tableRows: 12,
}
