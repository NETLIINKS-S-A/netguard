// @filename: lib.settings.ts

type Rows = number
type Accent = string
type Theme = string
type Sidebar = string
type CurrentPaginationPage = number

interface Settings {
    limitRows: Rows
    accent: Accent
    theme: Theme
    sidebar: Sidebar,
    currentPaginationPage: CurrentPaginationPage
}

export let settings: Settings = {
    limitRows: 8,
    accent: "blue",
    theme: "light",
    sidebar: "normal",
    currentPaginationPage: 1
}
