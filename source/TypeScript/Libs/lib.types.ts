// @filename: lib.types.ts

// Define regular types
type Rows = number
type Accent = string
type Theme = string
type Sidebar = string

// Define interfaces
interface Settings {
  limitRows: Rows,
  accent: Accent,
  theme: Theme,
  sidebar: Sidebar
}

export let settings: Settings = {
  limitRows: 8, // min = 8 | max = 50
  accent: "", // red, blue, yellow, green, gray
  theme: "", // ["light1", "light2", "light2"], ["dark1", "dark2", "dark2"]
  sidebar: "" // small, normal, large
}


export type UIElement = HTMLElement | null | any

settings.theme = "light"
settings.limitRows = 55
