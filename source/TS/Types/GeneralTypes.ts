// @filename: GeneralTypes.ts
export type UIElement = HTMLElement | null | any

// Type UI
export type UIType = {
    App: {
        app?: UIElement | null,
        wrapper?: UIElement | null,
        content?: UIElement | null,
        date?: UIElement | null,
        tools?: UIElement | null
    },

    Login?: {
        login: UIElement,
        mail: UIElement,
        password: UIElement,
        form: UIElement
    }

    UserAgent?: string,
    accessToken?: string | null,
    tableRows: number
}
