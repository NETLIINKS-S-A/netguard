export type InterfaceElement = any;
export type UIType = {
    App: {
        app?: InterfaceElement | null,
        wrapper?: InterfaceElement | null,
        content?: InterfaceElement | null,
        date?: InterfaceElement | null,
        tools?: InterfaceElement | null
    },

    login?: InterfaceElement | null,
    UserAgent?: string,
    accessToken?: string | null,
    tableRows: number
}
