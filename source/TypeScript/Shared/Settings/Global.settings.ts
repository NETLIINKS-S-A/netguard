// @filename: Global.ts

import AccentColor from "../Libs/lib.accent.color.g.js"

type Color = string
type Accent = Color
type Sidebar = string
type Theme = string

interface InterfaceSettings {
    accentColor: Accent
    sidebarSize: Sidebar
    theme: Theme
}

let currentTheme = localStorage.getItem("user_theme") as string
currentTheme === null ? localStorage.setItem("user_theme", "light_theme") : localStorage.getItem("user_theme") as string

export const interfaceSettings: InterfaceSettings = {
    accentColor: AccentColor.Primary,
    sidebarSize: "normal",
    theme: currentTheme
}
