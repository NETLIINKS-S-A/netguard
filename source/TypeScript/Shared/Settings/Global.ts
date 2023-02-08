// @filename: Global.ts

import { ACCENT } from "../Libs/lib.color.g.js"

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
    accentColor: ACCENT.PRIMARY,
    sidebarSize: "normal",
    theme: "light"
}
