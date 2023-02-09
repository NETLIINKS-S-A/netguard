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

export const interfaceSettings: InterfaceSettings = {
    accentColor: AccentColor.Primary,
    sidebarSize: "normal",
    theme: "light"
}
