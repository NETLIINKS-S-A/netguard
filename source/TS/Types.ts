export type InterfaceElement = any;
export type UIType = {
    App: {
        app?: InterfaceElement | null,
        wrapper?: InterfaceElement | null,
        content?: InterfaceElement | null,
        date?: InterfaceElement | null,
        tools?: InterfaceElement | null
    },

    Login?: {
        login: InterfaceElement,
        mail: InterfaceElement,
        password: InterfaceElement,
        form: InterfaceElement
    }

    UserAgent?: string,
    accessToken?: string | null,
    tableRows: number
}
